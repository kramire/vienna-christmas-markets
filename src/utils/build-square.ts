function buildSquares<T>(items: Array<T>): Array<Array<T | null>> {
  const itemCount = items.length;
  const MAX_COLS = 5;

  let squares: Array<Array<T | null>> = [];

  for (let i = 0; squares.flat().length < itemCount; i += MAX_COLS) {
    squares.push(items.slice(i, i + MAX_COLS));
  }

  const leftoverSquares = squares.length % MAX_COLS;

  if (leftoverSquares > 0) {
    let lastRow = squares[squares.length - 1];

    for (let i = leftoverSquares; i < MAX_COLS; i++) {
      lastRow.push(null);
    }
    squares.pop();
    squares.push(lastRow);
  }

  return squares;
}

export default buildSquares;
