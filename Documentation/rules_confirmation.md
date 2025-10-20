# tracking
## game state tracking
The gamestate tracks cumulative totals per game only.
totalScore: 0 to track cumulative score across all games
and cumulativeTime: 0 to track cumulative time across all games
## reset on new game
When startNewGame() is called, it resets score: 0 and totalTime: 0, but preserves the cumulative totals


# display functions
## showGameComplete(): shows total cumulative score and time
Game Complete Screen:
Congratulations header
Points earned message
NEW: Large green box showing "Game 1 Complete: You earned 150 points in 300 seconds!"
"Do you want to continue?" question
Yes/No buttons
## showQuitScreen(): shows total cumulative score and time
Quit Screen:
Game info at top
NEW: Large blue box showing "Game 1 Summary: You earned 150 points in 300 seconds"
"Do you want to Quit?" question
Yes/No buttons