import async from 'async';
import ffmpeg from 'fluent-ffmpeg';
import tmp from 'tmp';
import path from 'path';


tmp.setGracefulCleanup();


const ingest = (data, tmpDir) => {
  return (input, callback) => {
    const ff = ffmpeg(input.source);

    if (input.start) ff.seekInput(input.start);
    if (input.end) {
      ff.duration(input.end - input.start);
    } else if (input.duration) {
      ff.duration(input.duration);
    }

    // input.path = path.join(tmpDir.name, `i-${index}.ts`);
    input.path = tmp.fileSync({
      dir: tmpDir.name,
      prefix: 'ingest-',
      postfix: '.ts'
    }).name;

    ff.audioCodec('copy').videoCodec('copy');
    ff.output(input.path);

    ff.on('start', (commandLine) => {
      console.log('Spawned Ffmpeg with command: ' + commandLine);
    });

    ff.on('error', (err, stdout, stderr) => {
      console.log('Cannot process video: ' + err.message);
      callback(err, null);
    });

    ff.on('end', () => {
      console.log('Transcoding succeeded !' + input.path);
      callback(null, input);
    });

    ff.run();
  };
};


const concat = (data, tmpDir, callback) => {
  return (err, ingest) => {
    console.log(ingest);

    const ff = ffmpeg();
    const input = [];
    for (const segment of ingest) {
      input.push(segment.path);
    }

    console.log(input);

    ff.input(`concat:${input.join('|')}`);
    ff.output(data.output);

    ff.on('start', (commandLine) => {
      console.log('Spawned Ffmpeg with command: ' + commandLine);
    });

    ff.on('error', (err, stdout, stderr) => {
      console.log('Cannot process video: ' + err.message);
      callback(err);
    });

    ff.on('end', () => {
      console.log('Transcoding succeeded !');

      callback(null, data);
    });

    ff.run();
  };
};


export default function (data, callback) {
  const tmpDir = tmp.dirSync({
    unsafeCleanup: true
  });

  if (data.limit) {
    async.mapLimit(data.input, data.limit, ingest(data, tmpDir), concat(data, tmpDir, callback));
  } else {
    async.map(data.input, ingest(data, tmpDir), concat(data, tmpDir, callback));
  }
}
