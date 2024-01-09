import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore } from '../../store/appStore'
import "../../../i18n/i18n-config.js";

// SOURCE : https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

/*
export  function renderIn(customElement, customStore) {
  return (<div data-testid="test-root" >
    <Provider data-testid="test-provider" store={customStore}>{customElement}</Provider>
  </div>)
}
*/

import { createRoot } from "react-dom/client";



export  function renderIn(customElement) {
  let store = setupStore()
  let torender = (<Provider store={store}>{customElement}</Provider>)
  return { store, ...render(torender) }
}