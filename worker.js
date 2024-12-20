// 使用流式处理和切片上传来处理大文件
export default {
  async fetch(request, env) {
    // 使用 ReadableStream 处理文件
    const stream = request.body;
    const chunks = [];
    
    const reader = stream.getReader();
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    
    // 处理逻辑...
  }
} 