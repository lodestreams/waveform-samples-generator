import { parseFile } from "../parser";
import { printBlocks } from "../utils/print-blocks";

(async () => {
  let url: string;
  if (`${process.argv[2]}`.startsWith("http")) {
    url = process.argv[2];
  } else {
    url =
      "https://cdn.jsdelivr.net/gh/lodestreams/waveform-samples-generator@master/docs/test.mp3";
  }
  const waveform = await parseFile({ url });

  const waitMs = 1000 / waveform.pixels_per_second - 2;

  let i = 0;
  const timer = setInterval(() => {
    if (i < waveform.max.length) {
      printBlocks(waveform.max[i++]);
    } else {
      clearInterval(timer);
    }
  }, Math.round(waitMs));
})();
