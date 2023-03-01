import PropTypes from 'prop-types';
import { ActiveLink } from './';

export const Links = ({ navItems, classStyles }) => {
  return (
    <>    
      {
        navItems.map(({ to, label, navPath }) => (
          <ActiveLink
            key={ label }
            href={ to }
            label={ label }
            stylesClass={ classStyles }
            navPath={ navPath }
          />
        ))
      }
    </>
  );
};

Links.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape(
    {
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired 
    }
  )).isRequired,
};
