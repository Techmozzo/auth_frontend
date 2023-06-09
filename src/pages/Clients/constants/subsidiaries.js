import React from 'react';
import { validationPatterns } from '../../../utilities/validation';
import { CheckboxField } from '../../../components/form/inputs/Checkbox';
import { designations } from '../../../utilities/dummyData';

const newClientProps3 = (
  {
    formData,
    handleChange,
    handleBlur,
    errors
  }
) => ([
  // {
  //   kind: 'select',
  //   props: {
  //     className: 'w-100 m-b-20 col-md-6 col-12',
  //     name: '',
  //     meta: { name: 'director_designation', kind: 'array' },
  //     label: 'Directors Designation',
  //     value: formData?.director_designation_alt || '',
  //     options: designations,
  //     error: errors?.director_designation_alt,
  //     optionIndex: 'type',
  //     valueIndex: 'value',
  //     onBlur: handleBlur,
  //     onChange: handleChange
  //   }
  // },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'subsidiary_name_alt',
      metaName: 'subsidiary_name',
      kind: 'array',
      meta: { name: 'subsidiary_name', kind: 'array' },
      type: 'text',
      label: 'Subsidiary Name',
      placeholder: 'Enter Subsidiary Name',
      value: formData?.subsidiary_name_alt || '',
      validations: {
        required: true
      },
      error: errors?.subsidiary_name_alt,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'subsidiary_nature_of_business_alt',
      kind: 'array',
      type: 'text',
      label: 'Subsidiary Industry',
      placeholder: 'E.G: Oil & Gas',
      value: formData?.subsidiary_nature_of_business_alt || '',
      validations: {
        required: true
      },
      error: errors?.subsidiary_nature_of_business_alt,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'subsidiary_nature_alt',
      metaName: 'subsidiary_nature',
      kind: 'array',
      type: 'text',
      label: 'Subsidiary Nature',
      placeholder: 'E.G: Ltd, int\'l',
      value: formData?.subsidiary_nature_alt || '',
      validations: {
        required: true
      },
      error: errors?.subsidiary_nature_alt,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'subsidiary_percentage_holding_alt',
      metaName: 'subsidiary_percentage_holding',
      kind: 'array',
      type: 'text',
      label: 'Subsidiary Shares (%)',
      placeholder: 'E.G: 10%',
      value: formData?.subsidiary_percentage_holding_alt || '',
      validations: {
        required: true
      },
      error: errors?.subsidiary_percentage_holding_alt,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default newClientProps3;
