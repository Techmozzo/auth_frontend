/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { notifier } from '../../../utilities/stringOperations';
import { get } from '../../../services/fetch';
import Loader from '../../../components/microComponents/loader';

const ViewPlanning = ({ planning, engangementid, statusid }) => {
  const { push } = useHistory();
  const [status, setStatus] = useState(false);

  const AcceptPlanning = async () => {
    try {
      setStatus(true);
      const datax = await get({
        endpoint: 'ENGAGEMENT', auth: true, param: engangementid, afterParam: 'approve'
      });
      console.log(datax);
      if (datax.status === 200) {
        notifier({
          type: 'success',
          text: 'Planning Accepted',
          title: 'Success'
        });
        push(`/app/engagement/view/${engangementid}`);
      } else {
        notifier({
          type: 'error',
          text: datax.message,
          title: 'Error'
        });
        // throw new Error(datax);
      }
    } catch (e) {
      console.log(e);
      notifier({
        type: 'error',
        text: e.message,
        title: 'Error'
      });
    }
    setStatus(false);
  };

  return (
    <div>
      <h4>Planning</h4>
      {planning && planning.length === 0
        ? (
          <>
            No Planning yet!
          </>
        )
        : (
          <>
            <div className="list-group">
              <div href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">combine_risk_assessment</h5>
                </div>
                {/* <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p> */}
                <small>{planning?.combine_risk_assessment}</small>
              </div>
              <div href="#" className="list-group-item list-group-item-action flex-column align-items-start ">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">control_testing</h5>
                </div>
                {/* <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p> */}
                <small>{planning?.control_testing}</small>
              </div>
            </div>
            {
              // eslint-disable-next-line no-nested-ternary
              status
                ? <Loader />
                : statusid === '1'
                  ? <button type="button" className="btn btn-default mt-2" onClick={AcceptPlanning}>Approve</button>
                  : null

            }
          </>
        )}
    </div>
  );
};

export default ViewPlanning;
