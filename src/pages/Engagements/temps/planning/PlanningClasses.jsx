import React, { useEffect, useState } from 'react';
import { filter } from 'lodash';
import uuid from 'react-uuid';
import { AiOutlineDelete } from 'react-icons/ai';
import FormBuilder from '../../../../components/form/builders/form';
import CustomAccordion from '../../../../components/ui/customAccordion';
import { checkRequiredFields } from '../../../../utilities/validation';
import planningProps from '../../constants/planningProps';
import DragNDropTemp from '../newEngagement/DragNDropInputTemp';
import { notifier, stringCaps } from '../../../../utilities/stringOperations';
// eslint-disable-next-line import/no-cycle
import PlanningTests from '../../planning/PlanningTests';
import PlanningPTest from './PlanningPTest';

const PlanningClasses = ({
  formData, setFormData, handleChange, errors, setErrors,
  handleBlur, currentPanel, setCurrentPanel, status, message, link, classes
}) => {
  const [engagementClasses, setEngagementClasses] = useState([]);
  const [submittable, setSubmittable] = useState(false);
  const [formSub, setFormSub] = useState([]);

  useEffect(() => {
    setSubmittable(checkRequiredFields([
      formData?.process_flow_document,
      formData?.name
    ]));
  }, [formData]);

  useEffect(() => {
    if (status === 'failed') {
      notifier({
        text: 'at least a class must be added and the trial balance field must be filled.',
        title: stringCaps(status),
        type: 'error'
      });
    }
  }, [status]);

  useEffect(() => {
    setFormData({
      ...formData,
      classes: engagementClasses
    });
  }, [engagementClasses]);

  const addSub = () => {
    setEngagementClasses([
      ...engagementClasses,
      {
        name: formData.name,
        process_flow_document: formData.process_flow_document
      }
    ]);
    // setFormData({
    //   ...formData,
    //   process_flow_document: '',
    //   name: ''
    // });

    setFormData((prevStreamData: any) => ({
      ...prevStreamData,
      process_flow_document: '',
      name: ''
    }));
  };
  const removeItem = (e, item) => {
    e.stopPropagation();
    const newArr = filter(engagementClasses, (sub) => sub !== item);
    setEngagementClasses(newArr);
  };

  // console.log('Fast ', formData);
  // console.log(engagementClasses);
  const updateState = (propertyPath, newValue) => {
    setFormSub((prevState) => {
      const newState = { ...prevState };
      const properties = propertyPath.split('.');
      let current = newState;

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < properties.length - 1; i++) {
        current = current[properties[i]];
      }

      current[properties[properties.length - 1]] = newValue;

      return newState;
    });
  };
  return (
    <div className="">
      <CustomAccordion
        data={
          {
            name: 'Transaction Class',
            details: (
              <div className="">
                {
                  engagementClasses.map((item, index) => (
                    <div className="px-5" key={uuid()}>
                      <div className="justify-content-between d-flex wrap">
                        <div className="text-theme-blue">
                          {item.name}
                        </div>
                        <div className="">
                          <button type="button" onClick={(e) => removeItem(e, item)} className="btn-del border-radius-5 text-white">
                            <AiOutlineDelete />
                          </button>
                        </div>
                      </div>
                      <div>
                        <p>Process Flow Document</p>
                        <p>{item.process_flow_document}</p>
                      </div>

                    </div>
                  ))

                }
                <div className="">
                  <div>
                    <label htmlFor="classes">Select Class</label>
                    <select name="" id="classes" className="w-100 m-b-20 col-12 form-group">
                      <option value="">d</option>
                      {classes && classes.map((e) => (
                        <option key={`${e}_1`} value={e}>{e}</option>
                      ))}
                    </select>
                  </div>

                  <FormBuilder
                    formItems={
                      planningProps(
                        {
                          formData,
                          handleBlur,
                          handleChange,
                          errors
                        }
                      ).planning
                    }
                  />
                  <div className="px-2">
                    <DragNDropTemp
                      formData={formData}
                      setFormData={setFormData}
                      setErrors={setErrors}
                      name="process_flow_document"
                      label="Process Flow Document"
                    />
                  </div>
                  <div className="px-2">
                    <DragNDropTemp
                      formData={formData}
                      setFormData={setFormData}
                      setErrors={setErrors}
                      name="work_through"
                      label="Work Through"
                    />
                  </div>
                  <div>
                    <PlanningPTest
                      formData={formData}
                      setFormData={setFormData}
                      setErrors={setErrors}
                      updateState={updateState}
                      // handleChecked={handleChecked}
                    />
                  </div>
                </div>
                <div>
                  {/* disabled={!submittable} */}
                  <button type="button" disabled={!submittable} onClick={addSub} className="simple-hover btn text-white">Add Class</button>
                </div>
              </div>
            )
          }
        }
        panel={2}
        currentPanel={currentPanel}
        setCurrentPanel={setCurrentPanel}
      />
    </div>
  );
};
export default PlanningClasses;
