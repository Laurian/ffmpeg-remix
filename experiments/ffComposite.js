import debug from 'debug';
import FfmpegCommand from 'fluent-ffmpeg';
import async from 'async';
import tmp from 'tmp';
import path from 'path';

const d = debug('FFComposite');
tmp.setGracefulCleanup();

export default class FFComposite extends FfmpegCommand {
  constructor(input, options) {
    super(options);
    this.children = [];
    this.tmp = [];
    if (input) this.addInput(input);
  }

  addInput(source) {
    super.addInput(this._adaptInput(source));
    return this;
  }

  mergeAdd(source) {
    return this.addInput(source);
  }

  input(source) {
    return this.addInput(source);
  }

  run() {
    const self = this;

    async.map(this.children, (child, callback) => {
      child
        .on('end', () => { callback(null); })
        .on('error', (err) => { callback(err, null); })
        .run();
    }, (err, results) => {
      if (err) d(err);

      console.log('RUN?');
      // super
      //   .on('end', self._cleanUp)
      //   .on('error', self._cleanUp)
      //   .run();
    });

    return self;
  }

  _adaptInput(input) {
    if (input && input.constructor) {
      if (
        input.constructor.name === 'FfmpegCommand'
        || input.constructor.name === 'FFComposite'
        || input.constructor.name === 'FFFragment'
      ) {
        console.log('ADAPTING')
        const output = tmp.fileSync({ postfix: '.ts' });

        this.children.push(input);
        this.tmp.push(output);
        input.output(output.name);

        return output.name;
      } else if (input.constructor.name === 'Array') {
        // FIXME
        // input.map(this._adaptInput);
        // return ???
      }
    }
    return input;
  }

  _cleanUp() {
    this.tmp.map((t) => { t.removeCallback(); });
  }
}
