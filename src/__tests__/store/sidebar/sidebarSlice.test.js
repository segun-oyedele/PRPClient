import { hideSidebar, showSidebar, sidebarSlice } from "../../../store";
import { initialStateSidebar, initialStateSidebarShowing } from "../../fixtures/sidebarFixtures"

describe('Testing sidebarSlice', () => {
  test('should show change the sidebar state to true', () => {
    const state = sidebarSlice.reducer( initialStateSidebar, showSidebar() );
    expect(state).toEqual(initialStateSidebarShowing);
  })

  test('should show change the sidebar state to false', () => {
    const state = sidebarSlice.reducer( initialStateSidebar, hideSidebar() );
    expect(state).toEqual(initialStateSidebar);
  }) 
});