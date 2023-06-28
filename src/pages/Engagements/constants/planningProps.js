import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { auditingStandards } from '../../../utilities/dummyData';

const indexData = { ...JSON.parse(localStorage.getItem('index')) };
const materialrange = [{ id: 0, name: 'Select Benchmark', value: 0 }, ...indexData.materialRange];
// {
//   id: 0,
//   type: 'select item...',
//   desc: 'corporate project',
//   value: 0
// },
const planningProps = (
  {
    formData,
    handleBlur,
    handleChange,
    errors,
    val
  }
) => ({
  planning: [
    {
      kind: 'input',
      props: {
        className: 'w-100 m-b-20 col-12',
        name: 'name',
        type: 'text',
        label: 'Transaction Class Name',
        placeholder: 'Enter Class Name',
        value: formData?.name || '',
        validations: {
          required: true
        },
        error: errors?.name,
        onBlur: handleBlur,
        onChange: handleChange
      }
    }
  ],
  test: [
    {
      kind: 'input',
      props: {
        className: 'w-100 m-b-20 col-12',
        name: 'test_name',
        type: 'text',
        label: 'Test Name',
        placeholder: 'Enter Test Name',
        value: formData?.test_name || '',
        validations: {
          required: true
        },
        error: errors?.test_name,
        onBlur: handleBlur,
        onChange: handleChange
      }
    }
  ],
  materiality: [
    {
      kind: 'select',
      props: {
        className: 'w-100 m-b-20 col-12 col-md-7',
        name: 'materiality_benchmark_range_id',
        label: 'Materiality Benchmark',
        value: formData?.materiality_benchmark_range_id || '',
        options: materialrange,
        validations: {
          required: true
        },
        error: errors?.materiality_benchmark_range_id,
        optionIndex: 'name',
        valueIndex: 'id',
        onBlur: handleBlur,
        onChange: handleChange
      }
    },
    {
      kind: 'currency',
      props: {
        className: 'w-100 m-b-20 col-12 col-md-5',
        name: 'materiality_benchmark_amount',
        label: 'Amount',
        type: 'text',
        value: formData?.materiality_benchmark_amount || '',
        validations: {
          required: true
        },
        error: errors?.materiality_benchmark_amount,
        onBlur: handleBlur,
        onChange: handleChange
      }
    },
    {
      kind: 'text_area',
      props: {
        className: 'w-100 m-b-20 col-12',
        name: 'materiality_benchmark_reason',
        placeholder: 'Write reason here',
        label: 'Reason For Benchmark Chosen',
        value: formData?.materiality_benchmark_reason || '',
        validations: {
          required: true,
          maxLength: 100
        },
        error: errors?.materiality_benchmark_reason,
        onBlur: handleBlur,
        onChange: handleChange
      }
    }
  ],
  misc: [
    {
      kind: 'input',
      props: {
        className: 'w-100 m-b-20 col-12',
        name: 'IT_name',
        type: 'text',
        label: 'IT Item Name',
        placeholder: 'Enter Item Name',
        value: formData?.IT_name || '',
        validations: {
          required: true
        },
        error: errors?.IT_name,
        onBlur: handleBlur,
        onChange: handleChange
      }
    },
    {
      kind: 'text_area',
      props: {
        className: 'w-100 m-b-20 col-12',
        name: 'function',
        placeholder: 'Write IT item function here',
        label: 'IT item function',
        value: formData?.function || '',
        validations: {
          required: true,
          maxLength: 100
        },
        error: errors?.function,
        onBlur: handleBlur,
        onChange: handleChange
      }
    }
  ],
  misc2: [
    {
      kind: 'input',
      props: {
        className: 'w-100 m-b-20 col-12',
        name: 'IT_name',
        type: 'text',
        label: 'IT Item Name',
        placeholder: 'Enter Item Name',
        value: val?.name,
        validations: {
          required: true
        },
        error: errors?.IT_name,
        onBlur: handleBlur,
        onChange: handleChange
      }
    },
    {
      kind: 'text_area',
      props: {
        className: 'w-100 m-b-20 col-12',
        name: 'function',
        placeholder: 'Write IT item function here',
        label: 'IT item function',
        value: val?.function,
        validations: {
          required: true,
          maxLength: 100
        },
        error: errors?.function,
        onBlur: handleBlur,
        onChange: handleChange
      }
    }
  ]
});
export default planningProps;
