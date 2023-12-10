import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Users from "../../features/account/Users";
import { Provider } from "react-redux";
import { store } from "../../app/store/store";
import { RouterProvider, BrowserRouter } from "react-router-dom";
import { router, AppRouter } from "../../app/router/Routes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../../app/store/store";
import userEvent from "@testing-library/user-event";

const newName = "Usuario1";
const emailToFind = "usuario1@example.com";
const editId = "editar-2";
const id = "id-2";
const confirmId = "confirm-2";

async function loginUser() {
  const emailInput = screen.getByLabelText(/correo electrónico/i);
  const passwordInput = screen.getByLabelText(/contraseña/i);
  const submitButton = screen.getByRole("button", { name: /iniciar sesión/i });

  act(() => {
    userEvent.type(emailInput, "admin@parknmove.com");
    userEvent.type(passwordInput, "password");
  });

  fireEvent.click(submitButton);
}

describe("Users", () => {
  test("After logging, should find users table", async () => {
    render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
        </PersistGate>
    </Provider>
    );
    await loginUser();

    const name = await screen.findByText(/Nombre/i);
    expect(name).toBeInTheDocument();
    const lastname = await screen.findByText(/Apellido/i);
    expect(lastname).toBeInTheDocument();
    const email = await screen.findByText(/Correo/i);
    expect(email).toBeInTheDocument();
    const role = await screen.findByText(/Prioridad/i);
    expect(role).toBeInTheDocument();
    const actions = await screen.findByText(/Acciones/i);
    expect(actions).toBeInTheDocument();
  });

  test("After logging, should find user with email usuario1@example.com", async () => {
    render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
        </PersistGate>
    </Provider>
    );

    const email = await screen.findAllByText(new RegExp(emailToFind, 'i'));
    expect(email.length).toBeGreaterThan(0);
  });

  test("After logging, should search a user with email usuario1@example.com", async () => {
    render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
        </PersistGate>
    </Provider>
    );

    const searchInput = screen.getByLabelText(/Buscar/i);
    act(() => {
      userEvent.type(searchInput, emailToFind);
    });
    const names = await screen.findAllByText(new RegExp(emailToFind, 'i'));
    expect(names.length).toBeGreaterThan(0);
  });

  test(`After logging, should click the edit button of ${emailToFind} row`, async () => {
    render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
        </PersistGate>
    </Provider>
    );

    const searchInput = screen.getByLabelText(/Buscar/i);
    act(() => {
      userEvent.type(searchInput, emailToFind);
    });
    const names = await screen.findAllByText(new RegExp(emailToFind, 'i'));
    expect(names.length).toBeGreaterThan(0);
    const buttons = screen.getAllByRole('button');
    const submitButton = buttons.find(button => button.getAttribute('data-testid') === editId);
    fireEvent.click(submitButton);
    const dialogTitles = screen.getAllByText('Editar cliente');
    const firstDialogTitle = dialogTitles[0];
    expect(firstDialogTitle).toBeInTheDocument();
  });

  /*test(`After logging, should edit the name of ${emailToFind}`, async () => {
    render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
        </PersistGate>
    </Provider>
    );

    const searchInput = screen.getByLabelText(/Buscar/i);
    act(() => {
      userEvent.type(searchInput, emailToFind);
    });
    const names = await screen.findAllByText(new RegExp(emailToFind, 'i'));
    expect(names.length).toBeGreaterThan(0);
    const buttons = screen.getByTestId(editId);;
    fireEvent.click(buttons);
    const nameInputs = document.getElementById(id);
    act(() => {
      userEvent.type(nameInputs, newName);
    });
    const confirmButtons = screen.getByTestId(confirmId);
    fireEvent.click(confirmButtons);
    await waitFor(() => {
      const updatedUser = screen.getByText(newName);
      expect(updatedUser).toBeInTheDocument();
    });
  });

    test("After logging, should not find users table with incorrect header", async () => {
    render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
        </PersistGate>
    </Provider>
    );

    await loginUser();

    await expect(screen.findByText(/Nombres/i)).rejects.toThrow();
  });

  test("After logging, should not find users table within incorrect timeout", async () => {
    render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
        </PersistGate>
    </Provider>
    );

    await loginUser();

    await expect(waitFor(() => {
      screen.getAllByText(/Diego/i);
    }, { timeout: 1 })).rejects.toThrow();
  });

  test("After logging, should not find users with name Pedro", async () => {
    render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
        </PersistGate>
    </Provider>
    );

    await loginUser();

    await expect(screen.findByText(/Pedro/i)).rejects.toThrow();
  });

  test("After logging, should not find users with name Diego within incorrect timeout", async () => {
    render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
        </PersistGate>
    </Provider>
    );

    await loginUser();

    await expect(waitFor(() => {
      screen.getAllByText(/Diego/i);
    }, { timeout: 1 })).rejects.toThrow();
  })*/;
});