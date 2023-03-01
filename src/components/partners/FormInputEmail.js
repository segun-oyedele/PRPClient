import { useState } from 'react';
import PropTypes from 'prop-types';

export const FormInputEmail = ({ children, index, inputValue, setErrorForm, handleSaveEmail, emailId }) => {

  const [email, setEmail] = useState(inputValue || '');

  const handleChange = e => {
    const { value } = e.target;
    setEmail(value);
    setErrorForm(prev => ({ ...prev, email: { error: false, errorMessage: '' } }));
  }

  const handleEmailBlur = (e) => {
    handleSaveEmail(e, index, emailId);
    setErrorForm(prev => ({ ...prev, email: { error: false, errorMessage: '' } }));
  }

  return (
    <>
      <div className={`${ index > 0 ? 'pt-3' : ''} grid items-center email_container`}>
        <input
          type="email"
          className="p-2 outline-none form_input form__partner-input"
          placeholder={`Email ${index + 1}`}
          name={email}
          value={email}
          onChange={ e => handleChange(e)}
          onBlur={ handleEmailBlur }
          autoComplete="off"
        />
        { children && children }
      </div>

    </>
  );
};

FormInputEmail.propTypes = {
  children: PropTypes.node,
  handleSaveEmail: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  setErrorForm: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  emailId: PropTypes.number
};