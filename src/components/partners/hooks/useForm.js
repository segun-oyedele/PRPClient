import { useCallback, useRef, useState } from 'react';
import moment from 'moment';

import { initialPartnerState, reportTypesTest } from '../../../shared/data';
import { alertPopup } from '../../../shared/helpers/alertPopup';
import { setActivePartner, useAppDispatch, useAppSelector } from '../../../store';
import { addNewPartner, editCurrentPartner } from '../../../store/partners/thunks';

const errorFormInitialState = {
  partnerName: {
    error: false,
    errorMessage: ''
  },
  email: {
    error: false,
    errorMessage: ''
  }
}

const currentDate = moment().toDate();

export const useForm = () => {

  const dispatch = useAppDispatch();
  const { activePartner, partners } = useAppSelector(state => state.partners);
  const { clientId, partnerId, partnerName, email, active, reportName, reportTime } = activePartner || initialPartnerState;
  const [isActivePartner, setIsActivePartner] = useState(active || 0);
  const [emailEdited, setEmailEdited] = useState([]);
  const [newEmail, setNewEmail] = useState([]);
  const [deletedEmails, setDeletedEmails] = useState([]);
  const savedDate = useRef(!!reportTime ? new Date(reportTime) : currentDate);
  const [ reportDate, setReportDate ] = useState( !!reportTime ? new Date(reportTime) : currentDate );
  const mergeReportObjects = reportTypesTest.map(report => {
    const reportObject = reportName?.find(item => item?.report_name === report?.report_name);
    return {
      ...report,
      active: !!reportObject?.active ? reportObject.active : 0
    }
  });
  const [reportTypes, setReportTypes] = useState([...mergeReportObjects]);
  const [errorForm, setErrorForm] = useState(errorFormInitialState);
  const [formData, setFormData] = useState({
    clientId: clientId || '',
    partnerId: partnerId || Math.floor(Math.random() * 1000000),
    partnerName: partnerName || '',
    email: !email?.length ? [{ partner_id: partnerId, partner_email: '' }] : [...email],
  });

  const isValidConditions = formData?.partnerName?.length !== 0;
  const [isValidData, setIsValidData] = useState(isValidConditions);

  
  const companyNameExist = useCallback((companyName) => partners.some(partner => {
    return partner.partnerName === companyName;
  }), [partners]);

  const repeatedEmails = useCallback(() => formData.email.some((email, index) => {
    return formData.email.findIndex(item => item.partner_email === email.partner_email) !== index;
  }), [formData.email]);

  const handleTypeReport = (value, typeName) => {
    setReportTypes(prev => (
      prev.map(item => {
        if (item.report_name === typeName) {
          return { ...item, active: value };
        }
        return item;
      })
    ));
  };

  const handleChangeDateTime = (date) => {
    if(moment(date).isBefore(savedDate.current) || date === null) return;
    setReportDate(date);
  }

  const handleAddEmail = () => {
    setFormData({ ...formData, email: [...formData.email, { partner_id: partnerId, partner_email: '' }] });
  }

  const handleRemoveEmail = (index) => {
    setFormData({ ...formData, email: formData.email.filter((_, i) => i !== index) });
    setDeletedEmails( prev => {
      const emailId = formData.email[index].partner_email_id;
      if(emailId) {
        const findEmail = formData.email.find(email => email.partner_email_id === emailId);
        return [...prev, findEmail];
      } else {
        return prev;
      }
    })
  }

  const handleSaveEmail = (e, index, emailId) => {
    const { value } = e.target;
    const newValue = [...formData.email];
    newValue[index] = { ...newValue[index], partner_email: value };
    setFormData({ ...formData, email: newValue });
    if (emailId) {
      const { partner_email, ...rest } = formData.email.find(item => item.partner_email_id === emailId);
      setEmailEdited([...emailEdited, { ...rest, email: value }]);
    } else {
      setNewEmail([...newEmail, { partner_id: partnerId, partner_email: value }]);
    }
  }

  const handleFormChange = (e) => {
    const { companyName, clientID } = e;
    if (!companyName.length) {
      setErrorForm({
        ...errorForm,
        partnerName: {
          error: true,
          errorMessage: 'Company name is required'
        }
      });
      return;
    }

    const partnertExist = companyNameExist(companyName);

    if(!partnertExist) {
      const isValidConditions = companyName.length > 2 && errorForm.partnerName.error === false && errorForm.email.error === false;
      if (isValidConditions) {
        setIsValidData(true);
        setErrorForm({ ...errorForm, partnerName: { error: false, errorMessage: '' } });
        setFormData({ ...formData, partnerName: companyName, clientId: clientID });
      }
    } else {
      setErrorForm({
        ...errorForm,
        partnerName: {
          error: true,
          errorMessage: 'This company name is already registered'
        }
      });
      setIsValidData(false);
      return;
    }
  }

  const handleSubmitForm = async () => {

    const { partnerId, partnerName, email, clientId } = formData;
    if ((!partnerName.length || partnerName.length < 3)) {
      setErrorForm({
        ...errorForm,
        partnerName: {
          error: true,
          errorMessage: 'Name must be at least 3 characters'
        }
      });
      return;
    }

    if (errorForm.email.error || errorForm.partnerName.error) {
      return;
    }
    
    setErrorForm(errorFormInitialState);
    const emailsNoEmpty = email.filter(item => item.partner_email.length > 0);
    let partner = {
      client_id: clientId,
      partner_id: partnerId,
      partner_emails: emailsNoEmpty,
      partner_name: partnerName,
      partner_report_types: [...reportTypes],
      partner_report_time: moment(reportDate).format(),
      partner_active: isActivePartner
    };
    setFormData(initialPartnerState);
    if (activePartner.partnerId) {
      const { partner_active, ...rest } = partner;
      const partnerToEdit = {
        ...rest,
        active: partner_active
      };
      const { payload } = await dispatch(editCurrentPartner({ partnerToEdit, deletedEmails }));
      if(payload) {
        alertPopup('Partner data successfully saved');
      } else {
        alertPopup('Error saving partner data', 'error');
      }
    } else {
      const { 
        partner_id, 
        active: partner_active,
        ...rest
      } = partner;
      const { payload } = await dispatch(addNewPartner(rest));
      if (payload) {
        alertPopup('Partner data successfully saved');
      } else {
        alertPopup('Error saving partner data', 'error');
      }
    }
    setIsActivePartner(0);
    dispatch(setActivePartner({}));
  }

  return {
    name: formData.partnerName,
    email: formData.email,
    handleTypeReport,
    handleFormChange,
    handleSubmitForm,
    handleAddEmail,
    handleSaveEmail,
    isActivePartner,
    setIsActivePartner,
    reportName: reportTypes,
    setErrorForm,
    handleRemoveEmail,
    errorForm,
    isValidData,
    handleChangeDateTime,
    reportDate,
    repeatedEmails
  };
};
