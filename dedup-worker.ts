export default {
  async fetch(request: Request) {
    const text = await request.text();
    
    // 将文本分割成小块进行处理
    const chunks = splitIntoChunks(text, 1000000); // 1MB chunks
    
    const uniqueChapters = new Set();
    const result = [];
    
    for (const chunk of chunks) {
      const chapters = extractChapters(chunk);
      for (const chapter of chapters) {
        if (!uniqueChapters.has(chapter.hash)) {
          uniqueChapters.add(chapter.hash);
          result.push(chapter.content);
        }
      }
    }
    
    return new Response(result.join('\n'));
  }
} 