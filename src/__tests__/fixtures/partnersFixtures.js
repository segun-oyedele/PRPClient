export const initialStatePartner = {
  partners: [],
  activePartner: {}
};

export const initialStatePartners = {
  partners: [
    {
      id: 1,
      name: 'Partner Demo',
      email: 'partnerdemo@email.cdl',
      isActive: false,
      typesReport: ["API"]
    }
  ],
  activePartner: {}
};

export const initialStateActivePartner = {
  partners: [
    {
      id: 1,
      name: 'Partner Demo',
      email: 'partnerdemo@email.cdl',
      isActive: false,
      typesReport: ["API"]
    }
  ],
  activePartner: {
    id: 1,
    name: 'Partner Demo',
    email: 'partnerdemo@email.cdl',
    isActive: false,
    typesReport: ["API"]
  }
};

export const partnerDemo = {
  id: 1,
  name: 'Partner Demo',
  email: 'partnerdemo@email.cdl',
  isActive: false,
  typesReport: ["API"]
}