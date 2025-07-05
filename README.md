# English to Hindi Translation App

A modern, responsive Vue.js application for translating English text to Hindi with translation history and speech synthesis features.

## Features

### Core Features
- **Real-time Translation**: Translate English text to Hindi using MyMemory API
- **Translation History**: Automatic saving of the last 10 translations
- **Text-to-Speech**: Listen to both original and translated text
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

## API Information

This application uses the **MyMemory Translation API**, which:
- Provides free translation services
- Does not require API keys
- Supports English to Hindi translation
- Has built-in rate limiting and error handling

**API Endpoint**: `https://api.mymemory.translated.net/get`

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
The built application can be deployed to any static hosting service:
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Use the built files from `dist` folder

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

### Performance Optimizations
- **Lazy Loading**: Components loaded on demand
- **Debounced Input**: Prevents excessive API calls
- **Caching**: LocalStorage for offline functionality
- **Efficient Rendering**: Vue's reactivity system

## Error Handling

The application includes comprehensive error handling:
- **Network Errors**: Automatic retry with exponential backoff
- **API Errors**: User-friendly error messages
- **Input Validation**: Character limits and format checking
- **Graceful Degradation**: Fallback options when features aren't available

## Accessibility

- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user's motion preferences

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure you have an active internet connection
3. Try refreshing the page
4. Clear your browser cache if needed

## Future Enhancements

Potential features for future versions:
- Additional language pairs
- Offline translation capabilities
- User accounts and cloud sync
- Advanced text formatting options
- Translation quality ratings