const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish(path.resolve(__dirname, 'dist/'), function(err) {
    if(err) {
        console.error('Error while publishing: ', err);
        process.exit(1);
    } else {
        console.log('Publishing succeeded');
    }
});