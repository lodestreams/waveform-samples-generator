declare module "waveform-data";

interface WaveformDataArrayBufferAdapter {
  /** DataView(462) .buffer, .byteLength, .byteOffset, etc */
  data: DataView;
  /** false */
  is_16_bit: boolean;
  /** true */
  is_8_bit: boolean;
  /** 221 */
  length: number;
  /** 44100 */
  sample_rate: number;
  /** 4410 */
  scale: number;
  /** 1 */
  version: number;
}

declare interface WaveformDataNew {
  adapter: WaveformDataArrayBufferAdapter;
  /** Audio length in seconds, 60s */
  duration: number;
  /** Audio sample array, all the max peaks values. 601 items */
  max: number[];
  /** Audio sample array, all the min peaks values. 601 items */
  min: number[];
  /** Duration of the offset, in seconds, 60s. */
  offset_duration: number;
  /** 601 */
  offset_end: number;
  /** 601 */
  offset_length: number;
  /** 0 */
  offset_start: number;
  /** 0.993753 */
  pixels_per_second: number;
  points: object;
  /** 0.10006265 */
  seconds_per_pixel: number;
  segments: object;
}
