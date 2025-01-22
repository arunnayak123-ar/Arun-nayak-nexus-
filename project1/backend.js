const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5500;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/placement', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const Registration = mongoose.model('Registration', {
    regNo: { type: String, required: true, unique: true },
    branch: { type: String, required: true },
    year: { type: String, required: true },
});

app.post('/register', async (req, res) => {
    try {
        const { regNo, branch, year } = req.body;
        if (!regNo || !branch || !year) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        await Registration.create({ regNo, branch, year });
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(400).json({ message: error.code === 11000 ? 'Registration number already exists' : 'An error occurred', error });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));