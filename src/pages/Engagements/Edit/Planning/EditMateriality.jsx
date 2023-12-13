/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import CustomAccordion from '../../../../components/ui/customAccordion';
import FormBuilder from '../../../../components/form/builders/form';
import planningProps from '../../constants/planningProps';
import { index } from '../../../../utilities/auth';
import DragNDropTemp from '../../temps/newEngagement/DragNDropInputTemp';
import SliderSizes from '../../../../components/microComponents/slider';
import { slugToString } from '../../../../utilities/stringOperations';
import { apiOptions } from '../../../../services/fetch';
import useViewBoilerPlate from '../../../../components/hooks/useViewBoilerPlate';

const indexData = { ...JSON.parse(localStorage.getItem('index')) };
const materialrange = indexData.materialRange;
const EditMateriality = () => {
  const store = useSelector((state) => state.engagement?.engagement);

  const [formData, setFormData] = useState({ threshold_reason: 'wooow' });
  const [formDataa, setFormDataa] = useState({ threshold_reason: 'wooow' });
  const [errors, setErrors] = useState({ name: null });
  const [state, setState] = useState();
  const [currentPanel, setCurrentPanel] = useState(0);
  const { engagementId, engagementName } = useParams();

  const reason = (name) => `${name}_reason`;
  const selectedMaterialRange = materialrange
 && materialrange
   .filter((a) => String(a.id) === formData.materiality_benchmark_range_id)[0];
  console.log('Log ', index);
  console.log('SELECTED MATERIAL RANGE', selectedMaterialRange);
  console.log('FOrm Data ', formData);
  console.log('Error', errors);
  const SubmitForm = async (e) => {
    e.preventDefault();
  };

  /* boilerPlate hooks params */
  const options = {
    action: 'ENGAGEMENT',
    apiOpts: apiOptions({
      endpoint: 'ENGAGEMENT',
      auth: true,
      param: 1,
      method: 'get'
    })
  };

  /* boilerPlate hooks */
  const { status } = useViewBoilerPlate({
    setFormData: setFormDataa,
    formData: formDataa,
    store,
    options
  });

  const loadfile = () => {
    setState({ ...formDataa?.engagement?.execution });
  };
  useEffect(() => {
    loadfile();
  }, [formDataa]);
  console.log('FOrm Dataa', formDataa?.engagement?.planning);
  return (
    <div className="w-750 ">

      <div className="box-shadow ">
        <div className="pt-5">
          <div className="d-flex wrap justify-content-between">
            <div className="margin-auto w-100 px-5">
              <form onSubmit={SubmitForm}>
                <div className="px-3">

                  <CustomAccordion
                    data={{
                      name: 'Materiality Benchmark',
                      details: (
                        <div>
                          <FormBuilder
                            formItems={
                              planningProps(
                                {
                                  formData,
                                  // handleBlur,
                                  handleChange: (e) => setFormData({ ...formData, [e.target.name]: e.target.value }),
                                  errors
                                }
                              ).materiality
                            }
                          />
                        </div>
                      )
                    }}
                    setCurrentPanel={setCurrentPanel}
                    currentPanel={currentPanel}
                    panel={1}
                  />
                  <CustomAccordion
                    data={{
                      name: 'Materiality',
                      details: (
                        <div>
                          {
                            index?.materialLevels?.map((item) => (
                              <div key={item.name}>
                                <SliderSizes
                                  max={item.upper_limit}
                                  min={item.lower_limit}
                                  overallmax={
                                    selectedMaterialRange && selectedMaterialRange.upper_limit
                                  }
                                  overallmin={
                                    selectedMaterialRange && selectedMaterialRange.lower_limit
                                  }
                                  formData={formData}
                                  levelId={item.id}
                                  setFormData={setFormData}
                                  label={slugToString(item.name)}
                                  name={item.name}
                                  props={{
                                    errors,
                                    setErrors,
                                    placeholder: 'Enter Amount'
                                  }}
                                />

                                <DragNDropTemp
                                  formData={formData}
                                  setFormData={setFormData}
                                  setErrors={setErrors}
                                  name={reason(item.name)}
                                  label="Purpose"
                                />
                              </div>
                            ))
                          }
                        </div>
                      )
                    }}
                    setCurrentPanel={setCurrentPanel}
                    currentPanel={currentPanel}
                    panel={2}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMateriality;
