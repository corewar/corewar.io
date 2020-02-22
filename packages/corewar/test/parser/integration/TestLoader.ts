import { ITestWarrior } from "@parser/tests/integration/ITestWarrior";
import * as fs from "fs";

export class TestLoader {

    public getWarriors(path: string, names: string[]): Promise<ITestWarrior[]> {

        const files: { [filename: string]: string } = {};

        const filenames = names.map((name) => {
            return path + name + ".red";
        }).concat(names.map((name) => {
            return path + name + ".ld";
        }));

        let fileCount = filenames.length;

        return new Promise((resolve) => {
            filenames.forEach((filename) => {
                fs.readFile(filename, "utf8", (err, fileData) => {

                    files[filename] = fileData;
                    if (--fileCount === 0) {
                        resolve(this.mapWarriors(path, names, files));
                    }

                    if(err) {
                        console.log(err)
                    }
                });
            });
        });
    }

    private mapWarriors(path: string, names: string[], files: { [filename: string]: string }): ITestWarrior[] {

        const warriors: ITestWarrior[] = [];

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