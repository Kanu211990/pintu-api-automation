const Test = require('./test/Test')

beforeAll(() => {
    global.console = require('console');
    Test.setup();
})
