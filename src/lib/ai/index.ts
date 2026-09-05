import { generateWithOpenAI } from './openai'
import { generateWithAnthropicClaude } from './anthropic'
import { generateWithGroq } from './groq'
import { generateWithFreeAI } from './free'
import type { AIProvider, AIResponse, GenerateResult, AIUsageMetadata } from '@/types/ai'
import {
  SYSTEM_PROMPT,
  generateFullCVPrompt,
  regenerateSectionPrompt,
  improveTextPrompt,
  suggestSkillsPrompt,
  calculateATSScorePrompt
} from './prompts'

interface GenerateInput {
  cvData: any
  jobDescription?: string
  tone?: string
  industries?: string[]
  model?: string
  referenceText?: string
  referenceFileName?: string
}

export class AIProviderFactory {
  static async generateCV(
    provider: AIProvider,
    input: GenerateInput
  ): Promise<AIResponse<GenerateResult>> {
    const prompt = `${SYSTEM_PROMPT}\n\n${generateFullCVPrompt(input)}`

    try {
      const result = await runProvider(provider, prompt, input.model)

      const parsed = JSON.parse(result.content)

      return {
        data: parsed,
        metadata: result.usage
      }
    } catch (error: any) {
      throw new Error(`AI generation failed: ${error.message}`)
    }
  }

  static async regenerateSection(
    provider: AIProvider,
    section: string,
    currentContent: any,
    jobDescription?: string,
    model?: string
  ): Promise<AIResponse<any>> {
    const prompt = `${SYSTEM_PROMPT}\n\n${regenerateSectionPrompt(section, currentContent, jobDescription)}`

    const result = await runProvider(provider, prompt, model)

    return {
      data: JSON.parse(result.content),
      metadata: result.usage
    }
  }

  static async improveText(
    provider: AIProvider,
    text: string,
    style: string,
    model?: string
  ): Promise<AIResponse<{ text: string }>> {
    const prompt = improveTextPrompt(text, style)

    const result = await runProvider(provider, prompt, model)

    return {
      data: JSON.parse(result.content),
      metadata: result.usage
    }
  }

  static async suggestSkills(
    provider: AIProvider,
    jobDescription: string,
    currentSkills: string[],
    model?: string
  ): Promise<AIResponse<{ technical: string[]; soft: string[] }>> {
    const prompt = suggestSkillsPrompt(jobDescription, currentSkills)

    const result = await runProvider(provider, prompt, model)

    return {
      data: JSON.parse(result.content),
      metadata: result.usage
    }
  }

  static async analyzeATS(
    provider: AIProvider,
    content: any,
    jobDescription: string,
    model?: string
  ): Promise<AIResponse<any>> {
    const prompt = calculateATSScorePrompt(content, jobDescription)

    const result = await runProvider(provider, prompt, model)

    return {
      data: JSON.parse(result.content),
      metadata: result.usage
    }
  }
}

async function runProvider(
  provider: AIProvider,
  prompt: string,
  model?: string
): Promise<{ content: string; usage: AIUsageMetadata }> {
  if (provider === 'anthropic') {
    return await generateWithAnthropicClaude(prompt, model)
  }
  if (provider === 'groq') {
    return await generateWithGroq(prompt, model)
  }
  if (provider === 'free') {
    return await generateWithFreeAI(prompt, model)
  }
  return await generateWithOpenAI(prompt, model)
}

export type { AIProvider, AIResponse, GenerateResult, AIUsageMetadata }