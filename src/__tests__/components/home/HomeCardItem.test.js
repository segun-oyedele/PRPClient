import { render, screen, fireEvent } from '@testing-library/react';
import { HomeCardItem } from '@/components/home/HomeCardItem';

describe('Test on HomeCardItem', () => {
  test('should match with snapshot', () => {
    const { container } = render(<HomeCardItem title="" description="" />);

    expect(container).toMatchSnapshot();
  })
  
  test('should to show the title and description specified', () => {
    const { container } = render(<HomeCardItem title="title" description="description" />);
    
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
  })
})