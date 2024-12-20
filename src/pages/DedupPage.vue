<template>
  <div class="dedup-page">
    <h1>章节去重</h1>
    <input type="file" @change="handleFileSelect" accept=".txt" />
    
    <div class="options" v-if="file">
      <label>
        <input type="checkbox" v-model="options.strictMode" />
        严格模式
      </label>
      <label>
        <input type="number" v-model="options.minLength" />
        最小章节长度
      </label>
    </div>

    <div class="preview" v-if="chapters.length">
      <h3>检测到的章节：</h3>
      <div class="chapter-list">
        <div 
          v-for="(chapter, index) in chapters" 
          :key="index"
          class="chapter-item"
          :class="{ duplicate: chapter.isDuplicate }"
        >
          {{ chapter.title }}
        </div>
      </div>
    </div>

    <button 
      @click="startDedup" 
      :disabled="!file"
      class="dedup-button"
    >
      开始去重
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { processFile } from '../utils/fileProcessor'

const file = ref<File | null>(null)
const chapters = ref<Array<{ title: string; isDuplicate: boolean }>>([])
const options = ref({
  strictMode: false,
  minLength: 100
})

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    file.value = input.files[0]
    // 预览章节...
  }
}

const startDedup = async () => {
  if (!file.value) return
  
  try {
    const result = await processFile(file.value, {
      mode: 'dedup',
      value: options.value.minLength,
      strict: options.value.strictMode
    })
    // 处理去重结果...
  } catch (error) {
    console.error('去重失败:', error)
  }
}
</script>

<style scoped>
.dedup-page {
  padding: 20px;
}

.options {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.chapter-list {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 10px;
}

.chapter-item {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.chapter-item.duplicate {
  background-color: #fff3f3;
}

.dedup-button {
  margin-top: 20px;
}
</style> 