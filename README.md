# ffmpeg-remix

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Downloads][download-badge]][npm-url]

Packaging of ffmpeg split/concat used for Al Jazeera's [PalestineRemix](http://PalestineRemix.com) project.

## Install

```sh
npm i ffmpeg-remix
```

## Usage

```js
import remix from 'ffmpeg-remix';

remix({
  output: 'a.mp4',
  input: [
    {
      source: 'foo/bar.mp4',
      start:  23.4, // default 0
      end:    47.2  // default EOF
    },
    {
      source:   'http://baz.org/foo.mp4',
      start:    23.4, // default 0
      duration: 7.2   // end has precedence
    }
  ],
  limit: 5, // max ffmpeg parallel processes, default null (unlimited)
  ffmpegPath: require('ffmpeg-static').path // optionally set path to ffmpeg binary
}, function(err, result) {
  // …
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
