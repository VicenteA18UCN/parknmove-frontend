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

import agent from "../../app/api/agent";

import { selectName, selectLastname } from "../account/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./userSlice";

const pages = ["Usuarios", "Estacionamientos", "Reportes"];

const History = () => {
  const name = useSelector(selectName);
  const lastname = useSelector(selectLastname);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

    const getUserName = async (userId) => {
        try{
            agent.GetUsers.getUser(userId).then((response) => {
                return response.user.name + " " + response.user.lastname;
            });
        }catch(error){
            console.log(error);
        }
        };

    const getAddress = async (parkingId) => {
        try{
           agent.GetParkings.getParking(parkingId).then((response) => {
                return response.parking.address;
            });
        }catch(error){
            console.log(error);
        }
    };


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              ></IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

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
