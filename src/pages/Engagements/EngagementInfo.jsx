/* eslint-disable react/jsx-props-no-multi-spaces */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Link, useParams } from 'react-router-dom';
import { apiOptions } from '../../services/fetch';
import useViewBoilerPlate from '../../components/hooks/useViewBoilerPlate';
import Loader from '../../components/microComponents/loader';
import { headerTemp1 } from '../../components/temps/projectTemps/miscTemps';
import { sentenceCaps } from '../../utilities/stringOperations';
import ViewConculsion from './EngagementInfo/ViewConculsion';
import ViewExecutions from './EngagementInfo/ViewExecutions';
import ViewPlanning from './EngagementInfo/ViewPlanning';

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
              {
                headerTemp1({
                  text: sentenceCaps(formData?.engagement?.name),
                  parent: 'Engagements',
                  name: sentenceCaps(formData?.engagement?.name),
                  link: '/app/engagement/',
                  year: `-${formData?.engagement?.year}`
                })

              }

              <div className="row">
                {/* <div className="col">
                  Pre-Planning
                </div> */}
                <div className="col-sm-12">
                  <ViewPlanning
                    planning={formData?.engagement?.planning}
                    engangementid={formData?.engagement?.id}
                    statusid={formData?.engagement?.status_id}
                  />
                </div>
                <div className="col-sm-12">
                  <ViewExecutions
                    execution={formData?.engagement?.execution}
                    engangementid={formData?.engagement?.id}
                    statusid={formData?.engagement?.status_id}
                  />
                </div>
                <div className="col">
                  <ViewConculsion
                    conclusion={formData?.engagement?.conclusion}
                    engangementid={formData?.engagement?.id}
                    statusid={formData?.engagement?.status_id}
                  />
                </div>
              </div>
            </div>
          )
      }
    </div>
  );
};

export default EngagementInfo;
