import { parseFile } from "../parser";

/**
 * ```shell
 * node lib/scripts/parser.manual.js https://cdn.vtings.com/4092/posts/1541754712737/2bf55cd0-c229-482f-b4ee-704a73c36a61_convert.mp3
 * ```
 */
(async () => {
  let url =
    "https://cdn.vtings.com/4094/posts/1541836143/2018-11-10_15-45-31.mp3";
  if (`${process.argv[2]}`.startsWith("http")) {
    url = process.argv[2];
  }
  const waveform = await parseFile({ url, sampleRate: 10 });
  console.log(JSON.stringify(Array.from(waveform.max)));
})();
