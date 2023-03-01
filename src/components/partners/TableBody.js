import PropTypes from 'prop-types';
import { PencilAltIcon } from '@heroicons/react/solid';
import { useAppSelector } from '../../store/hooks';

const trColorsDefault = 'text-gray-600 bg-white';
const trStylesDefault = 'text-sm leading-normal';

export const TableBody = ({ tbodyItems, tbodyTrStyles, tbodyTrColors, tbodyTrGridStyles, handleEditPartner }) => {

  const { currentPage } = useAppSelector(state => state.partners);

  return (
    <tbody>
      {
        tbodyItems.map(({ id, clientId, partnerId, partnerName, email = [{ partner_email: "" }], active, reportName = [], reportTime }, index) => (
          <tr
            key={`${partnerName}-${partnerId}`}
            className={`h-20 items-center lg:items-start pt-3 xl:pt-6 table-partner-item select-none ${tbodyTrStyles || trStylesDefault} ${tbodyTrColors || trColorsDefault} ${tbodyTrGridStyles || ''}`}
          >
            <td
              onDoubleClick={() => handleEditPartner({ id, clientId, partnerId, partnerName, email, active, reportName })}
              className="px-6 text-base text-left truncate cursor-pointer raleway-m max-h-16 table_text-black"
              title={partnerName}
            ><span className="mr-5 table_text-black">{ currentPage > 1 ? ((currentPage - 1) * 10) + (index + 1) : index + 1}</span> {partnerName}</td>
            <td
              onDoubleClick={() => handleEditPartner({ id, clientId, partnerId, partnerName, email, active, reportName })}
              className="hidden max-h-full px-6 text-left cursor-pointer lg:grid"
            >
              {email?.map(({ partner_email }, index) => index < 3 && (
                <span key={`${partner_email}+${index}`} className="h-5 mb-1 text-base truncate table_text-black">{partner_email ?? ''}</span>
              ))}
            </td>
            <td
              onDoubleClick={() => handleEditPartner({ id, clientId, partnerId, partnerName, email, active, reportName })}
              className="hidden px-6 text-center cursor-pointer max-h-16 sm:block"
            >{active ? <span className="block w-20 mx-auto text-base leading-8 text-center uppercase status active raleway-sb">Active</span> : <span className="block mx-auto text-base leading-8 text-center uppercase status inactive raleway-sb">Inactive</span>}</td>
            <td
              onDoubleClick={() => handleEditPartner({ id, clientId, partnerId, partnerName, email, active, reportName })}
              className="relative justify-start hidden grid-flow-col gap-1 px-6 text-center cursor-pointer max-h-16 2xl:grid justify-items-center reports group"
            >
              { reportName.length > 0 ?
                <>
                  { reportName.map(({ report_name }, index) => (
                    <span key={`${report_name}+${index}`} className={`text-base text-white px-1 2xl:px-3 py-1 uppercase rounded-full whitespace-nowrap table__report-type ${report_name?.toLowerCase()}`}>{report_name}</span>
                  ))}
                </>
                : <span>No reports</span>
              }
            </td>
            <td className="grid justify-center grid-flow-col gap-5 px-6 py-3 text-center max-h-16 justify-items-center">
              <PencilAltIcon
                className="w-6 h-6 text-gray-700 transition-colors duration-300 cursor-pointer hover:text-cyan-600"
                title="Edit"
                onClick={() => handleEditPartner({ id, clientId, partnerId, partnerName, email, active, reportName, reportTime })}
              />
            </td>
          </tr>
        ))
      }
      {
        !tbodyItems.length &&
        <tr className="h-20 border-b border-gray-200 md:h-20 table-partner-item">
          <td className="text-lg font-medium text-center text-gray-400 uppercase">NO PARTNERS TO SHOW</td>
        </tr>
      }
    </tbody>
  );
};

TableBody.propTypes = {
  tbodyItems: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.number,
      partnerName: PropTypes.string.isRequired,
      email: PropTypes.array,
      active: PropTypes.number.isRequired,
      reportName: PropTypes.array
    }
  )).isRequired,
  tbodyTrStyles: PropTypes.string,
  tbodyTrColors: PropTypes.string,
  tbodyTrGridStyles: PropTypes.string,
  handleEditPartner: PropTypes.func.isRequired
};
