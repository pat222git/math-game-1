# Math Equation Challenge - Screen Display Documentation

## Overview
The Math Equation Challenge game consists of 6 main screens that guide users through the game flow. Each screen has specific display elements and supports view transitions for smooth navigation.

## Screen Documentation

### Screen 1: Welcome Screen (`screen1`)
**Purpose**: Initial landing page and game introduction
**Display Elements**:
- Title: "🧮 Math Equation Challenge"
- Game instructions with detailed rules
- Two action buttons: "Show Demo" and "Start Game"
- Default active screen on page load

**Animation Type**: 
- View transition with fade-in effect
- Button hover animations
- Smooth transitions to other screens

### Screen 2: Nickname Input Screen (`nicknameScreen`)
**Purpose**: User registration and nickname collection
**Display Elements**:
- Title: "🧮 Math Equation Challenge"
- Input field for nickname (6-20 characters, letters/numbers only)
- Scoring hint text (motivational message about using more integers)
- "Start Game" and "Back" buttons
- Input validation styling

**Animation Type**:
- Slide-in transition from welcome screen
- Input field focus animations
- Form validation feedback animations

### Screen 3: Demo Screen (`demoScreen`)
**Purpose**: Interactive tutorial showing game mechanics
**Display Elements**:
- Title: "🧮 Math Equation Challenge - Demo"
- Demo integers display: [6, 4, 7, 3, 13, 5]
- Example equations with step-by-step solutions
- Success indicators (✓) for correct equations
- "Start Playing!" and "Back to Menu" buttons

**Animation Type**:
- Integer boxes with hover effects
- Equation examples with reveal animations
- Success checkmarks with fade-in effects
- Smooth transitions between demo elements

### Screen 4: Game Screen (`screen2`)
**Purpose**: Main gameplay interface
**Display Elements**:
- Title: "🧮 Math Equation Challenge"
- Game info bar: Round info, Score, Time
- Dynamic integers display (6 random numbers)
- Operations hint text (instructional message about available math operations)
- Equation input fields (left and right sides)
- Submit button
- Message area for feedback
- Navigation buttons: "Next Round", "Start Another Game", "Quit"

**Animation Type**:
- Integer boxes with selection animations
- Input field focus and typing animations
- Success/error message animations
- Score and time counter animations
- Button state transitions

### Screen 5: New Game Confirmation Screen (`newGameScreen`)
**Purpose**: Confirmation dialog for starting a new game
**Display Elements**:
- Title: "🧮 Math Equation Challenge"
- Current score and time information (in game-info bar)
- Game summary box with highlighted score statistics only (no time)
- Confirmation question
- "Yes" and "No" buttons

**Animation Type**:
- Modal overlay with fade-in effect
- Summary box with highlight animations
- Button hover and click animations
- Smooth transitions to/from game screen

### Screen 6: Game Complete Screen (`screen3`)
**Purpose**: End-game celebration and results display
**Display Elements**:
- Title: "🧮 Math Equation Challenge"
- Final game information (score, time)
- Success summary box with celebration styling
- Congratulations message
- "Start Another Game" and "Quit" buttons

**Animation Type**:
- Celebration animations (confetti, success effects)
- Summary box with highlight and pulse effects
- Success message with fade-in animation
- Button animations with success styling

### Screen 7: Quit Screen (`screen4`)
**Purpose**: Final confirmation before exiting the game
**Display Elements**:
- Title: "🧮 Math Equation Challenge"
- Last score and time information
- Game summary box
- Quit confirmation question
- "Play Another Game" and "Quit" buttons

**Animation Type**:
- Modal overlay with slide-in effect
- Summary box with subtle animations
- Warning button styling for quit action
- Smooth transitions for final actions

## Global Animation Features

### View Transitions
- **Navigation**: Auto-enabled view transitions between screens
- **Smooth Transitions**: Fade and slide effects between screen changes
- **State Preservation**: Animations maintain game state during transitions

### Interactive Elements
- **Button Animations**: Hover, focus, and click states
- **Input Field Animations**: Focus, validation, and typing feedback
- **Integer Box Animations**: Selection, hover, and usage states
- **Message Animations**: Success, error, and info message displays

### Responsive Design
- **Mobile Adaptations**: Touch-friendly animations and transitions
- **Screen Size Adjustments**: Animations scale appropriately
- **Performance Optimization**: Smooth 60fps animations across devices

## Technical Implementation
- **CSS Transitions**: Hardware-accelerated animations
- **JavaScript Integration**: Dynamic animation triggers
- **View Transition API**: Modern browser transition support
- **Accessibility**: Reduced motion support for accessibility compliance