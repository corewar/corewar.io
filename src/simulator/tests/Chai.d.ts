declare module Chai {
    export interface Assertion {
        thisInstruction(IInstruction): void
    }
}