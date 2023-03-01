import { useRef } from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from '@heroicons/react/solid';
import { ButtonIcon } from '../../shared/components';

export const SearchBar = ({ searchText, handleSearch }) => {

  const searchInputRef = useRef();

  const handleFocus = () => {
    searchInputRef.current.focus();
  }

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-96">
        <div className="relative flex items-stretch w-full input-group search_bar">
          <input
            type="search"
            className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal bg-clip-padding transition ease-in-out m-0 focus:outline-none bg-transparent"
            placeholder="Search By Name"
            aria-label="Search"
            aria-describedby="button-addon2"
            value={ searchText }
            onChange={ e => handleSearch(e.target.value) }
            ref={ searchInputRef }
          />
          <ButtonIcon
            onClick={ handleFocus }
            btnColors='bg-transparent'
            btnStyles='cursor-default'
          >
            <SearchIcon className="w-5 h-5 text-black" />
          </ButtonIcon>
        </div>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  searchText: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired
};
