import React from "react";

function Controls({ isRunning, setIsRunning }) {
  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  return (
    <section>
      <h3>Controls</h3>
      <div>
        {isRunning ? (
          <button onClick={stop}>Stop</button>
        ) : (
          <button onClick={start}>Start</button>
        )}
      </div>
    </section>
  );
}

export default Controls;
