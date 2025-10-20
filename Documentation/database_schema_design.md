# Database Schema description in Supabase
## Players Table (Core player information)
Purpose: Store unique player information
Key fields:
id (UUID, Primary Key)
nickname (VARCHAR, Unique)
created_at (Timestamp)
last_played_at (Timestamp)

## Games Table (Main game sessions)
Purpose: Store each complete game session
Key fields:
id (UUID, Primary Key)
player_id (UUID, Foreign Key to Players)
game_number (INTEGER) - Which game in the player's session
final_score (INTEGER) - Total points earned
total_time_seconds (INTEGER) - Total game duration
rounds_completed (INTEGER) - How many rounds finished (1-5)
total_equations_solved (INTEGER) - Total correct equations
started_at (Timestamp)
completed_at (Timestamp)

## Game Rounds Table (Detailed round data)
Purpose: Store data for each individual round within a game
Key fields:
id (UUID, Primary Key)
game_id (UUID, Foreign Key to Games)
round_number (INTEGER) - 1-5
integers_used (INTEGER[]) - Array of the 6 integers for this round
equations_solved (INTEGER) - Correct equations in this round
round_time_seconds (INTEGER) - Time spent on this round
round_started_at (Timestamp)

## Equations Table (Individual equation tracking)
Purpose: Store each correct equation for detailed analytics
Key fields:
id (UUID, Primary Key)
game_round_id (UUID, Foreign Key to Game Rounds)
equation_number (INTEGER) - 1st, 2nd, 3rd equation in the round
left_expression (TEXT) - What player typed on left side
right_expression (TEXT) - What player typed on right side
points_earned (INTEGER) - Points for this equation (10, 20, 40, 80, etc.)
solved_at (Timestamp)

# Codes
## Players table
CREATE TABLE players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nickname VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

## Games table
CREATE TABLE games (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_time_seconds INTEGER NOT NULL,
    rounds_completed INTEGER NOT NULL,
    equations_solved INTEGER NOT NULL,
    game_number INTEGER NOT NULL, -- Which game in the session
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

## Game rounds table (for detailed analytics)
CREATE TABLE game_rounds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_id UUID REFERENCES games(id) ON DELETE CASCADE,
    round_number INTEGER NOT NULL,
    integers_used INTEGER[] NOT NULL, -- Array of 6 integers
    equations_solved INTEGER NOT NULL,
    round_time_seconds INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

## Create indexes for performance
CREATE INDEX idx_games_player_id ON games(player_id);
CREATE INDEX idx_games_score ON games(score);
CREATE INDEX idx_games_created_at ON games(created_at);
CREATE INDEX idx_games_player_score ON games(player_id, score);

# Rationale for this structure
Why This Structure?
## Data Capture:
Captures all current in-memory data
Preserves game flow and progression
Enables detailed analytics

## Statistics Capabilities:
Player stats: Total games, best score, average score, improvement over time
Global stats: Leaderboards, average scores, difficulty analysis
Round analysis: Which integer combinations are hardest/easiest
Equation patterns: Most common successful equation types

## Percentile Calculations:
Easy to query all scores for percentile ranking
Can calculate percentiles by different time periods
Supports both global and player-specific percentiles

## Performance Optimizations:
Indexed on frequently queried fields (player_id, score, created_at)
Normalized structure prevents data duplication
Efficient for both individual player queries and global statistics

## Future Extensibility:
Easy to add new game modes or difficulty levels
Can track additional metrics (accuracy rate, speed bonuses)
Supports A/B testing of different game variations
Ready for multiplayer features if needed

## Key Design Decisions
Separate tables for different granularities of data
Arrays for integers to preserve the exact 6-number combinations
Timestamps for time-based analytics and sorting
Progressive scoring captured at equation level
Foreign key relationships maintain data integrity
UUID primary keys for better security and scalability
This structure will give you everything you need for statistics, percentiles, and detailed game analytics while being efficient and easy to query.