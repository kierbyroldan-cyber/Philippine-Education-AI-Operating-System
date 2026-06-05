const curriculumData = require('../curriculum/data/matatag_k10.json');

/**
 * AI Planning Agent Logic (Simulated)
 */
class PlanningAgent {
  /**
   * Generates a Daily Lesson Log (DLL) draft based on a grade and subject.
   */
  async generateDLL(grade, subject) {
    const context = curriculumData.find(item => item.grade === parseInt(grade) && item.subject.toLowerCase() === subject.toLowerCase());

    if (!context) {
      throw new Error('Curriculum standards not found for the given grade and subject.');
    }

    const quarter = context.quarter;
    const melc = context.melcs[0]; // Take the first MELC for the draft

    return {
      title: `DLL: ${subject} - Grade ${grade}`,
      quarter: quarter,
      standards: {
        content: "Demonstrates understanding of the concept.",
        performance: "Applies the concept in various situations."
      },
      learningCompetency: {
        code: melc.code,
        description: melc.competency
      },
      lessonDetails: {
        topic: `Introduction to ${melc.competency.split(' ')[0]}`,
        objectives: [
          `Identify ${melc.competency}`,
          `Explain the importance of ${melc.competency}`
        ],
        procedure: [
          "Review previous lesson",
          "Establish purpose for the new lesson",
          "Present examples/instances of the new lesson",
          "Discuss new concepts and practice new skills",
          "Develop mastery",
          "Finding practical applications",
          "Making generalizations",
          "Evaluating learning",
          "Additional activities/Remediation"
        ]
      },
      aiReflections: "This draft was generated based on MATATAG standards. Teachers should adapt the procedure to local classroom context."
    };
  }
}

module.exports = new PlanningAgent();
