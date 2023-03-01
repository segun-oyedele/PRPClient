import { useEffect, useState } from 'react';
import { setCurrentPage, useAppDispatch, useAppSelector } from '../../store';

export const useFilter = () => {

  const { sortedPartners, partnersPerPage, currentPage, partners } = useAppSelector( state => state.partners );
  const finalPartners = sortedPartners.map( partner => {
    const deleteRepetedReports = partner?.reportName.filter((obj, index, self) => self.findIndex(t => t?.report_name === obj?.report_name) === index)
    return {
      ...partner,
      email: partner.email,
      reportName: deleteRepetedReports.filter( report => !!report.active ),
    }
  });
  const dispatch = useAppDispatch();
  const [partnerFiltered, setPartnerFiltered] = useState([]);
  const [searchText, setSearchText] = useState('');

  const partnersLength = partnerFiltered.length || finalPartners.length;
  const myPartners = partnerFiltered && searchText.length ? partnerFiltered : finalPartners;

  // Get current partners.
  const indexOfLastPost = currentPage * partnersPerPage;
  const indexOfFirstPost = indexOfLastPost - partnersPerPage;
  const currentPartners = myPartners.slice(indexOfFirstPost, indexOfLastPost);
  
  const handleChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setPartnerFiltered( () => {
      return finalPartners.filter( partner => {
        return partner.partnerName.toLowerCase().includes(value.toLowerCase()) /*|| partner.email.toLowerCase().includes(value.toLowerCase())*/;
        } );  
      }
    );
    dispatch(setCurrentPage(1));
  };

  useEffect(() => {
    handleSearch(searchText);
  }, [sortedPartners, partners]);

  return {
    currentPage,
    searchText,
    partnerFiltered,
    setCurrentPage,
    setSearchText,
    setPartnerFiltered,
    currentPartners,
    partnersLength,
    handleChangePage,
    handleSearch,
    partnersPerPage
  };
};