const path = require('path');
const { IgnorePlugin } = require('webpack');

module.exports = {
  entry: './src/app.js',
  plugins: [
    new IgnorePlugin({ resourceRegExp: /^pg-native$/ }),
    new IgnorePlugin({ resourceRegExp: /^sqlite3$/ }),
    new IgnorePlugin({ resourceRegExp: /^pg-query-stream$/ }),
    new IgnorePlugin({ resourceRegExp: /^oracledb$/ }),
    new IgnorePlugin({ resourceRegExp: /^mysql2$/ }),
    new IgnorePlugin({ resourceRegExp: /^mysql$/ }),
    new IgnorePlugin({ resourceRegExp: /^mssql\/package.json$/ }),
    new IgnorePlugin({ resourceRegExp: /^mssql\/lib\/base$/ }),
    new IgnorePlugin({ resourceRegExp: /^mssql$/ }),
    new IgnorePlugin({ resourceRegExp: /^tedious$/ }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.js'
  },
  target: 'node'
};