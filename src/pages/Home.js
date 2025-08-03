import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Flashcard from '../components/Flashcard';
import './Home.css';

function Home() {
  const [flashcards, setFlashcards] = useState([]);
  const [decks, setDecks] = useState([]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Load flashcards and decks from localStorage
  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem('flashcards')) || [];
    const storedDecks = JSON.parse(localStorage.getItem('decks')) || [];
    setFlashcards(storedCards);
    setDecks(storedDecks);
    AOS.refresh();
  }, []);

  // Delete flashcard
  const deleteCard = (id) => {
    if (window.confirm('🗑️ Are you sure you want to delete this flashcard?')) {
      const updated = flashcards.filter(card => card.id !== id);
      setFlashcards(updated);
      localStorage.setItem('flashcards', JSON.stringify(updated));
    }
  };

  // Edit flashcard
  const editCard = (id) => {
    const card = flashcards.find(c => c.id === id);
    if (!card) return;

    const newTerm = prompt('✏️ Edit Term:', card.term);
    const newDefinition = prompt('✏️ Edit Definition:', card.definition);

    if (newTerm?.trim() && newDefinition?.trim()) {
      const updated = flashcards.map(c =>
        c.id === id ? { ...c, term: newTerm.trim(), definition: newDefinition.trim() } : c
      );
      setFlashcards(updated);
      localStorage.setItem('flashcards', JSON.stringify(updated));
    }
  };

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section" data-aos="zoom-in">
        <h1>📚 Welcome to FlipNStudy</h1>
        <p>Learn smarter, not harder — using spaced repetition flashcards.</p>
        <div className="hero-buttons">
          <a href="/create" className="btn-primary" data-aos="fade-up" data-aos-delay="100">
            ➕ Create Flashcards
          </a>
          <a href="/practice" className="btn-secondary" data-aos="fade-up" data-aos-delay="200">
            🚀 Start Practicing
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" data-aos="fade-right">
        <h2>✨ Why Use This App?</h2>
        <ul className="features-list">
          <li data-aos="fade-left" data-aos-delay="100">🧠 Smart practice using Spaced Repetition</li>
          <li data-aos="fade-left" data-aos-delay="200">📝 Easy creation of decks and flashcards</li>
          <li data-aos="fade-left" data-aos-delay="300">📊 Track your progress with stats</li>
          <li data-aos="fade-left" data-aos-delay="400">📁 Organize cards by topic</li>
        </ul>
      </section>

      {/* Quick Stats Section */}
      <section className="quick-stats" data-aos="flip-left">
        <p>🃏 Total Flashcards: <strong>{flashcards.length}</strong></p>
        <p>📁 Total Decks: <strong>{decks.length}</strong></p>
      </section>

      {/* Flashcards Section */}
      <section className="flashcards-section" data-aos="fade-up">
        <h2>📄 Your Flashcards</h2>
        {flashcards.length > 0 ? (
          <div className="flashcard-grid">
            {flashcards.map((card, index) => (
              <div key={card.id} data-aos="zoom-in" data-aos-delay={index * 100}>
                <Flashcard
                  term={card.term}
                  definition={card.definition}
                  onEdit={() => editCard(card.id)}
                  onDelete={() => deleteCard(card.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state" data-aos="fade-in">
            😔 No flashcards found. <a href="/create">Start creating now</a>!
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
