<template>
  <div class="translation-result">
    <h2 class="result-title">Hindi Translation</h2>
    
    <div class="result-content">
      <div v-if="loading" class="loading-state">
        <div class="loading-animation"></div>
        <p>Translating your text...</p>
      </div>
      
      <div v-else-if="result" class="translation-display">
        <div class="original-text">
          <h3>Original (English)</h3>
          <p>{{ result.originalText }}</p>
          <button 
            @click="$emit('speak', result.originalText, 'en-US')"
            class="speak-btn"
            title="Speak English text"
          >
            🔊
          </button>
        </div>
        
        <div class="translated-text">
          <h3>Translation (Hindi)</h3>
          <p class="hindi-text">{{ result.translatedText }}</p>
          <button 
            @click="$emit('speak', result.translatedText, 'hi-IN')"
            class="speak-btn"
            title="Speak Hindi translation"
          >
            🔊
          </button>
        </div>
        
        <div class="translation-meta">
          <span class="timestamp">
            Translated {{ formatTime(result.timestamp) }}
          </span>
        </div>
      </div>
      
      <div v-else class="empty-state">
        <div class="empty-icon">🌐</div>
        <p>Your translations will appear here</p>
        <small>Enter some English text and click translate to get started</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Translation {
  id: string
  originalText: string
  translatedText: string
  timestamp: number
}

interface Props {
  result: Translation | null
  loading: boolean
}

defineProps<Props>()
defineEmits<{
  speak: [text: string, lang?: string]
}>()

const formatTime = (timestamp: number): string => {
  const now = Date.now()
  const diff = now - timestamp
  
  if (diff < 60000) return 'just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`
  return new Date(timestamp).toLocaleDateString()
}
</script>

<style scoped>
.translation-result {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
}

.result-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2d3748;
}

.result-content {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.loading-state {
  text-align: center;
  color: #718096;
}

.loading-animation {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.translation-display {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.original-text, .translated-text {
  position: relative;
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
}

.original-text {
  background: #f8fafc;
}

.translated-text {
  background: #f0f8ff;
  border-color: #bee3f8;
}

.original-text h3, .translated-text h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #4a5568;
}

.original-text p, .translated-text p {
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #2d3748;
}

.hindi-text {
  font-size: 1.2rem;
  font-weight: 500;
}

.speak-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.speak-btn:hover {
  background: rgba(0,0,0,0.1);
}

.translation-meta {
  text-align: center;
  margin-top: 1rem;
}

.timestamp {
  font-size: 0.9rem;
  color: #718096;
  font-style: italic;
}

.empty-state {
  text-align: center;
  color: #718096;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-state p {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.empty-state small {
  font-size: 0.9rem;
  opacity: 0.8;
}
</style>