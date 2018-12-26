# Waveform Samples Generator

This is a thin wrapper around [audiowaveform](https://github.com/bbc/audiowaveform) to parse audio files and generate sample data.

If you want more features or generate them on your own, just use the original [audiowaveform](https://github.com/bbc/audiowaveform) and [waveform-data.js](https://github.com/bbc/waveform-data.js).

## Installation

1. Follow [this guide](https://github.com/bbc/audiowaveform#installation) to install audiowaveform binary into your system.
2. Install this module:

  ```bash
  npm install waveform-samples-generator
  ```

3. Use it like this:

  ```typescript
  import { parseFile } from "waveform-samples-generator";
  const samples = parseFile({ filePath: "/path/to/your/audio", sampleRate: 10 });
  // Or render it
  console.log(samples)
  ```
