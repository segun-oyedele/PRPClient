import { render } from '@testing-library/react';
import { PageTitle } from '@/shared/components/PageTitle';

describe('Test on PageTitle component', () => {
  
  test('should match with snapshot', () => {
    const { container } = render(<PageTitle title="Test title" />);
    expect( container ).toMatchSnapshot();
  })

  test('should to show a custom title', () => {
    const { getByText } = render(<PageTitle title="Test title" />);
    expect(getByText('Test title')).toBeInTheDocument();
  })
  
})