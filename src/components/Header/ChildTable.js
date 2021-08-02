// import Link from 'next/link'
// import articleStyles from '../styles/Article.module.css'
import React from "react";

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
import TableItem from './TableItem';

const ChildTable = ({ table }) => {
// console.log('table :', table);
  return (

    
    <TableRow key={table.name}>
      <TableCell component="th" scope="row">
        {table.name}
      </TableCell>
      <TableCell>{table.type.name}</TableCell>
      <TableCell align="right">{table.site.name}</TableCell>
      <TableCell align="right">{table.status}</TableCell>
    </TableRow>
  );
  

    // console.log('line :', line);




  
  
};

export default ChildTable;
