import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import { apiOptions } from '../../services/fetch';
import { sentenceCaps, slugify } from '../../utilities/stringOperations';
import Loader from '../../components/microComponents/loader';
import ExecutionTemp from './temps/ExecutionTemp';
import Notes from './Notes';
import { headerTemp1 } from '../../components/temps/projectTemps/miscTemps';
import useViewBoilerPlate from '../../components/hooks/useViewBoilerPlate';

const centeredProperty = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '38px'
};

const useStyles = makeStyles((theme) => ({
  customButton: {
    backgroundColor: '#FFA500',
    color: '#202020',
    padding: '0px 20px',
    borderRadius: '2px',
    fontSize: '14px',
    fontWeight: 600,
    '&:hover': {
      border: '1px solid #FFA500',
      backgroundColor: '#f4f4f4',
      borderRadius: '2px'
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

const Execution = () => {
  /* router hooks */
  const { push } = useHistory();
  const { engagementName, engagementId } = useParams();
  /* state */
  const [formData, setFormData] = useState({ });
  const [formDataa, setFormDataa] = useState({ });
  const [errors, setErrors] = useState({});

  /* redux */
  const store = useSelector((state) => state.engagement?.execution);
  const options = {
    action: 'EXECUTION',
    apiOpts: apiOptions({
      body: { ...formData },
      endpoint: 'ENGAGEMENTS',
      param: engagementId,
      afterParam: 'executions',
      auth: true,
      method: 'post'
    })
  };

  const {
    handleBlur, handleChange, status, handleChecked, create, message
  } = useCreateBoilerPlate({
    setFormData,
    formData,
    setErrors,
    errors,
    options,
    store,
    action: 'EXECUTION_COMPLETE',
    noRedirect: true
  });

  /* boilerPlate hooks params */
  const optionsx = {
    action: 'ENGAGEMENT',
    apiOpts: apiOptions({
      endpoint: 'ENGAGEMENT',
      auth: true,
      param: engagementId,
      method: 'get'
    })
  };

  /* boilerPlate hooks */
  const { status: syayys } = useViewBoilerPlate({
    setFormData: setFormDataa,
    formData: formDataa,
    store,
    options: optionsx
  });

  useEffect(() => {
    if (status === 'success') {
      push(`/app/engagement/conclusion/${slugify(engagementName, '-')}/${engagementId}`);
    }
  }, [status]);

  const classes = useStyles();

  // console.log('Wicked ', formDataa);
  return (
    <div className="row">
      <div className="col-md-10">
        {
          headerTemp1({
            text: 'Execution',
            parent: 'Engagements',
            name: sentenceCaps(engagementName),
            link: '/app/engagement/',
            link1: `/app/engagement/engagement/${engagementId}`
          })
        }
        <div className="content">
          <div className="">
            <div className="mb-4 font-title-small mb-4">
              {
                status === 'pending'
                  ? <Loader />
                  : (
                    <div>
                      <ExecutionTemp
                        formData={formData}
                        setFormData={setFormData}
                        errors={errors}
                        setErrors={setErrors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        handleChecked={handleChecked}
                        status={status}
                        message={message}
                        // setCurIndex={setCurIndex}
                        // setText={setText}
                        // text={text}
                        link={`/app/engagement/engagement/${engagementId}`}
                      />
                      <div className="d-flex justify-content-between wrap mt-3">
                        <Link
                          to={`/app/engagement/engagement/${engagementId}`}
                          className={classes.outlineButton}
                        >
                          Back
                        </Link>
                        <Button onClick={create} className={classes.customButton}>Continue</Button>
                      </div>
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-2 bg-white min-h-100">
        <Notes />
      </div>
    </div>
  );
};

export default Execution;
