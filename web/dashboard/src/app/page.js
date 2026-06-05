'use client';

import LessonPlanner from '../components/LessonPlanner';
import AttendanceTracker from '../components/AttendanceTracker';

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-900">EduAI OS - Teacher Workspace</h1>
        <p className="text-gray-600">The intelligent backbone of your classroom.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <LessonPlanner />
        </section>
        <section>
          <AttendanceTracker />
        </section>
      </div>

      <footer className="mt-12 pt-8 border-t text-center text-gray-500 text-sm">
        EduAI OS Enterprise Prototype | DepEd MATATAG Compliant | CHED OBE Aligned
      </footer>
    </main>
  );
}
