require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getSheetData } = require('./googleSheets');

const app = express();
app.use(cors());
app.use(express.json());

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_RANGE = 'Sheet1!A:AB';

// Fetch all degree programs
app.get('/api/degrees', async(req, res) => {
    try {
        const data = await getSheetData(SPREADSHEET_ID, SHEET_RANGE);
        const [header, ...rows] = data;
        const districtNames = header.slice(3); // D to AB
        const degrees = rows.map(row => {
            const zScores = {};
            districtNames.forEach((district, idx) => {
                zScores[district] = row[3 + idx] ? parseFloat(row[3 + idx]) : null;
            });
            return {
                course: row[0],
                university: row[1],
                stream: row[2],
                zScores
            };
        });
        res.json(degrees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Recommend degrees based on user input
app.post('/api/recommend', async(req, res) => {
    const { stream, zScore, district } = req.body;
    try {
        const data = await getSheetData(SPREADSHEET_ID, SHEET_RANGE);
        const [header, ...rows] = data;
        const districtNames = header.slice(3);
        const recommendations = rows
            .map(row => {
                const zScores = {};
                districtNames.forEach((d, idx) => {
                    zScores[d] = row[3 + idx] ? parseFloat(row[3 + idx]) : null;
                });
                return {
                    course: row[0],
                    university: row[1],
                    stream: row[2],
                    zScores
                };
            })
            .filter(d =>
                d.stream === stream &&
                d.zScores[district] !== null &&
                d.zScores[district] <= zScore
            );
        res.json(recommendations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));