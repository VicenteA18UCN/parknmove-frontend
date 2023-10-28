import * as React from "react";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import "./Login.css";
import agent from "../../app/api/agent";

const Login = () => {
  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     const email = data.get("user")?.toString() ?? "";
  //     const password = data.get("password")?.toString() ?? "";
  //     sendData(email, password);
  //   };

  //   const sendData = (email, password) => {
  //     console.log(email, password);
  //     agent.Auth.login({ email, password })
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err))
  //       .finally(() => console.log("Finally triggered"));
  //   };
  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="md">
        <Box
          component="form"
          sx={{
            mt: 1,
            marginTop: 8,
            marginLeft: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
            border: "#000000",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
            padding: 4,
            width: 470,
            height: 470,
          }}
          //   onSubmit={handleSubmit}
          noValidate
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontFamily: "Marck Script, cursive", fontSize: "45px" }}
          >
            ParknMove
          </Typography>

          <br />

          <TextField
            margin="normal"
            required
            id="user"
            label="Correo electrónico o usuario"
            name="user"
            InputLabelProps={{
              sx: {
                fontFamily: "Mulish, sans-serif",
                fontWeight: 300,
              },
            }}
            sx={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
              width: 350,
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Contraseña"
            name="password"
            type="password"
            InputLabelProps={{
              sx: {
                fontFamily: "Mulish, sans-serif",
                fontWeight: 300,
              },
            }}
            sx={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
              width: 350,
              mt: 3,
              mb: 0,
            }}
          />

          <Box>
            <p className="p-forgot-password">
              ¿Te olvidaste de tu contraseña?{" "}
              <a className="a-forgot-password" href="#">
                {" "}
                Restablecer contraseña
              </a>
            </p>
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 1,
              mb: 3,
              width: 350,
              borderRadius: 3,
              background: "linear-gradient(to right, #3969FC, #4B2AFF)",
              fontFamily: "Murecho, sans-serif",
              fontWeight: 400,
              fontSize: 25,
              textTransform: "none",
              height: 45,
            }}
          >
            Entrar
          </Button>

          <hr className="custom-hr" />

          <Box sx={{ mt: 3 }}>
            <p className="p-forgot-password-v2">
              ¿No tienes cuenta?{" "}
              <a className="a-forgot-password" href="#">
                {" "}
                Regístrate
              </a>
            </p>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
