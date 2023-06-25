import React, { useEffect } from 'react';

const RolesPremission = ({ setCurrent }) => {
  useEffect(() => {
    setCurrent('Roles And Permission');
  }, []);

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
                Start
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesPremission;
