import * as shell from "shelljs";
import * as fs from "fs";
import Axios from "axios";
import { getTmpDir, extractFilename } from "./tmp-dir";

export const download = async (url: string) => {
  const downloadToFile = `${getTmpDir()}/${extractFilename(url)}`;
  const response = await Axios({ url, responseType: "stream" });
  response.data.pipe(fs.createWriteStream(downloadToFile));
  return {
    path: downloadToFile,
    clean: () => fs.unlinkSync(downloadToFile)
  };
};
