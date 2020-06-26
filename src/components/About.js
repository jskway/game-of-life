import React from "react";

function About() {
  return (
    <section className="about">
      <h2>About</h2>
      <p>
        A <strong>cellular automaton</strong> is a program that operates on data
        typically stored in a 2D grid.
      </p>
      <p>
        A very famous cellular automaton is <strong>Game of Life</strong> -
        devised by the British mathematician{" "}
        <a href="https://en.wikipedia.org/wiki/John_Horton_Conway">
          John Horton Conway
        </a>{" "}
        in 1970. It consists of a collection of cells which, based on a few
        mathematical rules, can live, die, or multiply.
      </p>
      <p>
        Each round of the game examines the current state of the cells, and then
        produces an entirely new <i>generation</i> of cells based on that state.
        Depending on the initial conditions, the cells form various patterns
        throughout the course of the game.
      </p>
    </section>
  );
}

export default About;
