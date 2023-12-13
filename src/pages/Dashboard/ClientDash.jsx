import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DashboardTable from '../../components/tables/dashboardTable';
import { projectAction } from '../../redux/actions/projectActions';
import { apiOptions } from '../../services/fetch';
import { role } from '../../utilities/auth';
import Dash from './Dash';

const ClientDash = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.engagement.engagements);
  const indexstore = useSelector((state) => state.engagement);
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

  console.log('Problem ', indexstore?.dashboard?.data?.data);
  return (
    <div className="container">
      <div className="d-flex">
        <h2>Staff Dashboard</h2>
        <input type="text" value="" placeholder="search" className="ml-auto p-2" />
      </div>
      <hr />
      <Dash indexstore={indexstore} />
      <div>
        <div className="container my-3">
          <div className="d-flex">
            <h3>Recent Engagement</h3>

            <Link to="/app/engagement" className="ml-auto p-2">See All</Link>
          </div>
        </div>
        <div>
          <DashboardTable data={indexstore?.dashboard?.data?.data?.engagements.slice(0, 5)} />
          {/* <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Date Created</th>
                <th scope="col">Company</th>
                <th scope="col">No. of Member</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default ClientDash;
