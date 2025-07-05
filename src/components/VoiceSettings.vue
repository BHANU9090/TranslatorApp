<template>
  <div class="voice-settings">
    <div class="settings-header" @click="toggleSettings">
      <div class="header-content">
        <span class="voice-icon">🎙️</span>
        <div class="header-text">
          <span class="service-name">{{ voiceService.getServiceType() }}</span>
          <span class="service-status" :class="{ active: isElevenLabsActive }">
            {{ isElevenLabsActive ? 'Premium AI Voices' : 'Browser Speech' }}
          </span>
        </div>
      </div>
      <button class="toggle-btn">
        {{ showSettings ? '▼' : '▶' }}
      </button>
    </div>
    
    <div v-if="showSettings" class="settings-content">
      <div v-if="!isElevenLabsActive" class="api-setup">
        <p class="setup-text">
          <strong>🚀 Upgrade to Premium:</strong> 
          Add your ElevenLabs API key to <code>.env</code> for natural AI voices
        </p>
      </div>

      <div class="test-section">
        <div class="test-controls">
          <button 
            @click="testEnglishVoice" 
            class="test-btn"
            :disabled="isTesting"
          >
            🇺🇸 Test English
          </button>
          <button 
            @click="testHindiVoice" 
            class="test-btn"
            :disabled="isTesting"
          >
            🇮🇳 Test Hindi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VoiceService from '../utils/voiceApi'

const emit = defineEmits<{
  voiceServiceUpdate: [service: VoiceService]
}>()

const showSettings = ref(false)
const isElevenLabsActive = ref(false)
const isTesting = ref(false)
const voiceService = ref<VoiceService>(new VoiceService())

const toggleSettings = () => {
  showSettings.value = !showSettings.value
}

const testEnglishVoice = async () => {
  isTesting.value = true
  try {
    await voiceService.value.speak('Hello! This is a test of English voice synthesis.', 'en')
  } catch (error) {
    console.error('English voice test failed:', error)
  } finally {
    isTesting.value = false
  }
}

const testHindiVoice = async () => {
  isTesting.value = true
  try {
    await voiceService.value.speak('नमस्ते! यह हिंदी आवाज़ संश्लेषण का परीक्षण है।', 'hi')
  } catch (error) {
    console.error('Hindi voice test failed:', error)
  } finally {
    isTesting.value = false
  }
}

onMounted(async () => {
  isElevenLabsActive.value = voiceService.value.isElevenLabsAvailable()
  emit('voiceServiceUpdate', voiceService.value)
})
</script>

<style scoped>
.voice-settings {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 0;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.voice-icon {
  font-size: 1.2rem;
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.service-name {
  font-weight: 600;
  color: #2d3748;
  font-size: 0.9rem;
}

.service-status {
  font-size: 0.8rem;
  color: #718096;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.service-status::before {
  content: '●';
  color: #cbd5e0;
}

.service-status.active::before {
  color: #48bb78;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  color: #718096;
}

.toggle-btn:hover {
  background: rgba(0,0,0,0.1);
}

.settings-content {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(226, 232, 240, 0.5);
}

.api-setup {
  margin-bottom: 1rem;
}

.setup-text {
  background: rgba(240, 248, 255, 0.8);
  border: 1px solid #bee3f8;
  border-radius: 8px;
  padding: 0.75rem;
  margin: 0;
  font-size: 0.85rem;
  color: #2d3748;
}

.setup-text code {
  background: rgba(226, 232, 240, 0.8);
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.8rem;
}

.test-section {
  margin-top: 1rem;
}

.test-controls {
  display: flex;
  gap: 0.75rem;
}

.test-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s;
  flex: 1;
}

.test-btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.test-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .test-controls {
    flex-direction: column;
  }
  
  .header-content {
    gap: 0.5rem;
  }
  
  .service-name {
    font-size: 0.85rem;
  }
  
  .service-status {
    font-size: 0.75rem;
  }
}
</style>