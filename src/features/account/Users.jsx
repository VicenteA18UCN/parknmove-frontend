import * as React from "react";
import { 
  Paper, 
  Grid, 
  TextField, 
  Box,
  IconButton,
 } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import agent from "../../app/api/agent";
import Navbar from "../../app/layout/Navbar";
import SearchIcon from '@mui/icons-material/Search';
import validator from 'validator';

const Users = () => {
  const [Users, setUsers] = React.useState([]);
  const [searchData, setSearchData] = React.useState({});

  const getUsers = async () => {
    agent.GetUsers.getUsers().then((response) => {
      setUsers(response.users);
    });
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const handleSearch = async (e) => {
    try {
        await agent.Search.searchUser(e).then((response) => {
            const searchResult = Array.isArray(response.user) ? response.user : [response.user];
            setUsers(searchResult);
        });
        setSearchData({});
    } catch (error) {
        console.error(`Error al buscar usuario`, error);
    }
  }

  const handleChange = (e) => {
    const search = e.target.value;
    setSearchData(search);
    handleSearch(e.target.value);
  }

  return (
    <>
      <Navbar />
      <Grid display="flex" justifyContent="center" alignItems="center" container spacing={2} minHeight={160}>
        <Box>
          <IconButton 
            sx={{ display: { xs: "none", md: "flex" }, mt: 2 }} 
            aria-label="search"
            >
          <SearchIcon />
          </IconButton>
        </Box>

        <TextField
          id="standard-search"
          label="Buscar"
          type="search"
          variant="standard"
          value={ searchData.email }
          onChange={handleChange}
        />
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Apellido </TableCell>
              <TableCell align="right">Correo</TableCell>
              <TableCell align="right">Prioridad</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.lastname}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">
                  {user.priority === 0 ? "Usuario normal" : "Administrador"}
                </TableCell>
                <TableCell href="#admin" align="right">
                  Editar
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
