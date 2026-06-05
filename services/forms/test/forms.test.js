const test = require('node:test');
const assert = require('node:assert');
const forms = require('../sf2_service.js');

test('Forms Service - Generate SF2', (t) => {
  const logs = [
    { studentId: '101', studentName: 'Jose Rizal', status: 'present' },
    { studentId: '101', studentName: 'Jose Rizal', status: 'present' },
    { studentId: '102', studentName: 'Andres Bonifacio', status: 'absent' }
  ];

  const sf2 = forms.generateSF2('300123', 'Grade 7-Sampaguita', 'June', logs);

  assert.strictEqual(sf2.header.schoolId, '300123');
  assert.strictEqual(sf2.records.length, 2);
  assert.strictEqual(sf2.records.find(r => r.studentId === '101').present, 2);
  assert.strictEqual(sf2.records.find(r => r.studentId === '102').absent, 1);
});
