/**
 * API Client for EduAI OS Services
 * MOCKED for prototype demonstration while maintaining architecture.
 */
import agent from '../../../../services/planning/agent';
import forms from '../../../../services/forms/sf2_service';

export const api = {
  getCurriculum: async (grade, subject) => {
    // In production, this would be a fetch()
    return [{ grade, subject, melcs: [] }];
  },

  generateDLL: async (grade, subject) => {
    // Calling the actual Planning Agent logic directly for prototype cohesion
    return agent.generateDLL(grade, subject);
  },

  submitAttendance: async (month, logs) => {
    // Calling the actual SF2 logic directly for prototype cohesion
    return forms.generateSF2('300123', 'Grade 7-Sampaguita', month, logs);
  }
};
