import { addPartner, editPartner, partnersSlice, removePartner, setActivePartner } from "../../../store";
import { initialStatePartner, initialStateActivePartner, initialStatePartners, partnerDemo } from "../../fixtures/partnersFixtures";

describe('Test on authSlice', () => {

  test('should show an initialState of partners and its called partners', () => {
  
    const state = partnersSlice.reducer(initialStatePartner, {});

    expect(partnersSlice.name).toBe('partners');
    expect(state).toEqual(initialStatePartner); 
  
  });

  test('should add a partner to the state', () => {

    const state = partnersSlice.reducer(initialStatePartner, addPartner(partnerDemo));

    expect(state).toEqual(initialStatePartners); 

  });

  test('should edit an existing partner', () => {

    const partnerEdited = {
      id: 1,
      name: 'Partner edited',
      email: 'partneredited@email.cdl',
      isActive: false,
      typesReport: ["API"]
    }
    const state = partnersSlice.reducer(initialStatePartners, editPartner(partnerEdited));
    
    expect(state.partners[0]).not.toEqual(initialStatePartners);
    expect(state.partners[0]).toEqual(partnerEdited);
  });

  test('should show an active partner', () => {
    
    const state = partnersSlice.reducer(initialStatePartners, setActivePartner(partnerDemo));
    
    expect(state).toEqual(initialStateActivePartner);
  
  });

  test('should delete an selected partner', () => {
  
    const toRemovePartner = partnersSlice.reducer(initialStatePartners, removePartner(partnerDemo.id));
  
    expect(initialStatePartner).toEqual(toRemovePartner);
  
  });

})