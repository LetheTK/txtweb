export interface ProcessOptions {
  mode: 'size' | 'count' | 'merge' | 'dedup';
  value: number;
  strict?: boolean;
}

export async function processFile(
  file: File | File[], 
  options: ProcessOptions
): Promise<Blob | null> {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  
  const formData = new FormData();
  if (Array.isArray(file)) {
    file.forEach((f, i) => formData.append(`file${i}`, f));
  } else {
    formData.append('file', file);
  }
  
  formData.append('options', JSON.stringify(options));
  
  try {
    const response = await fetch(`${apiUrl}/${options.mode}`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.blob();
  } catch (error) {
    console.error('处理文件时出错:', error);
    return null;
  }
} 