import { createClient } from "@supabase/supabase-js";

// Inserisci le credenziali del tuo progetto Supabase
const supabaseUrl = "https://bynvngiuedwbiwziepmg.supabase.co";   // Project URL dal sito Supabase
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5bnZuZ2l1ZWR3Yml3emllcG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyNDE1MDksImV4cCI6MjA3MTgxNzUwOX0.ZPAPBnV4nl4D3v8wGt1qSGooXTx4tP_TR-Jnyx7aNjQ";       // Chiave anon pubblica dal sito Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
