import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [totals, setTotals] = useState({ today: 0, week: 0, month: 0 });

  useEffect(() => {
  fetchExpenses(); // primo caricamento

  // Aggiorna ogni 10 secondi (10000 ms)
  const interval = setInterval(() => {
    fetchExpenses();
  }, 10000);

  // Pulisce l'intervallo quando il componente viene smontato
  return () => clearInterval(interval);
}, []);

  async function fetchExpenses() {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setExpenses(data);

    const now = new Date();
    const startOfToday = new Date(now); startOfToday.setHours(0,0,0,0);
    const startOfWeek = new Date(now); startOfWeek.setDate(now.getDate() - now.getDay() + 1); startOfWeek.setHours(0,0,0,0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    let todaySum = 0, weekSum = 0, monthSum = 0;

    data.forEach(e => {
      const d = new Date(e.created_at);
      if (d >= startOfToday) todaySum += parseFloat(e.amount);
      if (d >= startOfWeek) weekSum += parseFloat(e.amount);
      if (d >= startOfMonth) monthSum += parseFloat(e.amount);
    });

    setTotals({ today: todaySum, week: weekSum, month: monthSum });
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>💰 Dashboard Spese</h1>
      <p>💶 Spesa Oggi: €{totals.today.toFixed(2)}</p>
      <p>💶 Spesa Settimana: €{totals.week.toFixed(2)}</p>
      <p>💶 Spesa Mensile: €{totals.month.toFixed(2)}</p>

      <h2>Grafico spese giornaliere</h2>
      <BarChart width={600} height={300} data={expenses.map(e => ({
        name: new Date(e.created_at).toLocaleDateString("it-IT"),
        amount: parseFloat(e.amount)
      }))}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default App;
