/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { apiOptions } from '../../../../services/fetch';
import useViewBoilerPlate from '../../../../components/hooks/useViewBoilerPlate';
import DragNDropTemp from '../../temps/newEngagement/DragNDropInputTemp';
import DragNDropFileInput from '../../../../components/form/inputs/fileInput/DragNDropFileInput';
import Loader from '../../../../components/microComponents/loader';
import PlanningClasses from '../../temps/planning/PlanningClasses';
import useStoreParams from '../../../../components/hooks/useStoreParams';
import { uploadMedia } from '../../../../redux/actions/projectActions';

const name = 'trial_balance';
const route = 'TRIAL_UPLOAD';

const EditClass = () => {
  const dispatch = useDispatch();

  const [currentPanel, setCurrentPanel] = useState(0);
  /* redux hooks */
  const store = useSelector((state) => state.engagement?.engagement);
  const {
    status: Uploadstat, data, backErrors
  } = useStoreParams(store);
  const [newClasses, setClasses] = useState([]);
  const [state, setState] = useState();
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState();
  /* router hooks */
  const { engagementId, engagementName } = useParams();
  const [show, setShow] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  /* state */
  const [formData, setFormData] = useState({ });
  const [open, setOpen] = useState(false);

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
  const loadfile = () => {
    setState({ ...formData?.engagement?.execution });
  };
  useEffect(() => {
    loadfile();
  }, [formData]);
  console.log('FOrm Dataa', formData?.engagement?.planning?.transaction_class);
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
    setFormData((prevStreamData) => ({
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
    <div>
      Edit Class
      <form>
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
                          handleBlur={(e) => console.log(e)}
                          handleChange={(e) => console.log(e)}
                          status={status}
                          message="message"
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
      </form>
    </div>
  );
};

export default EditClass;
