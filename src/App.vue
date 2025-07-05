<template>
  <div id="app">
    <div class="container">
      <header class="header">
        <h1 class="title">English to Hindi Translator</h1>
        <p class="subtitle">Translate text instantly with AI-powered voice synthesis</p>
      </header>

      <VoiceSettings @voice-service-update="updateVoiceService" />

      <main class="main-content">
        <TranslationForm 
          @translate="handleTranslate" 
          :loading="isLoading"
          :error="error"
        />
        
        <TranslationResult 
          :result="lastTranslation"
          :loading="isLoading"
          @speak="handleSpeak"
        />
      </main>
      
      <TranslationHistory 
        :history="translationHistory" 
        @clear="clearHistory"
        @speak="handleSpeak"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TranslationForm from './components/TranslationForm.vue'
import TranslationResult from './components/TranslationResult.vue'
import TranslationHistory from './components/TranslationHistory.vue'
import VoiceSettings from './components/VoiceSettings.vue'
import { translateText } from './utils/translationApi'
import VoiceService from './utils/voiceApi'
import { useLocalStorage } from '@vueuse/core'

interface Translation {
  id: string
  originalText: string
  translatedText: string
  timestamp: number
}

const isLoading = ref(false)
const error = ref('')
const lastTranslation = ref<Translation | null>(null)
const translationHistory = useLocalStorage<Translation[]>('translation-history', [])
const voiceService = ref<VoiceService>(new VoiceService())

const handleTranslate = async (text: string) => {
  if (!text.trim()) {
    error.value = 'Please enter some text to translate'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    const translatedText = await translateText(text)
    
    const newTranslation: Translation = {
      id: Date.now().toString(),
      originalText: text,
      translatedText,
      timestamp: Date.now()
    }

    lastTranslation.value = newTranslation
    addToHistory(newTranslation)
    
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Translation failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const addToHistory = (translation: Translation) => {
  const history = [...translationHistory.value]
  history.unshift(translation)
  
  if (history.length > 10) {
    history.pop()
  }
  
  translationHistory.value = history
}

const clearHistory = () => {
  translationHistory.value = []
  lastTranslation.value = null
}

const handleSpeak = async (text: string, lang: string = 'hi-IN') => {
  try {
    // Convert lang format to our voice service format
    const language = lang.startsWith('hi') ? 'hi' : 'en'
    await voiceService.value.speak(text, language)
  } catch (error) {
    console.error('Speech failed:', error)
  }
}

const updateVoiceService = (newVoiceService: VoiceService) => {
  voiceService.value = newVoiceService
}

onMounted(() => {
  // Load the most recent translation on app start
  if (translationHistory.value.length > 0) {
    lastTranslation.value = translationHistory.value[0]
  }
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 1.5rem;
  color: white;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 300;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .main-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>