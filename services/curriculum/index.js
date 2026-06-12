const express = require('express');
const app = express();
const curriculumData = require('./data/matatag_k10.json');
const chedData = require('./data/ched_obe.json');

app.use(express.json());

app.get('/api/curriculum/ched', (req, res) => {
  const { program, course } = req.query;
  let filtered = chedData;

  if (program) {
    filtered = filtered.filter(item => item.program.toLowerCase() === program.toLowerCase());
  }
  if (course) {
    filtered = filtered.filter(item => item.course.toLowerCase() === course.toLowerCase());
  }

  res.json(filtered);
});

app.get('/api/curriculum', (req, res) => {
  const { grade, subject } = req.query;
  let filtered = curriculumData;

  if (grade) {
    filtered = filtered.filter(item => item.grade === parseInt(grade));
  }
  if (subject) {
    filtered = filtered.filter(item => item.subject.toLowerCase() === subject.toLowerCase());
  }

  res.json(filtered);
});

if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Curriculum service running on port ${PORT}`);
  });
}

module.exports = app;
