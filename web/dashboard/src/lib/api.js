/**
 * API Client for EduAI OS Services
 * MOCKED for prototype demonstration while maintaining architecture.
 */
import agent from '../../../../services/planning/agent';
import assessmentAgent from '../../../../services/planning/assessmentAgent';
import forms from '../../../../services/forms/sf2_service';
const chedData = require('../../../../services/curriculum/data/ched_obe.json');

export const api = {
  getCurriculum: async (grade, subject) => {
    // In production, this would be a fetch()
    return [{ grade, subject, melcs: [] }];
  },

  getCHEDCurriculum: async (program, course) => {
    return chedData.filter(item =>
      (!program || item.program.toLowerCase().includes(program.toLowerCase())) &&
      (!course || item.course.toLowerCase().includes(course.toLowerCase()))
    );
  },

  generateDLL: async (grade, subject) => {
    // Calling the actual Planning Agent logic directly for prototype cohesion
    return agent.generateDLL(grade, subject);
  },

  generateAssessment: async (params) => {
    const { type, topic, grade, taskName } = params;
    if (type === 'quiz') {
      return assessmentAgent.generateQuiz(topic, grade);
    } else if (type === 'rubric') {
      return assessmentAgent.generateRubric(taskName);
    }
  },

  submitAttendance: async (month, logs) => {
    // Calling the actual SF2 logic directly for prototype cohesion
    return forms.generateSF2('300123', 'Grade 7-Sampaguita', month, logs);
  }
};
