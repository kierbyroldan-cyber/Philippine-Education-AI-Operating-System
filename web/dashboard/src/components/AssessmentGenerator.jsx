import React, { useState } from 'react';
import { api } from '../lib/api';

export default function AssessmentGenerator() {
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('');
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    setLoading(true);
    try {
      const res = await api.generateAssessment({ type: 'quiz', topic, grade });
      setAssessment(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white mt-8">
      <h2 className="text-xl font-bold mb-4 text-purple-800">AI Assessment Generator</h2>
      <div className="space-y-4">
        <input
          className="border p-2 w-full rounded"
          placeholder="Topic (e.g., Fractions)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <input
          className="border p-2 w-full rounded"
          placeholder="Grade Level"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded w-full transition-colors"
          onClick={generateQuiz}
          disabled={loading}
        >
          {loading ? 'Generating Quiz...' : 'Generate Quiz Draft'}
        </button>
      </div>

      {assessment && (
        <div className="mt-6 p-4 bg-purple-50 border border-purple-100 rounded">
          <h3 className="font-bold text-purple-900">{assessment.title}</h3>
          <ul className="mt-2 space-y-2">
            {assessment.questions.map((q, i) => (
              <li key={i} className="text-sm">
                <strong>Q{i+1}:</strong> {q.question}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
