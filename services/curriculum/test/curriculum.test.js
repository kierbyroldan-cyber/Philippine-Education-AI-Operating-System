const test = require('node:test');
const assert = require('node:assert');

test('Curriculum Data integrity', (t) => {
  const data = require('../data/matatag_k10.json');
  assert.strictEqual(Array.isArray(data), true);
  assert.strictEqual(data.length > 0, true);
  assert.strictEqual(data[0].grade, 4);
});

test('Curriculum Logic - Filter by grade', (t) => {
  const curriculumData = require('../data/matatag_k10.json');
  const filtered = curriculumData.filter(item => item.grade === 4);
  assert.strictEqual(filtered.length, 1);
  assert.strictEqual(filtered[0].subject, 'Mathematics');
});
