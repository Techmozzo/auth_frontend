import React from 'react';

const Dash = ({ indexstore }) => (
  <div className="container">
    <div className="row">
      <div className="card mr-3 col-sm-12 col-md">
        <div className="card-body">
          <h5 className="card-title"> Total Engagment</h5>
          {indexstore?.dashboard?.data?.data?.engagement_count}
        </div>
      </div>
      <div className="card mr-3 col-sm-12 col-md">
        <div className="card-body">
          <h5 className="card-title"> Pending Conclusion</h5>
          {indexstore?.dashboard?.data?.data?.pending_engagement}
        </div>
      </div>
      <div className="card mr-3 col-sm-12 col-md">
        <div className="card-body">
          <h5 className="card-title"> Concluded & Closed</h5>
          {indexstore?.dashboard?.data?.data?.concluded_engagement}
        </div>
      </div>
      <div className="card col-sm-12 col-md">
        <div className="card-body">
          <h5 className="card-title"> Total Clients</h5>
          {indexstore?.dashboard?.data?.data?.clients_count}
        </div>
      </div>
    </div>
  </div>
);

export default Dash;
