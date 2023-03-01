import PropTypes from 'prop-types';
import { HomeCardItem } from './';

export const HomeCardContainer = ({ items }) => {
  return (

    <div className="flex flex-col content-between min-h-full gap-6 grid-row-3 home__cards-containers xl:flex-row">
      {
        items.map((item) => (
          <HomeCardItem
            key={item.title}
            { ...item }
          />
        ))
      }
    </div>
  );
};

HomeCardContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(
    { 
      title: PropTypes.string.isRequired, 
      description: PropTypes.string.isRequired 
    }
  )).isRequired
};
