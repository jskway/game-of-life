# Conway's Game of Life

[![Netlify Status](https://api.netlify.com/api/v1/badges/6a210973-89c5-4a2c-a413-3cf9699efeb7/deploy-status)](https://app.netlify.com/sites/gameoflife-jsk/deploys)

The **Game of Life** is a very famous **_celluar automaton_** devised by the British mathematician [John Horton Conway](https://en.wikipedia.org/wiki/John_Horton_Conway)
in 1970.

It is a zero-player game, meaning that its progression is determined by its initial state and requires no further input. You
interact with the Game of Life by creating an initial configuration of cells and observing how it evolves.

A **cellular automaton** is a program that operates on data which represent "cells" - typically stored in a 2D grid. It consists of a collection of cells which, based on a few mathematical rules, can live, die, or multiply.

Each round of the game examines the current state of the cells, and then produces an entirely new **_generation_** of cells based on that state.Depending on the initial conditions, the cells form various patterns throughout the course of the game.

## Rules

1. Each cell can be 'live' or 'dead'
2. Each cell interacts with its eight neighbors, which are the cells that are horizontally, vertically, and diagonally touching
3. Any live cell with two OR three live neighbors survives
4. Any dead cell with three live neighbors becomes a live cell
5. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
6. Cells that are off the edge of the grid are assumed to be dead.

## Installation

Once you've cloned the repo to your local machine, in the project directory, you can run:

### `npm install`

Installs all the dependencies for the app to run locally.

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.
