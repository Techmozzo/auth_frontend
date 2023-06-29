import React, { useEffect, useState } from 'react';
import { get } from '../../services/fetch';

const RolesPremission = ({ setCurrent }) => {
  const [roles, setRoles] = useState([]);
  const [permission, setPermission] = useState([]);
  const [currentRolePermission, setCurrentRolePermission] = useState([]);
  const [currentRolePermissionx, setCurrentRolePermissionx] = useState([]);
  useEffect(() => {
    setCurrent('Roles And Permission');
  }, []);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await get({ endpoint: 'ROLES', auth: true });
      console.log(data);
      // set state with the result
      setRoles(data?.data?.data.roles);
      setPermission(data?.data?.data.permissions);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // const rolespermission = [
    //   { id: 2, name: 'roles' },
    //   { id: 1, name: 'admin' }
    // ];
    // if (roles && roles.permissions.length > 0) return null;
    const rolespermissionMap = {};
    for (const item of currentRolePermission) {
      rolespermissionMap[item.id] = item;
    }

    const updatedPermission = permission.map((item) => {
      const matchedItem = rolespermissionMap[item.id];
      return matchedItem || item;
    });

    if (currentRolePermission.length === 0) {
      setCurrentRolePermissionx([]);
    } else {
      setCurrentRolePermissionx(updatedPermission);
    }
    // console.log(currentRolePermission);
  }, [roles, currentRolePermission, permission]);

  const getRolePermission = (e) => {
    e.preventDefault();
    const roleId = e.target.value;
    console.log(roles);
    const mek = roles.filter((a) => String(a.id) === roleId);
    setCurrentRolePermission(mek[0].permissions);
    console.log(mek);
  };
  // console.log(currentRolePermission);
  return (
    <div className="content">
      <div className="box-shadow row">
        <div className="col-md-12 pt-5">
          <div className="offset-1">
            <div className="row">
              <div className="pl-3">
                <div className="font-regular text-theme-grey">
                  Edit Roles and permissions
                </div>
              </div>
              <div className="col-md-10 mt-2">
                <div>
                  <div>
                    {/* <label htmlFor="roles">Select Role</label> */}
                    <select name="roles" id="roles" onChange={getRolePermission} className="font-title-small text-theme">
                      <option value="">Select Role</option>
                      {roles && roles.map((r) => (
                        <option value={r.id} key={r.id}>{r.name}</option>
                      ))}

                    </select>
                  </div>

                  <div className="my-5">
                    <div className="container">
                      <div className="mb-4">
                        <h4>Permissions:</h4>
                      </div>
                      <div className="row">
                        {permission && permission.map((p, i) => (
                          <div className="col-md-4" key={p.id}>
                            {currentRolePermissionx[i]?.id === p.id ? 'true' : 'false'}
                            <input type="checkbox" checked={currentRolePermissionx[i]?.id === p.id} value={p.id} name="" id="" />
                            {' '}
                            {p.name}
                          </div>
                        ))}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesPremission;
