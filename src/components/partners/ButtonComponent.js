import PropTypes from 'prop-types';

export const ButtonComponent = ({ handleClick, buttonText, isPrimary }) => {
  if (isPrimary) {
    return (
      <button
        type="button"
        className="inline-flex items-center justify-center h-full px-4 py-2 text-sm font-medium text-white transition duration-300 border border-transparent rounded-md button__component button__component-primary focus:outline-none focus-visible:ring-2"
        onClick={ handleClick }
      >
        { buttonText }
      </button>
    )
  } else {
    return (
      <button
        type="button"
        className="inline-flex items-center justify-center h-full px-4 py-2 text-sm font-medium transition duration-300 border border-transparent rounded-md button__component button__component-second focus:outline-none focus-visible:ring-2"
        onClick={ handleClick }
      >
        { buttonText }
      </button>
    )
  }
}

ButtonComponent.propTypes = {
  handleClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  isPrimary: PropTypes.bool
}
