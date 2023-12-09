import * as React from "react";
import {
  Paper,
  Grid,
  TextField,
  Box,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputLabel,
  FormHelperText,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import agent from "../../app/api/agent";
import Navbar from "../../app/layout/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import validator from "validator";
import { useEffect } from "react";
import { set } from "react-hook-form";

const Users = () => {
  const [Users, setUsers] = React.useState([]);
  const [searchData, setSearchData] = React.useState({});
  const [openEdit, setOpenEdit] = React.useState();
  const [errorName, setErrorName] = React.useState();
  const [errorLastname, setErrorLastname] = React.useState();
  const [errorEmail, setErrorEmail] = React.useState();
  const [errorPriority, setErrorPriority] = React.useState();
  const [helperName, setHelperName] = React.useState("");
  const [helperLastname, setHelperLastname] = React.useState("");
  const [helperEmail, setHelperEmail] = React.useState("");
  const [helperPriority, setHelperPriority] = React.useState("");
  const [currentUserId, setCurrentUserId] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [formData, setFormData] = React.useState({
    name: "",
    lastname: "",
    email: "",
    priority: "",
  });

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
        const searchResult = Array.isArray(response.user)
          ? response.user
          : [response.user];
        setUsers(searchResult);
      });
      setSearchData({});
    } catch (error) {
      console.error(`Error al buscar usuario`, error);
    }
  };

  const handleChange = (e) => {
    const search = e.target.value;
    setSearchData(search);
    handleSearch(e.target.value);
  };

  useEffect(() => {
    console.log("priority: ", formData.priority);
    if (formData.priority < 0 || formData.priority > 1) {
      setHelperPriority("Privilegio inválido");
      setErrorPriority(true);
    } else {
      setErrorPriority(false);
      setHelperPriority("");
    }
  }, [formData.priority]);

  useEffect(() => {
    console.log("email: ", formData.email);
    if (formData.email) {
      if (!validator.isEmail(formData.email)) {
        setHelperEmail("Correo inválido");
        setErrorEmail(true);
      } else {
        setErrorEmail(false);
        setHelperEmail("");
      }
    }
  }, [formData.email]);

  useEffect(() => {
    console.log("name: ", formData.name);
    if (formData.name) {
      if (formData.name.match(/\d+/g)) {
        setHelperName("Campo inválido");
        setErrorName(true);
      } else {
        setErrorName(false);
        setHelperName("");
      }
    }
  }, [formData.name]);

  useEffect(() => {
    console.log("lastname: ", formData.lastname);
    if (formData.lastname) {
      if (formData.lastname.match(/\d+/g)) {
        setHelperLastname("Campo inválido");
        setErrorLastname(true);
      } else {
        setErrorLastname(false);
        setHelperLastname("");
      }
    }
  }, [formData.lastname]);

  const handleEdit = async (userId) => {
    console.log("formdata1: ", formData);
    console.log("erros: ", errorName, errorLastname, errorEmail, errorPriority);

    console.log(errorName, errorLastname, errorEmail, errorPriority);
    if (errorName || errorLastname || errorEmail || errorPriority) {
      return;
    }

    try {
      await agent.Update.update({
        id: currentUserId,
        ...formData,
      });

      getUsers();
      handleCloseEdit();
      console.log(`Usuario con ID ${currentUserId} editado`);
    } catch (error) {
      if (
        error.response.status === 400 &&
        error.response.data.message === "Correo ya registrado"
      ) {
        setHelperEmail("Correo ya registrado");
      }
      console.error(`Error al editar usuario con ID ${currentUserId}`, error);
    }
  };

  const handleClickOpenEdit = (user, userId) => {
    setFormData({
      name: "",
      lastname: "",
      email: "",
      priority: user.priority,
    });
    setCurrentUser(user);
    setCurrentUserId(userId);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setFormData({
      name: "",
      lastname: "",
      email: "",
      priority: "",
    });
    setHelperEmail("");
    setHelperName("");
    setHelperLastname("");
    setHelperPriority();
    setOpenEdit(false);
  };

  return (
    <>
      <Navbar />
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        container
        spacing={2}
        minHeight={160}
      >
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
          value={searchData.email}
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
                <TableCell align="right">
                  <React.Fragment>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleClickOpenEdit(user, user.id)}
                    >
                      Editar
                    </Button>
                    <Dialog open={openEdit} onClose={handleCloseEdit}>
                      <DialogTitle>Editar cliente</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Aquí puede editar los datos de este cliente.
                        </DialogContentText>
                        <DialogContentText>
                          <br></br>
                        </DialogContentText>
                        <InputLabel htmlFor="name">Nombre: </InputLabel>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          type="text"
                          fullWidth
                          variant="standard"
                          placeholder={currentUser.name}
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                        <FormHelperText>{helperName}</FormHelperText>
                        <InputLabel htmlFor="lastname">Apellido: </InputLabel>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="lastname"
                          type="text"
                          fullWidth
                          variant="standard"
                          placeholder={currentUser.lastname}
                          value={formData.lastname}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastname: e.target.value,
                            })
                          }
                        />
                        <FormHelperText>{helperLastname}</FormHelperText>
                        <InputLabel htmlFor="email">Correo: </InputLabel>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="email"
                          type="email"
                          fullWidth
                          variant="standard"
                          placeholder={currentUser.email}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                        <FormHelperText>{helperEmail}</FormHelperText>
                        <FormControl>
                          <FormLabel id="demo-controlled-radio-buttons-group">
                            Seleccione tipo de privilegio
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={formData.priority}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                priority: e.target.value,
                              })
                            }
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio />}
                              label="Administrador"
                            />
                            <FormControlLabel
                              value="0"
                              control={<Radio />}
                              label="Usuario"
                            />
                          </RadioGroup>
                        </FormControl>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => handleCloseEdit()}>
                          Cancel
                        </Button>
                        <Button onClick={() => handleEdit(user.id)}>
                          Confirmar
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </React.Fragment>
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
