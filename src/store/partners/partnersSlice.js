import { createSlice } from '@reduxjs/toolkit';
import { getPartners } from './thunks';

const initialState = {
  activePartner: {},
  activedSort: false,
  companyNamesOptions: [],
  currentPage: 1,
  error: false,
  isLoading: true,
  namedSort: false,
  openForm: false,
  partners: [],
  sortedPartners: [],
  partnersPerPage: 10,
  token: '',
};

export const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    addPartner: (state, action) => {
      const { client_id, partner_id, partner_name, partner_emails, active, partner_report_types, partner_report_time } = action.payload;
      const partner = state.partners.find(item => item.partnerId === partner_id);
      const partnerSorted = state.sortedPartners.find(item => item.partnerId === partner_id);
      if (partner) {
        partner.active = active;
        partner.clientId = client_id;
        partner.email = partner_emails;
        partner.partnerId = partner_id;
        partner.partnerName = partner_name;
        partner.reportName = partner_report_types,
        partner.reportTime = partner_report_time

        partnerSorted.active = active;
        partnerSorted.clientId = client_id;
        partnerSorted.email = partner_emails;
        partnerSorted.partnerId = partner_id;
        partnerSorted.partnerName = partner_name;
        partnerSorted.reportName = partner_report_types,
        partnerSorted.reportTime = partner_report_time
      } else {
        const { id, partner_emails, partner_name, partner_report_time, partner_report_types, partner_active, partner_id, client_id } = action.payload;
        const finalParter = {
          id: id,
          clientId: client_id,
          active: partner_active,
          email: partner_emails,
          partnerId: partner_id,
          partnerName: partner_name,
          reportTime: partner_report_time,
          reportName: partner_report_types
        };

        state.partners.push(finalParter);
        state.sortedPartners.unshift(finalParter);
      }
    },
    setActivePartner: (state, action) => {
      state.activePartner = action.payload ? action.payload : null;
    },
    setOpenForm: (state, action) => {
      state.openForm = action.payload;
    },
    setPartnersPerPage: (state, action) => {
      state.partnersPerPage = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    showAllPartners: (state) => {
      state.sortedPartners = [...state.partners].reverse();
    },
    sortByActive: (state) => {
      state.sortedPartners = [...state.partners].reverse().filter((partner) => partner.active === 1);
    },
    sortByInactive: (state) => {
      state.sortedPartners = [...state.partners].reverse().filter((partner) => partner.active === 0);
    },
    setCompanyNamesOptions: (state, action) => {
      state.companyNamesOptions = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPartners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPartners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.partners = action.payload.map( partner => {
          return {
            id: partner.id,
            clientId: partner.client_id,
            partnerId: partner.partner_id,
            partnerName: partner.partner_name,
            email: partner.partner_emails,
            active: partner.partner_active,
            reportTime: partner.partner_report_time,
            reportName: partner.partner_report_types
          };
        });
        state.sortedPartners = [...state.partners].reverse().filter((partner) => partner.active === 1);
      })
      .addCase(getPartners.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const { setLoading, setToken, addPartner, setPartnersPerPage, setCurrentPage, setActivePartner, filterPartners, setOpenForm, showAllPartners, sortByActive, sortByInactive,setCompanyNamesOptions} = partnersSlice.actions;

export default partnersSlice.reducer;