/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { notifier, sentenceCaps } from '../../../utilities/stringOperations';
import { get } from '../../../services/fetch';
import Loader from '../../../components/microComponents/loader';

const ViewConculsion = ({ conclusion, engangementid, statusid }) => {
  const [state, setState] = useState();
  const { push } = useHistory();
  const [status, setStatus] = useState(false);
  console.log('Conclusion ', conclusion);
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
          text: 'Conclusion Accepted',
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
    <div className="card p-2 mt-5">
      <h4>Conclusion</h4>
      {conclusion && conclusion.length === 0
        ? (
          <>
            No Conclusion yet!
          </>
        )
        : (
          <>
            {/* <div className="list-group">
              <div href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">audit_report</h5>
                </div>
               <small>{conclusion?.audit_report}</small>
              </div>
              <div href="#" className="list-group-item list-group-item-action flex-column align-items-start ">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">audit_summary_misstatement</h5>
                </div>
                <small>{conclusion?.audit_summary_misstatement}</small>
              </div>
            </div> */}

            <dl className="row">
              <dt className="col-sm-3 text-truncate">{sentenceCaps('audit report')}</dt>
              <dd className="col-sm-9">{conclusion?.audit_report}</dd>
              <dt className="col-sm-3 text-truncate" title="audit summary misstatement">{sentenceCaps('audit summary misstatement')}</dt>
              <dd className="col-sm-9">{conclusion?.audit_summary_misstatement}</dd>
              <dt className="col-sm-3 text-truncate" title="audited financial statement">{sentenceCaps('audited financial statement')}</dt>
              <dd className="col-sm-9">{conclusion?.audited_financial_statement}</dd>
              <dt className="col-sm-3 text-truncate">{sentenceCaps('going concern procedures')}</dt>
              <dd className="col-sm-9">{conclusion?.going_concern_procedures}</dd>
              <dt className="col-sm-3 text-truncate">{sentenceCaps('management letter')}</dt>
              <dd className="col-sm-9">{conclusion?.management_letter}</dd>
              <dt className="col-sm-3 text-truncate">{sentenceCaps('management representation letter')}</dt>
              <dd className="col-sm-9">{conclusion?.management_representation_letter}</dd>
              <dt className="col-sm-3 text-truncate">{sentenceCaps('other financial info')}</dt>
              <dd className="col-sm-9">{conclusion?.other_financial_info}</dd>
              <dt className="col-sm-3 text-truncate">{sentenceCaps('overall analytical review')}</dt>
              <dd className="col-sm-9">{conclusion?.overall_analytical_review}</dd>
              <dt className="col-sm-3 text-truncate">{sentenceCaps('subsequent procedures')}</dt>
              <dd className="col-sm-9">{conclusion?.subsequent_procedures}</dd>
            </dl>

            <div className="mt-5">
              {
              // eslint-disable-next-line no-nested-ternary
                status
                  ? <Loader text="Approving Conclusion" />
                  : statusid === '3' && conclusion.status !== '1'
                    ? <button type="button" className="btn btn-default mt-2" onClick={AcceptPlanning}>Approve</button>
                    : null

              }
            </div>
          </>
        )}
    </div>
  );
};

export default ViewConculsion;
