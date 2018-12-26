// import Axios from "axios";
import _debug from "debug";
import * as fs from "fs";
import * as shell from "shelljs";
// import * as request from "request";
import * as needle from "needle";
import { getTmpDir, extractFilename } from "./tmp-dir";

const debug = _debug("download.ts");

// const downloadTo = (url: string, dest: string, cb: (msg?: any) => void) => {
//   const file = fs.createWriteStream(dest);
//   const sendReq = request.get(url);

//   // verify response code
//   sendReq.on("response", response => {
//     if (response.statusCode !== 200) {
//       return cb("Response status was " + response.statusCode);
//     }

//     sendReq.pipe(file);
//   });

//   // close() is async, call cb after close completes
//   file.on("finish", () => {
//     file.close();
//     cb();
//   });

//   // check for request errors
//   sendReq.on("error", err => {
//     fs.unlink(dest, () => cb(err.message));
//   });

//   file.on("error", err => {
//     // Handle errors
//     fs.unlink(dest, () => cb(err.message)); // Delete the file async. (But we don't check the result)
//   });
// };

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
      .get(url)
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
      });
  });
};

interface IDownloadReturn {
  path: string;
  clean: () => void;
}
// export const downloadWithAxios = async (url: string) => {
//   debug("download()", url);
//   const dir = getTmpDir();
//   shell.mkdir("-p", dir);
//   const downloadToFile = `${dir}/${extractFilename(url)}`;
//   const response = await Axios({ url, responseType: "stream" });

//   return new Promise<IDownloadReturn>((resolve, reject) => {
//     if (!`${response.status}`.startsWith("2")) {
//       reject(`Failed to download audio file: ${response.status} ${url}`);
//     }

//     const fileStream = fs.createWriteStream(downloadToFile);
//     response.data.pipe(fileStream);

//     fileStream.on("close", () => {
//       debug("File saved to", downloadToFile);
//       resolve({
//         path: downloadToFile,
//         clean: () => fs.unlinkSync(downloadToFile)
//       });
//     });
//   });
// };
