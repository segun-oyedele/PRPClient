import { render, screen, fireEvent } from '@testing-library/react';
import { BurgerIcon } from '@/shared/components/BurgerIcon';

describe('Test on BurgerIcon component', () => {
  
  test('should match with snapshot', () => {
    const { container } = render(<BurgerIcon handleIsOpen={ jest.fn() } isOpen={ false } genericHamburgerLine="" />);
    expect( container ).toMatchSnapshot();
  });

  test('should to call handleIsOpen', () => {
    const handleIsOpen = jest.fn();

    render(<BurgerIcon handleIsOpen={ handleIsOpen } isOpen={ false } /> );
    const button = screen.getByRole('button');
    fireEvent.click(button);

    
    expect( handleIsOpen ).toHaveBeenCalled();
    expect( handleIsOpen ).toHaveBeenCalledTimes(1);
  });
  
})