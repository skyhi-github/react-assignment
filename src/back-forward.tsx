import React, { useState, useCallback } from 'react';
import './App.css';

function BrowserNavigation() {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const visitPage = useCallback((url: string) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(url);
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
  }, [history, historyIndex]);

  function goBack(): string | null { // Regular function
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      return history[historyIndex - 1];
    }
    return null;
  }

  function goForward(): string | null { // Regular function
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      return history[historyIndex + 1];
    }
    return null;
  }

  const getCurrentPage = useCallback(() => {
    if (historyIndex >= 0 && historyIndex < history.length) {
      return history[historyIndex];
    }
    return null;
  }, [history, historyIndex]);

  const currentPage = getCurrentPage();

  return (
    <div>
      <div>
        <button onClick={goBack} disabled={historyIndex <= 0}>Back</button>
        <button onClick={goForward} disabled={historyIndex >= history.length - 1}>Forward</button>
      </div>
      <div>
        <input type="text" value={currentPage || ''} onChange={(e) => visitPage(e.target.value)} />
      </div>
      <div>
        <p>Current Page: {currentPage || "No page visited yet"}</p>
      </div>
    </div>
  );
}

export default BrowserNavigation;