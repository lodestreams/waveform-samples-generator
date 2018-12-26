export const printBlocks = (count: number) => {
  let blocks = "▀";
  for (let i = 0; i < count; i++) {
    blocks += "▀";
  }
  console.log(blocks);
  return blocks;
};
