import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import './Create.css';

function Create() {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [selectedDeck, setSelectedDeck] = useState('');
  const [newDeck, setNewDeck] = useState('');
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedDecks = JSON.parse(localStorage.getItem('decks')) || [];
    setDecks(storedDecks);
  }, []);

  const handleCreateDeck = () => {
    const trimmedDeck = newDeck.trim();
    if (!trimmedDeck) {
      setError('Deck name cannot be empty.');
      return;
    }
    if (decks.includes(trimmedDeck)) {
      setError('This deck already exists.');
      return;
    }
    const updatedDecks = [...decks, trimmedDeck];
    localStorage.setItem('decks', JSON.stringify(updatedDecks));
    setDecks(updatedDecks);
    setSelectedDeck(trimmedDeck); // Auto-select new deck
    setNewDeck('');
    setError('');
  };

  const handleCreateFlashcard = () => {
    if (!term.trim() || !definition.trim() || !selectedDeck) {
      setError('Please fill in all required fields.');
      return;
    }

    const newCard = {
      id: uuidv4(),
      term: term.trim(),
      definition: definition.trim(),
      deck: selectedDeck,
      box: 1,
      lastReviewed: new Date().toISOString(),
    };

    const existingCards = JSON.parse(localStorage.getItem('flashcards')) || [];
    const updatedCards = [...existingCards, newCard];
    localStorage.setItem('flashcards', JSON.stringify(updatedCards));

    // Clear inputs but keep deck selected for quick entry
    setTerm('');
    setDefinition('');
    setError('');
  };

  return (
    <motion.div
      className="create-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="create-title">📝 Create Flashcard</h2>

      <div className="form-group">
        <label htmlFor="term-input" className="form-label">
          Term <span aria-hidden="true">*</span>
        </label>
        <input
          id="term-input"
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="e.g., What is JavaScript?"
          className="create-input"
          aria-required="true"
          autoComplete="off"
        />

        <label htmlFor="definition-input" className="form-label" style={{ marginTop: '1rem' }}>
          Definition <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="definition-input"
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          placeholder="e.g., A scripting language for web."
          className="create-textarea"
          rows={4}
          aria-required="true"
        />

        <label htmlFor="deck-select" className="form-label" style={{ marginTop: '1rem' }}>
          Select Deck <span aria-hidden="true">*</span>
        </label>
        <select
          id="deck-select"
          value={selectedDeck}
          onChange={(e) => setSelectedDeck(e.target.value)}
          className="create-input"
          aria-required="true"
        >
          <option value="">-- Select Deck --</option>
          {decks.map((deck, idx) => (
            <option key={idx} value={deck}>
              {deck}
            </option>
          ))}
        </select>

        {error && (
          <p className="error-message" role="alert" aria-live="assertive">
            {error}
          </p>
        )}

        <button
          onClick={handleCreateFlashcard}
          className="button-primary"
          disabled={!term.trim() || !definition.trim() || !selectedDeck}
          style={{ marginTop: '1.5rem' }}
          aria-disabled={!term.trim() || !definition.trim() || !selectedDeck}
        >
          ➕ Create Flashcard
        </button>

        <hr style={{ margin: '2rem 0' }} />

        <h3 className="deck-title">📁 Create New Deck</h3>
        <div className="deck-input-group">
          <input
            type="text"
            value={newDeck}
            onChange={(e) => setNewDeck(e.target.value)}
            placeholder="e.g., JavaScript"
            className="create-input"
            aria-label="New deck name"
          />
          <button
            onClick={handleCreateDeck}
            className="button-secondary"
            disabled={!newDeck.trim()}
            aria-disabled={!newDeck.trim()}
          >
            ➕ Add Deck
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Create;
