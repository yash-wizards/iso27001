export function chunkText(text, maxChunkSize = 5000) {
  const paragraphs = text.split(/\n\s*\n/); // split by blank lines
  const chunks = [];

  let currentChunk = "";

  for (let para of paragraphs) {
    // Clean extra spaces
    para = para.trim();

    if (!para) continue;

    // If adding paragraph exceeds size → push current chunk
    if ((currentChunk + para).length > maxChunkSize) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = para + "\n\n";
    } else {
      currentChunk += para + "\n\n";
    }
  }

  // Push remaining content
  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}