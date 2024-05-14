import React from 'react';

const Dash = ({ indexstore }) => (
  <div className="container mb-2">
    <div className="row gap-5">
      <div className="card card-dash mr-lg-4 mr-md-3 col-sm-12 col-md mb-sm-2">
        <div className="card-body">
          <h5 className="font-small theme-font text-theme-gray-faint font-weight-regular">
            Total Engagment
          </h5>
          <p className="theme-font pt-1 theme-font font-header text-theme-black">
            {indexstore?.dashboard?.data?.data?.engagement_count}
          </p>

        </div>
      </div>
      <div className="card card-dash mr-lg-4 mr-md-3 col-sm-12 col-md mb-sm-2">
        <div className="card-body">
          <h5 className="font-small theme-font text-theme-gray-faint font-weight-regular">
            Pending Conclusion
          </h5>
          <p className="theme-font pt-1 theme-font font-header text-theme-black">
            {indexstore?.dashboard?.data?.data?.pending_engagement}
          </p>
        </div>
      </div>
      <div className="card card-dash mr-lg-4 mr-md-3 col-sm-12 col-md mb-sm-2">
        <div className="card-body">
          <h5 className="font-small theme-font text-theme-gray-faint font-weight-regular">
            Concluded & Closed
          </h5>
          <p className="theme-font pt-1 theme-font font-header text-theme-black">
            {indexstore?.dashboard?.data?.data?.concluded_engagement}
          </p>
        </div>
      </div>
      <div className="card card-dash col-sm-12 col-md mb-sm-2">
        <div className="card-body">
          <h5 className="font-small theme-font text-theme-gray-faint font-weight-regular">
            Total Clients
          </h5>
          <p className="theme-font pt-1 theme-font font-header text-theme-black">
            {indexstore?.dashboard?.data?.data?.clients_count}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Dash;
