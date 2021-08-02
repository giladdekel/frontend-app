import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteUser, listUsers } from "../actions/userActions";

// import { USER_DETAILS_RESET } from "../constants/userConstants";
// import { detailsStatics } from "../actions/orderActions";
// import DashboardHeader from "../components/DashboardHeader/DashboardHeader";

import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "./../../actions/userActions";
import { USER_DETAILS_RESET } from "./../../constants/userConstants";

import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";



import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

function createData(name, email, date) {
  return { name, email, date };
}

// const rows = [

//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Donut", 452, 25.0, 51, 4.9),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
//   createData("Honeycomb", 408, 3.2, 87, 6.5),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Jelly Bean", 375, 0.0, 94, 0.0),
//   createData("KitKat", 518, 26.0, 65, 7.0),
//   createData("Lollipop", 392, 0.2, 98, 0.0),
//   createData("Marshmallow", 318, 0, 81, 2.0),
//   createData("Gilad", 360, 19.0, 9, 37.0),
//   createData("Oreo", 437, 18.0, 63, 4.0),
// ];

// const rows = [

//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Donut", 452, 25.0, 51, 4.9),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
//   createData("Honeycomb", 408, 3.2, 87, 6.5),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Jelly Bean", 375, 0.0, 94, 0.0),
//   createData("KitKat", 518, 26.0, 65, 7.0),
//   createData("Lollipop", 392, 0.2, 98, 0.0),
//   createData("Marshmallow", 318, 0, 81, 2.0),
//   createData("Gilad", 360, 19.0, 9, 37.0),
//   createData("Oreo", 437, 18.0, 63, 4.0),
// ];

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch]);

  const rows = [];

  users &&
    users.map((user) => {
      console.log("user:", user);

      rows.push(
        createData(
          `${user.name}`,
          `${user.email}`,
          `${user.createdAt.substring(0, 10)}`
        )
      );
    });

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    { id: "name", numeric: false, disablePadding: true, label: "Name" },
    { id: "email", numeric: false, disablePadding: false, label: "Email" },
    { id: "date", numeric: false, disablePadding: false, label: "Date" },
  ];

  function EnhancedTableHead(props) {
    const {
      classes,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all desserts" }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
  }));

  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Users List
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  }));

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        {" "}
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.name)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.name}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.date}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </div>
      </Container>
    </React.Fragment>
  );

  // const userList = useSelector((state) => state.userList);
  // const { loading, error, users } = userList;

  // const userDelete = useSelector((state) => state.userDelete);
  // const {
  //   loading: loadingDelete,
  //   error: errorDelete,
  //   success: successDelete,
  // } = userDelete;

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(listUsers());
  //   dispatch({
  //     type: USER_DETAILS_RESET,
  //   });
  // }, [dispatch, successDelete]);

  // const deleteHandler = (user) => {
  //   if (window.confirm("Are you sure?")) {
  //     dispatch(deleteUser(user._id));
  //   }
  // };

  // ////////// DashboardHeader start//////////////////////

  // // const staticsDetails = useSelector((state) => state.staticsDetails);

  // // const {
  // //   statics,
  // //   loading: loadingStatics,
  // //   error: errorStatics,
  // // } = staticsDetails;

  // // useEffect(() => {
  // //   dispatch(detailsStatics());
  // // }, [dispatch, detailsStatics, successDelete]);

  // ////////// DashboardHeader end//////////////////////

  // return (
  //   <div>
  //     {/* {loadingStatics ? (
  //       <LoadingBox></LoadingBox>
  //     ) : errorStatics ? (
  //       <MessageBox variant="danger">{errorStatics}</MessageBox>
  //     ) : (
  //       <DashboardHeader statics={statics} />
  //     )} */}
  //     {loadingDelete && <LoadingBox></LoadingBox>}
  //     {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
  //     {successDelete && (
  //       <MessageBox variant="success">User Deleted Successfully</MessageBox>
  //     )}
  //     {loading ? (
  //       <LoadingBox></LoadingBox>
  //     ) : error ? (
  //       <MessageBox variant="danger">{error}</MessageBox>
  //     ) : (
  //       <>
  //         <>
  //           <>
  //             <div className="listScreen">
  //               <div className="container rounded mt-5 bg-white p-md-5">
  //                 <div className="h2 font-weight-bold">Users</div>
  //                 <div className="table-responsive">
  //                   <table className="table">
  //                     <thead>
  //                       <tr>
  //                         <th scope="col">ID</th>
  //                         <th scope="col">NAME</th>
  //                         <th scope="col">DATE</th>
  //                         <th scope="col">EMAIL</th>
  //                         <th scope="col">IS ADMIN</th>
  //                         <th scope="col">IS ACTIVE</th>
  //                         <th scope="col">ACTIONS</th>
  //                       </tr>
  //                     </thead>
  //                     <tbody>
  //                       {users &&
  //                         users.map((user) => (
  //                           <>
  //                             <tr key={user._id} className="bg-blue">
  //                               <td
  //                                 onClick={() => {
  //                                   props.history.push(
  //                                     `/user/${user._id}/edit`
  //                                   );
  //                                 }}
  //                                 className="pt-3"
  //                               >
  //                                 {user._id}
  //                               </td>

  //                               <td
  //                                 onClick={() => {
  //                                   props.history.push(
  //                                     `/user/${user._id}/edit`
  //                                   );
  //                                 }}
  //                                 className="pt-2"
  //                               >
  //                                 {user.image ? (
  //                                   <img
  //                                     src={user.image}
  //                                     className="rounded-circle"
  //                                     alt
  //                                   />
  //                                 ) : (
  //                                   <img
  //                                     src="https://placedog.net/1000?random"
  //                                     className="rounded-circle"
  //                                     alt
  //                                   />
  //                                 )}

  //                                 <div className="pl-lg-5 pl-md-3 pl-1 name">
  //                                   {user.name
  //                                     ? user.name
  //                                     : ` the user deleted`}
  //                                 </div>
  //                               </td>
  //                               <td
  //                                 onClick={() => {
  //                                   props.history.push(
  //                                     `/user/${user._id}/edit`
  //                                   );
  //                                 }}
  //                                 className="pt-3 mt-1"
  //                               >
  //                                 {user.createdAt.substring(0, 10)}
  //                               </td>
  //                               <td className="pt-3">{user.email}</td>

  //                               <td
  //                                 onClick={() => {
  //                                   props.history.push(
  //                                     `/user/${user._id}/edit`
  //                                   );
  //                                 }}
  //                                 className="pt-3"
  //                               >
  //                                 {user.isAdmin ? (
  //                                   <button
  //                                     className="btn btn-success btn-sm  deliver-btn"
  //                                     type="button"
  //                                     aria-expanded="false"
  //                                   >
  //                                     Yes
  //                                   </button>
  //                                 ) : (
  //                                   <button
  //                                     className="btn btn-danger btn-sm no-btn "
  //                                     type="button"
  //                                     aria-expanded="false"
  //                                   >
  //                                     No
  //                                   </button>
  //                                 )}
  //                               </td>

  //                               <td
  //                                 onClick={() => {
  //                                   props.history.push(
  //                                     `/user/${user._id}/edit`
  //                                   );
  //                                 }}
  //                                 className="pt-3"
  //                               >
  //                                 {user.isActive ? (
  //                                   <button
  //                                     className="btn btn-success btn-sm  deliver-btn"
  //                                     type="button"
  //                                     aria-expanded="false"
  //                                   >
  //                                     Yes{" "}
  //                                   </button>
  //                                 ) : (
  //                                   <button
  //                                     className="btn btn-danger btn-sm no-btn "
  //                                     type="button"
  //                                     aria-expanded="false"
  //                                   >
  //                                     No{" "}
  //                                   </button>
  //                                 )}
  //                               </td>
  //                               <td>
  //                                 <a
  //                                   href="#"
  //                                   class="table-link text-info icon-info"
  //                                   onClick={() => {
  //                                     props.history.push(
  //                                       `/user/${user._id}/edit`
  //                                     );
  //                                   }}
  //                                 >
  //                                   <span class="fa-stack">
  //                                     <i class="fa fa-square fa-stack-2x"></i>
  //                                     <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
  //                                   </span>
  //                                 </a>

  //                                 {user.isActive ? (
  //                                   <a
  //                                     onClick={() => deleteHandler(user)}
  //                                     href="#"
  //                                     class="table-link danger trash-icon"
  //                                   >
  //                                     <span class="fa-stack">
  //                                       <i class="fa fa-square fa-stack-2x"></i>
  //                                       <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
  //                                     </span>
  //                                   </a>
  //                                 ) : (
  //                                   <button
  //                                     className="btn btn-success btn-sm  deliver-btn activate-btn"
  //                                     type="button"
  //                                     aria-expanded="false"
  //                                     onClick={() => deleteHandler(user)}
  //                                   >
  //                                     Activate
  //                                   </button>
  //                                 )}
  //                               </td>
  //                             </tr>
  //                             <tr id="spacing-row">
  //                               <td />
  //                             </tr>
  //                           </>
  //                         ))}
  //                     </tbody>
  //                   </table>
  //                 </div>
  //               </div>
  //             </div>
  //           </>
  //         </>
  //       </>
  //     )}
  //   </div>
  // );
}
