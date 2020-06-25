import React from "react";

function About() {
  return (
    <section>
      <h3>About</h3>
      <p>
        A <i>cellular automaton</i> is a program that operates on data typically
        stored in a 2D grid.
      </p>
      <p>
        A very famous cellular automaton is <i>Game of Life</i> - devised by the
        British mathematician John Horton Conway in 1970. It consists of a
        collection of cells which, based on a few mathematical rules, can live,
        die, or multiply. Each round of the game examines the current state of
        the cells, and then produces an entirely new <i>generation</i> of cells
        based on that state. Depending on the initial conditions, the cells form
        various patterns throughout the course of the game.
      </p>
    </section>
  );
}

export default About;
