import React, { useState } from 'react';
import agent from '../../app/api/agent';
import { Button, TextField, Typography, Grid, Paper, Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import { Controller, useForm } from "react-hook-form";

const EditForm = ({ parking, onClose }) => {

  const { control, handleSubmit, setError } = useForm({ mode: "onTouched" });

    const [parkingId, setParkingId] = useState(parking.id);
    const [parkings, setparkings] = useState(parking);

    
      const handleSubmitButton = (data) => {
        if (data["Pisos"] > 10) {
          setError("Pisos", { type: "manual", message: "La cantidad de pisos no debe ser mayor a 10." });
          return;
        }
    
        if (data["Estacionamientos por piso"] > 20) {
          setError("Estacionamientos por piso", { type: "manual", message: "La cantidad de estacionamientos por piso no debe ser mayor a 20." });
          return;
        }
    
        if (data["Pisos"] < 0 || data["Estacionamientos por piso"] < 0) {
          setError("Pisos", { type: "manual", message: "No se permiten valores negativos." });
          setError("Estacionamientos por piso", { type: "manual", message: "No se permiten valores negativos." });
          return;
        }

        if (data["Precio Base"] < 0) {
          setError("Precio Base", { type: "manual", message: "El precio base no puede ser negativo." });
          return;
        }
        parkings.base_price = data["Precio Base"];
        parkings.floor_count = data["Pisos"];
        parkings.places_per_floor = data["Estacionamientos por piso"];
        console.log("Formulario enviado", parkings);
        try{
          console.log(parkings);
          agent.EditParking.editParking(parkings);
          onClose();

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
              render={({ field, fieldState }) => (
                <TextField
                  margin="dense"
                  fullWidth
                  label="Cantidad de pisos"
                  autoFocus
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error ? fieldState.error.message : null}
                  {...field}
                  sx={{ mb: 2 }}
                />
              )}
            />
    
            <Controller
              name="Estacionamientos por piso"
              control={control}
              defaultValue={parkings ? parkings.places_per_floor : ''}
              render={({ field, fieldState }) => (
                <TextField
                  margin="dense"
                  fullWidth
                  label="Cantidad de estacionamientos"
                  autoFocus
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error ? fieldState.error.message : null}
                  {...field}
                  sx={{ mb: 2 }}
                />
              )}
            />
    
            <Controller
              name="Precio Base"
              control={control}
              defaultValue={parkings ? parkings.base_price : ''}
              render={({ field, fieldState }) => (
                <TextField
                  margin="dense"
                  fullWidth
                  label="Precio base"
                  autoComplete="current-password"
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error ? fieldState.error.message : null}
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