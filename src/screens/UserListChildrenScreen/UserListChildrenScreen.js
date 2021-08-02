// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
// import Box from "@material-ui/core/Box";
// import Collapse from "@material-ui/core/Collapse";
// import IconButton from "@material-ui/core/IconButton";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
// import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
// import ChildTable from "./ChildTable";
// import Row from "./Row";

// export default function SystemsList2() {
//   const [systems, setSystems] = useState(false);
//   useEffect(() => {
//     let infoData = getInfo();
//     setSystems(infoData);
//   }, []);

//   const getInfo = async () => {
//     const res = await fetch(`./data`);
//     const info = await res.json();
//     // console.log("systems :", systems);

//     return info;
//   };

//   function createData(name, type, site, status) {
//     return {
//       name,
//       type,
//       site,
//       status,
//       children: [],
//     };
//   }
//   const rows = [];
//   let childArr = [];

//   systems.data.map((system) => {
//     // console.log("systemmmmmmmmm :", system.name);

//     rows.push(
//       createData(
//         `${system.name}`,
//         `${system.type.name}`,
//         `${system.site.name}`,
//         `${system.status}`
//       )
//     );

//     childArr.push(system.children);
//   });
//   // console.log("childArr******************************:", childArr);
//   // console.log('rows :', rows);

//   let arrRows = rows.map((row, i) => [{ ...row, child: childArr[i] }]);
//   // console.log('arrRows :', arrRows[0][0].name);

//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label="collapsible table">
//         <TableHead>
//           <TableRow>
//             <TableCell />
//             <TableCell>Name</TableCell>
//             <TableCell align="right">Type</TableCell>
//             <TableCell align="right">Site</TableCell>
//             <TableCell align="right">Status</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {arrRows.map((row, i) => (
//             <Row key={arrRows.name} row={row} childArr={childArr} />
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
