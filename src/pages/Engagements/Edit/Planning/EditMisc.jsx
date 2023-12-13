/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MiscTemp from '../../temps/planning/MiscTemp';
import useClasses from '../../../../components/hooks/useClasses';
import { apiOptions, patch } from '../../../../services/fetch';
import useCreateBoilerPlate from '../../../../components/hooks/useCreateBoilerPlate';
import { stringDoesNotExist, sentenceCaps, notifier } from '../../../../utilities/stringOperations';
import useViewBoilerPlate from '../../../../components/hooks/useViewBoilerPlate';
import { miscTests } from '../../../../utilities/dummyData';
import FormBuilder from '../../../../components/form/builders/form';
import planningProps from '../../constants/planningProps';
import DragNDropTemp from '../../temps/newEngagement/DragNDropInputTemp';

import { headerTemp1 } from '../../../../components/temps/projectTemps/miscTemps';

const EditMisc = () => {
  const { engagementId, engagementName } = useParams();
  /* redux hooks */
  const store = useSelector((state) => state.engagement?.engagement);
  const [formData, setFormData] = useState({ });
  const [statust, setStatus] = useState(false);
  const [state, setState] = useState({});
  const [itentity, setItEntity] = useState('1');
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

  const loadfile = () => {
    setState({ ...formData?.engagement?.planning });
  };
  useEffect(() => {
    loadfile();
  }, [formData]);
  console.log(state);
  const OnChange = (e) => {
    e.preventDefault();
    setItEntity(e.target.value === 'yes' ? '1' : '0');
    console.log(e.target.value);
    setFormData({ ...formData, risk_assessment_status: e.target.value === 'yes' ? '1' : '0' });
  };
  const SubmitForm = async (e) => {
    e.preventDefault();
    setStatus(true);
    try {
      console.log('time ', { ...state, risk_assessments: { ...state.i_t_risk_assessment } });
      const data = await patch({
        endpoint: 'MATERIALITY', auth: true, param: engagementId, body: { ...state, i_t_risk_assessment: { ...state.i_t_risk_assessment, name: state?.i_t_risk_assessment?.name } }
      });
      console.log('End ', data);
      notifier({
        title: 'Success Message',
        text: 'Planning Misc updated successfully',
        type: 'success'
      });
    } catch (ex) {
      console.log(ex);
    }
    setStatus(false);
  };

  return (
    <div className="row">
      <div className="col-md-10">
        {
          headerTemp1({
            text: 'Execution',
            parent: 'Engagements',
            name: sentenceCaps(engagementName),
            link: '/app/engagement/',
            link1: `/app/engagement/view/${engagementId}`
          })
        }
        <div className="content">
          <div className="">
            <div className="mb-4 font-title-small mb-4">
              <div className="w-750 ">

                <div className="box-shadow ">
                  <div className="pt-5">
                    <div className="d-flex wrap justify-content-between">
                      <div className="margin-auto w-100 px-5">
                        <div className="px-3">
                          <form onSubmit={SubmitForm}>
                            <div className="px-2">
                              {
                                miscTests?.map((item, key) => (
                                  <div key={item}>
                                    <div className="w-100 m-b-20 col-12 form-group">
                                      <label htmlFor={item} className="font-title-small text-theme">
                                        {' '}
                                        {item.split('_').join(' ')}
                                      </label>
                                      <textarea name={item} id={item} onChange={(e) => setState({ ...state, [item]: e.target.value })} value={state[item]} cols="30" rows="10" />
                                    </div>
                                    {/* <DragNDropTemp
                formData={formData}
                setFormData={setFormData}
                setErrors={setErrors}
                name={item}
                label={slugToString(item)}
                handleBlur={blurHandler}
              /> */}
                                  </div>
                                ))
                              }
                            </div>

                            <div>
                              <div>
                                <p>Does the entity have any IT system</p>
                                <label>
                                  <input type="radio" name="it_risk" onClick={OnChange} checked={itentity === '1'} value="yes" id="" />
                                  {' '}
                                  Yes
                                  {' '}
                                  <input type="radio" name="it_risk" id="" onClick={OnChange} checked={itentity === '0'} value="no" />
                                  {' '}
                                  No
                                </label>

                              </div>

                              {itentity && itentity === '1'
                                ? (
                                  <div>

                                    <div>
                                      <FormBuilder
                                        formItems={
                                          planningProps(
                                            {
                                              formData: { ...state?.i_t_risk_assessment, name: state?.i_t_risk_assessment?.name },
                                              handleChange: (e) => setState({ ...state, i_t_risk_assessment: { ...state?.i_t_risk_assessment, [e.target.name]: e.target.value } })
                                              // handleBlur,
                                              // handleChange,
                                              // errors
                                            }
                                          ).misc
                                        }
                                      />

                                      <div className="w-100 m-b-20 col-12 form-group">
                                        <label htmlFor="review_performed" className="font-title-small text-theme">  Review Performed </label>
                                        <textarea name="review_performed" id="review_performed" onChange={(e) => setState({ ...state, i_t_risk_assessment: { ...state?.i_t_risk_assessment, review_performed: e.target.value } })} value={state?.i_t_risk_assessment?.review_performed} cols="30" rows="10" />

                                      </div>
                                      <button className="btn btn-default mt-2 mb-2" type="submit">{statust ? 'Updating Misc' : 'Update Misc'}</button>

                                    </div>

                                  </div>
                                )
                                : null}

                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMisc;
