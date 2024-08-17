import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Modal from '../../components/microComponents/modal';
// import TextInput from '../../components/form/inputs/TextInput';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../redux/actions/authenticationActions';
// import Loader from '../../components/microComponents/loader';
import FormBuilder from '../../components/form/builders/form';
import {
  slugToString,
  stringDoesNotExist,
  toastNotifier
} from '../../utilities/stringOperations';
import { validateField } from '../../utilities/validation';
import forgotPasswordProps from './constants/forgotPassword';

const centeredProperty = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '38px'
};

const useStyles = makeStyles((theme) => ({
  customButton: {
    backgroundColor: '#FFA500 !important',
    color: '#202020 !important',
    padding: '0px 20px !important',
    borderRadius: '2px !important',
    fontSize: '14px !important',
    fontWeight: '600 !important',
    '&:hover': {
      border: '1px solid #FFA500 !important',
      backgroundColor: '#f4f4f4 !important',
      borderRadius: '2px',
      color: '#202020'
    },
    ...centeredProperty
  },
  outlineButton: {
    backgroundColor: '#ffffff',
    border: '1px solid #FFA500',
    color: '#202020',
    padding: '0px 20px',
    borderRadius: '2px',
    fontSize: '14px',
    fontWeight: 600,
    '&:hover': {
      color: '#202020 !important',
      backgroundColor: '#FFA500',
      borderRadius: '2px'
    },
    ...centeredProperty
  }
}));

const ForgotPassword = () => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth.forgotPassword);
  /* state */
  const [formData, setFormData] = useState({});
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const classes = useStyles();

  useEffect(() => {
    if (store.status === 'initial' || store.status === 'pending') {
      setShow(false);
      setShowForm(true);
    }
    if (store.status === 'success') {
      setShow(true);
      setShowForm(false);
      toastNotifier({
        title: 'Please check your email',
        text: 'We have sent the next steps to your email.',
        type: 'success'
      });
    }
    if (store.status === 'failed') {
      setShow(false);
      setShowForm(false);
      toastNotifier({
        title: 'Something went wrong',
        text: 'We cannot verify this email, Please try again!',
        type: 'danger'
      });
    }
  }, [store.status]);

  const handleResetPassword = () => {
    dispatch(forgotPassword(formData));
  };

  const handleTryAgain = () => {
    setShow(false);
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((state) => ({
      ...state,
      [name]: value
    }));
  };
  const handleBlur = (e, validations) => {
    const { name, value } = e.target;
    const field = slugToString(name);
    typeof field !== 'undefined'
    && setErrors(
      {
        ...errors,
        [name]: (
          validateField(validations, field, value)
        )
      }
    );
  };

  return (
    <div className="content">

      <div className="max-w-600 w-600 margin-center m-t-40 ">
        <div className="d-flex justify-content-center mb-3">
          <h6 className="text-center">
            {
              store.status === 'initial' || store.status === 'failed' ? 'Reset your Password' : 'Please check your email'
            }
          </h6>
        </div>
        <div className="login-form-container p-20">
          {
            !show && showForm && (
              <>
                <p className="">Provide your registered email address to reset your password</p>
                <hr />
                <div className=" mb-3">
                  <FormBuilder
                    formItems={
                      forgotPasswordProps(
                        {
                          formData,
                          handleBlur,
                          handleChange,
                          errors
                        }
                      )
                    }
                  />
                  <div className="d-flex justify-content-center">
                    <Button
                      onClick={handleResetPassword}
                      className={classes.customButton}
                    >
                      {/* disabled={
                        !(!stringDoesNotExist(formData.email) && errors.email?.length === 0)
                      } */}
                      Reset Password
                    </Button>
                  </div>

                </div>
              </>
            )
          }
          {
            show && store.status === 'success' && (
              <>
                <p className="">
                  If this email
                  {' '}
                  {formData?.email}
                  {' '}
                  exist in our record,
                  We will send you an email
                  with steps for resetting your password
                </p>
                <div className="w-50 m-t-40">
                  <Link to="/login" className={classes.outlineButton}>Continue to login</Link>
                </div>
              </>
            )
          }
          {
            show && store.status === 'failed' && (
              <>
                <div className="">
                  We encountered an issue while processing your password reset request.
                  {' '}
                  To reset your password, please start the process again.
                  <div className="d-flex justify-content-center">
                    <Button
                      onClick={handleTryAgain}
                      className={classes.outlineButton}
                    >
                      Try again
                    </Button>
                  </div>
                </div>
              </>
            )
          }
        </div>
        {
          !show && store.status !== 'success' && (
            <div className="d-flex justify-content-center m-t-40">
              <Link to="/login" className={classes.outlineButton}>Back to login</Link>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ForgotPassword;
