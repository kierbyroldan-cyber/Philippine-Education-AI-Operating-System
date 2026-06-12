const express = require('express');
const app = express();
const agent = require('./agent');
const assessmentAgent = require('./assessmentAgent');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/api/generate-assessment', async (req, res) => {
  const { type, topic, grade, taskName } = req.body;
  try {
    let result;
    if (type === 'quiz') {
      result = await assessmentAgent.generateQuiz(topic, grade);
    } else if (type === 'rubric') {
      result = await assessmentAgent.generateRubric(taskName);
    } else {
      throw new Error('Invalid assessment type');
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/generate-dll', async (req, res) => {
  const { grade, subject } = req.body;
  try {
    const dll = await agent.generateDLL(grade, subject);
    res.json(dll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Planning service running on port ${PORT}`);
});
