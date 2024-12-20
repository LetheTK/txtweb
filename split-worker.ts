export interface Env {
  R2: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env) {
    // 使用 Streams API 处理文件
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    
    // 在客户端进行分割，worker只负责处理单个切片
    request.body
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(new TransformStream({
        transform(chunk, controller) {
          // 处理分割逻辑
          controller.enqueue(chunk);
        }
      }))
      .pipeTo(writable);

    return new Response(readable);
  }
} 