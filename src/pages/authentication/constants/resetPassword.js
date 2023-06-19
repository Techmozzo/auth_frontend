import { validationPatterns } from '../../../utilities/validation';

const formBuilderProps = (
  {
    formData,
    handleBlur,
    handleChange,
    errors
  }
) => (
  [

    {
      kind: 'input',
      props: {
        className: 'w-100 m-b-20',
        name: 'password',
        type: 'password',
        label: 'New Password',
        value: formData?.password || '',
        validations: {
          required: true,
          pattern: validationPatterns.password
        },
        error: errors?.password,
        onBlur: handleBlur,
        onChange: handleChange
      }
    },

    {
      kind: 'input',
      props: {
        className: 'w-100 m-b-20',
        name: 'password_confirmation',
        type: 'password',
        label: 'Confirm Password',
        value: formData?.password_confirmation || '',
        validations: {
          required: true,
          password_confirmation: true,
          confirmPassword: true,
          original: formData?.password
        },
        error: errors?.password_confirmation,
        onBlur: handleBlur,
        onChange: handleChange
      }
    }
  ]
);
export default formBuilderProps;
