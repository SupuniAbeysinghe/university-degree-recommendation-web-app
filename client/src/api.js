import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const fetchDegrees = async() => {
    const res = await axios.get(`${API_BASE}/degrees`);
    return res.data;
};

export const fetchRecommendations = async(payload) => {
    const res = await axios.post(`${API_BASE}/recommend`, payload);
    return res.data;
};