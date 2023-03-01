import { Links } from './';
import { navLinks } from '../data';

export const Navbar = () => {
  return (
    <nav className="relative hidden mx-auto md:block navbar">
      <Links
        navItems={ navLinks }
        classStyles="px-4 transition duration-300 hover:text-white font-medium"
      />
    </nav>
  );
};
