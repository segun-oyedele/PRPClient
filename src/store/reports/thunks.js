import { fetchPartner, fetchPartnerQuery } from '../../shared/helpers/fetch';

const baseURL = 'https://apps.cdldelivers.com/prpserver/api/report';

const addReportTypeObj = {
  "report_type_id": 1234567,
  "report_name": "labore in pariatur ex",
  "date_created": "2002-04-11T09:14:45.389Z",
  "date_modified": "1993-07-12T08:00:11.572Z"
}

const editReportTypeObj = {
  "report_type_id": 1234567,
  "report_name": "labore in pariatur ex",
  "date_created": "2002-04-11T09:14:45.389Z",
  "date_modified": "1993-07-12T08:00:11.572Z"
}

/* GET ALL THE REPORTS */

export const getReportTypes = async() => {
  const response = await fetchPartnerQuery(baseURL, `getreporttypes`);
  const body = await response.json();
  console.log('getReportTypes', body);
}

/* GET POD REPORT */

export const getPODReport = async(inputDate, clientID) => {
  const response = await fetchPartnerQuery(baseURL, `getpodreport?inputDate=${inputDate}&clientID=${clientID}`);
  const body = await response.json();
  console.log('getPODReport', body);
}

/* GET SCAN REPORT */

export const getScanReport = async(inputDate, clientID) => {
  const response = await fetchPartnerQuery(baseURL, `getscanreport?inputDate=${inputDate}&clientID=${clientID}`);
  const body = await response.json();
  console.log('getScanReport', body);
}

/* GET EXCEPTION REPORT */

export const getExceptionReport = async(inputDate, clientID) => {
  const response = await fetchPartnerQuery(baseURL, `getexceptionreport?inputDate=${inputDate}&clientID=${clientID}`);
  const body = await response.json();
  console.log('getExceptionReport', body);
}

/* ADD REPORT TYPE */

export const addReportType = async(data = addReportTypeObj) => {
  const response = await fetchPartner(baseURL, 'addreporttype', undefined, data, 'POST');
  const body = await response.json();
  console.log('addReportType', body);
}

/* EDIT REPORT TYPE */

export const editReportType = async(data = editReportTypeObj) => {
  const response = await fetchPartner(baseURL, 'editreporttype', undefined, data, 'PUT');
  const body = await response.json();
  console.log('Edit report type', body);
}

/* REMOVE REPORT TYPE */

export const removeReportType = async(idReportType) => {
  const response = await fetchPartnerQuery(baseURL, `removereporttype?idreporttype=${idReportType}`, 'DELETE');
  const body = await response.json();
  console.log('Remove report type', body);
}