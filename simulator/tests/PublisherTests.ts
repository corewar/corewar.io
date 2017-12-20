import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai);

import { Publisher } from "../Publisher";
import { MessageType } from "../interface/IMessage";

describe("Publisher", () => {

    it("can be called when the publish provider has not been specified", () => {

        const publisher = new Publisher(null);

        publisher.publish({
            type: MessageType.CoreAccess,
            payload: {}
        });
    });
});