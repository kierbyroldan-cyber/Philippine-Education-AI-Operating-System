const test = require('node:test');
const assert = require('node:assert');

test('CHED OBE Data integrity', (t) => {
  const data = require('../data/ched_obe.json');
  assert.strictEqual(Array.isArray(data), true);
  assert.strictEqual(data.length > 0, true);
  assert.strictEqual(data[0].program, "BS Information Technology");
});
