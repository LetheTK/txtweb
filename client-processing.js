// 将部分处理逻辑放在客户端
async function processInBrowser(file) {
  // 使用 Web Workers 进行处理
  const worker = new Worker('worker.js');
  
  // 切片处理
  const chunkSize = 1024 * 1024; // 1MB
  let offset = 0;
  
  while (offset < file.size) {
    const chunk = file.slice(offset, offset + chunkSize);
    await processChunk(chunk);
    offset += chunkSize;
  }
} 