import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const ActiveLink = ({ label, href, stylesClass, navPath }) => {
  const router = useRouter();

  const [isActive, setIsActive] = useState(router.pathname === navPath);
  const activeStyles = isActive ? 'md:text-white raleway-eb cursor-default' : 'nav_link-inactive';

  const handleClick = (event) => {
    event.preventDefault();
    setIsActive(true);
    router.push(href);
  }

  useEffect(() => {
    setIsActive(router.pathname === navPath);
  }, [router.pathname]);
  

  if( isActive ) {
    return (
      <a
        className={`${ activeStyles } ${ stylesClass }`}
      >{ label }</a>
    );
  } else {
    return(
      <a
        href={ href }
        onClick={ handleClick }
        className={`${ activeStyles } ${ stylesClass }`}
      >{ label }</a>
    );
  }
};

ActiveLink.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  stylesClass: PropTypes.string,
  navPath: PropTypes.string.isRequired
};
