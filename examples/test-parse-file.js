const { parseFile } = require("../lib");

const start = async () => {
  const samples = await parseFile({
    filePath: `${__dirname}/audio-wave-test.mp3`,
    sampleRate: 10
  });
  // Or render it
  console.log(samples);
  console.log(JSON.stringify(samples.max));
};

start();
