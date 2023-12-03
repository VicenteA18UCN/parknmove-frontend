import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import toast from "react-toastify";
import Login from "../../features/auth/Login";
import { Provider } from "react-redux";
import { store } from "../../app/store/store";
import { RouterProvider } from "react-router-dom";
import { router } from "../../app/router/Routes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../../app/store/store";
import userEvent from "@testing-library/user-event";

describe("Login", () => {
  test("renders Login component", async () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </PersistGate>
      </Provider>
    );

    const element = await screen.findByText("Inicia Sesión");
    expect(element).toBeInTheDocument();
  });

  test("renders Login form", () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </PersistGate>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("shows a toast when form is submitted empty", async () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </PersistGate>
      </Provider>
    );

    const submitButton = screen.getByRole("button", {
      name: /iniciar sesión/i,
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const toastElement = screen.getByText(/Debe completar todos los campos/i);
      expect(toastElement).toBeInTheDocument();
    });
  });
});
