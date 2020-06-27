import React from "react";

function About() {
  return (
    <section className="about">
      <h2>About</h2>
      <p>
        The <strong>Game of Life</strong> is a very famous{" "}
        <em>celluar automaton</em> devised by the British mathematician{" "}
        <a href="https://en.wikipedia.org/wiki/John_Horton_Conway">
          John Horton Conway
        </a>{" "}
        in 1970. It is a zero-player game, meaning that its progression is
        determined by its initial state and requires no further input. You
        interact with this game by creating an initial configuration of cells
        and observing how it evolves.
      </p>
      <p>
        A <strong>cellular automaton</strong> is a program that operates on data
        which represent "cells" - typically stored in a 2D grid. It consists of
        a collection of cells which, based on a few mathematical rules, can
        live, die, or multiply.
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
