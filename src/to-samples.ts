import * as fs from "fs";
import * as shell from "shelljs";
import toArrayBuffer from "to-arraybuffer";
import { execSync } from "child_process";

export function toSamples(
  inFile: string,
  sampleRate: number = 10
): ArrayBuffer {
  const outputDatLoc = `${shell.tempdir()}/audio-wave-form/${Date.now()}`;
  const outputDatFile = `${outputDatLoc}/audio.dat`;
  shell.mkdir("-p", outputDatLoc);
  const cmd = `audiowaveform -i "${inFile}" -o "${outputDatFile}" --pixels-per-second ${sampleRate} -b 8`;
  execSync(cmd);

  const samples = fs.readFileSync(outputDatFile);
  return toArrayBuffer(samples);
}
