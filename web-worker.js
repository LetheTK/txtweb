// 在浏览器中进行繁重计算
self.onmessage = async function(e) {
  const { type, data } = e.data;
  
  switch (type) {
    case 'split':
      const parts = await splitFile(data);
      self.postMessage({ type: 'split-result', data: parts });
      break;
    // ...
  }
} 