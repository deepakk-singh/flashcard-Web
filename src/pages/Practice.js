import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Practice.css';

function Practice() {
  const [flashcards, setFlashcards] = useState([]);
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionFlashcards, setSessionFlashcards] = useState([]);

  useEffect(() => {
    const storedFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    const storedDecks = JSON.parse(localStorage.getItem('decks')) || [];
    setFlashcards(storedFlashcards);
    setDecks(storedDecks);
  }, []);

  useEffect(() => {
    if (!selectedDeck) {
      setSessionFlashcards([]);
      setCurrentIndex(0);
      setFlipped(false);
      return;
    }

    const filtered = flashcards.filter(card => card.deck === selectedDeck && card.box <= 5);
    setSessionFlashcards(filtered);
    setCurrentIndex(0);
    setFlipped(false);
  }, [selectedDeck, flashcards]);

  if (decks.length === 0) {
    return (
      <div className="practice-empty">
        <h2>No decks found</h2>
        <p>Please create some decks and flashcards first.</p>
      </div>
    );
  }

  if (!selectedDeck) {
    return (
      <div className="practice-select-deck">
        <h2>📚 Practice Flashcards</h2>
        <p>Select a deck to start practicing:</p>
        <select
          value={selectedDeck}
          onChange={e => setSelectedDeck(e.target.value)}
          aria-label="Select deck to practice"
          className="practice-deck-select"
        >
          <option value="">-- Select Deck --</option>
          {decks.map((deck, i) => (
            <option key={i} value={deck}>{deck}</option>
          ))}
        </select>
      </div>
    );
  }

  if (sessionFlashcards.length === 0) {
    return (
      <div className="practice-empty">
        <h2>🎉 No cards to practice in "{selectedDeck}"</h2>
        <p>Try adding new flashcards or choose another deck.</p>
        <button onClick={() => setSelectedDeck('')} className="practice-button">
          Choose Another Deck
        </button>
      </div>
    );
  }

  const card = sessionFlashcards[currentIndex];

  const updateCardProgress = (cardId, correct) => {
    setFlipped(false);
    let updatedFlashcards = [...flashcards];
    const index = updatedFlashcards.findIndex(c => c.id === cardId);
    if (index !== -1) {
      const cardToUpdate = updatedFlashcards[index];
      if (correct) {
        cardToUpdate.box = Math.min(cardToUpdate.box + 1, 5);
      } else {
        cardToUpdate.box = 1;
      }
      cardToUpdate.lastReviewed = new Date().toISOString();
      updatedFlashcards[index] = cardToUpdate;
    }
    localStorage.setItem('flashcards', JSON.stringify(updatedFlashcards));
    setFlashcards(updatedFlashcards);

    if (currentIndex + 1 < sessionFlashcards.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert('✅ You completed this deck practice session!');
      setCurrentIndex(0);
    }
  };

  return (
    <div className="practice-container">
      <h2>Practice Deck: <em>{selectedDeck}</em></h2>
      <p className="practice-progress">
        Card {currentIndex + 1} of {sessionFlashcards.length} &nbsp;|&nbsp; 
        Box Level: {card.box}
      </p>

      <motion.div
        onClick={() => setFlipped(!flipped)}
        className={`practice-card ${flipped ? 'flipped' : ''}`}
        layout
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-live="polite"
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') setFlipped(!flipped);
        }}
      >
        <div className="practice-card-front">
          {card.term}
        </div>

        <div className="practice-card-back">
          {card.definition}
        </div>
      </motion.div>

      <div className="practice-buttons">
        <button
          onClick={() => updateCardProgress(card.id, true)}
          className="practice-button correct"
          aria-label="Mark as Got It"
        >
          ✅ Got It
        </button>

        <button
          onClick={() => updateCardProgress(card.id, false)}
          className="practice-button incorrect"
          aria-label="Mark as Didn’t Know"
        >
          ❌ Didn’t Know
        </button>
      </div>

      <button
        onClick={() => setSelectedDeck('')}
        className="practice-button change-deck"
        aria-label="Change Deck"
      >
        🔄 Change Deck
      </button>
    </div>
  );
}

export default Practice;
