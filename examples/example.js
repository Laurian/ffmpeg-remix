var remix = require('../dist');
// var remix = require('ffmpeg-remix');
var path = require('path');

remix({
  output: path.join(__dirname, 'a.mp4'),
  input: [
    {
      source: 'http://player.vimeo.com/external/109585527.hd.mp4?s=7bd504c45f373de7f627177e3c3f1bcb',
      start:  125.084,
      end:    142.426
    },
    {
      source:   'http://player.vimeo.com/external/110884059.hd.mp4?s=3eb6e351f73ca929189cbf1e2d74c8c4',
      start:    267.142,
      duration: 6.139
    },
    {
      source: 'http://player.vimeo.com/external/110888355.hd.mp4?s=9360b21d5cb36f15bed0353a02b0d044',
      start:  25.141,
      end:    71.031
    }
  ],
  limit: 2 // max ffmpeg parallel processes, default null (unlimited)
}, function(err, result) {
  console.log(err, result);
});
