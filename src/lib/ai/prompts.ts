// AI prompt templates for CV generation
// These prompts are sent to OpenAI and Anthropic APIs

export const SYSTEM_PROMPT = `You are an expert professional resume/CV writer with 15+ years of experience.
Your task is to write powerful, achievement-oriented, and ATS-friendly content.
You understand the job market across all industries and know what makes a CV stand out.

Key principles:
1. Use action verbs to start every bullet point
2. Quantify achievements whenever possible (numbers, percentages, dollar amounts)
3. Tailor content to the target job description when provided
4. Keep bullet points concise but impactful (1-2 lines each)
5. Use professional, confident language
6. Remove fluff and buzzwords without substance
7. Focus on results and impact, not just responsibilities
8. Use industry-relevant keywords for ATS optimization

Always return valid JSON matching the exact schema requested.`;

export function generateFullCVPrompt(userInput: any): string {
  const hasReference =
    userInput.referenceText && userInput.referenceText.trim().length > 0

  return `Create a professional CV based on the following information.

USER INFORMATION:
${JSON.stringify(userInput.cvData, null, 2)}

${userInput.jobDescription ? `TARGET JOB DESCRIPTION:
${userInput.jobDescription}

Tailor the content specifically for this job description, incorporating relevant keywords.` : ''}

${hasReference ? `USER'S EXISTING CV (extracted from "${userInput.referenceFileName || 'uploaded document'}"):
This is the user's real CV. Treat it as the SINGLE SOURCE OF TRUTH for their facts.
- Copy every real detail: full name of companies, job titles, employment dates, locations, degrees, institutions, and all skills listed.
- Rewrite each entry professionally: convert plain responsibilities into achievement-oriented, ATS-friendly bullet points using strong action verbs, and keep any numbers/percentages exactly as stated.
- Do NOT invent employers, titles, dates, degrees, or skills that are not present in the reference.
- If the reference lacks a target job or skills, keep only what is there rather than fabricating.
REFERENCE MATERIAL:
${userInput.referenceText}
` : ''}

TONE: ${userInput.tone || 'professional'}
${userInput.industries ? `TARGET INDUSTRIES: ${userInput.industries.join(', ')}` : ''}

Return the complete CV data as JSON in this EXACT format:
{
  "summary": "2-3 sentence professional summary",
  "experience": [
    {
      "jobTitle": "string",
      "company": "string",
      "startDate": "string",
      "endDate": "string",
      "location": "string",
      "bullets": ["3-5 achievement-focused bullet points"]
    }
  ],
  "skills": {
    "technical": ["5-8 technical skills"],
    "soft": ["3-4 soft skills"]
  },
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "startDate": "string",
      "endDate": "string",
      "description": "string"
    }
  ]
}`;
}

export function regenerateSectionPrompt(section: string, currentContent: any, jobDescription?: string): string {
  const sectionPrompts: Record<string, string> = {
    summary: `Rewrite this professional summary to be more powerful and achievement-focused:
"${JSON.stringify(currentContent)}"
Make it 2-3 sentences. Return as JSON: {"summary": "text"}`,

    experience: `Rewrite these work experience bullet points to focus on achievements and impact:
${JSON.stringify(currentContent, null, 2)}
${jobDescription ? `\nOptimize for this job: ${jobDescription}` : ''}
Return as JSON: {"bullets": ["achievement-focused bullets"]}`,

    skills: `Suggest relevant skills based on the job description and current skills:
Current: ${JSON.stringify(currentContent)}
${jobDescription ? `Job: ${jobDescription}` : ''}
Return as JSON: {"technical": ["skills"], "soft": ["skills"]}`
  }

  return sectionPrompts[section] || 'Improve this CV content to be more professional.'
}

export function parseDocumentPrompt(text: string): string {
  return `Extract the professional information from the document below and structure it into CV data.
Only use information that is actually present in the document. Do not invent or guess details.
If a section is missing, return empty arrays or empty string for it.

Document text:
${text.slice(0, 14000)}

Return ONLY valid JSON in this EXACT format:
{
  "summary": "2 sentence professional summary based on the document (or empty string)",
  "experience": [
    {
      "jobTitle": "string",
      "company": "string",
      "startDate": "string (YYYY-MM or YYYY-MM-DD, or empty)",
      "endDate": "string (use empty string if current role)",
      "location": "string",
      "bullets": ["2-5 key responsibilities or achievements as written, cleaned up"]
    }
  ],
  "skills": {
    "technical": ["skills from the document"],
    "soft": ["soft skills from the document"]
  },
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "startDate": "string",
      "endDate": "string",
      "description": "string"
    }
  ]
}`;
}

export function improveTextPrompt(text: string, style: string): string {
  const styles: Record<string, string> = {
    professional: 'Make it sound professional, confident, and clear.',
    concise: 'Make it concise and to the point, removing any fluff.',
    detailed: 'Expand with more detail while keeping it relevant.',
    enthusiastic: 'Make it sound enthusiastic and energetic while staying professional.',
    formal: 'Make it more formal and serious in tone.'
  }

  return `Improve the following text. ${styles[style] || styles.professional}
Keep it as JSON string: {"text": "improved text"}

ORIGINAL TEXT:
"${text}"`
}

export function suggestSkillsPrompt(jobDescription: string, currentSkills: string[]): string {
  return `Based on this job description, suggest the most relevant skills to include in a CV:
${jobDescription}

Current skills: ${currentSkills.join(', ')}

Return as JSON: {"technical": ["specific technical skills"], "soft": ["soft skills"]}
Focus on skills that appear in or are implied by the job description.`
}

export function calculateATSScorePrompt(cvContent: any, jobDescription: string): string {
  return `Analyze this CV for ATS (Applicant Tracking System) compatibility against the job description.

CV CONTENT:
${JSON.stringify(cvContent, null, 2)}

JOB DESCRIPTION:
${jobDescription}

Provide:
1. An overall ATS score (0-100)
2. Missing keywords that should be added
3. Formatting issues that might cause parsing problems
4. Specific recommendations to improve

Return as JSON:
{
  "score": number,
  "missingKeywords": ["string"],
  "formattingIssues": ["string"],
  "recommendations": ["string"],
  "keywordMatchRate": number
}`
}
