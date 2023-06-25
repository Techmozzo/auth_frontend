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
  }
]);
export default editProfileProps;
