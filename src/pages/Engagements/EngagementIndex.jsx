import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTemp from '../../components/temps/PageTemp';
import { apiOptions } from '../../services/fetch';
import useViewBoilerPlate from '../../components/hooks/useViewBoilerPlate';
import IndexTemp from '../Dashboard/temp/IndexTemp';
import DashboardTable from '../../components/tables/dashboardTable';
import { projectAction } from '../../redux/actions/projectActions';
import { user, role } from '../../utilities/auth';
import usePermission from '../../components/hooks/usePermission';

const EngagementIndex = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.engagement.engagements);
  const [formData, setFormData] = React.useState({});
  const indexstore = useSelector((state) => state.engagement);
  const viewEngangment = usePermission('view-engagement');
  const addEnganagment = usePermission('add-engagement');
  console.log(viewEngangment);
  const options = {
    action: 'ENGAGEMENTS',
    apiOpts: apiOptions({
      endpoint: 'ENGAGEMENTS',
      auth: true,
      method: 'get'
    })
  };
  const {
    view, status
  } = useViewBoilerPlate({
    setFormData,
    formData,
    store,
    options
  });

  const infoBarData = [
    {
      title: 'Total Engagement',
      val: indexstore?.dashboard?.data?.data?.engagement_count || '0'
    },
    {
      title: 'Pending Conclusion',
      val: indexstore?.dashboard?.data?.data?.pending_engagement || '0'
    },
    {
      title: 'Concluded And Closed',
      val: indexstore?.dashboard?.data?.data?.concluded_engagement || '0'
    },
    {
      title: 'Total Client',
      val: indexstore?.dashboard?.data?.data?.clients_count || '0'
    }
  ];
  // console.log('Data', formData);
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
    <PageTemp
      status={status}
      data={formData?.engagements}
      view={(
        <IndexTemp
          formData={formData}
          infoBarData={indexstore}
          header="recent engagement"
          link={addEnganagment ? { name: '+ new engagement', to: '/app/engagement/new-engagement' } : null}
          parent="engagement"
          // eslint-disable-next-line max-len
          table={viewEngangment
            && <DashboardTable data={indexstore?.dashboard?.data?.data?.engagements} />}
        />
      )}
      action="ENGAGEMENTS_COMPLETE"
      retry={view}
      redirect={
        {
          link: '/app/engagement/new-engagement',
          name: 'engagements',
          text: 'Create engagement to see activities',
          title: 'No Data',
          btnName: 'Create Engagement'
        }
      }
    />
  );
};
export default EngagementIndex;
