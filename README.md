# English to Hindi Translation App

A modern, responsive Vue.js application for translating English text to Hindi with translation history and speech synthesis features.

## Features

### Core Features
- **Real-time Translation**: Translate English text to Hindi using the MyMemory API
- **Translation History**: Automatic saving of the last 10 translations
- **Text-to-Speech**: Listen to both original and translated text using ElevenLabs API
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Offline Storage**: Translation history persists using localStorage
- **Error Handling**: Comprehensive error handling with retry mechanisms

### User Interface
- **Modern Design**: Clean, gradient-based interface with smooth animations
- **Intuitive Controls**: Easy-to-use form with keyboard shortcuts
- **Visual Feedback**: Loading states and real-time character counting
- **Accessibility**: Full keyboard navigation and screen reader support

### Technical Features
- **Vue 3 Composition API**: Built with modern Vue.js patterns
- **TypeScript**: Full type safety throughout the application
- **Component Architecture**: Modular, reusable components
- **Local Storage**: Persistent data storage without backend
- **API Integration**: Robust API handling with retry logic

## Installation and Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Steps
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd translation-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## Usage

### Basic Translation
1. Enter English text in the input field (up to 1000 characters)
2. Click the "Translate" button or press `Ctrl + Enter`
3. View the Hindi translation in the result area
4. Use the speaker icons to hear the text spoken aloud

### Translation History
- All translations are automatically saved and displayed in the history section
- The history maintains the last 10 translations
- Click "Clear All" to remove all history
- History persists between browser sessions

### Keyboard Shortcuts
- `Ctrl + Enter`: Translate the current text
- `Tab`: Navigate between form elements
- `Space/Enter`: Activate buttons



## Project Structure

```
src/
├── components/
│   ├── TranslationForm.vue      # Input form component
│   ├── TranslationResult.vue    # Translation display component
│   └── TranslationHistory.vue   # History management component
├── utils/
│   └── translationApi.ts        # API integration utilities
├── App.vue                      # Main application component
├── main.ts                      # Application entry point
└── style.css                    # Global styles
```

## Build and Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment Options

  https://hinditranslation.netlify.app/

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Speech Synthesis**: Supported in most modern browsers
- **Local Storage**: Required for history persistence

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Technical Details

### Dependencies
- **Vue 3**: Modern JavaScript framework
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and development server
- **@vueuse/core**: Vue composition utilities

