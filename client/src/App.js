import React, { useEffect, useState } from 'react';
import { fetchDegrees, fetchRecommendations } from './api';
import InputForm from './components/InputForm';
import Recommendations from './components/Recommendations';
import ZScoreChart from './components/ZScoreChart';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Container
} from '@mui/material';
import './App.css';

const nearbyDistrictsMap = {
    colombo: ["gampaha", "kalutara"],
    gampaha: ["colombo", "kurunegala"],
    kalutara: ["colombo", "ratnapura"],
    matale: ["kandy", "anuradhapura"],
    kandy: ["matale", "nuwara_eliya"],
    nuwara_eliya: ["kandy", "badulla"],
    galle: ["matara", "kalutara"],
    matara: ["galle", "hambantota"],
    hambantota: ["matara", "monaragala"],
    jaffna: ["kilinochchi", "mannar"],
    kilinochchi: ["jaffna", "mullaitivu"],
    mannar: ["jaffna", "vavuniya"],
    mullaitivu: ["kilinochchi", "vavuniya"],
    vavuniya: ["mullaitivu", "mannar"],
    trincomalee: ["batticaloa", "polonnaruwa"],
    batticaloa: ["ampara", "trincomalee"],
    ampara: ["batticaloa", "monaragala"],
    puttalam: ["kurunegala", "anuradhapura"],
    kurunegala: ["puttalam", "gampaha"],
    anuradhapura: ["puttalam", "polonnaruwa"],
    polonnaruwa: ["anuradhapura", "badulla"],
    badulla: ["monaragala", "nuwara_eliya"],
    monaragala: ["badulla", "ampara"],
    kegalle: ["kurunegala", "kandy"],
    ratnapura: ["kegalle", "kalutara"]
};

function App() {
    const [degrees, setDegrees] = useState([]);
    const [streams, setStreams] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [nearbyOpportunities, setNearbyOpportunities] = useState([]);
    const [selected, setSelected] = useState({ stream: '', district: '', zScore: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDegrees().then(data => {
            setDegrees(data);
            // Extract unique streams and districts
            const uniqueStreams = Array.from(new Set(data.map(d => d.stream)));
            setStreams(uniqueStreams);
            if (data.length > 0) {
                setDistricts(Object.keys(data[0].zScores));
            }
        });
    }, []);

    const handleSubmit = async({ stream, district, zScore }) => {
        setLoading(true);
        setSelected({ stream, district, zScore });
        const recs = await fetchRecommendations({ stream, district, zScore });
        setRecommendations(recs);

        // Nearby districts logic
        const allDegrees = await fetchDegrees();
        const nearbyDistricts = nearbyDistrictsMap[district] || [];
        const nearby = [];
        for (const near of nearbyDistricts) {
            const matches = allDegrees
                .filter(d => d.stream === stream && d.zScores[near] !== null && d.zScores[near] <= zScore)
                .map(d => ({...d, _district: near }));
            nearby.push(...matches);
        }
        setNearbyOpportunities(nearby);
        setLoading(false);
    };

    return ( <Container maxWidth = "md"
        sx = {
            { py: { xs: 2, md: 4 } } }>
        <Typography variant = "h4"
        align = "center"
        sx = {
            { mb: 3, fontWeight: 600 } }>
        University Degree Recommendation Tool 
	</Typography> 
	<InputForm streams = { streams }
        districts = { districts }
        onSubmit = { handleSubmit }
        loading = { loading }/> 
	<Recommendations data = { recommendations }
        district = { selected.district }
        studentZScore = { selected.zScore }/> 
	<ZScoreChart data = { recommendations }
        district = { selected.district }
        studentZScore = { selected.zScore }/> {
            nearbyOpportunities.length > 0 && ( 
		<TableContainer component = { Paper }
                sx = {
                    { mt: 6 } }>
                <Typography variant = "h6"
                align = "center"
                sx = {
                    { mt: 2 } }>
                Nearby District Opportunities </Typography> 
		<Table size = "small">
                <TableHead>
                <TableRow>
                <TableCell> Course </TableCell> 
		<TableCell> University </TableCell> 
		<TableCell> Stream </TableCell> 
		<TableCell> District </TableCell> 
		<TableCell> Cutoff Z - score </TableCell> 
		<TableCell> Your Z - score </TableCell> 
		</TableRow> 
		</TableHead> 
		<TableBody> {
                    nearbyOpportunities.map((row, idx) => ( 
			<TableRow key = { idx }>
                        <TableCell> { row.course } </TableCell> 
			<TableCell> { row.university.replace(/_/g, ' ') } </TableCell> 
			<TableCell> { row.stream.replace(/_/g, ' ') } </TableCell> 
			<TableCell> { row._district.replace(/_/g, ' ') } </TableCell> 
			<TableCell> { row.zScores[row._district] } </TableCell> 
			<TableCell> { selected.zScore } </TableCell> 
			</TableRow>
                    ))
                } </TableBody> 
		</Table> 
		</TableContainer>
            )
        } </Container>
    );
}

export default App;