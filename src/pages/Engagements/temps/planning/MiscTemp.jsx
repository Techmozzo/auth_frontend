/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { last } from 'lodash';
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
import { notifier, slugToString, stringDoesNotExist } from '../../../../utilities/stringOperations';
import { CheckboxField } from '../../../../components/form/inputs/Checkbox';
import { assertions, miscTests } from '../../../../utilities/dummyData';
import { QuillEditor } from '../../../../components/ui/richText';

const MiscTemp = ({
  formData, setFormData, handleChange, errors, handleBlur, setErrors, blurHandler
}) => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [currentPanel1, setCurrentPanel1] = useState(50);
  const [procedures, setProcedures] = useState([1]);
  const [itentity, setItEntity] = useState('');
  const name = (item) => `Assessment ${item}`;
  console.log(formData);
  const addProcess = () => {
    const fun = () => setProcedures([...procedures, (last(procedures) + 1)]);
    blurHandler();
    if (
      stringDoesNotExist(formData.IT_name)
      || stringDoesNotExist(formData.function) || stringDoesNotExist(formData.review_performed)
    ) {
      return notifier({
        text: 'You have to fill every field in this form before adding a new entry',
        title: 'Unfilled/Incomplete Form',
        type: 'info'
      });
    }
    return setTimeout(fun(), 500);
  };

  const OnChange = (e) => {
    e.preventDefault();
    setItEntity(e.target.value);
    console.log(e.target.value);
    setFormData({ ...formData, risk_assessment_status: e.target.value });
  };
  console.log(itentity);
  return (
    <div className="w-750 ">

      <div className="box-shadow ">
        <div className="pt-5">
          <div className="d-flex wrap justify-content-between">
            <div className="margin-auto w-100 px-5">
              <div className="px-3">

                <CustomAccordion
                  data={{
                    name: 'Tests, Assessments, and Entries',
                    details: (
                      <div>
                        {
                          miscTests?.map((item, key) => (
                            <div key={item}>
                              <DragNDropTemp
                                formData={formData}
                                setFormData={setFormData}
                                setErrors={setErrors}
                                name={item}
                                label={slugToString(item)}
                                handleBlur={blurHandler}
                              />
                            </div>
                          ))
                        }
                      </div>
                    )
                  }}
                  setCurrentPanel={setCurrentPanel}
                  currentPanel={currentPanel}
                  panel={1}
                />
              </div>
              <div className="px-3">
                <CustomAccordion
                  data={{
                    name: 'IT Risk Assessment',
                    details: (
                      <div>
                        <div>
                          <p>Does the entity have any IT system</p>
                          <label>
                            <input type="radio" name="it_risk" onClick={OnChange} checked={itentity === 'yes'} value="yes" id="" />
                            {' '}
                            Yes
                            {' '}
                            <input type="radio" name="it_risk" id="" onClick={OnChange} checked={itentity === 'no'} value="no" />
                            {' '}
                            No
                          </label>

                        </div>
                        {/* {formData?.risk_assessments?.map((item, key) => (
                          <div key={item.name}>
                            <CustomAccordion
                              data={{
                                name: name((key + 1)),
                                details: (
                                  <div>
                                    <FormBuilder
                                      formItems={
                                        planningProps(
                                          {
                                            formData,
                                            handleBlur,
                                            handleChange,
                                            errors,
                                            val: { name: item.name, function: item.function }
                                          }
                                        ).misc2
                                      }
                                    />
                                    <div>
                                      <QuillEditor theme="bubble" value={item.review_performed} />
                                    </div>
                                  </div>
                                )
                              }}
                              setCurrentPanel={setCurrentPanel1}
                              currentPanel={currentPanel1}
                              panel={key + 51}
                            />
                          </div>
                        ))} */}
                        {itentity && itentity === 'yes'
                          ? (
                            <div>
                              {/* <CustomAccordion
                                data={{
                                  name: 'New Assessment',
                                  details: ( */}
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
                                    ).misc
                                  }
                                />
                                <DragNDropTemp
                                  formData={formData}
                                  setFormData={setFormData}
                                  setErrors={setErrors}
                                  name="review_performed"
                                  label="Reviews Performed"
                                  handleBlur={blurHandler}
                                />
                              </div>
                              {/* <button type="button" className="btn mt-4" onClick={addProcess}>Add Procedure</button> */}
                              {/* )
                                }}
                                setCurrentPanel={setCurrentPanel1}
                                currentPanel={currentPanel1}
                                panel={formData.risk_assessments?.length + 100}
                              /> */}
                            </div>
                          )
                          : null}

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
export default MiscTemp;
