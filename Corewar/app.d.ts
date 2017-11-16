import { IParser } from "../parser/interface/IParser";

declare namespace corewar {

  interface Api {

    new();

    parser: IParser;

  }
}