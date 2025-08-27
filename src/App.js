import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [todaySum, setTodaySum] = useState(0);
  const [weekSum, setWeekSum] = useState(0);
  const [monthSum, setMonthSum] = useState(0);

  // Funzione per calcolare inizio settimana (lunedi)
  function getStartOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff)).setHours(0, 0, 0, 0);
  }

  async function fetchExpenses() {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Errore fetch spese:", error);
      return;
    }

    setExpenses(data);

    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    const startOfWeek = new Date(getStartOfWeek(now));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    let today = 0, week = 0, month = 0;
    data.forEach(e => {
      const d = new Date(e.created_at);
      const amount = parseFloat(e.amount);
      if (d >= startOfToday) today += amount;
      if (d >= startOfWeek) week += amount;
      if (d >= startOfMonth) month += amount;
    });

    setTodaySum(today);
    setWeekSum(week);
    setMonthSum(month);
  }

  useEffect(() => {
    fetchExpenses();

    // Aggiorna ogni 10 secondi
    const interval = setInterval(() => {
      fetchExpenses();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Prepara dati per grafico
  const chartData = expenses.map(e => ({
    date: new Date(e.created_at).toLocaleDateString("it-IT"),
    amount: parseFloat(e.amount)
  }));

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard Spese</h1>
      <div>
        <p>💶 Spesa Oggi: €{todaySum.toFixed(2)}</p>
        <p>💶 Spesa Settimana: €{weekSum.toFixed(2)}</p>
        <p>💶 Spesa Mensile: €{monthSum.toFixed(2)}</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;
