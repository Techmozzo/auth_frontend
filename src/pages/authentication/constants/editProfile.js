import { validationPatterns } from '../../../utilities/validation';
import { designations, partners } from '../../../utilities/dummyData';

const editProfileProps = (
  {
    formData,
    handleBlur,
    handleChange,
    errors,
    selectDisabled
  }
) => ([
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'company_name',
      type: 'text',
      label: 'Name of Audit Firm',
      placeholder: 'Enter name of audit firm',
      value: formData?.company_name || '',
      validations: {
        required: true
      },
      error: errors?.company_name,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'company_phone',
      type: 'tel',
      label: 'Company Phone',
      placeholder: 'Enter Company Phone Number',
      value: formData?.company_phone || '',
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'company_email',
      type: 'email',
      label: 'Company Email Address',
      placeholder: 'Enter Company Email Address',
      value: formData?.company_email || '',
      validations: {
        required: true,
        pattern: validationPatterns.email
      },
      error: errors?.company_email,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'address',
      type: 'text',
      label: 'Company  City',
      placeholder: 'Enter Company City',
      value: formData?.city || '',
      validations: {
        required: true,
        pattern: validationPatterns.address
      },
      error: errors?.city,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'state',
      type: 'text',
      label: 'Company  State',
      placeholder: 'Enter Company State',
      value: formData?.state || '',
      validations: {
        required: true,
        pattern: validationPatterns.state
      },
      error: errors?.state,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'address',
      type: 'text',
      label: 'Company  Address',
      placeholder: 'Enter Company Address',
      value: formData?.address || '',
      validations: {
        required: true,
        pattern: validationPatterns.address
      },
      error: errors?.address,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'zip',
      type: 'text',
      label: 'Zip',
      placeholder: 'Enter Zip Code',
      value: formData?.zip || '',
      validations: {
        required: true,
        pattern: validationPatterns.zip
      },
      error: errors?.zip,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default editProfileProps;
