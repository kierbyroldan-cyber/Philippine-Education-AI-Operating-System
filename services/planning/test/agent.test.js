const test = require('node:test');
const assert = require('node:assert');
const agent = require('../agent.js');

test('Planning Agent - Generate DLL', async (t) => {
  const dll = await agent.generateDLL(4, 'Mathematics');

  assert.strictEqual(dll.quarter, 1);
  assert.strictEqual(dll.learningCompetency.code, 'M4NS-Ia-1');
  assert.ok(dll.lessonDetails.procedure.length > 0);
});

test('Planning Agent - Grade/Subject mismatch', async (t) => {
  try {
    await agent.generateDLL(99, 'Quantum Physics');
    assert.fail('Should have thrown an error');
  } catch (err) {
    assert.strictEqual(err.message, 'Curriculum standards not found for the given grade and subject.');
  }
});
