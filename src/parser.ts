import WaveformData from "waveform-data";
import _ from "lodash";
import { toSamples } from "./to-samples";

const FORMATS = ["mp3", "wav", "flac", "ogg"];

export interface IParseFileParam {
  filePath: string;
  sampleRate?: number;
}

export const parseFile = ({ filePath, sampleRate }: IParseFileParam) => {
  const audioSupported =
    FORMATS.filter(f => filePath.toLowerCase().endsWith(`.${f}`)).length > 0;

  if (!audioSupported) {
    throw new Error(
      `File not supported, supported audio formats are ${FORMATS.join(", ")}`
    );
  }

  const samplesArrBuf = toSamples(filePath, sampleRate);

  return new WaveformData(samplesArrBuf, WaveformData.adapters.arraybuffer);
};
