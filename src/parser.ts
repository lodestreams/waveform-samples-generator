import WaveformData from "waveform-data";
import _ from "lodash";
import { toSamples } from "./to-samples";
import { download } from "./utils/download";

const FORMATS = ["mp3", "wav", "flac", "ogg"];

export interface IParseFileParam {
  filePath?: string;
  url?: string;
  sampleRate?: number;
}

export const parseFile = async ({
  filePath,
  url,
  sampleRate
}: IParseFileParam): Promise<WaveformDataNew> => {
  const cleanTasks = [];
  if (url) {
    const { clean, path } = await download(url);
    filePath = path;
    cleanTasks.push(clean);
  }

  if (!filePath) {
    throw new Error(
      "You need to specify either filePath or url to an audio file"
    );
  }

  const audioSupported =
    FORMATS.filter(f => `${filePath}`.toLowerCase().endsWith(`.${f}`)).length >
    0;

  if (!audioSupported) {
    throw new Error(
      `File not supported, supported audio formats are ${FORMATS.join(", ")}`
    );
  }

  const samplesArrBuf = toSamples(filePath, sampleRate);

  const waveformData = new WaveformData(
    samplesArrBuf,
    WaveformData.adapters.arraybuffer
  );
  cleanTasks.forEach(t => t());
  return waveformData;
};
