import { parseFile } from "../parser";

/**
 * ```shell
 * node lib/scripts/parser.manual.js https://cdn.jsdelivr.net/gh/lodestreams/waveform-samples-generator@2254b8235c0cd82a482fb2bf7b7404c8fb0df560/docs/test.mp3
 * ```
 */
(async () => {
  let url =
    "https://cdn.jsdelivr.net/gh/lodestreams/waveform-samples-generator@2254b8235c0cd82a482fb2bf7b7404c8fb0df560/docs/test.mp3";
  if (`${process.argv[2]}`.startsWith("http")) {
    url = process.argv[2];
  }
  const waveform = await parseFile({ url, sampleRate: 10 });
  console.log(JSON.stringify(Array.from(waveform.max)));
})();
