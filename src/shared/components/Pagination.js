import PropTypes from 'prop-types';

export const Pagination = ({ partnersPerPage, totalPartners, handleChangePage, currentPage }) => {

  const pageNumbers = [];
  const totalPages = Math.ceil( totalPartners / partnersPerPage );
  const prevAvailable = currentPage > 1;
  const nextAvailable = currentPage < totalPages;

  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i+1);
  };

  return (
    <div className="grid items-center justify-center mt-5 gap-y-5 md:grid-flow-col md:justify-between justify-items-center pagination">

      <span className="current-pagination">Showing { currentPage * 10 > totalPartners ? totalPartners : currentPage * 10 } of { totalPartners }</span>

      {
        !nextAvailable && !prevAvailable ?
          null
        : 
        <div className="flex items-center gap-2 pagination_buttons">
          <button
            className="grid items-center grid-flow-col gap-1 px-4 py-2 text-base raleway-bl"
            onClick={ () => prevAvailable ? handleChangePage(currentPage - 1) : null }
          >
            <span>Previous</span>
          </button>
        {
          pageNumbers.map( number => (
            <button
              key={ number }
              className={`raleway-bl text-base w-6 h-6 leading-5 ${ currentPage === number ? 'current-page cursor-default bg-black text-white rounded-sm' : currentPage === (number - 1) ? 'bg-white next-page' : 'bg-white' } ${ (number > (currentPage + 2)) || (number < (currentPage - 2)) ? 'hidden' : ''  } pagination-item`}
              onClick={ () => handleChangePage(number) }
            >{ number }</button>
          ))
        }
        <button
          className="grid items-center grid-flow-col gap-1 px-4 py-2 text-base raleway-bl"
          onClick={ () => nextAvailable ? handleChangePage(currentPage + 1) : null }
        >
          <span>Next</span>
        </button>
        </div>
      }
    </div>
  );
};

Pagination.propTypes = {
  partnersPerPage: PropTypes.number.isRequired,
  totalPartners: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};
