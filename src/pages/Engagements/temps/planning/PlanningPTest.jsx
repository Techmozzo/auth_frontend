import React, { useEffect, useState } from 'react';
import { last } from 'lodash';
import CustomCheckbox from '../../../../components/form/inputs/CustomCheckbox';
import { slugToString } from '../../../../utilities/stringOperations';
import { assertions } from '../../../../utilities/dummyData';
import FormBuilder from '../../../../components/form/builders/form';
import planningProps from '../../constants/planningProps';
import DragNDropTemp from '../newEngagement/DragNDropInputTemp';

const PlanningPTest = ({
  formData, setFormData, setErrors, handleChange, updateState
}) => {
  const [procedures, setProcedures] = useState([1]);
  const [p, setP] = useState([]);
  const [dataos, setData] = useState({ test_name: '' });
  useEffect(() => {
    console.log('Sertina ', formData);
    // setFormData({ apply_all_assertions: 0 });
  }, []);
  const addProcess = () => {
    const fun = () => setProcedures([...procedures, (last(procedures) + 1)]);
    // blurHandler();
    setTimeout(fun(), 500);
  };
  const handleChecked = (e) => {
    const { name, checked } = e.target;
    console.log(name);
    console.log(checked);
    // setFormData({ ...formData, procedures: { } });
    // updateState('procedures', 'new.url')
    // setP([...p,{}])
  };

  const handleChangex = (x) => {
    console.log(x.target.value);
    setData({ ...dataos, test_name: x.target.value });
  };

  return (
    <>
      <div>
        {/* <div>DDD</div> */}

        <div className="d-flex wrap justify-content-between">
          {
            procedures?.map((item, key) => (
              <div key={item}>
                <FormBuilder
                  formItems={
                    planningProps(
                      {
                        formData: { test_name: dataos.test_name },
                        // handleBlur,
                        handleChange: handleChangex
                        // errors
                      }
                    ).test
                  }
                />
                <DragNDropTemp
                  formData={formData}
                  setFormData={setFormData}
                  setErrors={setErrors}
                  name="description"
                  label="Description"
                //   handleBlur={blurHandler}
                />

                <div className="font-title-small text-theme">Assertions</div>
                <div className="d-flex wrap justify-content-between">
                  {
                    assertions?.map((itemm) => (
                      <div className="col-md-6" key={itemm.name}>
                        <div className="d-flex">
                          <CustomCheckbox
                            key={itemm.name}
                            label={slugToString(itemm.name)}
                            name={itemm.id}
                            handleChecked={handleChecked}
                            className="w-100 neg-m-l-20 mt-4"
                            // checked={formData[itemm.name]}
                          />
                          <div className="neg-m-t-10">{slugToString(itemm.name)}</div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>

        <button type="button" className="btn" onClick={addProcess}>Add Procedure</button>
      </div>
    </>
  );
};

export default PlanningPTest;
