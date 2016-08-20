import async from 'async';
import tmp from 'tmp';
import path from 'path';
import debug from 'debug';

import FFComposite from './ffComposite';
import FFFragment from './ffFragment';


const d = debug('FFRemix');
tmp.setGracefulCleanup();


export default class FFRemix extends FFComposite {
  constructor(inputs, options) {
    super(options);

    inputs.map(({source, start, end}) => {
      super.addInput(new FFFragment(source, start, end));
    });
  }
}
