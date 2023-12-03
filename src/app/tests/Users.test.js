import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Users from "../../features/account/Users"; // Cambiado el import para que coincida con el nombre del componente
import { Provider } from "react-redux";
import { store } from "../../app/store/store";
import { RouterProvider, BrowserRouter } from "react-router-dom";
import { router, AppRouter } from "../../app/router/Routes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../../app/store/store";
import userEvent from "@testing-library/user-event";

describe("Users", () => {
  test("renders Users component", async () => {
    render(
      <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppRouter />
          <Users />
        </PersistGate>
      </Provider>
    </React.StrictMode>,
    );

    const element = await screen.findByText("Aquí puede editar los datos de este cliente.");
    expect(element).toBeInTheDocument();
  });

  test("renders table with user data", async () => {
    render(
      <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppRouter />
          <Users />
        </PersistGate>
      </Provider>
    </React.StrictMode>,
    );

    const nameCell = await screen.findByText("Nombre");
    const lastnameCell = await screen.findByText("Apellido");
    const emailCell = await screen.findByText("Correo");
    const priorityCell = await screen.findByText("Prioridad");

    expect(nameCell).toBeInTheDocument();
    expect(lastnameCell).toBeInTheDocument();
    expect(emailCell).toBeInTheDocument();
    expect(priorityCell).toBeInTheDocument();
  });

});