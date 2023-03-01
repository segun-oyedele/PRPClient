import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ButtonComponent } from './ButtonComponent';

export const FormConfirm = ({ isOpen, setIsOpen, handleSubmitForm, handleCloseForm, name, errorForm }) => {

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmitForm = () => {
    closeModal();
    handleSubmitForm();
    handleCloseForm(null);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    { name }'s data
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Do you want to save the changes of this partner?
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <ButtonComponent
                      handleClick={ onSubmitForm }
                      buttonText="Save data"
                      isPrimary
                    />
                    <ButtonComponent
                      handleClick={ closeModal }
                      buttonText="Cancel"
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

FormConfirm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
  handleCloseForm: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}