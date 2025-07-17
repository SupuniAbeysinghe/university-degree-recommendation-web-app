import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
} from '@mui/material';

const Recommendations = ({ data, district, studentZScore }) => {
    if (!data.length) return ( 
	<Typography align = "center"
        color = "error"
        sx = {
            { mt: 3 } }>
        No recommendations found. 
	</Typography>
    );

    return ( <TableContainer component = { Paper }
        sx = {
            { mt: 4 } }>
        <Typography variant = "h6"
        align = "center"
        sx = {
            { mt: 2 } }>
        Recommended Degree Programs 
	</Typography> 
	<Table>
        <TableHead>
        <TableRow>
        <TableCell> Course </TableCell> 
	<TableCell> University </TableCell> 
	<TableCell> Stream </TableCell> 
	<TableCell> Cutoff Z - score({ district.replace(/_/g, ' ') }) </TableCell> 
	<TableCell> Your Z - score </TableCell> 
	</TableRow> 
	</TableHead> 
	<TableBody> {
            data.map((row, idx) => ( 
		<TableRow key = { idx }>
                <TableCell> { row.course } </TableCell> 
		<TableCell> { row.university.replace(/_/g, ' ') } </TableCell> 
		<TableCell> { row.stream.replace(/_/g, ' ') } </TableCell> 
		<TableCell> { row.zScores[district] } </TableCell> 
		<TableCell> { studentZScore } </TableCell> 
		</TableRow>
            ))
        } </TableBody> 
	</Table> 
	</TableContainer>
    );
};

export default Recommendations;