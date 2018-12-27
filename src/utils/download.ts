// import Axios from "axios";
import _debug from "debug";
import encodeurl from "encodeurl";
import * as fs from "fs";
import * as shell from "shelljs";
// import * as request from "request";
import * as needle from "needle";
import { getTmpDir, extractFilename } from "./tmp-dir";

const debug = _debug("download.ts");

export const download = async (url: string, dest?: string) => {
  debug("download()", url);
  const dir = getTmpDir();
  if (!dest) {
    shell.mkdir("-p", dir);
    dest = `${dir}/${extractFilename(url)}`;
  }

  // no callback, using streams
  var out = fs.createWriteStream(dest);
  return new Promise<IDownloadReturn>((resolve, reject) => {
    return needle
      .get(encodeurl(url))
      .pipe(out)
      .on("finish", function(err) {
        if (err) {
          return reject(err);
        }
        console.log("File downloaded to", dest);
        return resolve({
          path: dest,
          clean: () => {
            console.log("rm -rf", dir);
            shell.rm("-rf", dir);
          }
        });
      })
      .on("error", function(err) {
        console.log("error!", err);
        reject(err);
      });
  });
};

interface IDownloadReturn {
  path: string;
  clean: () => void;
}
