const express = require('express');
const app = express();
const curriculumData = require('./data/matatag_k10.json');

app.use(express.json());

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
