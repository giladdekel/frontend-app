import React from "react";

import Link from "next/link";
import articleStyles from "../styles/Article.module.css";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import ChildTable from "./ChildTable";

function Row(props) {
  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
  });

  const { row, childArr } = props;
  // console.log("row :", row[0].name);
  // console.log("child :", row[0].child);
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  // console.log("row", row);
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {row[0].child && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>

        <Link
          href={`/system/${row[0].type.toLowerCase().replace(/\s/g,"-")}`}
        >
          <a>
            <TableCell component="th" scope="row">
              {row[0].name}
            </TableCell>
          </a>
        </Link>

        <TableCell align="right">{row[0].type}</TableCell>
        <TableCell align="right">{row[0].site}</TableCell>
        <TableCell align="right">{row[0].status}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
              ></Typography>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="center">Site</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row[0].child &&
                    row[0].child.map((table, i) => (
                      <ChildTable key={i} table={table} />
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default Row;
