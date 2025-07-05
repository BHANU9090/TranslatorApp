<template>
  <div class="translation-history">
    <div class="history-header">
      <h2 class="history-title">Translation History</h2>
      <button 
        v-if="history.length > 0"
        @click="$emit('clear')"
        class="clear-history-btn"
      >
        Clear All
      </button>
    </div>
    
    <div class="history-content">
      <div v-if="history.length === 0" class="empty-history">
        <div class="empty-icon">📚</div>
        <p>No translations yet</p>
        <small>Your translation history will appear here</small>
      </div>
      
      <div v-else class="history-list">
        <div 
          v-for="(item, index) in history" 
          :key="item.id"
          class="history-item"
          :class="{ 'latest': index === 0 }"
        >
          <div class="history-item-content">
            <div class="original">
              <strong>English:</strong> {{ item.originalText }}
              <button 
                @click="$emit('speak', item.originalText, 'en-US')"
                class="mini-speak-btn"
                title="Speak English"
              >
                🔊
              </button>
            </div>
            <div class="translated">
              <strong>Hindi:</strong> {{ item.translatedText }}
              <button 
                @click="$emit('speak', item.translatedText, 'hi-IN')"
                class="mini-speak-btn"
                title="Speak Hindi"
              >
                🔊
              </button>
            </div>
            <div class="timestamp">
              {{ formatTime(item.timestamp) }}
            </div>
          </div>
          <div class="item-number">{{ index + 1 }}</div>
        </div>
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
  history: Translation[]
}

defineProps<Props>()
defineEmits<{
  clear: []
  speak: [text: string, lang?: string]
}>()

const formatTime = (timestamp: number): string => {
  const now = Date.now()
  const diff = now - timestamp
  
  if (diff < 60000) return 'just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}min ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return new Date(timestamp).toLocaleDateString()
}
</script>

<style scoped>
.translation-history {
  grid-column: 1 / -1;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.history-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.clear-history-btn {
  background: #fed7d7;
  color: #c53030;
  border: 2px solid #feb2b2;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-history-btn:hover {
  background: #fec2c2;
  border-color: #fc8181;
}

.history-content {
  min-height: 200px;
}

.empty-history {
  text-align: center;
  color: #718096;
  padding: 2rem;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.2s;
  position: relative;
}

.history-item:hover {
  border-color: #cbd5e0;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.history-item.latest {
  border-color: #667eea;
  background: #f0f8ff;
}

.history-item-content {
  flex: 1;
}

.original, .translated {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  position: relative;
}

.original strong, .translated strong {
  color: #4a5568;
  font-size: 0.9rem;
  min-width: 60px;
}

.original {
  color: #2d3748;
}

.translated {
  color: #1a365d;
  font-weight: 500;
}

.mini-speak-btn {
  background: none;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  opacity: 0.7;
}

.mini-speak-btn:hover {
  background: rgba(0,0,0,0.1);
  opacity: 1;
}

.timestamp {
  font-size: 0.8rem;
  color: #718096;
  font-style: italic;
  margin-top: 0.5rem;
}

.item-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: #667eea;
  color: white;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
}

.history-item.latest .item-number {
  background: #48bb78;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@media (max-width: 768px) {
  .history-item {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .item-number {
    align-self: flex-start;
  }
}
</style>