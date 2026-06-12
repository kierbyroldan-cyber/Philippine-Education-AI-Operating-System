const test = require('node:test');
const assert = require('node:assert');
const forms = require('../sf2_service');

test('Forms Service - Generate SF1', (t) => {
  const students = [{ id: '1', name: 'John Doe' }];
  const sf1 = forms.generateSF1('SCH123', students);
  assert.strictEqual(sf1.form, 'SF1');
  assert.strictEqual(sf1.records.length, 1);
});

test('Forms Service - Generate SF5', (t) => {
  const records = [{ studentId: '1', studentName: 'John Doe', finalGrade: 85 }];
  const sf5 = forms.generateSF5('SCH123', '7', 'Lily', records);
  assert.strictEqual(sf5.form, 'SF5');
  assert.strictEqual(sf5.records[0].actionTaken, 'PROMOTED');
});
