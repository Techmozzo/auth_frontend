import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import localforage from 'localforage';
import uuid from 'react-uuid';
import { mapBackendErrors, validateField } from '../../utilities/validation';
import PageTemp from '../../components/temps/PageTemp';
import { projectAction, resetAction } from '../../redux/actions/projectActions';
import { notifier, slugToString } from '../../utilities/stringOperations';

import FormBuilder from '../../components/form/builders/form';
import CheckboxComp from '../../components/ui/CheckboxComp';
import { apiOptions, post } from '../../services/fetch';
import { user } from '../../utilities/auth';
import completeProfile1Props from '../authentication/constants/completeProfile1';
import editProfileProps from '../authentication/constants/editProfile';

const CompanyProfile = ({ setCurrent }) => {
  const [terms, setTerms] = useState(false);
  const [show, setShow] = useState(false);
  const [load, setLoading] = useState(false);
  const [formload, setFormLoading] = useState('initial');
  const [errors, setErrors] = useState({});

  const { goBack, push } = useHistory();

  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth.updateCompany);
  const indexstore = useSelector((state) => state.engagement.dashboard);
  const [formData, setFormData] = useState({
    ...indexstore?.data?.data?.company
  });
  console.log(store);

  useEffect(() => {
    dispatch(projectAction({
      action: 'DASHBOARD',
      routeOptions: apiOptions({
        endpoint: 'DASHBOARD',
        auth: true,
        method: 'get'
      })
    }));
  }, [dispatch]);

  useEffect(() => {
    updateForm();
  }, [indexstore]);

  const updateForm = () => {
    setFormData({
      name: indexstore?.data?.data?.company?.name,
      address: indexstore?.data?.data?.company?.address,
      city: indexstore?.data?.data?.company?.city,
      country: indexstore?.data?.data?.company?.country,
      zip: indexstore?.data?.data?.company?.zip,
      phone: indexstore?.data?.data?.company?.phone,
      state: indexstore?.data?.data?.company?.state,
      dp: indexstore?.data?.data?.company?.dp
    });
  };
  //   useEffect(() => {
  //     setCurrent('My projects');
  //     if (store?.status === 'success') {
  //       localforage.setItem('user', store?.data?.data?.user);
  //       localStorage.setItem('company', store?.data?.data?.company);
  //       localStorage.setItem('user', JSON.stringify(store?.data?.data?.user));
  //       notifier({
  //         title: 'Logged In As an Auditor',
  //         text: 'Profile updated successfully',
  //         type: 'success'
  //       });
  //       setTimeout(() => window.location.assign('/app/dashboard'), 500);
  //     }
  //   }, [store.status]);
  const completeRegistration = useCallback(async (data) => {
    setFormLoading('pending');
    await dispatch(projectAction(
      {
        action: 'UPDATE_COMPANY',
        routeOptions: apiOptions({
          method: 'post',
          body: data,
          endpoint: 'UPDATE_COMPANY',
          auth: true
        })
      }
    ));
    setFormLoading('initial');
  }, []);

  const handleLogin = () => {
    completeRegistration(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((state) => ({
      ...state,
      [name]: value
    }));
  };

  const goBackAndReset = () => {
    goBack();
    dispatch(resetAction({ action: 'LOGIN_COMPLETE' }));
  };
  const handleBlur = (e, validations) => {
    const { name, value } = e.target;
    const field = slugToString(name);
    // console.log(typeof field !== 'undefined');Q3';'
    typeof field !== 'undefined'
    && setErrors(
      {
        ...errors,
        [name]: (
          validateField(validations, field, value)
        )
      }
    );
    // setIsError(errorsChecker(errors));
    // canContinue();
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDat = new FormData();
    console.log(e.target.files[0]);
    formDat.append('document', e.target.files[0]);
    try {
      const upfile = await post({ endpoint: 'PROJECT_MEDIA', auth: true, body: formDat });
      if (upfile?.data?.success) {
        console.log(upfile);
        setFormData({ ...formData, dp: upfile?.data?.data?.url });
      }
    } catch (em) {
      notifier({
        type: 'error',
        title: 'error',
        text: em.message
      });
    }
    setLoading(false);
  };

  /* on visiting */
  const initialTemp = ({ ...props }) => (
    <div className="">
      <div className="box-shadow row ">

        <div className="col-md-12 pt-5">
          <div className="offset-1">
            <div className="row">
              <div className="pl-3">
                <div className="font-regular text-theme-grey">
                  Fill the application form below to register
                </div>
              </div>
              <div className="col-md-10 mt-2">
                <div className="d-flex justify-content-between wrap">
                  <FormBuilder
                    formItems={
                      editProfileProps(
                        {
                          formData,
                          handleBlur,
                          handleChange,
                          errors
                        }
                      )
                    }
                  />
                  <div className="m-3">
                    {load
                      ? (
                        <>
                          Uploading image
                        </>
                      ) : (
                        <>
                          <img src={formData.dp} alt={formData.name} style={{ width: '150px', height: '150px' }} />
                          <input type="file" accept="image/*" name="dp" id="dp" onChange={uploadImage} />

                        </>
                      )}
                  </div>

                </div>
                <div className="row justify-content-between mb-2">
                  <div>
                    <button className="w-100 btn btn-small" type="button" onClick={handleLogin}>Update</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* on failure */
  const failureTemp = (
    <div>
      <ul>

        {
          mapBackendErrors(store?.data).map(
            (err) => (
              typeof err !== 'undefined' && (
                <li key={`${err}`} className="text-warning">
                  {err}
                </li>
              )
            )
          )
        }
      </ul>
      <button onClick={goBackAndReset} type="button" className="btn w-25 center btn-small float-right">
        BACK
      </button>
    </div>
  );

  return (
    <div>
      {/* <div className="d-flex ml-4 custom-top-bar justify-content-between">
        <div className="text-theme-black bold">
          COMPLETE PROFILE
        </div>
      </div> */}
      <div className="content">
        <PageTemp
          initial={initialTemp({ formData })}
          view={initialTemp({ formData })}
          status={formload}
          error={initialTemp({ formData })}
        />
      </div>
    </div>
  );
};

export default CompanyProfile;
