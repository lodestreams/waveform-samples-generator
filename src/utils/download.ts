import Axios from "axios";
import _debug from "debug";
import * as fs from "fs";
import * as shell from "shelljs";
import { getTmpDir, extractFilename } from "./tmp-dir";

const debug = _debug("download.ts");

interface IDownloadReturn {
  path: string;
  clean: () => void;
}
export const download = async (url: string) => {
  debug("download()", url);
  const dir = getTmpDir();
  shell.mkdir("-p", dir);
  const downloadToFile = `${dir}/${extractFilename(url)}`;
  const response = await Axios({ url, responseType: "stream" });
  const fileStream = fs.createWriteStream(downloadToFile);
  response.data.pipe(fileStream);

  return new Promise<IDownloadReturn>(resolve => {
    fileStream.on("close", () => {
      debug("File saved to", downloadToFile);
      resolve({
        path: downloadToFile,
        clean: () => fs.unlinkSync(downloadToFile)
      });
    });
  });
};
