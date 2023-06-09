import React, {
  useEffect, useCallback, useState, useMemo
} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import addDays from 'date-fns/addDays';
import Moment from 'moment';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import FormBuilder from '../../components/form/builders/form';
import { validateField } from '../../utilities/validation';
import { camelToString, notifier, stringDoesNotExist } from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';
import { title } from './constants/startProject1Props';
import {
  createProject,
  createProjectName
} from '../../redux/actions/projectActions';
import ModalTemplate from '../../components/temps/modalTemps/temp';
import CollapsedBreadcrumbs from '../../layouts/Breadcrumb';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Init = ({ setAccordionTab, setData }) => {
  const history = useHistory();

  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project.initProject);
  /* state */
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [proceed, setProceed] = useState(false);

  useEffect(() => {
    if (store?.status === 'failed') {
      // setShow(true);
      notifier({
        type: 'error',
        title: 'Initialisation Failed',
        text: store?.message
          || store?.data
          || 'The project failed to initialise, try this process again below'
      });
    }
    if (store?.status === 'success') {
      notifier({
        type: 'success',
        title: 'Progress Saved',
        text: 'Your project has been recorded'
      });
      history.push(`/project/create/form-1/${store?.data?.data?.id}/${store?.data?.data?.title}`);
    }
  }, [store?.status]);

  const handleSaveProgress = () => {
    if (!stringDoesNotExist(formData.title)) {
      dispatch(createProjectName({
        ...formData
      }));
    }
  };
  const handleChange = (e) => {
    const {
      name, value
    } = e?.target;
    setFormData((state) => ({
      ...state,
      [name]: value
    }));
    return handleProgress(value);
  };

  const handleProgress = (name) => {
    setProceed(!stringDoesNotExist(name));
  };

  const debouncedChangeHandler = () => debounce((name) => handleProgress(name), 500);
  const handleBlur = (e, validations) => {
    const { name, value } = e.target;
    const field = camelToString(name);

    if (typeof field !== 'undefined') {
      setErrors(
        {
          ...errors,
          [name]: (
            validateField(validations, field, value)
          )
        }
      );
    }
  };

  const removeAtIndex = (item) => {
    const fileCopy = [...formData.file];
    const index = fileCopy.indexOf(item);
    fileCopy.splice(index, 1);
    setFormData({ ...formData, file: [...fileCopy] });
  };
  return (
    <div className="content">
      <div className="row">
        <CollapsedBreadcrumbs max={2} current="Project name" />
      </div>
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20 bg-light">
          <div className="login-form pb-5h">

            <div>
              <div className="text-wema">
                <p className="font-bold">Begin a new project</p>
                <p>Give your project a befitting headline</p>
              </div>
              <hr />
            </div>

            <div>
              <FormBuilder
                formItems={
                  title(
                    {
                      formData,
                      removeItem: removeAtIndex,
                      handleBlur,
                      handleChange,
                      btnMethod: () => setFormData({ ...formData, title: '' }),
                      loading: { status: store?.status, text: 'initializing your project' },
                      errors
                    }
                  )
                }
              />

            </div>

            <div className="mb-5">

              <div className="float-right">
                <button
                  title="save and continue"
                  className="btn-plain text-wema border-wema hover-wema mr-md-1 btn-small"
                  type="button"
                  disabled={!proceed || store?.status === 'pending' || store?.status === 'success'}
                  onClick={handleSaveProgress}
                >
                  <span className="pr-1">Proceed </span>
                  {/* { proceed && formData.title } */}
                </button>
              </div>
            </div>

            {/* <Modal */}
            {/*  className={show ? 'max-w-400 right top' : 'max-w-400 right top off'} */}
            {/*  content={( */}
            {/*    <ModalTemplate */}
            {/*      status={store?.status} */}
            {/*      data={store?.data?.data} */}
            {/*      handleClose={handleClose} */}
            {/*      setShow={setShow} */}
            {/*      text={text()} */}
            {/*    /> */}
            {/*  )} */}
            {/* /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Init;
