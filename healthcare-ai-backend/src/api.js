// src/api.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

// In-memory user store (replace with your database logic)
const users = [];

// Registration endpoint
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Save new user
    users.push({ email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email }, 'your_secret_key');
    res.json({ token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const registerUser = async (username, password) => {
    const response = await api.post('/register', { username, password });
    return response.data;
};

export const loginUser = async (username, password) => {
    const response = await api.post('/login', { username, password });
    return response.data;
};

export const fetchPatient = async (id) => {
    const response = await api.get(`/patient/${id}`);
    return response.data;
};

export const analyzeData = async (data) => {
    const response = await api.post('/ai/analyze', { data });
    return response.data;
};
