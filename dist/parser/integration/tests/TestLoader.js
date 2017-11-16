"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const _ = require("underscore");
"use strict";
class TestLoader {
    getWarriors(path, names) {
        var files = {};
        var filenames = _(names).map((name) => {
            return path + name + ".red";
        }).concat(_(names).map((name) => {
            return path + name + ".ld";
        }));
        var warriors;
        var fileCount = filenames.length;
        _(filenames).forEach((filename) => {
            fs.readFile(filename, "utf8", (err, fileData) => {
                files[filename] = fileData;
                if (--fileCount === 0) {
                    warriors = this.mapWarriors(path, names, files);
                }
            });
        });
        return new Promise((resolve, reject) => {
            resolve(warriors);
        });
    }
    mapWarriors(path, names, files) {
        var warriors = [];
        names.map((name) => {
            warriors.push({
                name: name,
                redcode: files[path + name + ".red"],
                loadfile: files[path + name + ".ld"]
            });
        });
        return warriors;
    }
}
exports.TestLoader = TestLoader;
