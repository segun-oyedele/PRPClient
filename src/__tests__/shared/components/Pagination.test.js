import { render, screen, fireEvent} from '@testing-library/react';
import { Pagination } from '@/shared/components/Pagination';

describe('Test on Pagination', () => {
  
  test('should match with snapshot', () => {
    const { container } = render(<Pagination handleChangePage={ jest.fn() } totalPartners={ 12 } partnersPerPage={ 2 } currentPage={ 1 } />);

    expect( container ).toMatchSnapshot();
  });
  
  test('next button should to call handleChangePage at least one time', () => {
    const handleChangePage = jest.fn();

    render(<Pagination handleChangePage={ handleChangePage } totalPartners={ 12 } partnersPerPage={ 2 } currentPage={ 1 } />);

    const button = screen.getByRole('button', {
      name: /next/i
    });
    fireEvent.click(button);

    expect( handleChangePage ).toHaveBeenCalled();
    expect( handleChangePage ).toHaveBeenCalledTimes(1);
  });
  
  test('next button should do not have to call handleChangePage', () => {
    const handleChangePage = jest.fn();

    render(<Pagination handleChangePage={ handleChangePage } totalPartners={ 12 } partnersPerPage={ 2 } currentPage={ Math.ceil( 12 / 2 ) } />);

    const button = screen.getByRole('button', {
      name: /next/i
    });
    fireEvent.click(button);

    expect( handleChangePage ).not.toHaveBeenCalled();
    expect( handleChangePage ).toHaveBeenCalledTimes(0);
  });
  
  test('prev button should to call handleChangePage at least one time', () => {
    const handleChangePage = jest.fn();

    render(<Pagination handleChangePage={ handleChangePage } totalPartners={ 12 } partnersPerPage={ 2 } currentPage={ 2 } />);

    const button = screen.getByRole('button', {
      name: /prev/i
    });
    fireEvent.click(button);

    expect( handleChangePage ).toHaveBeenCalled();
    expect( handleChangePage ).toHaveBeenCalledTimes(1);
  });
  
  test('prev button should do not have to call handleChangePage', () => {
    const handleChangePage = jest.fn();

    render(<Pagination handleChangePage={ handleChangePage } totalPartners={ 12 } partnersPerPage={ 2 } currentPage={ 1 } />);

    const button = screen.getByRole('button', {
      name: /prev/i
    });
    fireEvent.click(button);

    expect( handleChangePage ).not.toHaveBeenCalled();
    expect( handleChangePage ).toHaveBeenCalledTimes(0);
  });

})