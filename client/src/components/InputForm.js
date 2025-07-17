import React, { useState } from 'react';
import { Box, Button, MenuItem, TextField, Alert, Stack, Typography } from '@mui/material';

const InputForm = ({ streams, districts, onSubmit, loading }) => {
        const [stream, setStream] = useState('');
        const [district, setDistrict] = useState('');
        const [zScore, setZScore] = useState('');
        const [error, setError] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            setError('');
            if (!stream || !district || !zScore) return;
            const z = parseFloat(zScore);
            if (isNaN(z) || z < -4 || z > 4) {
                setError('Z-score must be between -4 and +4.');
                return;
            }
            onSubmit({ stream, district, zScore: z });
        };

        return ( <Box component = "form"
                onSubmit = { handleSubmit }
                sx = {
                    { mb: 3, p: 2, borderRadius: 2, boxShadow: 2, bgcolor: 'background.paper' }
                }>
                <Stack spacing = { 2 }>
                <Typography variant = "h6"
                align = "center"> Find Your Eligible Degrees </Typography>  
		<TextField select label = "Subject Stream"
                value = { stream }
                onChange = { e => setStream(e.target.value) }
                required fullWidth>
                <MenuItem value = "" > Select stream </MenuItem> {
                streams.map(s => ( 
			<MenuItem key = { s }
                    value = { s }> { s } </MenuItem>
                ))
            } </TextField>  
		<TextField select label = "District"
        value = { district }
        onChange = { e => setDistrict(e.target.value) }
        required fullWidth>
            <MenuItem value = "" > Select district </MenuItem> {
        districts.map(d => ( <MenuItem key = { d }
            value = { d }> { d.replace(/_/g, ' ') } </MenuItem>
        ))
    } </TextField>  
	<TextField label = "Z-score"
type = "number"
inputProps = {
    { step: 0.001, min: -4, max: 4 }
}
value = { zScore }
onChange = { e => setZScore(e.target.value) }
required fullWidth/> {
    error && <Alert severity = "error"> { error } </Alert>}  
	<Button type = "submit"
    variant = "contained"
    color = "primary"
    disabled = { loading }
    size = "large"> { loading ? 'Loading...' : 'Get Recommendations' } 
	</Button>  
	</Stack>  
	</Box>
);
};

export default InputForm;