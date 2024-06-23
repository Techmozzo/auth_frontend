/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { animatedCheck } from '../temps/projectTemps/miscTemps';

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
    '&:hover': {
      backgroundColor: '#f4f4f4',
      border: '1px solid #FFA500'
    },
    ...centeredProperty
  },
  outlineButton: {
    backgroundColor: 'white',
    border: '1px solid #FFA500',
    color: '#202020',
    '&:hover': {
      backgroundColor: '#FFA500',
      color: '#202020'
    },
    ...centeredProperty
  }
}));

export default function HorizontalLinearStepper({ steps, active, link }) {
  const { goBack } = useHistory();

  const [activeStep, setActiveStep] = React.useState(active || 0);
  const [skipped, setSkipped] = React.useState(new Set());
  const currentItem = steps[activeStep];
  const classes = useStyles();

  useEffect(() => {
    if (currentItem?.status === 'success') {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      if (activeStep === steps.length) {
        goBack();
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  }, [currentItem?.status]);
  const isStepOptional = (optional) => optional?.optional;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    steps[activeStep].btnMethod();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map(({ label, optional }, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(optional)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }} className="text-center">
            <div className="font-title">
              <span> All steps completed</span>
              {
                animatedCheck(<path className="path text-theme" d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" />)
              }
            </div>
            <div> This&apos; done with</div>
          </Typography>
          <Box sx={{
            display: 'flex', justifyContent: 'space-between', flexDirection: 'row', pt: 2
          }}
          >
            <Button onClick={goBack} className={classes.outlineButton}>Exit</Button>
            <Link to={link}>Continue</Link>
            <Button onClick={handleReset} className={classes.customButton}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <div>
            {steps[activeStep].template}
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              className={`${activeStep === 0 ? 'd-none' : ''} ${classes.outlineButton}`}
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button onClick={goBack} className={classes.outlineButton}>Exit</Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button className={`${isStepOptional(activeStep) ? '' : 'd-none'} ${classes.outlineButton}`} color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>

            <Button onClick={handleNext} className={classes.customButton}>
              {steps[activeStep].btn}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
