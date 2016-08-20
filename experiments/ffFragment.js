import debug from 'debug';
import FfmpegCommand from 'fluent-ffmpeg';
import async from 'async';
import tmp from 'tmp';
import path from 'path';

const d = debug('FFFragment');
tmp.setGracefulCleanup();

export default class FFFragment extends FfmpegCommand {
  constructor(input, start, end, options) {
    super(input, options);

    console.log(input, start, end);

    if (start) {
      super.seekInput(start);
    } else {
      start = 0;
    }

    let duration;
    if (end) duration = end - start;
    if (duration) super.duration(duration);

    super.audioCodec('copy').videoCodec('copy');
  }
}
