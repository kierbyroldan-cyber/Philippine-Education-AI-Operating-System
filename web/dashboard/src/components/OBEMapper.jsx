import React, { useState } from 'react';
import { api } from '../lib/api';

export default function OBEMapper() {
  const [program, setProgram] = useState('');
  const [course, setCourse] = useState('');
  const [obeData, setObeData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOBE = async () => {
    setLoading(true);
    try {
      const res = await api.getCHEDCurriculum(program, course);
      setObeData(res[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white mt-8">
      <h2 className="text-xl font-bold mb-4 text-orange-800">CHED OBE Mapper</h2>
      <div className="space-y-4">
        <input
          className="border p-2 w-full rounded"
          placeholder="Program (e.g., BS Information Technology)"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
        />
        <input
          className="border p-2 w-full rounded"
          placeholder="Course (e.g., IT101)"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <button
          className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded w-full transition-colors"
          onClick={fetchOBE}
          disabled={loading}
        >
          {loading ? 'Mapping Outcomes...' : 'Load OBE Alignment'}
        </button>
      </div>

      {obeData && (
        <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded">
          <h3 className="font-bold text-orange-900">{obeData.course}</h3>
          <div className="mt-2">
            <h4 className="text-sm font-semibold text-orange-800">Course Outcomes:</h4>
            <ul className="list-disc ml-5 text-sm">
              {obeData.courseOutcomes.map((co, i) => (
                <li key={i}>{co.code}: {co.description} (Aligned: {co.alignment.join(', ')})</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
