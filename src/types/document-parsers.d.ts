declare module 'pdf-parse/lib/pdf-parse.js' {
  interface PdfParseResult {
    text: string
    numpages: number
    numrender: number
    info: Record<string, any>
    metadata: Record<string, any>
    version: string
  }

  interface PdfParseOptions {
    pagerender?: (pageData: any) => string
    max?: number
    version?: string
  }

  function pdfParse(
    dataBuffer: Buffer,
    options?: PdfParseOptions
  ): Promise<PdfParseResult>

  export = pdfParse
}