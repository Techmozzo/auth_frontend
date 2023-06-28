/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import uuid from 'react-uuid';
import { isEmpty, isUndefined } from 'lodash';
// import Slider, { Range } from 'rc-slider';
// import 'rc-slider/assets/index.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect } from 'react';
import {
  formatDonation,
  notifier,
  sentenceCaps,
  stringDoesNotExist
} from '../../utilities/stringOperations';
import FormBuilder from '../form/builders/form';
import sliderProps from './constants/sliderprops';

function newNum(numberString) {
  let number;

  if (typeof numberString === 'string' && numberString.includes(',')) {
    number = parseFloat(numberString.replace(/,/g, ''));
  } else {
    number = parseFloat(numberString);
  }

  return number;
}

export default function SliderSizes({
  max, min, formData, setFormData, name, label, props, val, levelId, overallmax, overallmin
}) {
  const [value, setValue] = React.useState(val || min || 0);
  const [disableSlider, setDisableSlider] = React.useState(false);
  const ma = Number(levelId === 1 ? overallmax : max) || 100;
  const mi = Number(levelId === 1 ? overallmin : min) || 0;

  useEffect(() => {
    handleValue(value);
  }, [value]);
  // console.log(formData);
  const handleValue = (amt) => {
    // console.log('==========');
    // console.log('Amount ', amt);
    // console.log(name);
    // console.log(levelId);
    const amount = parseInt(amt, 10)
      * newNum(levelId === 1 ? formData.materiality_benchmark_amount : levelId === 2
        ? formData.overall_materiality_amount : levelId === 3
          ? formData.performance_materiality_amount : formData.materiality_benchmark_amount)
      / 100;

    // console.log('Level ', levelId === 1 ? formData.materiality_benchmark_amount : levelId === 2
    //   ? formData.overall_materiality_amount : levelId === 3
    //     ? formData.performance_materiality_amount : formData.materiality_benchmark_amount);
    // console.log('Amount', amount);
    setFormData({
      ...formData, [`${name}_level_id`]: levelId, [`${name}_amount`]: amount, [`${name}_limit`]: amt
    });

    // console.log('==========');
  };
  const handleSliderChange = (event, newValue) => {
    if (stringDoesNotExist(formData.materiality_benchmark_amount)) {
      setDisableSlider(true);
      return notifier({
        type: 'info',
        title: 'Amount is Empty',
        text: 'First fill out the materiality amount.'
      });
    }

    return setValue(newValue);
  };

  const handleInputChange = (event) => {
    const amt = formatDonation(event.target.value);

    // eslint-disable-next-line max-len
    const percent = 100 * amt / formatDonation(levelId === 1 ? formData.materiality_benchmark_amount : levelId === 2
      ? formData.overall_materiality_amount : levelId === 3
        ? formData.performance_materiality_amount : formData.materiality_benchmark_amount);
    setValue(percent);
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    }
  };
  const marks = [
    {
      value: mi,
      label: `${mi}%`
    },
    {
      value: ma,
      label: `${ma}%`
    }
  ];

  return (
    <Box>
      <label className="mb-4">{sentenceCaps(label)}</label>
      <div className="row">
        <div className="col-md-8 center-horizontal">
          <Slider
            color="secondary"
            disabled={disableSlider && stringDoesNotExist(formData.materiality_benchmark_amount)}
            // key={uuid()}
            aria-label="input-slider"
            min={mi}
            onChange={handleSliderChange}
            max={ma}
            marks={marks}
            value={value}
            valueLabelDisplay="on"
          />
        </div>
        <div className={isUndefined(props) ? 'd-none' : 'col-md-4'}>
          <FormBuilder
            formItems={
              sliderProps(
                {
                  ...props,
                  name: `${name}_amount`,
                  handleChange: handleInputChange,
                  handleBlur,
                  formData,
                  disabled: true
                }
              )
            }
          />
        </div>
      </div>

    </Box>
  );
}
