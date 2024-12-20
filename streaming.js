const stream = new ReadableStream({
  start(controller) {
    // 处理数据
  },
  pull(controller) {
    // 按需获取数据
  },
  cancel() {
    // 清理
  }
}); 