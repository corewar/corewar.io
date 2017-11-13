/// <reference path="../references.ts" />
import { ITestWarrior } from "./ITestWarrior";
import * as fetch from 'isomorphic-fetch';
import * as fs from "fs";
import * as _ from "underscore";
"use strict";

export class TestLoader {

    public getWar(path: string, names: string[]) : Promise<ITestWarrior[]> {

        var files: { [filename: string]: string } = {};

        var filenames = _(names).map((name) => {
            return path + name + ".red";
        }).concat(_(names).map((name) => {
            return path + name + ".ld";
        }));

        var warriors: ITestWarrior[] = [];

        var promises = _(filenames).forEach((filename) => {
            return new Promise((resolve, reject) => {
                fs.readFile(filename, "utf8", (err, fileData) => {
                    if(err != null) {
                        console.log(err);
                    }
                    files[filename] = fileData;
                    Promise.resolve();
                });
            })
        });

        return Promise.all(promises).then((results) => {

            names.map((name) => {

                warriors.push({
                    name: name,
                    redcode: files[path + name + ".red"],
                    loadfile: files[path + name + ".ld"]
                });

            });

            return Promise.resolve(warriors);

        });

    }

    // public getWarriors(path: string, names: string[]): P.Promise<ITestWarrior[]> {
    //     var result = P.defer<ITestWarrior[]>();

    //     var files: { [filename: string]: string } = {};

    //     var filenames = _(names).map((name) => {
    //         return path + name + ".red";
    //     }).concat(_(names).map((name) => {
    //         return path + name + ".ld";
    //     }));

    //     var fileCount = filenames.length;

    //     _(filenames).forEach((filename) => {
    //         ajax.get(filename, undefined, (file) => {

    //             files[filename] = file;

    //             if (--fileCount === 0) {

    //                 this.return(result, path, names, files);
    //             }
    //         });
    //     });

    //     return result.promise();
    // }

    // private return(result: P.Deferred<ITestWarrior[]>, path: string, names: string[], files: { [filename: string]: string }) {

    //     var warriors: ITestWarrior[] = [];

    //     _(names).forEach((name) => {

    //         warriors.push({
    //             name: name,
    //             redcode: files[path + name + ".red"],
    //             loadfile: files[path + name + ".ld"]
    //         });
    //     });

    //     result.resolve(warriors);
    // }
}