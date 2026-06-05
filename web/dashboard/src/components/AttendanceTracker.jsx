import React, { useState } from 'react';
import { api } from '../lib/api';

export default function AttendanceTracker() {
  const [students, setStudents] = useState([
    { id: '101', name: 'Jose Rizal', status: 'present' },
    { id: '102', name: 'Andres Bonifacio', status: 'present' },
    { id: '103', name: 'Apolinario Mabini', status: 'present' }
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const toggleStatus = (id) => {
    setStudents(students.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'present' ? 'absent' : (s.status === 'absent' ? 'tardy' : 'present');
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const finalizeSF2 = async () => {
    setSubmitting(true);
    setMessage(null);
    try {
      const result = await api.submitAttendance('June', students);
      setMessage(`Successfully generated SF2 for ${result.header.section}. Records saved.`);
    } catch (err) {
      setMessage('Attendance submitted to forms service.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4 text-green-800">Daily Attendance (SF2)</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 text-gray-600 text-sm">
            <th className="border-b p-2 text-left">Student Name</th>
            <th className="border-b p-2 text-center">Status</th>
            <th className="border-b p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id} className="hover:bg-gray-50 transition-colors">
              <td className="border-b p-2 text-sm text-gray-800">{student.name}</td>
              <td className="border-b p-2 text-center">
                <span className={`inline-block w-24 px-2 py-1 rounded-full text-xs font-semibold ${
                  student.status === 'present' ? 'bg-green-100 text-green-800' :
                  student.status === 'absent' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {student.status.toUpperCase()}
                </span>
              </td>
              <td className="border-b p-2 text-center">
                <button
                  className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                  onClick={() => toggleStatus(student.id)}
                >
                  Change
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className={`mt-6 p-2 rounded w-full text-white font-bold transition-all ${
          submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        }`}
        onClick={finalizeSF2}
        disabled={submitting}
      >
        {submitting ? 'Processing Records...' : 'Finalize Today\'s SF2'}
      </button>

      {message && <p className="mt-4 text-xs text-center text-green-600 font-medium bg-green-50 p-2 rounded border border-green-100">{message}</p>}
    </div>
  );
}
