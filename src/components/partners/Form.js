import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from './hooks';
import { SwitchForm } from './SwitchForm';
import { XIcon, PlusSmIcon } from '@heroicons/react/solid';
import { FormInput } from './FormInput';
import { FormConfirm } from './FormConfirm';
import { FormInputEmail } from './FormInputEmail';
import { ButtonIcon } from '../../shared/components/ButtonIcon';
import { FormInputError } from './FormInputError';
import { ButtonComponent } from './ButtonComponent';
import { ReportTime } from './ReportTime';

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const Form = ({ handleCloseForm }) => {

  const { name, email, handleTypeReport, handleFormChange, handleSubmitForm, handleAddEmail, handleSaveEmail, isActivePartner, setIsActivePartner, errorForm, isValidData, reportName, setErrorForm, handleRemoveEmail, handleChangeDateTime, reportDate, repeatedEmails } = useForm(handleCloseForm);
  let [isOpen, setIsOpen] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();

    const allEmailsAreValid = email.every(email => regexEmail.test(email.partner_email));
    const areEmailRepeated = repeatedEmails();

    if (areEmailRepeated || !allEmailsAreValid) {
      setErrorForm({
        ...errorForm,
        email: {
          error: true,
          errorMessage: 'The emails address must be unique or valid'
        }
      });
      return;
    }

    if(errorForm.email.error) {
      setErrorForm(prev => ({ ...prev, email: { error: true, errorMessage: 'All emails must be valid' } }));
      return;
    } else {
      setErrorForm(prev => ({ ...prev, email: { error: false, errorMessage: '' } }));
    }

    if (errorForm.partnerName.error || areEmailRepeated) return;
    setIsOpen(true)
  }

  return (
    <>
      <div className="fixed top-0 left-0 z-40 flex flex-row flex-wrap min-h-screen bg-slate-200/50 md:p-12 w-100vw">
        <form
          className="absolute w-11/12 p-5 m-0 overflow-y-auto bg-white form md:w-3/5 h-max top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 partner-form"
          onSubmit={(e) => submitForm(e)}
        >
          <h2 className="text-center uppercase raleway-b">Partners Data</h2>

          <FormInput
            value={name}
            placeholder="Clients name"
            handleFormChange={handleFormChange}
            errorMessage={errorForm.partnerName.errorMessage}
            error={errorForm.partnerName.error}
          />

          <div className="flex flex-col pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="pl-4 text-sm text-gray-700 first-letter:uppercase">Recipient Email</label>
              <ButtonIcon
                btnLabel="Add New Email"
                btnStyles="rounded w-full btn__add-email justify-center px-2"
                labelStyles="btn__add-email-label"
                onClick={handleAddEmail}
                btnDefaultSpacing="px-2"
              >
                <PlusSmIcon className="w-4 btn__add-email-icon" />
              </ButtonIcon>
            </div>
            {email.length > 0 && email.map(({ partner_email, partner_email_id }, index) => (
              <FormInputEmail
                key={`${partner_email}+${index}`}
                index={index}
                inputValue={partner_email}
                emailId={partner_email_id}
                setErrorForm={setErrorForm}
                handleSaveEmail={handleSaveEmail}
              >
                <ButtonIcon
                  labelStyles="hidden"
                  btnStyles="rounded-lg h-8 w-8 justify-self-end btn__remove-email justify-center"
                  btnColors="bg-red-500 hover:bg-red-600 focus:bg-red-600 active:bg-red-600"
                  buttonSpacing="p-1"
                  onClick={() => handleRemoveEmail(index)}
                >
                  <XIcon className="w-4 h-4 text-white" />
                </ButtonIcon>
              </FormInputEmail>
            ))
            }
            { errorForm.email.error && <FormInputError
              errorMessage={errorForm.email.errorMessage}
              error={errorForm.email.error}
            /> }
            
          </div>

          <div className="flex items-center justify-between gap-3 pt-4 partner__form-switch">
            <label className="pl-4 text-sm text-gray-700">Active</label>
            <SwitchForm
              switchEnabled={!!isActivePartner}
              setSwitchEnabled={setIsActivePartner}
            />
          </div>

          <div className="flex flex-col pt-4">
            <label className="pb-2 pl-4 text-sm text-gray-700">Partner Report Types</label>
            {
              reportName.map(({ report_name, active }, index) => (
                <SwitchForm
                  key={`${report_name}-${index}`}
                  switchEnabled={!!active}
                  typeReport={report_name}
                  isTypeReport
                  handleTypeReport={handleTypeReport}
                />
              ))
            }
          </div>

          <div className="flex flex-col pt-4">
            <label className="pb-2 pl-4 text-sm text-gray-700">Report Execution Time</label>
            <ReportTime
              handleChangeDateTime={ handleChangeDateTime }
              reportDate={ reportDate }
            />
          </div>

          <div className="grid justify-start gap-4 form_buttons-container">
            <button
              className={`${isValidData ? 'button__component-primary' : 'button__component-primary-default cursor-default'} rounded p-3 text-white transition-colors duration-300 raleway-b text-lg`}
              type="submit"
            >Save</button>

            <ButtonComponent
              buttonText="Cancel"
              handleClick={handleCloseForm}
            />
          </div>
        </form>
      </div>
      <FormConfirm
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        handleSubmitForm={handleSubmitForm}
        handleCloseForm={handleCloseForm}
        name={name}
      />
    </>
  );
};

Form.propTypes = {
  handleCloseForm: PropTypes.func.isRequired
}