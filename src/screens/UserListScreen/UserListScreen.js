import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "./../../actions/userActions";
import { USER_DETAILS_RESET } from "./../../constants/userConstants";
import { useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import "./UserListScreen.scss";
import { CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import  IconButton from '@material-ui/core/IconButton';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  // console.log("users:", users);

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);

  const deleteHandler = (user) => {
    console.log("user:", user);
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(user._id));
    }
  };

  function createData(name, email, date, id) {
    return { name, email, date };
  }

  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

  // const rows = [];
  // let idArr = [];

  // users &&
  //   users.map((user) => {
  //     console.log("user:", user);

  //     rows.push(
  //       createData(
  //         `${user.name}`,
  //         `${user.email}`,
  //         `${user.createdAt.substring(0, 10)}`

  //       )

  //     );

  //     idArr.push(user._id);

  //   });

  // let arrRows = rows.map((row, i) => [{...row, id:idArr[i]}]);
  // console.log('arrRows:', arrRows)

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      {loadingDelete && <CircularProgress />}
      {errorDelete && <Alert severity="error">{errorDelete}</Alert>}
      {successDelete && (
        <Alert severity="success">User Deleted Successfully</Alert>
      )}

      <Container maxWidth="md">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            {" "}
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">Email</StyledTableCell>
                    <StyledTableCell align="right">Date</StyledTableCell>
                    <StyledTableCell align="right">Edit</StyledTableCell>
                    <StyledTableCell align="right">Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users &&
                    users.map((user) => (
                      <StyledTableRow key={user.name}>
                        <StyledTableCell component="th" scope="row">
                          {user.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {user.email}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {user.createdAt.substring(0, 10)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <IconButton color="primary" aria-label="delete">
                            <EditIcon
                              className="pointer"
                              onClick={() => {
                                props.history.push(`/user/${user._id}/edit`);
                              }}
                            />{" "}
                          </IconButton>
                        </StyledTableCell>

                        <StyledTableCell align="right">
                          <IconButton color="secondary" aria-label="delete">
                            <DeleteIcon
                              className="pointer"
                              onClick={() => deleteHandler(user)}
                            />{" "}
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Container>
    </React.Fragment>
  );
}
