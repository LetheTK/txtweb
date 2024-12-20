export default async function mergeHandler(request: Request, env: Env) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const formData = await request.formData();
    const files: File[] = [];
    
    // 收集所有文件
    for (let i = 0; formData.has(`file${i}`); i++) {
      files.push(formData.get(`file${i}`) as File);
    }

    if (files.length === 0) {
      return new Response('No files provided', { status: 400 });
    }

    // 读取并合并所有文件内容
    const contents = await Promise.all(
      files.map(file => file.text())
    );
    
    const mergedContent = contents.join('\n');
    
    return new Response(mergedContent, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': 'attachment; filename=merged.txt'
      }
    });
  } catch (error) {
    return new Response('Error processing files: ' + error.message, { status: 500 });
  }
} 