import FFRemix from './ffRemix';
import FFFragment from './FFFragment';
import path from 'path';

const remix = new FFRemix([
  {
    source: 'http://player.vimeo.com/external/109585527.hd.mp4?s=7bd504c45f373de7f627177e3c3f1bcb',
    start:  125.084,
    end:    142.426
  },
  // {
  //   source: 'http://player.vimeo.com/external/110888355.hd.mp4?s=9360b21d5cb36f15bed0353a02b0d044',
  //   start:  25.141,
  //   end:    71.031
  // }
]);

remix.mergeToFile(path.join(__dirname, 'a.mp4'), '/tmp');
remix.run();

// const f = new FFFragment('http://player.vimeo.com/external/109585527.hd.mp4?s=7bd504c45f373de7f627177e3c3f1bcb', 125.084, 142.426, {
//   logger: console
// });
// f.output('/tmp/test-f.mp4');
//
// f.on('start', function(commandLine) {
//   console.log('Spawned Ffmpeg with command: ' + commandLine);
// });
//
// f.on('end', function(err, stdout, stderr) {
//     console.log(stdout, stderr);
// });
//
// f.run();
