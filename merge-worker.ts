async function mergeFiles(files: File[]) {
  const chunks = [];
  
  for (const file of files) {
    const chunk = await file.arrayBuffer();
    chunks.push(chunk);
  }
  
  return new Blob(chunks, { type: 'text/plain' });
}

// 前端实现
const mergeComponent = {
  template: `
    <div>
      <input type="file" multiple @change="handleFiles" />
      <button @click="merge">合并</button>
    </div>
  `,
  methods: {
    async merge() {
      // 在浏览器端进行合并
      const result = await mergeFiles(this.files);
      // 使用 StreamSaver.js 下载
      const fileStream = streamSaver.createWriteStream('merged.txt');
      result.stream().pipeTo(fileStream);
    }
  }
} 