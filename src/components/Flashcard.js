import { useState } from 'react';
import { motion } from 'framer-motion';
import './Flashcard.css';

function Flashcard({ term, definition, onEdit, onDelete }) {
  const [flipped, setFlipped] = useState(false);

  const cardStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontSize: '18px'
  };

  return (
    <motion.div
      onClick={() => setFlipped(!flipped)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        width: '250px',
        height: '200px',
        margin: '10px',
        perspective: '1000px',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front */}
        <div
          style={{
            ...cardStyle,
            backgroundColor: '#4f46e5',
            color: 'white'
          }}
        >
          <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {term}
          </div>
        </div>

        {/* Back */}
        <div
          style={{
            ...cardStyle,
            backgroundColor: '#22c55e',
            color: 'white',
            transform: 'rotateY(180deg)'
          }}
        >
          <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {definition}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '10px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onEdit} style={buttonStyle}>📝</button>
            <button onClick={onDelete} style={buttonStyle}>❌</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const buttonStyle = {
  background: 'rgba(255,255,255,0.2)',
  border: 'none',
  borderRadius: '6px',
  padding: '5px 10px',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '16px'
};

export default Flashcard;
