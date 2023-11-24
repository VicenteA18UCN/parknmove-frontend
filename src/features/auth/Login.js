import * as React from "react";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Controller, useForm } from "react-hook-form";
import agent from "../../app/api/agent";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../account/userSlice";
import { selectId } from "../account/userSlice";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#10B981",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const Login = () => {
  const { control, handleSubmit } = useForm({ mode: "onTouched" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector(selectId);
  console.log(id);

  const handleSubmitButton = (data) => {
    agent.Login.login(data.email, data.password)
      .then((response) => {
        dispatch(login(response.token));
        console.log(response.token);
        console.log(response);
        navigate("/main/welcome");
      })
      .catch((error) => {
        let errorMessage = error.response.data.errors;
        console.log(errorMessage);
        console.log(error.response);
      })
      .finally(() => {
        console.log("finally");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100vh",
          background: "linear-gradient(to bottom, #d4fcdf, #10B981)",
        }}
      >
        <Grid
          item
          xs={10}
          sm={5}
          md={5}
          lg={5}
          xl={5}
          sx={{ textAlign: "center" }}
        >
          <Paper elevation={3} sx={{ p: 4, border: "2px" }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: { xs: 40, sm: 40, md: 45, lg: 55, xl: 70 },
              }}
            >
              ParknMove
            </Typography>
            <Typography variant="h3">Iniciar sesión</Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              ¡Hola! Qué gusto verte otra vez.
            </Typography>

            <form onSubmit={handleSubmit(handleSubmitButton)} sx={{ mt: 4 }}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    label="Correo electrónico"
                    autoFocus
                    {...field}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />
                )}
                rules={{ required: "Campo obligatorio" }}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    label="Contraseña"
                    type="password"
                    autoComplete="current-password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                    {...field}
                  />
                )}
                rules={{ required: "Campo obligatorio" }}
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
              >
                Iniciar sesión
              </Button>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              ></Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
