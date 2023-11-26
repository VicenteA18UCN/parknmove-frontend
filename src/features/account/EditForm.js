import React, { useState } from 'react';
import agent from '../../app/api/agent';
import { Button, TextField, Typography, Grid, Paper, Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Controller, useForm } from "react-hook-form";

const EditForm = ({ parking }) => {

    const { control, handleSubmit } = useForm({ mode: "onTouched" });

    const [parkingId, setParkingId] = useState(parking.id);
    const [parkings, setparkings] = useState(parking);

    
      const handleSubmitButton = (data) => {
        parkings.base_price = data["Precio Base"];
        parkings.floor_count = data["Pisos"];
        parkings.places_per_floor = data["Estacionamientos por piso"];
        console.log("Formulario enviado", parkings);
        try{
          console.log(parkings);
          agent.EditParking.editParking(parkingId, parkings);

        }catch(error){
          console.log(error);
        }
        
      };
      
    return (


          <Paper elevation={3} sx={{ p: 4, border: "2px" }}>
            <Typography variant="h3">Editar estacionamientos</Typography>
            <form onSubmit={handleSubmit(handleSubmitButton)} sx={{ mt: 4 }}>
            <Controller
              name="Pisos"
              control={control}
              defaultValue={parkings ? parkings.floor_count : ''}
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
              defaultValue={parkings ? parkings.places_per_floor : ''}
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
              defaultValue={parkings ? parkings.base_price : ''}
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



    );
};
export default EditForm;
