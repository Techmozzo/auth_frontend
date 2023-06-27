import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Link, useParams } from 'react-router-dom';
import { apiOptions } from '../../services/fetch';
import useViewBoilerPlate from '../../components/hooks/useViewBoilerPlate';
import Loader from '../../components/microComponents/loader';

const EngagementInfo = () => {
  /* redux hooks */
  const store = useSelector((state) => state.engagement?.engagement);

  /* router hooks */
  const { engagementId, engagementName } = useParams();
  /* state */
  const [formData, setFormData] = useState({ });
  const [open, setOpen] = useState(false);

  /* boilerPlate hooks params */
  const options = {
    action: 'ENGAGEMENT',
    apiOpts: apiOptions({
      endpoint: 'ENGAGEMENT',
      auth: true,
      param: engagementId,
      method: 'get'
    })
  };

  /* boilerPlate hooks */
  const { status } = useViewBoilerPlate({
    setFormData,
    formData,
    store,
    options
  });
  console.log('View Engangmentinfo ', formData);
  return (
    <div>
      {
        status === 'pending'
          ? <Loader />
          : (
            <div className="container">
              <h4>Engaganment Info</h4>
              <div className="row">
                <div className="col">
                  Pre-Planning
                </div>
                <div className="col">
                  Planning
                </div>
                <div className="col">
                  Execution
                </div>
                <div className="col">
                  Conculsion
                </div>
              </div>
            </div>
          )
      }
    </div>
  );
};

export default EngagementInfo;
