import React, { useEffect } from 'react';
import { isNull } from 'lodash';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { user, role } from '../../utilities/auth';

const Dashboard = () => {
  const { pathname } = useLocation();
  const { push } = useHistory();
  const path = (route) => pathname.startsWith(route);
  useEffect(() => {
    if (isNull(user.company_id)) {
      push('/app/dashboard/complete-registration');
    }
  }, []);
  const DashIndex = React.lazy(() => import('./AdminDash'));
  const DashClientIndex = React.lazy(() => import('./ClientDash'));
  console.log(role[0]);
  return (
    <>
      {role && role[0] === 'admin'
        ? <DashIndex />
        : <DashClientIndex />}
    </>

  );
};

export default Dashboard;
