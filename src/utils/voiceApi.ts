interface ElevenLabsVoice {
  voice_id: string
  name: string
  category: string
  labels: {
    accent?: string
    description?: string
    age?: string
    gender?: string
    use_case?: string
  }
}

interface VoiceSettings {
  stability: number
  similarity_boost: number
  style?: number
  use_speaker_boost?: boolean
}

class ElevenLabsService {
  private apiKey: string
  private baseUrl = 'https://api.elevenlabs.io/v1'
  
  // Default voice IDs - these are public voices from ElevenLabs
  private defaultVoices = {
    english: 'pNInz6obpgDQGcFmaJgB', // Adam - English male
    hindi: '21m00Tcm4TlvDq8ikWAM', // Rachel - can handle Hindi with good pronunciation
    englishFemale: 'EXAVITQu4vr4xnSDxMaL', // Bella - English female
    multilingual: 'pMsXgVXv3BLzUgSXRplE' // Multilingual voice for better Hindi
  }

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async getAvailableVoices(): Promise<ElevenLabsVoice[]> {
    try {
      const response = await fetch(`${this.baseUrl}/voices`, {
        headers: {
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch voices: ${response.status}`)
      }

      const data = await response.json()
      return data.voices || []
    } catch (error) {
      console.error('Error fetching voices:', error)
      return []
    }
  }

  async synthesizeSpeech(
    text: string, 
    language: 'en' | 'hi' = 'en',
    voiceId?: string
  ): Promise<ArrayBuffer> {
    // Select appropriate voice based on language
    const selectedVoiceId = voiceId || (language === 'hi' ? this.defaultVoices.multilingual : this.defaultVoices.english)
    
    const voiceSettings: VoiceSettings = {
      stability: 0.75,
      similarity_boost: 0.75,
      style: 0.5,
      use_speaker_boost: true
    }

    try {
      const response = await fetch(`${this.baseUrl}/text-to-speech/${selectedVoiceId}`, {
        method: 'POST',
        headers: {
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg'
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2', // Better for Hindi pronunciation
          voice_settings: voiceSettings
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Speech synthesis failed: ${response.status} - ${errorText}`)
      }

      return await response.arrayBuffer()
    } catch (error) {
      console.error('Error synthesizing speech:', error)
      throw error
    }
  }

  async playAudio(audioBuffer: ArrayBuffer): Promise<void> {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const audioBufferDecoded = await audioContext.decodeAudioData(audioBuffer)
      const source = audioContext.createBufferSource()
      
      source.buffer = audioBufferDecoded
      source.connect(audioContext.destination)
      source.start(0)

      return new Promise((resolve) => {
        source.onended = () => resolve()
      })
    } catch (error) {
      console.error('Error playing audio:', error)
      throw error
    }
  }
}

// Fallback to browser's built-in speech synthesis
export const fallbackSpeak = (text: string, lang: string = 'hi-IN'): void => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.8
    utterance.pitch = 1
    speechSynthesis.speak(utterance)
  } else {
    console.warn('Speech synthesis not supported in this browser')
  }
}

// Main voice service
export class VoiceService {
  private elevenLabs: ElevenLabsService | null = null
  private isElevenLabsEnabled = false

  constructor(apiKey?: string) {
    // Try to get API key from environment variables first
    const envApiKey = import.meta.env.VITE_ELEVENLABS_API_KEY
    const finalApiKey = apiKey || envApiKey
    
    if (finalApiKey && finalApiKey.trim() && finalApiKey !== 'your_elevenlabs_api_key_here') {
      this.elevenLabs = new ElevenLabsService(finalApiKey)
      this.isElevenLabsEnabled = true
      console.log('ElevenLabs voice service initialized')
    } else {
      console.log('Using browser speech synthesis (ElevenLabs API key not provided)')
    }
  }

  async speak(text: string, language: 'en' | 'hi' = 'en'): Promise<void> {
    // Try ElevenLabs first if available
    if (this.isElevenLabsEnabled && this.elevenLabs) {
      try {
        console.log(`Speaking with ElevenLabs: "${text}" (${language})`)
        const audioBuffer = await this.elevenLabs.synthesizeSpeech(text, language)
        await this.elevenLabs.playAudio(audioBuffer)
        return
      } catch (error) {
        console.warn('ElevenLabs failed, falling back to browser speech:', error)
      }
    }

    // Fallback to browser's built-in speech synthesis
    console.log(`Speaking with browser: "${text}" (${language})`)
    const lang = language === 'hi' ? 'hi-IN' : 'en-US'
    fallbackSpeak(text, lang)
  }

  async getVoices(): Promise<ElevenLabsVoice[]> {
    if (this.elevenLabs) {
      return await this.elevenLabs.getAvailableVoices()
    }
    return []
  }

  isElevenLabsAvailable(): boolean {
    return this.isElevenLabsEnabled
  }

  getServiceType(): string {
    return this.isElevenLabsEnabled ? 'ElevenLabs AI' : 'Browser Speech'
  }
}

export default VoiceService