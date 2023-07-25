/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { apiOptions, patch, post } from '../../../../services/fetch';
import useViewBoilerPlate from '../../../../components/hooks/useViewBoilerPlate';
import DragNDropTemp from '../../temps/newEngagement/DragNDropInputTemp';
import { executions } from '../../../../utilities/dummyData';
import CustomAccordion from '../../../../components/ui/customAccordion';
import { slugToString, sentenceCaps, notifier } from '../../../../utilities/stringOperations';
import TextareaInput from '../../../../components/form/inputs/TextareaInput';
import { headerTemp1 } from '../../../../components/temps/projectTemps/miscTemps';

const EditExecution = () => {
  /* redux hooks */
  const store = useSelector((state) => state.engagement?.engagement);
  const [state, setState] = useState({});
  /* router hooks */
  const { engagementId, engagementName } = useParams();
  /* state */
  const [formData, setFormData] = useState({ });
  const [statust, setStatus] = useState(false);

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
  //   const { engagement: { planning } } = formData;
  //   console.log('View Engangmentinfo ', planning);
  console.log(formData);
  const SubmitForm = async (e) => {
    e.preventDefault();
    setStatus(true);
    try {
      const data = await post({
        endpoint: 'ENGAGEMENT', auth: true, param: engagementId, afterParam: 'executions', body: state
      });
      console.log('Response ', data);
      notifier({
        title: 'Success Message',
        text: 'Execution updated successfully',
        type: 'success'
      });
    } catch (ex) {
      console.log(ex);
    }
    setStatus(false);
  };
  const loadfile = () => {
    setState({ ...formData?.engagement?.execution });
  };
  useEffect(() => {
    loadfile();
  }, [formData]);
  console.log(state);
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

                              {/* <DragNDropTemp
            formData={formData}
            setFormData={setFormData}
            // setErrors={setErrors}
            name="process_flow_document"
            label="Process Flow Document"
          />
           */}

                              {executions?.map((item, key) => (
                                <div key={item}>
                                  <div className="w-100 m-b-20 col-12 form-group">
                                    <label htmlFor={item} className="font-title-small text-theme">
                                      {' '}
                                      {item.split('_').join(' ')}
                                    </label>

                                    <textarea name={item} id={item} onChange={(e) => setState({ ...state, [item]: e.target.value })} value={state[item]} cols="30" rows="10" />

                                    {/* <TextareaInput
                                    value={formData.engagement.execution[item]}
                                  /> */}
                                    {' '}

                                  </div>
                                </div>
                              ))}
                              <button className="btn btn-default mt-2 mb-2" type="submit">{statust ? 'Updating Executions' : 'Update Executions'}</button>

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

export default EditExecution;
