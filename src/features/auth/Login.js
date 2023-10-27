import * as React from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import Box from "@mui/material/Box";
import "./Login.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import agent from "../../app/api/agent";
import { useNavigate, Link } from "react-router-dom";
import { green } from "@mui/material/colors";
import { auto } from "@popperjs/core";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onTouched" });
  const navigate = useNavigate();

  const handleSubmitButton = (data) => {
    agent.Login.login(data.email, data.password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        let errorMessage = error.response.data.errors;
        console.log(errorMessage);
        console.log(error.response);
      })
      .finally(() => {
        reset();
      });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", background: "#2F8059" }}
    >
      <Grid item xs={12} sm={8} md={6} sx={{ textAlign: "center" }}>
        <Paper elevation={3} sx={{ p: 4, border: "2px solid black" }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: 40, sm: 60, md: 80 },
            }}
          >
            ParknMove
          </Typography>
          <Typography variant="h3">Iniciar sesión</Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            ¡Hola! Qué gusto verte otra vez.
          </Typography>

          <form onSubmit={handleSubmit(handleSubmitButton)} sx={{ mt: 4 }}>
            <Typography variant="body2" sx={{ color: "#2F8059" }}>
              Email
            </Typography>
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
                  sx={{ mb: 2 }}
                />
              )}
              rules={{ required: "Campo obligatorio" }}
            />

            <Typography variant="body2" sx={{ color: "#2F8059" }}>
              Contraseña
            </Typography>
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
                  {...field}
                />
              )}
              rules={{ required: "Campo obligatorio" }}
            />

            <Button
              fullWidth
              variant="contained"
              color="success"
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
            >
              <Typography variant="h6">
                ¿No tienes cuenta? <a href="#">Regístrate</a>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
