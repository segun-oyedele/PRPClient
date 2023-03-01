import PropTypes from 'prop-types';
import { useEffect, useState, Fragment, memo } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { FormInputError } from './FormInputError';
import { getCompanysName } from '../../store/partners/thunks';
import { useAppDispatch, useAppSelector } from '../../store';

export const FormInput = ({ value, placeholder, errorMessage, error, handleFormChange }) => {
  const dispatch = useAppDispatch();
  const { isLoading, companyNamesOptions } = useAppSelector( state => state.partners );
  const [selected, setSelected] = useState({ companyName: value });
  const [query, setQuery] = useState('');

  const fetchCompanies = async () => {
    await dispatch(getCompanysName(query));
  };

  useEffect(() => {
    if(query < 2) return;
    fetchCompanies();
  }, [query]);

  const handleInputChange = (e) => {
    setSelected(e);
    handleFormChange(e);
  };

  return (
    <div className="w-full top-16">
      <label className="pb-2 pl-4 text-sm text-gray-700 first-letter:uppercase">Clients Name</label>
      <Combobox value={selected} onChange={ e => handleInputChange(e) }>
        <div className="relative z-50 mt-1">
          <div className="relative w-full overflow-hidden text-left cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none outline-none form__partner-input form_input focus:ring-0"
              displayValue={(company) => company.companyName}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
              autoComplete="off"
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-gray-200 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              { isLoading && <div className="w-10 h-10 mx-auto my-3 border-2 border-indigo-500 border-dashed rounded-full animate-spin border-t-transparent"></div> }
              
              { !isLoading && (!companyNamesOptions.length || query.length < 2) ? (
                <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                  Nothing found
                </div>
              ) : ( !isLoading && companyNamesOptions.map((company) => (
                  <Combobox.Option
                    key={company.clientID}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={company}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {company.companyName}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                              }`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <FormInputError
        errorMessage={errorMessage}
        error={error}
      />
    </div>
  );
};

FormInput.propTypes = {
  value: PropTypes.string,
  handleFormChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
};