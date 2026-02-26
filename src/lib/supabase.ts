import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://mqjifnkxiyccsqsfcbrp.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjcyNzVlNzgyLTYzYjgtNGI1MC04ZDFjLWVhYjgyZDY3OWI1YiJ9.eyJwcm9qZWN0SWQiOiJtcWppZm5reGl5Y2NzcXNmY2JycCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzcxODA2ODYxLCJleHAiOjIwODcxNjY4NjEsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.S65Mazq7baBhlxZN9U5mtjno6-Rb2AIiCU_vA_DU4GQ';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };