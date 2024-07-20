import React, { useEffect } from 'react';
// import { Link, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DashboardTable from '../../components/tables/dashboardTable';
import { projectAction } from '../../redux/actions/projectActions';
import { apiOptions } from '../../services/fetch';
import { role } from '../../utilities/auth';
import Dash from './Dash';
import SearchInputTwo from '../../components/form/inputs/SearchTwo';

const AdminDash = () => {
  const dispatch = useDispatch();
  // const store = useSelector((state) => state.engagement.engagements);
  const indexstore = useSelector((state) => state.engagement);
  const isLoadingEngagement = useSelector((state) => state.engagement.dashboard.isLoading);

  useEffect(() => {
    dispatch(projectAction({
      action: 'ENGAGEMENTS',
      routeOptions: apiOptions({
        endpoint: 'ENGAGEMENTS',
        auth: true,
        method: 'get'
      })
    }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(projectAction({
      action: 'DASHBOARD',
      routeOptions: apiOptions({
        endpoint: role && role[0] === 'admin' ? 'DASHBOARD' : 'CLIENTS_DASHBOARD',
        auth: true,
        method: 'get'
      })
    }));
  }, [dispatch]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h2 className="font-title-small">DASHBOARD</h2>
        <SearchInputTwo placeholder="Search" className="" />
      </div>
      <hr className="nav-line" />
      <Dash indexstore={indexstore} />
      <div>
        <div className="container mt-4 pt-1">
          <div className="d-flex">
            <h3 className="font-regular">Recent Engagement</h3>

            <Link to="/app/engagement" className="ml-auto p-2">See All</Link>
          </div>
        </div>
        <div>
          <DashboardTable
            data={indexstore?.dashboard?.data?.data?.engagements.slice(0, 5)}
            isLoadingTableData={isLoadingEngagement}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
