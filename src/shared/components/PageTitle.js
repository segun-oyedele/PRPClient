import PropTypes from 'prop-types';

export const PageTitle = ({ title }) => {
  return (
    <h2 className="text-xl font-bold table_text-black">{ title }</h2>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
};
