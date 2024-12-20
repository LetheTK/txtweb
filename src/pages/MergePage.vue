<template>
  <div class="merge-page">
    <h1>文件合并</h1>
    <input type="file" multiple @change="handleFilesSelect" accept=".txt" />
    <div class="file-list" v-if="files.length">
      <div 
        v-for="(file, index) in files" 
        :key="file.name"
        class="file-item"
      >
        <span>{{ index + 1 }}. {{ file.name }}</span>
        <button @click="removeFile(index)">删除</button>
      </div>
    </div>
    <button 
      @click="startMerge" 
      :disabled="!files.length"
      class="merge-button"
    >
      开始合并
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { processFile } from '../utils/fileProcessor'

const files = ref<File[]>([])

const handleFilesSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    files.value = Array.from(input.files)
  }
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
}

const startMerge = async () => {
  if (!files.value.length) return
  
  try {
    const result = await processFile(files.value, {
      mode: 'merge',
      value: 0
    })
    // 处理合并结果...
  } catch (error) {
    console.error('合并失败:', error)
  }
}
</script>

<style scoped>
.merge-page {
  padding: 20px;
}

.file-list {
  margin: 20px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.file-item:last-child {
  border-bottom: none;
}

.merge-button {
  margin-top: 20px;
}
</style> 