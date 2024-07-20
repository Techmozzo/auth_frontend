/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import { styled, makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
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

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 12px)',
    right: 'calc(50% + 12px)'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#ffa500'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#ffa500'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#cccccc',
    borderTopWidth: 3,
    borderRadius: 1
  }
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerstate }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ffa500',
  display: 'flex',
  height: 22,
  width: 22,
  alignItems: 'center',
  ...(ownerstate.active && {
    borderRadius: '100%'
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#ffffff',
    zIndex: 1,
    fontSize: 23,
    padding: 4,
    boxShadow: '0px 3px 6px 0px rgba(255, 165, 0, 0.2)',
    borderRadius: '100%',
    backgroundColor: '#ffa500'
  },
  '& .QontoStepIcon-circle': {
    width: 16,
    height: 16,
    borderRadius: '100%',
    color: '#f2f2f2',
    border: '2px solid #cccccc',
    padding: 10.2,
    backgroundColor: 'currentColor',
    ...(ownerstate.active && {
      color: '#ffa500',
      padding: 4,
      border: '7.5px solid #ffffff',
      backgroundColor: '#ffa500',
      boxShadow: '0px 3px 6px 0px rgba(198, 198, 198, 0.5)'
    })
  }
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerstate={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

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
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<QontoConnector />}
        sx={{
          '& .MuiStepLabel-label.Mui-active': {
            fontWeight: 600
          }
        }}
      >
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
              <StepLabel {...labelProps} StepIconComponent={QontoStepIcon}>{label}</StepLabel>
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
