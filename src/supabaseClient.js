import { createClient } from "@supabase/supabase-js";

// Inserisci le credenziali del tuo progetto Supabase
const supabaseUrl = "https://bxamguzirhfpgbralfcw.supabase.co";   // Project URL dal sito Supabase
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4YW1ndXppcmhmcGdicmFsZmN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyNDkzNzMsImV4cCI6MjA3MTgyNTM3M30.BoGDM-kPfhi9GaoCFns1_5dAetp6JAukIm-rSZ10Ldk";       // Chiave anon pubblica dal sito Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
