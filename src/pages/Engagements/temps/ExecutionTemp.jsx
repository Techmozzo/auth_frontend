/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { last } from 'lodash';
import { BsArrowsCollapse } from 'react-icons/bs';
import { GiExpand } from 'react-icons/gi';
import { MdDone } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { notifier, slugToString, stringDoesNotExist } from '../../../utilities/stringOperations';
import CustomAccordion from '../../../components/ui/customAccordion';
import DragNDropTemp from './newEngagement/DragNDropInputTemp';
import { executions } from '../../../utilities/dummyData';
import useViewBoilerPlate from '../../../components/hooks/useViewBoilerPlate';
import { apiOptions, get, post } from '../../../services/fetch';
import CustomCheckbox from '../../../components/form/inputs/CustomCheckbox';

const ExecutionTemp = ({
  formData, setFormData, handleChange, errors, handleBlur, setErrors, blurHandler
}) => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [currentPanel1, setCurrentPanel1] = useState(50);
  const [procedures, setProcedures] = useState([1]);
  const [isSuccess, setisSuccess] = useState(false);
  const name = (item) => `Assessment ${item}`;

  const addProcess = () => {
    const fun = () => setProcedures([...procedures, (last(procedures) + 1)]);
    blurHandler();
    if (
      stringDoesNotExist(formData.name)
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

  return (
    <div className="w-750 ">

      <div className="box-shadow ">
        <div className="pt-5">
          <div className="d-flex wrap justify-content-between">
            <div className="margin-auto w-100 px-5">
              <div className="px-3">
                <div>
                  {/* <ProcedureForm /> */}
                  {/* <div>
                    <label htmlFor="">
                      <input type="checkbox" name="" id="" />
                      {' '}
                      Assertion name
                    </label>

                    <input type="text" placeholder="Other Info" name="other_info" />
                  </div> */}
                  <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <CustomAccordion
                      data={{
                        name: 'Procedure',
                        details: (
                          <Prod setisSuccess={setisSuccess} />
                        )
                      }}
                      // setCurrentPanel={setCurrentPanel}
                      // currentPanel={currentPanel}
                      // panel="2323"
                      expand={stringDoesNotExist(formData.dd)
                        ? <GiExpand /> : <MdDone className="text-theme" />}
                      collapse={<BsArrowsCollapse />}
                    />

                  </div>

                  {isSuccess
                    && executions?.map((item, key) => (
                      <div key={item}>
                        <CustomAccordion
                          data={{
                            name: slugToString(item),
                            details: (
                              <DragNDropTemp
                                formData={formData}
                                setFormData={setFormData}
                                setErrors={setErrors}
                                name={item}
                                // label={slugToString(item)}
                                handleBlur={blurHandler}
                              />
                            )
                          }}
                          setCurrentPanel={setCurrentPanel}
                          currentPanel={currentPanel}
                          panel={key}
                          expand={stringDoesNotExist(formData[item])
                            ? <GiExpand /> : <MdDone className="text-theme" />}
                          collapse={<BsArrowsCollapse />}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Prod = ({ setisSuccess }) => {
  const store = useSelector((state) => state.engagement?.engagement);
  const [classes, setClasses] = useState([
  ]);
  const [statust, setStatus] = useState(false);

  const [formData, setFormData] = React.useState({});
  const options = {
    action: 'ENGAGEMENTS',
    apiOpts: apiOptions({
      endpoint: 'ENGAGEMENTS',
      auth: true,
      method: 'get'
    })
  };
  const {
    view, status
  } = useViewBoilerPlate({
    setFormData,
    formData,
    store,
    options
  });
  const [formDatax, setFormDatax] = useState([]);

  const handleFormSubmit = async () => {
    const isFormDataValid = formDatax.every(
      (data) => data.assertions.length > 0
        && data.other_info.trim().length > 0
        && (typeof data.id === 'number' && data.id !== null && data.id !== undefined || (typeof data.id === 'string' && data.id.trim().length > 0))
    );

    if (isFormDataValid) {
      // Perform any desired action with the form data
      console.log('Form Data:', formDatax);

      try {
        setStatus(true);

        const datax = await post({ endpoint: 'PROCEDURES', auth: true, body: { procedures: formDatax } });
        console.log('Success ', datax);
        if (datax.status === 201) {
          setisSuccess(true);
          notifier({
            type: 'success',
            text: 'Major Procedure Added Please Continue',
            title: 'Success'
          });
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
    } else {
      console.log('Form data is not available yet.');
      notifier({
        type: 'error',
        text: 'Invalid form data.',
        title: 'Error'
      });
    }
  };

  const handleProcedureChange = (index, updatedFormData) => {
    setFormDatax((prevFormData) => {
      const updatedData = [...prevFormData];
      updatedData[index] = updatedFormData;
      return updatedData;
    });
  };

  if (status) {
    const { engagement } = formData && formData;
    // const { planning } = engagement;

    const plan = engagement?.planning?.transaction_class;

    return (
      <>
        {plan && plan.map((tc, classIndex) => (
          <div key={tc.id}>
            <p className="font-title-small text-theme">{tc.name}</p>
            {tc && tc?.procedures.map((tp, procedureIndex) => (
              <ProcedureForm
                procedure={tp}
                assertionss={tp.assertions}
                onProcedureChange={(updatedFormData) => handleProcedureChange(procedureIndex, updatedFormData)}
              />
            ))}

          </div>
        ))}
        <button type="button" disabled={statust} onClick={handleFormSubmit}>{statust ? 'Submitting' : 'Add Procedure'}</button>
      </>
    );
  }

  return null;
};

const ProcedureForm = ({
  procedure, onProcedureChange
}) => {
  const [formState, setFormState] = useState({ assertions: procedure?.assertions, other_info: procedure?.other_info, id: procedure?.id });
  const [selectedAssertions, setSelectedAssertions] = useState(
    procedure?.assertions
      .filter((assertion) => Number(assertion.value) === 1)
      .map((assertion) => assertion.procedure_assertion_id) || []
  );

  const handleOtherInfo = (event) => {
    const { value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      other_info: value
    }));
  };

  const handleAssertionChange = (assertionId) => {
    setSelectedAssertions((prevSelectedAssertions) => {
      if (prevSelectedAssertions.includes(assertionId)) {
        return prevSelectedAssertions.filter((id) => id !== assertionId);
      }
      return [...prevSelectedAssertions, assertionId];
    });
  };

  useEffect(() => {
    const updatedFormData = {
      ...formState,
      assertions: selectedAssertions
    };
    onProcedureChange(updatedFormData);
  }, [formState, selectedAssertions]);

  return (
    <div>
      <div className="w-100 m-b-20 col-12 form-group">
        <label htmlFor="other_info" className="font-title-small text-theme"> Other Info </label>
        <input
          id="other_info"
          type="text"
          value={formState.other_info}
          onChange={handleOtherInfo}
          placeholder="Other Info"
        />
      </div>

      <div className="font-title-small text-theme">Assertions</div>
      <div className="d-flex wrap justify-content-between">

        {formState.assertions.map((assertion) => (
          <div className="col-md-6" key={assertion.id}>
            <div className="d-flex">
              <CustomCheckbox
                key={assertion.id}
                label={slugToString(assertion.name)}
                name={assertion.name}
                // handleChecked={handleChecked}
                className="w-100 neg-m-l-20 mt-4"
                handleChecked={(event) => handleAssertionChange(assertion.procedure_assertion_id)}
                checked={selectedAssertions.includes(assertion.procedure_assertion_id)}
              />
              <div className="neg-m-t-10">{slugToString(assertion.name)}</div>
            </div>
          </div>
          // <label key={assertion.id}>
          //   <input
          //     type="checkbox"
          //     checked={selectedAssertions.includes(assertion.procedure_assertion_id)}
          //     onChange={() => handleAssertionChange(assertion.procedure_assertion_id)}
          //   />
          //   {assertion.name}
          //   {/* {assertion.value} */}
          // </label>
        ))}
      </div>
    </div>
  );
};

export default ExecutionTemp;
