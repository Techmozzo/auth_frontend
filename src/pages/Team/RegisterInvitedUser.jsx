import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Link, useHistory, useParams } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Loader from '../../components/microComponents/loader';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import { makeFullName, notifier, splitFullName } from '../../utilities/stringOperations';
import useUpdateStore from '../../components/hooks/useUpdateStore';
import useStoreParams from '../../components/hooks/useStoreParams';
import { apiOptions, get } from '../../services/fetch';
import FormBuilder from '../../components/form/builders/form';
import registerUserProps from './constants/registerUser';
import useFetchData from '../../components/hooks/useFetchData';
import { projectAction } from '../../redux/actions/projectActions';

const InvitedUser = () => {
  /* state */
  const [formData, setFormData] = useState({ });
  const [errors, setErrors] = useState({});

  /* router hooks */
  const { token } = useParams();
  /* redux */
  const store = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(token);
  const options = {
    action: 'REGISTER_INVITED_USER',
    apiOpts: apiOptions({
      body: formData,
      endpoint: 'REGISTER_INVITED_USER',
      param: token,
      method: 'post'
    })
  };
  const {
    handleBlur, handleChange, status, handleChecked, create, data, backErrors, message
  } = useCreateBoilerPlate({
    setFormData,
    formData,
    setErrors,
    errors,
    options,
    store: store.invitedUser,
    action: 'REGISTER_INVITED_USER_COMPLETE',
    redirect: '/app/dashboard'
  });

  const updateStore = () => pushUpdates([{
    data: data?.invitedUser,
    action: 'REGISTER_INVITED_USER_COMPLETE'
  }], dispatch);

  console.log(store.invitedUser);

  const userInfoStore = useStoreParams(store.invitedUser);
  const usersFail = () => {
    setErrors(backErrors);
    updateStore();
  };
  console.log(userInfoStore.data);
  const usersSuccess = () => {
    const names = splitFullName(userInfoStore?.data?.invitedUser.name);
    setFormData({
      ...userInfoStore?.data?.invitedUser, first_name: names.firstName, last_name: names.lastName
    });
    // updateStore();
  };
  const pullUsers = React.useCallback(() => {
    dispatch(projectAction(
      {
        action: 'REGISTER_INVITED_USER',
        routeOptions: apiOptions({
          endpoint: 'INVITE_USER',
          param: token,
          method: 'get'
        })
      }
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const datax: any = await get({ endpoint: 'INVITE_USER', param: token });
      // convert the data to json
      // const json = await data.json();
      console.log(datax?.data?.data?.invitedUser);
      const names = splitFullName(datax?.data?.data?.invitedUser.name);
      setFormData({
        ...datax?.data?.data?.invitedUser, first_name: names.firstName, last_name: names.lastName
      });
      // set state with the result
      // setData(json);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  // console.log(pullUsers);
  /* custom hooks */
  const pushUpdates = useUpdateStore;
  const fetchData = useFetchData;
  // fetchData({
  //   initialCallback: pullUsers,
  //   dataIndex: 'invitedUser',
  //   successCallback: usersSuccess,
  //   emptyRedirect: '/app/team/invite-user',
  //   failCallback: usersFail,
  //   emptyCallback: updateStore,
  //   store: userInfoStore
  // });

  return (
    <div className="m-t-40">
      <div className="content">
        <div className="box-shadow max-w-850">
          <div className="d-flex justify-content-between">
            <div className="login position-relative ">
              <div className="login-content p-0 m-0 ml-lg-5">
                <p className="font-title-small text-theme-black bold theme-font-bold text-theme">
                  Fast. Secure. Safe.
                </p>
                <p className="font-regular text-theme-grey">
                  Find peace, life is like a water fall, you’ve gotta flow.
                  They will try to close the door on you, just open it.
                  The ladies always say Khaled you smell good
                </p>
              </div>
            </div>
            <div className="p-5">
              <div className="text-center text-theme-black font-title-small theme-font mb-3">
                Accept Invitation
              </div>
              <div className="d-flex justify-content-between wrap">
                {
                  status === 'pending'
                    ? <Loader />
                    : (
                      <FormBuilder
                        formItems={
                          registerUserProps(
                            {
                              formData,
                              handleBlur,
                              handleChange,
                              errors,
                              handleChecked
                            }
                          )
                        }
                      />
                    )
                }
              </div>
              <div className="row justify-content-between">
                <div className="mt-md-1 font-small">
                  &nbsp;
                </div>
                <div className="p-3">
                  <button className=" btn" type="button" onClick={create}>Accept</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitedUser;
