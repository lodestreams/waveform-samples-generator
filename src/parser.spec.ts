import { parseFile } from "./parser";

test("should parse files", () => {
  const filePath = `${__dirname}/../docs/1min.mp3`;
  const samples = parseFile({ filePath });
  expect(samples.max.length).toBeGreaterThan(0);
});
