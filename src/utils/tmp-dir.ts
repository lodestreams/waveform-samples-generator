import * as shell from "shelljs";

export const getTmpDir = () => {
  return `${shell.tempdir()}/audio-wave-form/${Date.now()}`;
};

export const extractFilename = (url: string) => {
  return decodeURIComponent(url)
    .match(/^[^?]*/)[0]
    .match(/[^/]*$/)[0];
};

export const extractFileExt = (url: string) => {
  return extractFilename(url)
    .match(/[^\.]*$/)[0]
    .toLowerCase();
};
