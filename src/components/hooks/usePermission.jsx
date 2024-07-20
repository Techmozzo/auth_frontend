/* eslint-disable max-len */
import {
  useState, useEffect, useRef
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { permissions } from '../../redux/actions/profileActions';
// import { role } from '../../utilities/auth';
// import { get } from '../../services/fetch';

export default function usePermission(permissionName) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile.permissions);

  const [userPermissions, setUserPermissions] = useState([]);

  const hasDispatchedPermissions = useRef(false);

  useEffect(() => {
    if (store?.status === 'initial' && !hasDispatchedPermissions.current) {
      hasDispatchedPermissions.current = true;
      dispatch(permissions());
    }
  }, [dispatch, store?.status]);

  useEffect(() => {
    if (store?.status === 'success') {
      const permissionsData = store?.data;
      setUserPermissions(permissionsData?.permissions || []);
    }
  }, [store]);

  const permissionGranted = userPermissions.some((name) => name.name === permissionName);
  // console.log('Timers ', permissions);
  //   if (!permissionGranted && !loading) {
  //     history.push('/no-access');
  //   }

  return permissionGranted;
}
