import { Fragment } from 'react';
import { partnersPerPage as partnerData } from '../../shared/data';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { setPartnersPerPage, useAppDispatch, useAppSelector } from '../../store';

export const SelectPartnersPerPage = () => {
  const { partnersPerPage } = useAppSelector( state => state.partners );
  const dispatch = useAppDispatch();

  const handleSelected = (value) => {
    dispatch(setPartnersPerPage(value));
  } 

  return (
    <div className="">
      <Listbox value={partnersPerPage} onChange={handleSelected}>
        <div className="relative z-20">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 font-medium text-center text-white bg-indigo-500 rounded shadow-md cursor-pointer lg:w-36 md:text-left h-11 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm md:text-base" title={`${partnersPerPage} per page`}>
            <span className="block truncate">{`${partnersPerPage} per page`}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-200"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm list-per-page">
              {partnerData.map((partners, partnerIdx) => (
                <Listbox.Option
                  key={partnerIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-8 pr-4 ${active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                    }`
                  }
                  value={partners}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {`${partners} per page`}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-1 text-indigo-600">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )

}
