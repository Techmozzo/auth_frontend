/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { last } from 'lodash';
import CustomCheckbox from '../../../../components/form/inputs/CustomCheckbox';
import { slugToString } from '../../../../utilities/stringOperations';
// import { assertions } from '../../../../utilities/dummyData';
import FormBuilder from '../../../../components/form/builders/form';
import planningProps from '../../constants/planningProps';
import DragNDropTemp from '../newEngagement/DragNDropInputTemp';
import useAssertions from '../../../../components/hooks/useAssertions';

const PlanningPTest = ({
  procedure, onProcedureChange
}) => {
  const { assertions, loading } = useAssertions();
  const handleNameChange = (event) => {
    const updatedProcedure = { ...procedure, name: event.target.value };
    onProcedureChange(updatedProcedure);
  };

  const handleDescriptionChange = (event) => {
    const updatedProcedure = { ...procedure, description: event.target.value };
    onProcedureChange(updatedProcedure);
  };

  const handleAssertionChange = (event, assertion) => {
    const { checked } = event.target;
    const updatedProcedure = {
      ...procedure,
      assertions: checked
        ? [...procedure.assertions, assertion]
        : procedure.assertions.filter((a) => a !== assertion)
    };
    onProcedureChange(updatedProcedure);
  };

  // useEffect(() => {
  //   console.log('Sertina ', formData);
  //   // setFormData({ apply_all_assertions: 0 });
  // }, []);
  // const addProcess = () => {
  //   const fun = () => setProcedures([...procedures, (last(procedures) + 1)]);
  //   // blurHandler();
  //   setTimeout(fun(), 500);
  // };
  // const handleChecked = (e) => {
  //   const { name, checked } = e.target;
  //   console.log(name);
  //   console.log(checked);
  //   // setFormData({ ...formData, procedures: { } });
  //   // updateState('procedures', 'new.url')
  //   // setP([...p,{}])
  // };

  // const handleChangex = (x) => {
  //   console.log(x.target.value);
  //   setData({ ...dataos, test_name: x.target.value });
  // };
  console.log(assertions);
  if (loading) {
    return <p>Loading Accessions</p>;
  }
  // const { data: { data: { assertions: assertionsin } } } = assertions;
  return (
    <>
      <div>
        {/* <div>DDD</div> */}

        <div className="d-flex wrap justify-content-between">

          <div>
            <FormBuilder
              formItems={
                planningProps(
                  {
                    formData: { test_name: procedure.name },
                    // handleBlur,
                    handleChange: handleNameChange
                    // errors
                  }
                ).test
              }
            />
            <DragNDropTemp
              formData={procedure.description}
              setFormData={(e) => {
                const updatedProcedure = { ...procedure, description: e.description };
                onProcedureChange(updatedProcedure);
              }}
              // setErrors={setErrors}
              name="description"
              label="Description"
            />
            {/* <div className="w-100 m-b-20 col-12 form-group">
              <label htmlFor="Procedure_Description">Procedure Description</label>
              <input
                id="Procedure"
                type="text"
                value={procedure.description}
                onChange={handleDescriptionChange}
                placeholder="Procedure Description"
              />
            </div> */}

            <div className="font-title-small text-theme">Assertions</div>
            <div className="d-flex wrap justify-content-between">
              {
                assertions && assertions?.map((itemm) => (
                  <div className="col-md-6" key={itemm.name}>
                    <div className="d-flex">
                      <CustomCheckbox
                        key={itemm.name}
                        label={slugToString(itemm.name)}
                        name={itemm.id}
                        // handleChecked={handleChecked}
                        className="w-100 neg-m-l-20 mt-4"
                        handleChecked={(event) => handleAssertionChange(event, itemm.id)}
                        checked={procedure.assertions.includes(itemm.id)}
                      />
                      <div className="neg-m-t-10">{slugToString(itemm.name)}</div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

        </div>

        {/* <button type="button" className="btn" onClick={handleAddProcedure}>Add Procedure</button> */}
      </div>
    </>
  );
};

export default PlanningPTest;
