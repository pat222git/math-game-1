# Security warning during integration with Supabase
Security warning message "The function has a role-mutable search_path because it does not explicitly set the function's search_path configuration. This means the function will execute under whichever search_path is active for the role that calls it, which is unsafe". 
Fixing the Search Path Security Warning
The warning is about the update_player_stats() function. 
Key changes:
Added SECURITY DEFINER - function runs with creator's privileges
Added SET search_path = public - explicitly sets the search path
This eliminates the security warning

# Row based security
During testing, enable permissive RLS policies
Before the launch, implement proper authentication and restrictive policies later
-- Future production policies (don't implement yet)
-- These require proper authentication setup

-- Players can only see their own data
CREATE POLICY "Users can only see own player data" ON players
    FOR ALL USING (auth.uid()::text = id::text);

-- Games are visible to all but only insertable by authenticated users
CREATE POLICY "Games are publicly readable" ON games
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert games" ON games
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

# Live server 
Live Server is serving the root directory (127.0.0.1:5500) instead of opening project14.html directly.
You need to open project14.html directly in one of these ways:
Option 1: Right-click on the file (Recommended)
In VS Code, right-click on project14.html in the file explorer
Select "Open with Live Server"
This will open the file at 127.0.0.1:5500/project14.html
Option 2: Click on the file in the directory listing
In the browser window showing the directory listing, click on project14.html
This will navigate to your game