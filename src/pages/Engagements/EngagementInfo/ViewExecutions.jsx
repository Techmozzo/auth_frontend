/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { notifier, sentenceCaps } from '../../../utilities/stringOperations';
import { get } from '../../../services/fetch';
import Loader from '../../../components/microComponents/loader';
import usePermission from '../../../components/hooks/usePermission';

const ViewExecutions = ({ execution, engangementid, statusid }) => {
  const [state, setState] = useState();
  const { push } = useHistory();
  const [status, setStatus] = useState(false);
  const editEnganagment = usePermission('edit-engagement');

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
  console.log(execution);
  return (
    <div className="card p-2 mt-5">
      <h4 className="mb-4">Execution</h4>
      {typeof execution && execution == null
        ? (
          <>
            No Execution Yet!
          </>
        )
        : (
          <>

            <dl className="row">
              <dt className="col-sm-3 text-truncate" title="combine risk assessment">{sentenceCaps('contract agreement review')}</dt>
              <dd className="col-sm-9">{execution?.contract_agreement_review}</dd>
              <dt className="col-sm-3 text-truncate">{sentenceCaps('contingent liability review')}</dt>
              <dd className="col-sm-9">{execution?.contingent_liability_review}</dd>
              <dt className="col-sm-3 text-truncate">{sentenceCaps('expert work review')}</dt>
              <dd className="col-sm-9">{execution?.expert_work_review}</dd>
              <dt className="col-sm-3 text-truncate">{sentenceCaps('legal counsel review')}</dt>
              <dd className="col-sm-9">{execution?.legal_counsel_review}</dd>
              <dt className="col-sm-3 text-truncate">{sentenceCaps('other estimate review')}</dt>
              <dd className="col-sm-9">{execution?.other_estimate_review}</dd>
              <dt className="col-sm-3 text-truncate">{sentenceCaps('party transaction review')}</dt>
              <dd className="col-sm-9">{execution?.party_transaction_review}</dd>
            </dl>

            <div className="mt-5">
              {
                editEnganagment && (
                // eslint-disable-next-line no-nested-ternary
                  status
                    ? <Loader text="Approving Executions" />
                    : statusid === '2'
                      ? <button type="button" className="btn btn-default mt-2" onClick={AcceptPlanning}>Approve</button>
                      : null

                )
              }
            </div>

          </>
        )}
    </div>
  );
};

export default ViewExecutions;
