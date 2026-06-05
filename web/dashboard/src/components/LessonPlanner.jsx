import React, { useState } from 'react';
import { api } from '../lib/api';

export default function LessonPlanner() {
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [dll, setDll] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generatePlan = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.generateDLL(grade, subject);
      if (response.error) throw new Error(response.error);

      setDll(response);
    } catch (err) {
      setError(err.message || 'Failed to generate DLL. Please ensure grade and subject match MATATAG standards.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4 text-blue-800">AI Lesson Planner (MATATAG)</h2>
      <div className="space-y-4">
        <input
          className="border p-2 w-full rounded"
          placeholder="Grade (e.g., 4)"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <input
          className="border p-2 w-full rounded"
          placeholder="Subject (e.g., Mathematics)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full transition-colors"
          onClick={generatePlan}
          disabled={loading}
        >
          {loading ? 'Consulting MATATAG Standards...' : 'Generate DLL Draft'}
        </button>
      </div>

      {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}

      {dll && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded">
          <h3 className="font-bold text-blue-900">{dll.title}</h3>
          <p className="text-sm text-blue-700 mb-2">Quarter {dll.quarter} | {dll.learningCompetency.code}</p>
          <p className="italic text-sm mb-4">Competency: {dll.learningCompetency.description}</p>

          <h4 className="font-semibold text-sm uppercase text-blue-800 border-b border-blue-200 mb-2">Teaching Procedure</h4>
          <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700">
            {dll.lessonDetails.procedure.map((step, i) => <li key={i}>{step}</li>)}
          </ul>

          <div className="mt-4 pt-4 border-t border-blue-200 text-xs text-blue-600">
            <strong>AI Reflection:</strong> {dll.aiReflections}
          </div>
        </div>
      )}
    </div>
  );
}
