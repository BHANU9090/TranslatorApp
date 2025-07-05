<template>
  <div class="translation-form">
    <h2 class="form-title">Enter English Text</h2>
    <div class="form-group">
      <textarea
        v-model="inputText"
        placeholder="Type your English text here..."
        class="text-input"
        rows="4"
        @keyup.ctrl.enter="handleTranslate"
        :disabled="loading"
      ></textarea>
      <div class="char-count">{{ inputText.length }}/1000</div>
    </div>
    
    <div class="form-actions">
      <button 
        @click="handleTranslate"
        :disabled="loading || !inputText.trim()"
        class="translate-btn"
      >
        <span v-if="loading" class="loading-spinner"></span>
        <span v-else>🔄</span>
        {{ loading ? 'Translating...' : 'Translate' }}
      </button>
      
      <button 
        @click="clearInput"
        :disabled="loading"
        class="clear-btn"
      >
        Clear
      </button>
    </div>
    
    <div v-if="error" class="error-message">
      ⚠️ {{ error }}
    </div>
    
    <div class="tips">
      <p><strong>Tips:</strong></p>
      <ul>
        <li>Press <kbd>Ctrl + Enter</kbd> to translate quickly</li>
        <li>Maximum 1000 characters per translation</li>
        <li>Translations are saved in your browser</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  loading: boolean
  error: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  translate: [text: string]
}>()

const inputText = ref('')

const handleTranslate = () => {
  if (inputText.value.trim() && inputText.value.length <= 1000) {
    emit('translate', inputText.value.trim())
  }
}

const clearInput = () => {
  inputText.value = ''
}

// Watch for input length and provide feedback
watch(inputText, (newText) => {
  if (newText.length > 1000) {
    inputText.value = newText.slice(0, 1000)
  }
})
</script>

<style scoped>
.translation-form {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2d3748;
}

.form-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.text-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.text-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.text-input:disabled {
  background-color: #f7fafc;
  cursor: not-allowed;
}

.char-count {
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 0.8rem;
  color: #718096;
  background: white;
  padding: 2px 6px;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.translate-btn {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.translate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
}

.translate-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.clear-btn {
  background: #f7fafc;
  color: #4a5568;
  border: 2px solid #e2e8f0;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover:not(:disabled) {
  background: #edf2f7;
  border-color: #cbd5e0;
}

.loading-spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  background: #fed7d7;
  color: #c53030;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.tips {
  background: #f0f8ff;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #2d3748;
}

.tips p {
  margin: 0 0 0.5rem 0;
}

.tips ul {
  margin: 0;
  padding-left: 1.2rem;
}

.tips li {
  margin-bottom: 0.3rem;
}

kbd {
  background: #e2e8f0;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.8rem;
  font-family: monospace;
}
</style>