/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import FileViewer from 'react-file-viewer';
import DocViewer from 'react-doc-viewer';
import { useDispatch, useSelector } from 'react-redux';
import { isFunction } from 'lodash';
import FormBuilder from '../../../../components/form/builders/form';
import DragNDropTemp from '../newEngagement/DragNDropInputTemp';
import PlanningClasses from './PlanningClasses';
import userProps from '../../constants/usersProps';
import NewEngagementTemp from '../newEngagement/NewEngagementTemp';
import DragNDropFileInput from '../../../../components/form/inputs/fileInput/DragNDropFileInput';
import { uploadMedia } from '../../../../redux/actions/projectActions';
import useStoreParams from '../../../../components/hooks/useStoreParams';
import Loader from '../../../../components/microComponents/loader';

const name = 'trial_balance';
const route = 'TRIAL_UPLOAD';
const PlanningTemp = ({
  formData, setFormData, handleChange, errors, handleBlur, setErrors,
  create, status, link, message
}) => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [currentPanel, setCurrentPanel] = useState(0);
  const [initialData, setInitialData] = useState({});
  const [uploaded, setUploaded] = useState(false);
  const [show, setShow] = useState(false);
  const [newClasses, setClasses] = useState([]);
  const store = useSelector((state) => state?.engagement?.uploads);

  const {
    status: Uploadstat, data, backErrors
  } = useStoreParams(store);

  useEffect(() => {
    setInitialData(formData);
  }, []);
  console.log('Form ', formData);
  const uploadMediaFail = () => {
    setUploaded(false);
    setErrors(backErrors);
    // pushUpdates([
    //   {
    //     data,
    //     action: 'UPLOAD_MEDIA_COMPLETE'
    //   }
    // ], dispatch);
    // return notifier({
    //   title: 'Download Failed',
    //   text: message,
    //   type: 'info'
    // });
  };

  const uploadMediaSuccess = () => {
    setUploaded(true);
    // console.log(data.url);
    // setFormData({
    //   ...formData,
    //   [data.name]: data.url,
    //   [name]: data.url
    // });
    console.log('Data', data);
    setClasses(data.classes);
    setFormData((prevStreamData: any) => ({
      ...prevStreamData,
      [name]: data.url
    }));
    // isFunction(handleBlur) && handleBlur();
  };

  useEffect(() => {
    console.log(Uploadstat);
    switch (Uploadstat) {
    case 'failed':
      return uploadMediaFail();
    case 'success':

      return uploadMediaSuccess();
    default:
      setUploaded(false);
    }
    return Uploadstat;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Uploadstat]);
  const handleData = (files) => {
    setShow(true);
    files.map((file) => dispatch(
      uploadMedia(
        {
          file, setProgress, name, route
        }
      )
    ));
    setShow(false);
  };

  return (
    <div className="w-600 ">

      <div className="box-shadow ">
        <div className="pt-5">
          <div className="d-flex wrap justify-content-between">
            <div className="margin-auto w-100 px-5">
              <div className="px-3">
                {/* {console.log(formData?.trial_balance)} */}
                {/* <DocViewer documents={[formData?.trial_balance]} /> */}
                {/* <DragNDropTemp
                  formData={formData}
                  setFormData={setFormData}
                  setErrors={setErrors}
                  name="trial_balance"
                  label="Compose/Upload Trial Balance"
                /> */}
                <label htmlFor="trial_balance">Compose/Upload Trial Balance</label>
                <DragNDropFileInput
                  name="trial_balance"
                  handleData={handleData}
                  label="Compose/Upload Trial Balance"
                  uploaded={status}
                />

              </div>
              {Uploadstat === 'pending'
                ? <Loader />
                : Uploadstat === 'failed'
                  ? <p> dd</p>
                  : (
                    <PlanningClasses
                      setFormData={setFormData}
                      formData={formData}
                      currentPanel={currentPanel}
                      setCurrentPanel={setCurrentPanel}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      status={status}
                      message={message}
                      errors={errors}
                      setErrors={setErrors}
                      newClasses={newClasses}
                    />
                  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlanningTemp;
