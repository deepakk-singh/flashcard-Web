import { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import './Stats.css';

const COLORS = ['#4f46e5', '#22c55e', '#f97316', '#eab308', '#ef4444'];

function Stats() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('flashcards')) || [];
    setFlashcards(stored);
  }, []);

  const totalCards = flashcards.length;
  const decks = [...new Set(flashcards.map(c => c.deck))];

  // Cards per deck for bar chart
  const cardsPerDeck = decks.map(deck => ({
    deck,
    count: flashcards.filter(c => c.deck === deck).length
  }));

  // Cards per box for pie chart (boxes 1 to 5)
  const boxCounts = [1, 2, 3, 4, 5].map(box => ({
    name: `Box ${box}`,
    value: flashcards.filter(c => c.box === box).length
  })).filter(item => item.value > 0);

  // Cards reviewed today
  const today = new Date().toISOString().slice(0, 10);
  const reviewedToday = flashcards.filter(card => card.lastReviewed.slice(0,10) === today).length;

  return (
    <div className="stats-container">
      <h1>📊 Your Flashcard Stats</h1>

      <section className="summary">
        <p><strong>Total Flashcards:</strong> {totalCards}</p>
        <p><strong>Total Decks:</strong> {decks.length}</p>
        <p><strong>Reviewed Today:</strong> {reviewedToday}</p>
      </section>

      <section className="chart-section">
        <h2>📁 Cards per Deck</h2>
        {cardsPerDeck.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cardsPerDeck} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="deck" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        ) : <p>No cards found.</p>}
      </section>

      <section className="chart-section">
        <h2>🗂️ Cards by Spaced Repetition Box</h2>
        {boxCounts.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={boxCounts}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {boxCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : <p>No spaced repetition data found.</p>}
      </section>
    </div>
  );
}

export default Stats;
