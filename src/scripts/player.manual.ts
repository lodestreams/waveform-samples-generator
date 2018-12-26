import { parseFile } from "../parser";
import { printBlocks } from "../utils/print-blocks";

(async () => {
  let url: string;
  if (`${process.argv[2]}`.startsWith("http")) {
    url = process.argv[2];
  } else {
    // const url = "https://cdn.vtings.com/4094/posts/1541836143/2018-11-10_15-45-31.mp3";
    // const url = "https://cdn.vtings.com/4092/posts/1541754712737/2bf55cd0-c229-482f-b4ee-704a73c36a61_convert.mp3";
    url =
      "https://cdn.vtings.com/4192/posts/1544607685828/02b20645-2507-4da6-a00b-507886d4f871_convert.mp3";
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
