interface MyMemoryResponse {
  responseData: {
    translatedText: string
    match: number
  }
  responseStatus: number
  responseDetails: string
}

export const translateText = async (text: string): Promise<string> => {
  const maxRetries = 3
  let retryCount = 0
  
  while (retryCount < maxRetries) {
    try {
      const encodedText = encodeURIComponent(text)
      const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|hi`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: MyMemoryResponse = await response.json()
      
      if (data.responseStatus === 200) {
        const translatedText = data.responseData.translatedText
        
        // Check if translation is valid (not just the original text)
        if (translatedText && translatedText.toLowerCase() !== text.toLowerCase()) {
          return translatedText
        } else {
          throw new Error('Translation service returned invalid result')
        }
      } else {
        throw new Error(data.responseDetails || 'Translation service error')
      }
      
    } catch (error) {
      retryCount++
      
      if (retryCount >= maxRetries) {
        if (error instanceof Error) {
          throw new Error(`Translation failed after ${maxRetries} attempts: ${error.message}`)
        } else {
          throw new Error(`Translation failed after ${maxRetries} attempts: Unknown error`)
        }
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000))
    }
  }
  
  throw new Error('Translation failed: Maximum retries exceeded')
}

// Helper function to validate text before translation
export const validateText = (text: string): { valid: boolean; error?: string } => {
  if (!text || text.trim().length === 0) {
    return { valid: false, error: 'Text cannot be empty' }
  }
  
  if (text.length > 1000) {
    return { valid: false, error: 'Text cannot exceed 1000 characters' }
  }
  
  // Check for potentially problematic characters
  const hasValidCharacters = /^[\w\s.,!?;:'"()-]+$/.test(text)
  if (!hasValidCharacters) {
    return { valid: false, error: 'Text contains unsupported characters' }
  }
  
  return { valid: true }
}

// Helper function to clean and prepare text for translation
export const prepareTextForTranslation = (text: string): string => {
  return text
    .trim()
    .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
    .replace(/[^\w\s.,!?;:'"()-]/g, '')  // Remove special characters
}