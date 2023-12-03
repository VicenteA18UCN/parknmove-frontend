import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../../features/auth/Login";
import { Provider } from "react-redux";
import { store } from "../../app/store/store";
import { RouterProvider } from "react-router-dom";
import { router } from "../../app/router/Routes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../../app/store/store";

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
});
