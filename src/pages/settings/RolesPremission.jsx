/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { get, post } from '../../services/fetch';
import { toastNotifier } from '../../utilities/stringOperations';
import Loader from '../../components/microComponents/loader';
import SelectInput from '../../components/form/inputs/SelectInput';

const RolesPremission = ({ setCurrent }) => {
  const [roles, setRoles] = useState([]);
  const [singleroleid, setRoleId] = useState('');
  const [permission, setPermission] = useState([]);
  const [currentRolePermission, setCurrentRolePermission] = useState([]);
  const [currentRolePermissionx, setCurrentRolePermissionx] = useState([]);
  const [permissionId, setPermissionsId] = useState([]);
  const [checkedState, setCheckedState] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sreq, setRequest] = useState(false);
  useEffect(() => {
    setCurrent('Roles And Permission');
  }, []);

  // Mapping the permission array to the state variable
  // useEffect(() => {
  //   if (submitted) {
  //     setCurrentRolePermissionx([]);
  //     setRoleId('');
  //   }
  // }, [submitted]);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      setLoading(true);
      // get the data from the api
      const data = await get({ endpoint: 'ROLES', auth: true });
      // console.log(data);
      // set state with the result
      setRoles(data?.data?.data.roles);
      setPermission(data?.data?.data.permissions);
      setLoading(false);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [singleroleid]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // const rolespermission = [
    //   { id: 2, name: 'roles' },
    //   { id: 1, name: 'admin' }
    // ];
    // if (roles && roles.permissions.length > 0) return null;
    // const rolespermissionMap = {};
    // for (const item of currentRolePermission) {
    //   rolespermissionMap[item.id] = item;
    // }

    // // const updatedPermission = permission.map((item) => {
    // //   const matchedItem = rolespermissionMap[item.id];
    // //   return matchedItem || item;
    // // });
    // const updatedPermission = permission.slice(0, currentRolePermission.length).map((item) => {
    //   const matchedItem = rolespermissionMap[item.id];
    //   return matchedItem || item;
    // });

    getCurrentArryOfSameLenght();
    // console.log(currentRolePermission);
  }, [roles, currentRolePermission, permission, sreq]);

  const getCurrentArryOfSameLenght = () => {
    currentRolePermission.sort((a, b) => ((a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)));
    permission.sort((a, b) => ((a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)));

    // Find out which array is shorter
    const minLength = Math.min(currentRolePermission.length, permission.length);

    // Trim the arrays to the length of the shorter one
    const currentRolPermission = currentRolePermission.slice(0, minLength);
    const perission = permission.slice(0, minLength);
    if (currentRolePermission.length === 0) {
      setCurrentRolePermissionx([]);
    } else {
      // console.log('tigger ', perission);
      setCurrentRolePermissionx(currentRolPermission);
    }
  };

  useEffect(() => {
    // On component mount, initialize all checkboxes to unchecked
    const initialCheckedState = {};
    const arry = [];
    permission.forEach((p) => {
      initialCheckedState[p.id] = (currentRolePermissionx.some((item) => item.id === p.id));
    });
    // Object.keys(initialCheckedState).forEach((e) => {
    //   console.log('From Objects', e);
    // });
    // console.log(currentRolePermissionx);
    setCheckedState(initialCheckedState);
    currentRolePermissionx.forEach((p) => {
      arry.push(p.id);
    });
    setPermissionsId(arry);
  }, [currentRolePermissionx]);

  const getRolePermission = (e) => {
    e.preventDefault();
    const roleId = e.target.value;
    setRoleId(roleId);

    if (!!roleId && roleId.length) {
      const mek = roles.filter((a) => String(a.id) === roleId);
      setCurrentRolePermission(mek[0].permissions);
    } else {
      setCurrentRolePermission([]);
    }
  };

  const handleCheckboxChange = (event, pid) => {
    if (event.target.checked) {
      setPermissionsId([...permissionId, pid]);
    } else {
      setPermissionsId(permissionId.filter((id) => id !== pid));
    }
    setCheckedState((prevState) => ({ ...prevState, [pid]: event.target.checked }));
  };

  const UpdatePermission = async () => {
    if (!singleroleid) {
      toastNotifier({
        type: 'error', title: 'Error', text: 'Please select Role'
      });

      return;
    }

    setLoading(true);
    try {
      const req = await post({
        endpoint: 'ROLES', auth: true, param: singleroleid, body: { permissions: permissionId }
      });
      // console.log(req);
      // setRequest(true);
      // getCurrentArryOfSameLenght();
      // setRoleId('');
      // setCurrentRolePermission([]);
      // setSubmitted(true);
      toastNotifier({
        type: 'success', title: 'Success', text: 'Permissions For Role Update'
      });
    } catch (e) {
      toastNotifier({
        type: 'error', title: 'Error', text: 'Something'
      });
    }
    setLoading(false);
    setRoleId(singleroleid);
  };
  // console.log('Roles ', roles);
  // console.log('Permissions ', permission);
  // console.log('Current Permissions ', currentRolePermissionx);
  // console.log('Permission Id ', permissionId);
  return (
    <div className="content">
      <div className="box-shadow row">
        <div className="col-md-12 p-5">
          <div className="font-regular text-theme-grey">
            <SelectInput
              options={roles}
              valueIndex="id"
              optionIndex="name"
              titleIndex="name"
              value={singleroleid}
              isCamelcase
              name="roles"
              label="Edit Roles and permissions"
              isOptionLabel="Select Role"
              className="theme-font font-black font-14 w-25"
              onChange={getRolePermission}
            />
          </div>
          {isLoading
            ? <Loader />
            : (
              <div className="my-3">
                <div className="mb-3">
                  <h4>Permissions:</h4>
                </div>
                <div>
                  <div className="row">
                    {permission && permission.map((p, i) => (
                      <div className="col-md-4" key={p.id}>
                        {/* {currentRolePermissionx[i]?.id === p.id ? 'true' : 'false'} */}
                        {/* {p.id} */}
                        {/* {String(checkedState[p.id])} */}
                        <input
                          type="checkbox"
                          checked={checkedState[p.id] || false}
                          value={p.id}
                          name={`permission_${p.id}`}
                          id={`permission_${p.id}`}
                          className="text-theme"
                          onChange={(event) => handleCheckboxChange(event, p.id)} // Added OnChange event here
                        />
                        {' '}
                        <label htmlFor={`permission_${p.id}`}>{p.name}</label>
                      </div>
                    ))}
                  </div>

                  {singleroleid === '' ? null : <button className="mt-4 btn btn-small" type="button" onClick={UpdatePermission}>Update Permissions</button> }
                </div>

                {/*
                  <div className="row">
                    {permission && permission.map((p, i) => (
                      <div className="col-md-4" key={p.id}>
                        {currentRolePermissionx.includes(p.id) ? 'true' : 'false'}
                        <input
                          type="checkbox"
                          checked={currentRolePermissionx.includes(p.id)}
                          value={p.id}
                          id="permission"
                          onChange={(event) => handleCheckboxChange(event, p.id)}
                        />
                        {' '}
                        <label htmlFor="permission">{p.name}</label>
                      </div>
                    ))}
                  </div>
                */}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default RolesPremission;
