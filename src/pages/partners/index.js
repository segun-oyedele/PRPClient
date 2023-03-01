import getStore from '../../store/store';
import { PlusSmIcon } from '@heroicons/react/solid';
import { tableHeadPartners } from '../../shared/data';
import { SearchBar } from '../../components/partners';
import { useFilter } from '../../shared/hooks/useFilter';
import { getPartners } from '../../store/partners/thunks';
import { setActivePartner, setOpenForm, setToken, useAppDispatch } from '../../store';
import { Layout, Table, PageTitle, Pagination, ButtonIcon } from '../../shared/components';
import { FilterByStatusButton } from '../../components/partners/FilterByStatusButton';
import { getToken } from '../../shared/helpers/fetch';

const Partners = () => {
  const { currentPage, searchText, setSearchText, partnersLength, currentPartners, handleSearch, handleChangePage, partnersPerPage } =  useFilter();
  const dispatch = useAppDispatch();
    
  const handleCloseForm = () => {
    dispatch(setOpenForm(false));
    dispatch(setActivePartner({}));
  }

  const handleEditPartner = (partner) => {
    dispatch(setActivePartner(partner));
    dispatch(setOpenForm(true));
  }

  return (
    <Layout
      headTitle="Partners"
    >
      <section className="relative flex flex-col items-center justify-between gap-6 px-5 mt-10 mb-10 xl:mt-24 lg:flex-row md:px-0 md:mb-10 filter_bar">
        <PageTitle title="Partners List" />
        
        <div className="flex flex-col w-full gap-4 md:w-auto md:flex-row md:justify-evenly md:gap-10">
          <SearchBar
            handleSearch={ handleSearch }
            setSearchText={ setSearchText }
            searchText={ searchText }
          />
          <FilterByStatusButton />
          <ButtonIcon
            btnLabel="Add New Partner"
            labelStyles="hidden xl:inline-block text-lg raleway-b"
            btnColors="primary-blue hover:opacity-90 transition duration-300 ease-in-out"
            btnStyles="rounded-full xl:rounded-lg xl:static xl:bottom-0 xl:right-0 fixed bottom-4 right-4 w-14 xl:h-auto xl:w-auto"
            onClick={ () => dispatch(setOpenForm(true))}
          >
            <PlusSmIcon className="text-white w-7 h-7 md:w-6 md:h-6 xl:hidden" />
          </ButtonIcon>
        </div>
      </section>

      <main className="mb-20">
        <Table
          tableStyles="w-full table-auto min-w-full max-w-fit"
          theadItems={ tableHeadPartners }
          theadTrGridStyles="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-evenly 2xl:grid-cols-[183px_270px_100px_487px_88px] items-center"
          tbodyItems={ currentPartners }
          tbodyTrGridStyles="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-evenly 2xl:grid-cols-[183px_270px_100px_487px_88px]"
          handleCloseForm={ handleCloseForm }
          handleEditPartner={ handleEditPartner }
        />

        <Pagination
          partnersPerPage={ partnersPerPage }
          totalPartners={ partnersLength }
          handleChangePage={ handleChangePage }
          currentPage={ currentPage }
        />
        </main>
    </Layout>
  );
};

export const getServerSideProps = async() => {
  const token = await getToken();
  const store = getStore();
  await store.dispatch(setToken(token));
  await store.dispatch(getPartners());
  return {
    props: {
      initialState: store.getState(),
    },
  };
};

export default Partners;
