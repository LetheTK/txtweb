export default async function splitHandler(request: Request, env: Env) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const options = JSON.parse(formData.get('options') as string);

    if (!file) {
      return new Response('No file provided', { status: 400 });
    }

    const content = await file.text();
    const parts = splitContent(content, options);
    
    // 创建 ZIP 文件
    const zip = new JSZip();
    parts.forEach((part, index) => {
      zip.file(`part_${index + 1}.txt`, part);
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    return new Response(zipBlob, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename=split_result.zip'
      }
    });
  } catch (error) {
    return new Response('Error processing file: ' + error.message, { status: 500 });
  }
}

function splitContent(content: string, options: { mode: 'size' | 'count', value: number }): string[] {
  const parts: string[] = [];
  
  if (options.mode === 'count') {
    const partSize = Math.ceil(content.length / options.value);
    for (let i = 0; i < content.length; i += partSize) {
      parts.push(content.slice(i, i + partSize));
    }
  } else {
    const size = options.value;
    for (let i = 0; i < content.length; i += size) {
      parts.push(content.slice(i, i + size));
    }
  }
  
  return parts;
} 