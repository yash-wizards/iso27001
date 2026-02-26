import { PDFParse } from "pdf-parse";

export async function readPdf(path) {
  const parser = new PDFParse({ url: path });
  const { text } = await parser.getText();
  return text;
}
