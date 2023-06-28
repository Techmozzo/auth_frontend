/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { notifier } from '../../../utilities/stringOperations';
import { get } from '../../../services/fetch';
import Loader from '../../../components/microComponents/loader';

const ViewExecutions = ({ execution, engangementid, statusid }) => {
  const [state, setState] = useState();
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
          text: 'Execution Accepted',
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
      <h4>Execution</h4>
      {execution && execution.length === 0
        ? (
          <>
            No Execution Yet!
          </>
        )
        : (
          <>
            <div className="list-group">
              <div className="list-group-item list-group-item-action flex-column align-items-start ">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">contingent_liability_review</h5>
                </div>
                {/* <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p> */}
                <small>{(execution && execution[0]?.contingent_liability_review) || execution?.contingent_liability_review}</small>
              </div>
              <div className="list-group-item list-group-item-action flex-column align-items-start active">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">contract_agreement_review</h5>
                </div>
                {/* <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p> */}
                <small>{(execution && execution[0]?.contract_agreement_review) || execution?.contract_agreement_review}</small>
              </div>
            </div>
            {
              // eslint-disable-next-line no-nested-ternary
              status
                ? <Loader text="Approving Executions" />
                : statusid === '2'
                  ? <button type="button" className="btn btn-default mt-2" onClick={AcceptPlanning}>Approve</button>
                  : null

            }
          </>
        )}
    </div>
  );
};

export default ViewExecutions;
