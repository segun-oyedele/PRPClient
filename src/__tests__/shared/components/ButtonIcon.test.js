import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonIcon } from '@/shared/components/ButtonIcon';

describe('Test on ButtonIcon component', () => {
  
  test('should match with snapshot', () => {
    const { container } = render(<ButtonIcon onClick={ jest.fn() } btnLabel=''><p></p></ButtonIcon>);

    expect( container ).toMatchSnapshot();
  });

  test('should to call onClick', () => {
    const onClick = jest.fn();
    render(<ButtonIcon onClick={ onClick } btnLabel=''><p></p></ButtonIcon>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect( onClick ).toHaveBeenCalled();
    expect( onClick ).toHaveBeenCalledTimes(1);
  });

  test('should to render his children prop', () => {
    render(<ButtonIcon onClick={ jest.fn() } btnLabel=''><h1>Children prop</h1></ButtonIcon>);
    const heading = screen.getByRole('heading', { level: 1 });
    
    expect( heading ).toBeInTheDocument();
    expect( heading ).toHaveTextContent('Children prop');
  });

  test('should to have a specific label', () => {
    render(<ButtonIcon onClick={ jest.fn() } btnLabel='Label text'><h1>Children prop</h1></ButtonIcon>);
    const labelTest = screen.getByText('Label text');

    expect( labelTest ).toBeInTheDocument();
  });
})