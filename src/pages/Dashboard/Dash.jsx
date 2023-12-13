import React from 'react';

const Dash = ({ indexstore }) => (
  <div className="container mb-2">
    <div className="row">
      <div className="card mr-3 col-sm-12 col-md">
        <div className="card-body">
          <h5 className="font-small theme-font text-theme-faint"> Total Engagment</h5>
          <p className="theme-font pt-3 pl-1 pb-2 theme-font font-title text-theme-black">
            {indexstore?.dashboard?.data?.data?.engagement_count}
          </p>

        </div>
      </div>
      <div className="card mr-3 col-sm-12 col-md">
        <div className="card-body">
          <h5 className="font-small theme-font text-theme-faint"> Pending Conclusion</h5>
          <p className="theme-font pt-3 pl-1 pb-2 theme-font font-title text-theme-black">
            {indexstore?.dashboard?.data?.data?.pending_engagement}
          </p>
        </div>
      </div>
      <div className="card mr-3 col-sm-12 col-md">
        <div className="card-body">
          <h5 className="font-small theme-font text-theme-faint"> Concluded & Closed</h5>
          <p className="theme-font pt-3 pl-1 pb-2 theme-font font-title text-theme-black">
            {indexstore?.dashboard?.data?.data?.concluded_engagement}
          </p>
        </div>
      </div>
      <div className="card col-sm-12 col-md">
        <div className="card-body">
          <h5 className="font-small theme-font text-theme-faint"> Total Clients</h5>
          <p className="theme-font pt-3 pl-1 pb-2 theme-font font-title text-theme-black">
            {indexstore?.dashboard?.data?.data?.clients_count}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Dash;
