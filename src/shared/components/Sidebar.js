import { Links } from './';
import { BurgerIcon } from './';
import { navLinks } from '../data';
import { hideSidebar, showSidebar, useAppDispatch, useAppSelector } from '../../store';

export const Sidebar = () => {
  const { isOpen } = useAppSelector( state => state.sidebar);
  const dispatch = useAppDispatch();
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-white transition ease transform duration-300`;

  const handleIsOpen = () => {
    isOpen ? dispatch( hideSidebar() ) : dispatch( showSidebar() );
  }

  const handleCloseSidebar = ({ target }) => {
    if (!target.classList.contains('sidebar')) {
      dispatch( hideSidebar() );
    }
  } 

  return (
    <section className={`fixed z-30 w-screen h-screen md:hidden transition-colors duration-300 ${ isOpen ? 'bg-slate-200/50 ml-0' : '-ml-96' }`} onClick={ handleCloseSidebar }>
      <aside
        className={`sidebar fixed top-0 left-0 z-20 flex flex-col w-60 h-full py-8 bg-white shadow-lg gap-7 transition-all duration-300 md:hidden ${ isOpen ? 'ml-0' : '-ml-96' }`}
      >
        <Links
          navItems={navLinks}
          classStyles="block h-10 text-xl leading-10 px-8 transition duration-300 hover:text-black sidebar"
        />
      </aside>

      <BurgerIcon
        handleIsOpen={ handleIsOpen }
        isOpen={ isOpen }
        genericHamburgerLine={ genericHamburgerLine }
      />

    </section>
  );
};
