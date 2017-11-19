declare namespace jasmine {
  export interface Matchers<T> {
      toEqualInstruction(expected: any): boolean;
  }
}