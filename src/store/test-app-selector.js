
const store = {
  sidebar: false,
  partners: []
};

const store2 = {
  partners: [
    {
      id: 1,
      name: 'Partner Demo',
      email: 'partnerdemo@email.cdl',
      isActive: false,
      typesReport: ["API"]
    }
  ]
};

export const testUseAppSelector = (myFunction) => myFunction(store);

export const testUseAppSelectorFilter = (myFunction) => myFunction(store2);