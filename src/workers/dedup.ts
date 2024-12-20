export default async function dedupHandler(request: Request, env: Env) {
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
    const { result, duplicates } = removeDuplicates(content, options);
    
    return new Response(result, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': 'attachment; filename=deduped.txt'
      }
    });
  } catch (error) {
    return new Response('Error processing file: ' + error.message, { status: 500 });
  }
}

function removeDuplicates(content: string, options: { minLength: number, strict: boolean }) {
  const chapters = content.split(/(?=第[零一二三四五六七八九十百千万\d]+[章节回集])/);
  const seen = new Set<string>();
  const result: string[] = [];
  const duplicates: string[] = [];

  for (const chapter of chapters) {
    if (chapter.length < options.minLength) {
      result.push(chapter);
      continue;
    }

    const key = options.strict ? chapter : chapter.slice(0, 100);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(chapter);
    } else {
      duplicates.push(chapter);
    }
  }

  return {
    result: result.join(''),
    duplicates
  };
} 