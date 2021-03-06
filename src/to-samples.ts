import * as fs from "fs";
import * as shell from "shelljs";
import toArrayBuffer from "to-arraybuffer";
import { execSync } from "child_process";
import { getTmpDir } from "./utils/tmp-dir";

export function testBin() {
  const result = shell.which("audiowaveform");
  return !!(result && result.code === 0);
}

export function toSamples(
  inFile: string,
  sampleRate: number = 10
): ArrayBuffer {
  if (!testBin()) {
    throw new Error("audiowaveform is not installed");
  }

  const outputDatLoc = getTmpDir();
  const outputDatFile = `${outputDatLoc}/audio.dat`;
  shell.mkdir("-p", outputDatLoc);
  const cmd = `audiowaveform -i "${inFile}" -o "${outputDatFile}" --pixels-per-second ${sampleRate} -b 8`;
  execSync(cmd);

  const samples = fs.readFileSync(outputDatFile);
  shell.rm("-rf", outputDatLoc);
  return toArrayBuffer(samples);
}
