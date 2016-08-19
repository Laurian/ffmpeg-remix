# ffmpeg-remix

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Downloads][download-badge]][npm-url]

Packaging of ffmpeg split/concat used for Al Jazeera's PalestineRemix.com project.

## Install

```sh
npm i -D ffmpeg-remix
```

## Usage

```js
import ffmpegRemix from 'ffmpeg-remix';

ffmpegRemix({
  output: 'a.mp4',
  input: [
    {
      source: 'foo.mp4',
      start:  23.4, // default 0
      end:    47.2
    },
    {
      source:   'http://foo.org/bar.mp4',
      start:    23.4,  // default 0
      duration: 7.2 // end has precedence
    }
  ],
  limit: 5 // max ffmpeg parallel processes, default null (unlimited)
}, function(err, result) {

});
```

## License

MIT © [Laurian Gridinoc](http://github.com/Laurian)

[npm-url]: https://npmjs.org/package/ffmpeg-remix
[npm-image]: https://img.shields.io/npm/v/ffmpeg-remix.svg?style=flat-square

[travis-url]: https://travis-ci.org/Laurian/ffmpeg-remix
[travis-image]: https://img.shields.io/travis/Laurian/ffmpeg-remix.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/Laurian/ffmpeg-remix
[coveralls-image]: https://img.shields.io/coveralls/Laurian/ffmpeg-remix.svg?style=flat-square

[depstat-url]: https://david-dm.org/Laurian/ffmpeg-remix
[depstat-image]: https://david-dm.org/Laurian/ffmpeg-remix.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/ffmpeg-remix.svg?style=flat-square
