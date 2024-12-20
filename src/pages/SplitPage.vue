<template>
  <div class="split-page">
    <h1>文件分割</h1>
    <input type="file" @change="handleFileSelect" accept=".txt" />
    
    <div class="options" v-if="file">
      <div class="option-group">
        <label>分割方式：</label>
        <select v-model="splitMode">
          <option value="size">按大小分割</option>
          <option value="count">按份数分割</option>
        </select>
      </div>
      
      <div class="option-group">
        <label>{{ splitMode === 'size' ? '每份大小(MB)：' : '分割份数：' }}</label>
        <input 
          type="number" 
          v-model.number="splitValue"
          :min="splitMode === 'size' ? 0.1 : 2"
          :step="splitMode === 'size' ? 0.1 : 1"
        />
      </div>
    </div>

    <button 
      @click="startSplit" 
      :disabled="!file || !isValidValue"
      class="split-button"
    >
      开始分割
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { processFile } from '../utils/fileProcessor'

const file = ref<File | null>(null)
const splitMode = ref<'size' | 'count'>('size')
const splitValue = ref(1)

const isValidValue = computed(() => {
  if (splitMode.value === 'size') {
    return splitValue.value >= 0.1
  } else {
    return splitValue.value >= 2
  }
})

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    file.value = input.files[0]
  }
}

const startSplit = async () => {
  if (!file.value || !isValidValue.value) return
  
  try {
    const value = splitMode.value === 'size' 
      ? splitValue.value * 1024 * 1024  // 转换为字节
      : splitValue.value

    const result = await processFile(file.value, {
      mode: splitMode.value,
      value
    })
    
    if (result) {
      // 使用 StreamSaver.js 下载文件
      const fileStream = streamSaver.createWriteStream('split_result.zip')
      result.stream().pipeTo(fileStream)
    }
  } catch (error) {
    console.error('分割失败:', error)
  }
}
</script>

<style scoped>
.split-page {
  padding: 20px;
}

.options {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.option-group {
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.option-group label {
  min-width: 100px;
}

.option-group select,
.option-group input {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.split-button {
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.split-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style> 