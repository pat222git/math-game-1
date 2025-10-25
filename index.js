
// Supabase configuration
const supabaseUrl = 'https://rzwnwwieykoxvlgofpfz.supabase.co'  // Replace with your actual URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6d253d2lleWtveHZsZ29mcGZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjgwODIsImV4cCI6MjA3MzQ0NDA4Mn0.1tmJxcoEBb2Ne5cF28qSo_rdqewdKDIIcg0Wc6GAglE'  // Replace with your actual key
const { createClient } = supabase
const supabaseClient = createClient(supabaseUrl, supabaseKey)
// Game state
let gameState = {
    currentGame: 1,
    currentRound: 1,
    currentEquation: 1,
    score: 0,
    startTime: 0,
    totalTime: 0,
    roundStartTime: 0,
    integers: [],
    usedIntegers: [],
    submittedEquations: new Set(),
    playerNickname: '',
    playerId: null,
    gameId: null,
    currentGameNumber: 1,
    totalEquationsSolved: 0
};

// Show nickname screen
function showNicknameScreen() {
    showScreen('nicknameScreen');
    document.getElementById('nicknameInput').focus();
}

// Start game with nickname
function startGameWithNickname() {
    const nickname = document.getElementById('nicknameInput').value.trim();
    
    // Validation 1: Check if empty
    if (!nickname) {
        alert('Please enter a nickname to continue!');
        return;
    }
    
    // Validation 2: Check length (6-20 characters)
    if (nickname.length < 6) {
        alert('Nickname must be at least 6 characters!');
        return;
    }
    
    if (nickname.length > 20) {
        alert('Nickname cannot exceed 20 characters!');
        return;
    }
    
    // Validation 3: Check for spaces
    if (nickname.includes(' ')) {
        alert('Nickname cannot contain spaces!');
        return;
    }
    
    // Validation 4: Check for valid characters (letters and numbers only)
    if (!/^[a-zA-Z0-9]+$/.test(nickname)) {
        alert('Nickname can only contain letters and numbers!');
        return;
    }
    
    // Store nickname in lowercase for case-insensitive uniqueness
    gameState.playerNickname = nickname.toLowerCase();
    startGame();
}

// Initialize game
function initGame() {
    gameState = {
        currentGame: 1,
        currentRound: 1,
        currentEquation: 1,
        score: 0,
        startTime: Date.now(),
        totalTime: 0,
        roundStartTime: Date.now(),
        integers: [],
        usedIntegers: [],
        submittedEquations: new Set(),
        playerNickname: gameState.playerNickname,
        playerId: gameState.playerId,
        gameId: gameState.gameId,
        currentGameNumber: gameState.currentGameNumber || 1,
        totalEquationsSolved: 0
    };
    generateNewIntegers();
    updateDisplay();
}

// Generate 6 unique random integers from 1-16, in random order
function generateNewIntegers() {
    const uniqueIntegers = new Set();
    while (uniqueIntegers.size < 6) {
        uniqueIntegers.add(Math.floor(Math.random() * 16) + 1);
    }
    gameState.integers = Array.from(uniqueIntegers);
    gameState.usedIntegers = [];
}

// Show specific screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Show demo
function showDemo() {
    showScreen('demoScreen');
}

// Start game
function startGame() {
    initGame();
    showScreen('screen2');
}

// Show new game confirmation
function showNewGameConfirmation() {
    gameState.totalTime = Math.floor((Date.now() - gameState.startTime) / 1000);
    document.getElementById('newGameScoreInfo').textContent = `Current Score: ${gameState.score}`;
    document.getElementById('newGameTimeInfo').textContent = `Current Time: ${gameState.totalTime}s`;
    
    // Update prominent summary box
    document.getElementById('newGameSummary').innerHTML = 
        `You have earned <span class="highlight-score">${gameState.score}</span> points`;
    
    showScreen('newGameScreen');
}

// Start new game
function startNewGame() {
    gameState.currentGame++;
    gameState.currentGameNumber++;
    gameState.currentRound = 1;
    gameState.currentEquation = 1;
    gameState.score = 0;
    gameState.startTime = Date.now();
    gameState.totalTime = 0;
    gameState.roundStartTime = Date.now();
    gameState.submittedEquations.clear();
    gameState.gameId = null;
    gameState.totalEquationsSolved = 0;
    generateNewIntegers();
    updateDisplay();
    showScreen('screen2');
}

// Update display
function updateDisplay() {
    // Update game info
    document.getElementById('gameRoundInfo').textContent = 
        `Game ${gameState.currentGame}, Round ${gameState.currentRound}, Equation ${gameState.currentEquation}`;
    document.getElementById('scoreInfo').textContent = `Score: ${gameState.score}`;
    
    // Update time
    const currentTime = Math.floor((Date.now() - gameState.startTime) / 1000);
    document.getElementById('timeInfo').textContent = `Time: ${currentTime}s`;
    
    // Update integers display - all integers remain available throughout round
    const integersDisplay = document.getElementById('integersDisplay');
    integersDisplay.innerHTML = '';
    gameState.integers.forEach((num, index) => {
        const box = document.createElement('div');
        box.className = 'integer-box';
        box.textContent = num;
        integersDisplay.appendChild(box);
    });

    // Add animation class only at start of new round (not during equation submissions)
    // Check if this is a new round by seeing if we're on equation 1
    if (gameState.currentEquation === 1) {
        setTimeout(() => {
            const boxes = integersDisplay.querySelectorAll('.integer-box');
            boxes.forEach(box => box.classList.add('animate-drop'));
        }, 10);
    }
    
    // Clear input fields and hide previous messages
    document.getElementById('leftField').value = '';
    document.getElementById('rightField').value = '';
    document.getElementById('messageArea').style.display = 'none';
}

// Parse and evaluate mathematical expression
function evaluateExpression(expr) {
    // Remove spaces and evaluate directly
    const cleanExpr = expr.replace(/\s/g, '');
    return eval(cleanExpr);
}

// Extract numbers from expression
function extractNumbers(expr) {
    const numbers = expr.match(/\d+/g);
    return numbers ? numbers.map(Number) : [];
}

// Calculate score based on number of integers used in the equation
function calculateScore(integersUsed) {
    const integerCount = integersUsed.length;
    
    if (integerCount === 3) {
        return 10;
    } else if (integerCount === 4) {
        return 40;
    } else if (integerCount === 5) {
        return 80;
    } else if (integerCount === 6) {
        return 200;  // BONUS for using all integers!
    } else {
        // Fallback for fewer than 3 integers (shouldn't happen in normal gameplay)
        return 5;
    }
}

// Normalize expression for commutative operations (addition and multiplication)
function normalizeExpression(expr) {
    // Remove all spaces
    let normalized = expr.replace(/\s/g, '');
    
    // Handle addition: split by + and sort terms (only if pure addition)
    if (normalized.includes('+') && !normalized.includes('*') && !normalized.includes('/') && !normalized.includes('-') && !normalized.includes('(')) {
        const terms = normalized.split('+').sort((a, b) => parseInt(a) - parseInt(b));
        return terms.join('+');
    }
    
    // Handle multiplication: split by * and sort factors (only if pure multiplication)
    if (normalized.includes('*') && !normalized.includes('+') && !normalized.includes('/') && !normalized.includes('-') && !normalized.includes('(')) {
        const factors = normalized.split('*').sort((a, b) => parseInt(a) - parseInt(b));
        return factors.join('*');
    }
    
    // For mixed operations or subtraction/division, return as-is (no commutative normalization)
    return normalized;
}

// Normalize equation for duplicate detection (treats commutative and swapped equations as identical)
function normalizeEquation(leftExpr, rightExpr) {
    // Normalize each side for commutative operations
    const normalizedLeft = normalizeExpression(leftExpr);
    const normalizedRight = normalizeExpression(rightExpr);
    
    // Sort both sides to handle equation swapping
    const sides = [normalizedLeft, normalizedRight].sort();
    return `${sides[0]}=${sides[1]}`;
}

// Check if numbers are valid (from current integers, each used once per equation)
function validateNumbers(numbers) {
    const availableIntegers = gameState.integers;
    
    const usedCount = {};
    for (const num of numbers) {
        usedCount[num] = (usedCount[num] || 0) + 1;
    }
    
    const availableCount = {};
    for (const num of availableIntegers) {
        availableCount[num] = (availableCount[num] || 0) + 1;
    }
    
    for (const [num, count] of Object.entries(usedCount)) {
        if (!availableCount[num] || availableCount[num] < count) {
            return false;
        }
    }
    
    return true;
}

// Submit equation
function submitEquation() {
    const leftExpr = document.getElementById('leftField').value.trim();
    const rightExpr = document.getElementById('rightField').value.trim();
    const messageArea = document.getElementById('messageArea');
    
    // Check 1: Empty field validation
    if (!leftExpr || !rightExpr) {
        showMessage('Please fill in both fields!', 'error');
        return;
    }
    
    try {
        // Evaluate both expressions
        const leftResult = evaluateExpression(leftExpr);
        const rightResult = evaluateExpression(rightExpr);
        
        // Check 2: Positive results validation
        if (leftResult < 0 || rightResult < 0) {
            showMessage('Negative results not allowed. Try different equations.', 'error');
            return;
        }
        
        // Extract numbers from both expressions
        const leftNumbers = extractNumbers(leftExpr);
        const rightNumbers = extractNumbers(rightExpr);
        const allNumbers = [...leftNumbers, ...rightNumbers];
        
        // Check 3: Integer matching and usage validation
        if (!validateNumbers(allNumbers)) {
            showMessage(
                'Error: You can only use available integers, and each integer can only be used once per equation. ' +
                `Available integers: [${gameState.integers.join(', ')}]. ` +
                'Example: "6 + 4" = "7 + 3". Try again!', 
                'error'
            );
            return;
        }
        
        // Check 4: Equation correctness validation
        if (Math.abs(leftResult - rightResult) < 0.0001) { // Handle floating point precision
            // Check 5: Duplicate equation validation (with enhanced commutative detection)
            const normalizedEq = normalizeEquation(leftExpr, rightExpr);
            if (gameState.submittedEquations.has(normalizedEq)) {
                showMessage(
                    'This equation has already been submitted in this round. Please try a different equation!', 
                    'error'
                );
                return;
            }
            
            // Add to submitted equations set
            gameState.submittedEquations.add(normalizedEq);
            
            // Calculate points for this equation based on integers used
            const points = calculateScore(allNumbers);
            gameState.score += points;
            gameState.currentEquation++;
            gameState.totalEquationsSolved++;
            
            updateDisplay();
            
            // Check if all 6 integers were used for special message
            let congratsMessage = `Correct! ${leftExpr} = ${rightExpr} (${leftResult} = ${rightResult}) ✓ +${points} points!`;

            if (allNumbers.length === 6) {
                congratsMessage = `🌟 AMAZING! You used all 6 integers! 🌟<br>${leftExpr} = ${rightExpr} (${leftResult} = ${rightResult}) ⭐ BONUS: +${points} points! ⭐<br>This is an exceptional achievement - keep up the brilliant work!`;
            }

            showMessage(congratsMessage, 'success');
        } else {
            showMessage(
                `Incorrect: ${leftExpr} = ${leftResult}, but ${rightExpr} = ${rightResult}. ` +
                'Make sure both sides equal the same value. Try again!', 
                'error'
            );
        }
        
    } catch (error) {
        showMessage('Invalid expression format. Please check your input.', 'error');
    }
}

// Show message
function showMessage(text, type) {
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = text;
    
    // Remove animation class first to reset
    messageArea.className = 'message';
    
    // Force reflow to restart animation
    void messageArea.offsetWidth;
    
    // Add the type class (which includes animation)
    messageArea.className = `message ${type}`;
    messageArea.style.display = 'block';
    messageArea.style.visibility = 'visible';
    messageArea.style.opacity = '1';
}

// Next round
function nextRound() {
    if (gameState.currentRound >= 5) {
        // Game complete
        gameState.totalTime = Math.floor((Date.now() - gameState.startTime) / 1000);
        showGameComplete();
    } else {
        gameState.currentRound++;
        gameState.currentEquation = 1;
        gameState.submittedEquations.clear(); // Reset equation tracking for new round
        generateNewIntegers();
        updateDisplay();
    }
}

// Show game complete screen
async function showGameComplete() {
    // Save game data
    const savedGame = await saveGameData();
    
    // Calculate percentile for CURRENT game
    const currentPercentile = await calculatePercentile(gameState.score);
    
    // Get player stats (includes best score)
    const playerStats = await getPlayerStats();
    
    // Calculate percentile for BEST score
    let bestPercentile = null;
    if (playerStats && playerStats.bestScore) {
        bestPercentile = await calculatePercentile(playerStats.bestScore);
    }
    
    document.getElementById('finalGameInfo').textContent = `Game ${gameState.currentGame} Complete`;
    document.getElementById('finalScoreInfo').textContent = `Final Score: ${gameState.score}`;
    document.getElementById('finalTimeInfo').textContent = `Total Time: ${gameState.totalTime}s`;
    
    // Create comprehensive congratulations message
    let congratsText = `You have earned ${gameState.score} points in this game!`;
    
    // Current game percentile
    if (currentPercentile !== null) {
        congratsText += `<br><strong>Current Game: You scored better than ${100 - currentPercentile}% of all players!</strong>`;
    }
    
    // Player statistics
    if (playerStats) {
        congratsText += `<br><br>Your Statistics:`;
        congratsText += `<br>Best Score: ${playerStats.bestScore}`;
        
        if (bestPercentile !== null) {
            congratsText += ` (better than ${100 - bestPercentile}% of all players)`;
        }
        
        congratsText += `<br>Games Played: ${playerStats.totalGames}`;
    }
    
    document.getElementById('congratsMessage').innerHTML = congratsText;
    
    // Update prominent summary box
    document.getElementById('gameCompleteSummary').innerHTML = 
        `You earned <span class="highlight-score">${gameState.score}</span> points!`;
    
    showScreen('screen3');
}

// Show quit screen
async function showQuitScreen() {
    gameState.totalTime = Math.floor((Date.now() - gameState.startTime) / 1000);
    
    // Always save game data (counts as one game even if incomplete)
    await saveGameData();
    
    // Calculate percentile for current game
    const currentPercentile = await calculatePercentile(gameState.score);
    
    // Get player stats
    const playerStats = await getPlayerStats();
    
    // Calculate percentile for best score
    let bestPercentile = null;
    if (playerStats && playerStats.bestScore) {
        bestPercentile = await calculatePercentile(playerStats.bestScore);
    }
    
    document.getElementById('quitScoreInfo').textContent = `Last Score: ${gameState.score}`;
    document.getElementById('quitTimeInfo').textContent = `Last Time: ${gameState.totalTime}s`;
    
    let summaryText = `You earned <span class="highlight-score">${gameState.score}</span> points`;
    
    // Current game percentile
    if (currentPercentile !== null && gameState.score > 0) {
        summaryText += `<br><strong>Current Game: You scored better than ${100 - currentPercentile}% of all players!</strong>`;
    }
    
    // Player statistics
    if (playerStats) {
        summaryText += `<br><br>Your Statistics:`;
        summaryText += `<br>Best Score: ${playerStats.bestScore}`;
        
        if (bestPercentile !== null) {
            summaryText += ` (better than ${100 - bestPercentile}% of all players)`;
        }
        
        summaryText += `<br>Games Played: ${playerStats.totalGames}`;
    }
    
    document.getElementById('quitSummary').innerHTML = summaryText;
    
    showScreen('screen4');
}

// Quit game
function quitGame() {
    showScreen('screen1');
}
// Database functions
async function saveGameData() {
    try {
        // First, ensure player exists
        const { data: player, error: playerError } = await supabaseClient
            .from('players')
            .upsert({ nickname: gameState.playerNickname }, { onConflict: 'nickname' })
            .select()
            .single();
            
        if (playerError) {
            console.error('Player upsert error:', playerError);
            throw playerError;
        }
        
        // Prepare game data with safety checks
        const gameData = {
            player_id: player.id,
            game_number: gameState.currentGameNumber || 1,
            final_score: gameState.score || 0,
            total_time_seconds: gameState.totalTime || 0,
            rounds_completed: gameState.currentRound,
            total_equations_solved: gameState.totalEquationsSolved,
            completed_at: new Date().toISOString()
        };
        
        // Save game data
        const { data: game, error: gameError } = await supabaseClient
            .from('games')
            .insert(gameData)
            .select()
            .single();
            
        if (gameError) {
            console.error('Game insert error:', gameError);
            throw gameError;
        }
        
        gameState.playerId = player.id;
        gameState.gameId = game.id;
        
        return game;
        
    } catch (error) {
        console.error('Database error:', error);
        return null;
    }
}

async function calculatePercentile(score) {
    try {
        const { data: allScores, error } = await supabaseClient
            .from('games')
            .select('final_score')
            .order('final_score', { ascending: false });
            
        if (error) throw error;
        
        if (allScores.length === 0) return 0;
        
        const scores = allScores.map(g => g.final_score);
        const betterScores = scores.filter(s => s > score).length;
        const percentile = Math.round((betterScores / scores.length) * 100);
        
        return percentile;
    } catch (error) {
        console.error('Error calculating percentile:', error);
        return null;
    }
}

async function getPlayerStats() {
    try {
        if (!gameState.playerId) return null;
        
        const { data: stats, error } = await supabaseClient
            .from('games')
            .select('final_score, total_time_seconds, completed_at')
            .eq('player_id', gameState.playerId)
            .order('completed_at', { ascending: false });
            
        if (error) throw error;
        
        if (!stats || stats.length === 0) return null;
        
        return {
            totalGames: stats.length,
            bestScore: Math.max(...stats.map(s => s.final_score)),
            averageScore: Math.round(stats.reduce((sum, s) => sum + s.final_score, 0) / stats.length),
            totalTime: stats.reduce((sum, s) => sum + s.total_time_seconds, 0),
            recentGames: stats.slice(0, 5)
        };
    } catch (error) {
        console.error('Error getting player stats:', error);
        return null;
    }
}
// Add enter key support for input fields
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('leftField').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('rightField').focus();
        }
    });
    
    document.getElementById('rightField').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitEquation();
        }
    });

    // Add enter key support for nickname input
    document.getElementById('nicknameInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            startGameWithNickname();
        }
    });
});
