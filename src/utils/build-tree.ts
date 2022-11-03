const getTriangularNumber = (rowCount: number) => {
  let sum = 0;
  for (let i = 1; i <= rowCount; i++) {
    sum += i;
  }
  return sum;
};

function buildTree<T>(items: Array<T>): Array<Array<T | null>> {
  const itemCount = items.length;

  let tree: Array<Array<T | null>> = [];

  for (let i = 2; tree.flat().length < itemCount; i++) {
    let treeRow = items.slice(0, i);
    items = items.slice(i);
    tree.push(treeRow);
  }

  const isTreeIncomplete =
    getTriangularNumber(tree.length) < tree.flat().length;

  if (isTreeIncomplete) {
    let lastRow = tree[tree.length - 1];
    lastRow.push(null); // manual

    tree.pop();
    tree.push(lastRow);
  }

  return tree;
}

export default buildTree;
