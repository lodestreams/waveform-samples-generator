# Waveform Samples Generator [![Build Status](https://travis-ci.org/lodestreams/waveform-samples-generator.svg?branch=master)](https://travis-ci.org/lodestreams/waveform-samples-generator)

This is a thin wrapper around [audiowaveform](https://github.com/bbc/audiowaveform) to parse audio files and generate sample data.

If you want more features or generate them on your own, just use the original [audiowaveform](https://github.com/bbc/audiowaveform) and [waveform-data.js](https://github.com/bbc/waveform-data.js).

## Installation

1. **REQUIRED**: Follow [this guide](https://github.com/bbc/audiowaveform#installation) to install audiowaveform binary into your system.
2. Install this module:

  ```bash
  npm install @lodestream/waveform-samples-generator
  ```

3. Use it like this:

  ```js
  const { parseFile } = require("@lodestream/waveform-samples-generator");

  const start = async () => {
    const samples = await parseFile({ 
      // filePath: "./audio.mp3",
      url: "https://cdn.jsdelivr.net/gh/lodestreams/waveform-samples-generator@master/docs/1min.mp3"
      sampleRate: 10
    });
    // See /src/@types/waveform-data/index.d.ts for detailed schema of `samples`
    console.log(JSON.stringify(samples.max));
  };

  start();
  ```

  If your want to draw waveforms out of it, use `samples.max`, it's an array of points.

## Play with this repo

Print out samples (array):

```bash
ts-node --files src/scripts/parser.manual.ts
# [2,2,2,3,2,2,3,2,3,2,3,3,3,5,4,4,4,2,...
```

Play the waveform! Watch it dancing!

```bash
ts-node --files src/scripts/player.manual.ts
```