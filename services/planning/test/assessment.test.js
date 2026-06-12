const test = require('node:test');
const assert = require('node:assert');
const assessmentAgent = require('../assessmentAgent');

test('Assessment Agent - Generate Quiz', async (t) => {
  const quiz = await assessmentAgent.generateQuiz('Fractions', 4);
  assert.strictEqual(quiz.title.includes('Fractions'), true);
  assert.strictEqual(quiz.questions.length, 2);
});

test('Assessment Agent - Generate Rubric', async (t) => {
  const rubric = await assessmentAgent.generateRubric('Presentation');
  assert.strictEqual(rubric.task, 'Presentation');
  assert.strictEqual(rubric.criteria.length, 3);
});
