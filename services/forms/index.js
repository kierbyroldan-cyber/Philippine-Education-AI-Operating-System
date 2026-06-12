const express = require('express');
const app = express();
const forms = require('./sf2_service');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/api/submit-sf2', (req, res) => {
  const { month, logs } = req.body;
  const sf2 = forms.generateSF2('300123', 'Grade 7-Sampaguita', month, logs);
  res.json(sf2);
});

app.post('/api/generate-sf1', (req, res) => {
  const { schoolId, students } = req.body;
  const sf1 = forms.generateSF1(schoolId, students);
  res.json(sf1);
});

app.post('/api/generate-sf5', (req, res) => {
  const { schoolId, grade, section, records } = req.body;
  const sf5 = forms.generateSF5(schoolId, grade, section, records);
  res.json(sf5);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Forms service running on port ${PORT}`);
});
