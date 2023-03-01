import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export const ConfirmPopup = ({ isOpen, setIsOpen, onClick, title, description, colorsPrimaryBoton, buttonTitle, showButton = true }) => {

  const colorsBtn = colorsPrimaryBoton || "bg-indigo-500 border border-transparent rounded-md hover:bg-indigo-600 focus:bg-indigo-600 active:bg-indigo-600 text-white";

  function closeModal() {
    setIsOpen(false);
  }

  const handleClick = () => {
    closeModal();
    onClick();
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
                    { title }
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      { description }
                    </p>
                  </div>
                  { showButton &&
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <button
                        type="button"
                        className={`${ colorsBtn } inline-flex justify-center px-4 py-2 text-sm font-medium transition duration-300 border border-transparent rounded-md focus:outline-none focus-visible:ring-2`}
                        onClick={ handleClick }
                      >
                        { buttonTitle }
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-indigo-600 transition duration-300 bg-white border border-transparent rounded-md hover:border-indigo-500 focus:border-indigo-500 active:border-indigo-500 focus:outline-none focus-visible:ring-2 "
                        onClick={ closeModal }
                      >
                        Cancel
                      </button>
                    </div>
                  }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

ConfirmPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  colorsPrimaryBoton: PropTypes.string,
  buttonTitle: PropTypes.string.isRequired,
  showButton: PropTypes.bool
}