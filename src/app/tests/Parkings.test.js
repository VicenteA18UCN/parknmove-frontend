import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Parkings from "../../features/account/Parkings"; // Cambiado el import para que coincida con el nombre del componente
import { Provider } from "react-redux";
import { store } from "../../app/store/store";
import { RouterProvider, BrowserRouter } from "react-router-dom";
import { router, AppRouter } from "../../app/router/Routes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../../app/store/store";
import parkingEvent from "@testing-library/parking-event";

describe("Parkings", () => {
  test("renders Parkings component", async () => {
    render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppRouter />
          <Parkings />
        </PersistGate>
      </Provider>
    </React.StrictMode>,
    );

    const element = await screen.findByText("Aquí puede editar los datos de este estacionamientos.");
    expect(element).toBeInTheDocument();
  });

  test("renders table with parking data", async () => {
    render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppRouter />
          <Parkings />
        </PersistGate>
      </Provider>
    </React.StrictMode>,
    );

    const addressCell = await screen.findByText("Dirección");
    const basePriceCell = await screen.findByText("Precio base");
    const floorAmountCell = await screen.findByText("Cantidad de pisos");
    const florCapacityCell = await screen.findByText("Espacios por piso");

    expect(addressCell).toBeInTheDocument();
    expect(basePriceCell).toBeInTheDocument();
    expect(floorAmountCell).toBeInTheDocument();
    expect(florCapacityCell).toBeInTheDocument();
  });

});