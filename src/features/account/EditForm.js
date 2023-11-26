import React, { useState } from 'react';
import agent from '../../app/api/agent';
import { Button, TextField, Typography, Grid, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Controller, useForm } from "react-hook-form";

const EditForm = () => {

    const[parkingId, setParkingId] = useState('');
    const { control, handleSubmit } = useForm({ mode: "onTouched" });

    const [parkings, setparkings] = useState('');

    const getParkings = async () => {
        agent.GetParkings.getParkings().then((response) => {
          setparkings(response.parkings);
          console.log(response.parkings);
        });
      };
    
      React.useEffect(() => {
        getParkings();
      }, []);
    
      const handleSubmitButton = (data) => {
        console.log("Formulario enviado", data);
        // Aquí va el resto de tu lógica para manejar el envío del formulario
      };
      


    
      
    return (
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
            <Typography variant="h3">Editar estacionamientos</Typography>
            <form onSubmit={handleSubmit(handleSubmitButton)} sx={{ mt: 4 }}>
              <Controller
                name="Pisos"
                control={control}
                defaultValue={parkings.floor_count}
                render={({ field }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    label="Cantidad de pisos"
                    autoFocus
                    {...field}
                    sx={{ mb: 2 }}
                  />
                )}

              />
              <Controller
                name="Estacionamientos por piso"
                control={control}
                defaultValue={parkings.places_per_floor}
                render={({ field }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    label="Cantidad de estacionamientos"
                    autoFocus
                    {...field}
                    sx={{ mb: 2 }}
                  />
                )}

              />

              <Controller
                name="Precio Base"
                control={control}
                defaultValue={parkings.base_price}
                render={({ field }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    label="precio base"
                    autoComplete="current-password"
                    {...field}
                  />
                )}


              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
              >
                Guardar cambios
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
    );
};
export default EditForm;
