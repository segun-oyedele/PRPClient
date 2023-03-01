import { TableHead } from './';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { ConfirmPopup } from './ConfirmPopup';
import { Form } from '../../components/partners/Form';
import { useAppSelector } from '../../store';
import { TableBody as TableBodyPartners } from '../../components/partners';

export const Table = (
  {
    theadItems,
    tbodyItems,
    theadTrGridStyles,
    theadTrColors,
    theadTrStyles,
    tbodyTrGridStyles,
    tbodyTrColors,
    tbodyTrStyles,
    tableStyles,
    handleCloseForm,
    handleEditPartner
  }
) => {

  const { openForm } = useAppSelector( state => state.partners );
  const [isOpen, setIsOpen] = useState(false);
  const [partnerToRemove, setPartnerToRemove] = useState({
    name: '',
    id: ''
  });

  const handleOpenPopup = () => {
    setIsOpen(true);
  }

  return (
    <>
      <table className={ tableStyles }>
        <TableHead
          theadItems={ theadItems }
          theadTrGridStyles={ theadTrGridStyles }
          theadTrColors={ theadTrColors }
          theadTrStyles={ theadTrStyles }
        />

        <TableBodyPartners
          tbodyItems={ tbodyItems }
          tbodyTrGridStyles={ tbodyTrGridStyles }
          tbodyTrColors={ tbodyTrColors }
          tbodyTrStyles={ tbodyTrStyles }
          handleEditPartner={ handleEditPartner }
          setPartnerToRemove={ setPartnerToRemove }
          handleOpenPopup={ handleOpenPopup }
        />
      </table>
      { openForm && <Form handleCloseForm={ handleCloseForm } /> }
      <ConfirmPopup
        isOpen={ isOpen }
        setIsOpen={ setIsOpen }
        onClick={ () => {  } }
        title="Remove partner"
        buttonTitle="Remove"
        description={`Do you want to remove ${ partnerToRemove.name } from the list of partners?`}
        colorsPrimaryBoton="bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:bg-red-600 active:bg-red-600 text-white"
      />
    </>
  );
};

Table.propTypes = {
  theadItems: PropTypes.array.isRequired,
  tbodyItems: PropTypes.array.isRequired,
  theadTrGridStyles: PropTypes.string.isRequired,
  tbodyTrGridStyles: PropTypes.string.isRequired,
  tableStyles: PropTypes.string.isRequired,
  handleCloseForm: PropTypes.func.isRequired,
  theadTrColors: PropTypes.string,
  theadTrStyles: PropTypes.string,
  tbodyTrColors: PropTypes.string,
  tbodyTrStyles: PropTypes.string
};
