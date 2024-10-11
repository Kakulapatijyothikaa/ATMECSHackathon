// Patient model (create a new file named patient.js)
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    condition: { type: String, required: true },
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;

// Route to add a new patient
app.post('/patients', authenticateJWT, async (req, res) => {
    const { name, condition } = req.body;

    const newPatient = new Patient({ name, condition });
    try {
        await newPatient.save();
        res.status(201).send(`Patient ${name} added successfully!`);
    } catch (error) {
        res.status(400).send('Error adding patient: ' + error.message);
    }
});

// Route to get all patients
app.get('/patients', authenticateJWT, async (req, res) => {
    const patients = await Patient.find();
    res.send(patients);
});

// Route to update patient data
app.put('/patients/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params;
    const { name, condition } = req.body;

    try {
        const updatedPatient = await Patient.findByIdAndUpdate(id, { name, condition }, { new: true });
        if (!updatedPatient) return res.status(404).send('Patient not found');
        res.send(updatedPatient);
    } catch (error) {
        res.status(400).send('Error updating patient: ' + error.message);
    }
});

// Route to delete a patient
app.delete('/patients/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPatient = await Patient.findByIdAndDelete(id);
        if (!deletedPatient) return res.status(404).send('Patient not found');
        res.send('Patient deleted successfully');
    } catch (error) {
        res.status(400).send('Error deleting patient: ' + error.message);
    }
});
