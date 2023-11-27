import * as React from "react";
import { Button, Container, Typography, Paper } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Navbar from "../../app/layout/Navbar";
import agent from "../../app/api/agent";

import { selectName, selectLastname } from "./userSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./userSlice";

const pages = ["Usuarios", "Estacionamientos", "Reportes"];

const History = () => {
  const [reservations, setReservations] = React.useState([]);
  const[userName, setUserName] = React.useState("")
  const[address, setAddress] = React.useState("")

  const getReservations = async () => {
    try{
        agent.GetReservations.getReservations().then((response) => {
          console.log(response);
            setReservations(response.history);
            console.log(reservations);
        });
    }catch(error){
        console.log(error);
    }
    };

  React.useEffect(() => {
    getReservations();
  }, []);

  return (
    <>
|     <Navbar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre Usuario</TableCell>
              <TableCell align="right">Direccion</TableCell>
              <TableCell align="right">Fecha de entrada</TableCell>
              <TableCell align="right">Hora de entrada</TableCell>
              <TableCell align="right">Hora de salida</TableCell>
              <TableCell align="right">Precio total</TableCell>
              <TableCell align="right">Tarifa por disponibilidad</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
            {reservations.map((reservation) => (
              <TableRow
                key={reservation.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                    <TableCell component="th" scope="row">
                    {reservation.user_id}
                    </TableCell>
                    <TableCell align="right">{reservation.parking_id}</TableCell>
                    <TableCell align="right">{new Date(reservation.entry_time).toLocaleDateString()}</TableCell>
                    <TableCell align="right">{new Date(reservation.entry_time).toLocaleTimeString()}</TableCell>
                    <TableCell align="right">{reservation.exit_Time}</TableCell>
                    <TableCell align="right">{reservation.total_price}</TableCell>
                    <TableCell align="right">{reservation.extra_fee}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default History;
