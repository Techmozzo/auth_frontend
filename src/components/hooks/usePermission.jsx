/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { role } from '../../utilities/auth';

import { get } from '../../services/fetch';

export default function usePermission(permissionName) {
//   const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const data = await get({ endpoint: 'USER_ROLES', auth: true });

      if (data?.data?.data?.roles) {
        // const permissionsData = data?.data?.data?.roles.filter((id) => String(id.name) === String(role && role[0]));
        const permissionsData = data?.data?.data;
        // console.log('Inside ', data.data.data.roles);
        // // eslint-disable-next-line max-len
        setPermissions(permissionsData?.permissions || []);
      }

      setLoading(false);
    };

    fetchData().catch(console.error);
  }, []);

  const permissionGranted = permissions.some((name) => name.name === permissionName);
  // console.log('Timers ', permissions);
  //   if (!permissionGranted && !loading) {
  //     history.push('/no-access');
  //   }

  return permissionGranted;
}
