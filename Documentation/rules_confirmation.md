# scoring
Replace the progressive doubling scoring system with a new system based on the number of integers used in the equation, with special bonus and motivational message for using all 6 integers.
Points based on integer count:
3 integers = 10 points
4 integers = 40 points
5 integers = 80 points
6 integers = 200 points (BONUS!)
Fallback = 5 points (for edge cases)

Further explanation - edge cases mean catch all cases that provides a protection against unexpected scenarios.  keep for safety and future changes.

# tracking
## game state tracking
The gamestate tracks cumulative totals per game only.
totalScore: 0 to track cumulative score across all games
and cumulativeTime: 0 to track cumulative time across all games
## reset on new game
When startNewGame() is called, it resets score: 0 and totalTime: 0, but preserves the cumulative totals

# display functions
## showGameComplete(): shows total cumulative score
Game Complete Screen:
Congratulations header
Points earned message
NEW: Large green box showing "Game 1 Complete: You earned 150 points!"
"Do you want to continue?" question
Yes/No buttons
## showQuitScreen(): shows total cumulative score
Quit Screen:
Game info at top
NEW: Large blue box showing "Game 1 Summary: You earned 150 points"
"Do you want to Quit?" question
Yes/No buttons