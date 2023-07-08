/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import FileViewer from 'react-file-viewer';
import { notifier, sentenceCaps } from '../../../utilities/stringOperations';
import { get } from '../../../services/fetch';
import Loader from '../../../components/microComponents/loader';
import usePermission from '../../../components/hooks/usePermission';
import DisplayContent from './DisplayContent';

const ViewPlanning = ({ planning, engangementid, statusid }) => {
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
    <div className="card p-2">
      <h4 className="mb-4">Planning</h4>
      {typeof planning && planning === null
        ? (
          <>
            No Planning yet!
          </>
        )
        : (
          <>

            <dl className="row">
              <dt className="col-sm-3 text-truncate" title="combine risk assessment">{sentenceCaps('combine risk assessment')}</dt>
              <dd className="col-sm-9">
                {/* {planning?.combine_risk_assessment} */}
                <DisplayContent contents={planning?.combine_risk_assessment || 'dd'} />
              </dd>

              <dt className="col-sm-3">{sentenceCaps('control testing')}</dt>
              <dd className="col-sm-9">
                {/* <p>{planning?.control_testing}</p> */}
                <DisplayContent contents={planning?.control_testing || 'dd'} />
              </dd>

              <dt className="col-sm-3">{sentenceCaps('journal entries')}</dt>
              <dd className="col-sm-9">
                {/* {planning?.journal_entries} */}
                <DisplayContent contents={planning?.journal_entries || 'dd'} />
              </dd>

              <dt className="col-sm-3">{sentenceCaps('test details')}</dt>
              <dd className="col-sm-9">
                {/* {planning?.test_details} */}
                <DisplayContent contents={planning?.test_details || 'dd'} />
              </dd>

              <dt className="col-sm-3">{sentenceCaps('trial balance')}</dt>
              <dd className="col-sm-9">
                {/* {planning?.trial_balance} */}
                <DisplayContent contents={planning?.trial_balance || 'dd'} />
              </dd>

              <dt className="col-sm-3">i_t_risk_assessment</dt>
              <dd className="col-sm-9">
                {planning?.i_t_risk_assessment.map((it, i) => (
                  <>
                    <dl className="row">
                      <dt className="col-sm-4">Name</dt>
                      <dd className="col-sm-8">{it.name}</dd>
                    </dl>
                    <dl className="row">
                      <dt className="col-sm-4">Function</dt>
                      <dd className="col-sm-8">{it.function}</dd>
                    </dl>
                    <hr />
                  </>

                ))}

              </dd>
              <dt className="col-sm-3">{sentenceCaps('transaction class')}</dt>
              <dd className="col-sm-9">
                {planning?.transaction_class.map((it, i) => (
                  <>
                    <dl className="row">
                      <dt className="col-sm-4">Name</dt>
                      <dd className="col-sm-8">{it.name}</dd>
                    </dl>
                    <dl className="row">
                      <dt className="col-sm-4 text-truncate">{sentenceCaps('process flow document')}</dt>
                      <dd className="col-sm-8">
                        {/* {it.process_flow_document} */}
                        <DisplayContent contents={it?.process_flow_document || 'dd'} />
                      </dd>
                    </dl>
                    <hr />
                  </>

                ))}

              </dd>
              <dt className="col-sm-3">{sentenceCaps('materiality benchmark')}</dt>
              <dd className="col-sm-9">
                {planning?.materiality_benchmark.map((it, i) => (
                  <>
                    <dl className="row">
                      <dt className="col-sm-4">Amount</dt>
                      <dd className="col-sm-8">{it.amount}</dd>
                    </dl>
                    <dl className="row">
                      <dt className="col-sm-4">Reason</dt>
                      <dd className="col-sm-8">{it.reason}</dd>
                    </dl>
                    <hr />
                  </>

                ))}

              </dd>
              <dt className="col-sm-3">{sentenceCaps('material misstatement')}</dt>
              <dd className="col-sm-9">
                {/* {planning?.material_misstatement} */}
                <DisplayContent contents={planning?.material_misstatement || 'dd'} />
                {/* <FileViewer
                  fileType="jpg"
                  filePath={planning?.material_misstatement}
                /> */}
              </dd>
              <dt className="col-sm-3">{sentenceCaps('planning analytics')}</dt>
              <dd className="col-sm-9">
                {/* {planning?.planning_analytics} */}
                <DisplayContent contents={planning?.planning_analytics || 'dd'} />
              </dd>
            </dl>
            <div className="mt-5">
              {editEnganagment && (
              // eslint-disable-next-line no-nested-ternary
                status
                  ? <Loader text="Approving Planning" />
                  : statusid === '1'
                    ? <button type="button" className="btn btn-default mt-2" onClick={AcceptPlanning}>Approve</button>
                    : null

              ) }
              <div className="flex">
                <button
                  type="button"
                  className="btn btn-default mt-2 mr-2"
                  onClick={() => push(`/app/engagement/edit/class/${engangementid}`)}
                >
                  Edit Class

                </button>
                <button type="button" className="btn btn-default mt-2 mr-2">Edit Materiality</button>
                <button type="button" className="btn btn-default mt-2 mr-2">Edit Misc</button>
                <button type="button" className="btn btn-default mt-2">Edit Test</button>
              </div>

            </div>

          </>
        )}
    </div>
  );
};

export default ViewPlanning;
