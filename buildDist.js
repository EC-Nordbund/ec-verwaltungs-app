var mergedirs = require('merge-dirs').default;

mergedirs('./packages/anmeldung/dist', './dist', 'overwrite');
mergedirs('./packages/app/dist', './dist', 'overwrite');