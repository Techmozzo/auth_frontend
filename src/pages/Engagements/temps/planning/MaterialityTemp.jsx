import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import FormBuilder from '../../../../components/form/builders/form';
import DragNDropTemp from '../newEngagement/DragNDropInputTemp';
import PlanningClasses from './PlanningClasses';
import userProps from '../../constants/usersProps';
import NewEngagementTemp from '../newEngagement/NewEngagementTemp';
import SliderSizes from '../../../../components/microComponents/slider';
import CustomAccordion from '../../../../components/ui/customAccordion';
import Creatable from '../../../../components/form/inputs/Creatable';
import planningProps from '../../constants/planningProps';
import { index } from '../../../../utilities/auth';
import { slugToString } from '../../../../utilities/stringOperations';

const indexData = { ...JSON.parse(localStorage.getItem('index')) };
const materialrange = indexData.materialRange;
const MaterialityTemp = ({
  formData, setFormData, handleChange, errors, handleBlur, setErrors,
  create, status, link, message
}) => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [show, setShow] = useState(false);

  const reason = (name) => `${name}_reason`;
  const selectedMaterialRange = materialrange
 && materialrange
   .filter((a) => String(a.id) === formData.materiality_benchmark_range_id)[0];
  // console.log('FData ', formData);
  // console.log('Range ', selectedMaterialRange.lower_limit);
  return (
    <div className="w-750 ">

      <div className="box-shadow ">
        <div className="pt-5">
          <div className="d-flex wrap justify-content-between">
            <div className="margin-auto w-100 px-5">
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
                                handleBlur,
                                handleChange,
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
                                  errors, setErrors, placeholder: 'Enter Amount'
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MaterialityTemp;
