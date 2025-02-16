import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [history, setHistory] = useState<string[]>(['']);
  const [historyIndex, setHistoryIndex] = useState(0);

  function handleInputChange(newText: string): void {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newText);
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setText(newText);
  }

  function undo(): void {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setText(history[historyIndex - 1]);
    }
  }

  function redo(): void {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setText(history[historyIndex + 1]);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key === 'z' && event.ctrlKey) {
      event.preventDefault();
      undo();
    } else if (event.key === 'y' && event.ctrlKey) {
      event.preventDefault();
      redo();
    }
  }

  return (
    <div className="text-editor-container">
      <textarea
        className="text-area"
        value={text}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={10}
        cols={50}
        placeholder="Type your text here..." // Added placeholder
      />
      <div className="button-group">
        <button onClick={undo} disabled={historyIndex === 0} className="editor-button">
          Undo
        </button>
        <button onClick={redo} disabled={historyIndex === history.length - 1} className="editor-button">
          Redo
        </button>
      </div>
    </div>
  );
}

export default App;