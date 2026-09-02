import { generateWithOpenAI } from './openai'
import { generateWithAnthropicClaude } from './anthropic'
import type { AIProvider, AIResponse, GenerateResult, AIUsageMetadata } from '@/types/ai'
import {
  SYSTEM_PROMPT,
  generateFullCVPrompt,
  regenerateSectionPrompt,
  improveTextPrompt,
  suggestSkillsPrompt,
  calculateATSScorePrompt
} from './prompts'

export class AIProviderFactory {
  static async generateCV(
    provider: AIProvider,
    input: any
  ): Promise<AIResponse<GenerateResult>> {
    const prompt = `${SYSTEM_PROMPT}\n\n${generateFullCVPrompt(input)}`

    try {
      const result =
        provider === 'openai'
          ? await generateWithOpenAI(prompt)
          : await generateWithAnthropicClaude(prompt)

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
    jobDescription?: string
  ): Promise<AIResponse<any>> {
    const prompt = `${SYSTEM_PROMPT}\n\n${regenerateSectionPrompt(section, currentContent, jobDescription)}`

    const result =
      provider === 'openai'
        ? await generateWithOpenAI(prompt)
        : await generateWithAnthropicClaude(prompt)

    return {
      data: JSON.parse(result.content),
      metadata: result.usage
    }
  }

  static async improveText(
    provider: AIProvider,
    text: string,
    style: string
  ): Promise<AIResponse<{ text: string }>> {
    const prompt = improveTextPrompt(text, style)

    const result =
      provider === 'openai'
        ? await generateWithOpenAI(prompt)
        : await generateWithAnthropicClaude(prompt)

    return {
      data: JSON.parse(result.content),
      metadata: result.usage
    }
  }

  static async suggestSkills(
    provider: AIProvider,
    jobDescription: string,
    currentSkills: string[]
  ): Promise<AIResponse<{ technical: string[]; soft: string[] }>> {
    const prompt = suggestSkillsPrompt(jobDescription, currentSkills)

    const result =
      provider === 'openai'
        ? await generateWithOpenAI(prompt)
        : await generateWithAnthropicClaude(prompt)

    return {
      data: JSON.parse(result.content),
      metadata: result.usage
    }
  }

  static async analyzeATS(
    provider: AIProvider,
    content: any,
    jobDescription: string
  ): Promise<AIResponse<any>> {
    const prompt = calculateATSScorePrompt(content, jobDescription)

    const result =
      provider === 'openai'
        ? await generateWithOpenAI(prompt)
        : await generateWithAnthropicClaude(prompt)

    return {
      data: JSON.parse(result.content),
      metadata: result.usage
    }
  }
}

export type { AIProvider, AIResponse, GenerateResult, AIUsageMetadata }

