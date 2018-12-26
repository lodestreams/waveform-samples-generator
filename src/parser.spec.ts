import { parseFile } from "./parser";

test("should parse files", async () => {
  const filePath = `${__dirname}/../docs/1min.mp3`;
  const samples = await parseFile({ filePath });
  expect(samples.max.length).toBeGreaterThan(0);
});
