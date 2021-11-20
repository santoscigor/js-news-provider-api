import { resolve } from "path";
import { IgnorePlugin } from "webpack";

export const entry = "./src/app.js";
export const plugins = [
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
];
export const output = {
    path: resolve(__dirname, "dist"),
    filename: "api.bundle.js"
};
export const target = "node";