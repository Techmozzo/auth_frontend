import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import PageTemp from '../../components/temps/PageTemp';
import { apiOptions } from '../../services/fetch';
import useViewBoilerPlate from '../../components/hooks/useViewBoilerPlate';
import IndexTemp from '../Dashboard/temp/IndexTemp';
import ClientsTable from '../../components/tables/clientsTable';
import Loader from '../../components/microComponents/loader';
import NoData from '../authentication/NoData';
import { role } from '../../utilities/auth';
import { projectAction } from '../../redux/actions/projectActions';

const ClientIndex = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.users?.clients);
  const indexstore = useSelector((state) => state.engagement);
  /* state */
  const [formData, setFormData] = useState({});
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

  const options = {
    action: 'CLIENTS',
    apiOpts: apiOptions({
      endpoint: 'CLIENTS',
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
      title: 'Total Clients',
      val: formData?.client_count || '0'
    },
    {
      title: 'Pending Conclusion',
      val: formData?.pending_engagement || '0'
    },
    {
      title: 'Concluded And Closed',
      val: formData?.concluded_engagement || '0'
    },
    {
      title: 'Total Client',
      val: formData?.clients_count || '0'
    }
  ];
  return (
    <div>
      {
        _.isEmpty(formData.clients)
          ? (
            <div>
              <NoData
                link="/app/clients/new-client"
                name="clients"
                title="No Client"
                text="Create Clients to begin"
                btnName="Create Client"
              />
            </div>
          )
          : (
            <div>
              {status === 'loading'
                ? <Loader />
                : (
                  <IndexTemp
                    formData={formData}
                    infoBarData={indexstore}
                    header="clients list"
                    link={{ name: '+ new client', to: '/app/clients/new-client' }}
                    parent="clients"
                    table={<ClientsTable data={formData.clients} />}
                  />
                )}
            </div>
          )
      }
    </div>
    // <PageTemp
    //   data={formData.clients}
    //   status={status}
    //   view={(
    //     <IndexTemp
    //       formData={formData}
    //       infoBarData={infoBarData}
    //       header="clients list"
    //       link={{ name: '+ new client', to: '/app/clients/new-client' }}
    //       parent="clients"
    //       table={<ClientsTable data={formData.clients} />}
    //     />
    //   )}
    //   action="CLIENTS_COMPLETE"
    //   retry={view}
    //   redirect={
    //     {
    //       link: '/app/clients/new-client',
    //       name: 'dashboard',
    //       text: 'Create engagement to see activities',
    //       title: 'No Data',
    //       btnName: 'Create Engagement'
    //     }
    //   }
    // />
  );
};

export default ClientIndex;
