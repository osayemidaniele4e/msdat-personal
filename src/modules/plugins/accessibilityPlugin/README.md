# Accessibility Plugin

## Overview

The Accessibility Plugin provides comprehensive accessibility features to make the MSDAT application more usable for users with disabilities. It follows the same architectural pattern as other plugins in the system.

## Features

### 1. **High Contrast Mode**

- Toggles high contrast colors for better visibility
- Useful for users with visual impairments
- Changes all colors to black background with white text

### 2. **Font Size Adjustment**

- Adjust text size from level 1 to 5
- Level 3 is the default (16px)
- Ranges from 12.8px (Level 1) to 19.2px (Level 5)

### 3. **Enhanced Focus Indicators**

- Makes keyboard focus more visible
- Adds prominent yellow outline to focused elements
- Improves navigation for keyboard users

### 4. **Reduced Motion**

- Minimizes animations and transitions
- Helpful for users with vestibular disorders
- Reduces motion to nearly zero for comfort

### 5. **Screen Reader Support**

- ARIA live region for announcements
- Test functionality to verify screen reader compatibility
- Automatic announcements when settings change

### 6. **Persistent Settings**

- All settings are saved to localStorage
- Settings persist across browser sessions
- Automatic restoration of settings on page load

## How to Enable

### Method 1: Through User Settings (Recommended)

1. Navigate to User Settings in the application
2. Go to the "Plugins" section
3. Find "Accessibility Plugin" in the list
4. Toggle it to "Enabled"
5. Refresh the page or restart the application

### Method 2: Manual Activation (For Testing)

Open browser console and run:

```javascript
localStorage.setItem('accessibilityPlugin', 'true');
location.reload();
```

## How to Use

### Accessing the Plugin

1. Once enabled, look for the blue accessibility icon (♿) in the bottom-right corner of the screen
2. Click the icon to open the accessibility settings panel

### Available Controls

#### High Contrast Mode

- **Checkbox**: Toggle high contrast on/off
- **Effect**: Changes all colors to high contrast black and white theme

#### Font Size

- **Buttons**: - and + buttons to decrease/increase font size
- **Display**: Shows current level (1-5)
- **Range**: Level 1 (smallest) to Level 5 (largest)

#### Enhanced Focus Indicators

- **Checkbox**: Toggle enhanced focus visibility
- **Effect**: Adds prominent yellow outlines to focused elements

#### Reduced Motion

- **Checkbox**: Toggle motion reduction
- **Effect**: Disables animations and transitions

#### Screen Reader Test

- **Button**: Test screen reader announcements
- **Effect**: Sends a test message to screen readers

#### Reset Settings

- **Button**: Reset all accessibility settings to default
- **Effect**: Clears all customizations and restores defaults

## Technical Implementation

### Architecture

The plugin follows the same pattern as other MSDAT plugins:

```
accessibilityPlugin/
├── index.js                     # Main plugin file
├── accessibility.css           # Global accessibility styles
└── components/
    ├── index.vue               # Main component wrapper
    ├── AccessibilityMain.vue   # Floating button component
    └── AccessibilityPlugin.vue # Settings panel component
```

### Plugin Registration

The plugin is registered in `App.vue` along with other plugins and is controlled via localStorage.

### CSS Classes Applied

- `.high-contrast` - High contrast mode styles
- `.enhanced-focus` - Enhanced focus indicator styles
- `.reduced-motion` - Reduced motion styles

### Global Methods Added

- `$announceForAccessibility(message)` - Send announcements to screen readers
- `$toggleHighContrast()` - Toggle high contrast mode

## Accessibility Standards Compliance

The plugin helps the application meet:

- **WCAG 2.1 Guidelines**
- **Section 508 Compliance**
- **ADA Requirements**

### Specific Guidelines Addressed

- **1.4.3 Contrast (Minimum)** - High contrast mode
- **1.4.4 Resize text** - Font size adjustment
- **2.3.3 Animation from Interactions** - Reduced motion
- **2.4.7 Focus Visible** - Enhanced focus indicators
- **4.1.3 Status Messages** - Screen reader announcements

## Browser Support

The plugin works with:

- Chrome/Edge (Recommended)
- Firefox
- Safari
- Screen readers (NVDA, JAWS, VoiceOver)

## Troubleshooting

### Plugin Not Appearing

1. Check if plugin is enabled in User Settings
2. Verify localStorage: `localStorage.getItem('accessibilityPlugin')`
3. Refresh the page after enabling

### Settings Not Persisting

1. Check if localStorage is enabled in browser
2. Verify not in incognito/private mode
3. Check for localStorage quotas

### High Contrast Not Working

1. Check if other CSS is overriding the styles
2. Verify the accessibility.css file is properly imported
3. Check browser developer tools for CSS conflicts

### Screen Reader Issues

1. Verify screen reader is running
2. Check that ARIA live region exists in DOM
3. Test with different screen readers if available

## Future Enhancements

Potential future features:

- Keyboard navigation shortcuts
- Voice control integration
- Color blindness filters
- Text-to-speech functionality
- Customizable color themes
- Font family selection
