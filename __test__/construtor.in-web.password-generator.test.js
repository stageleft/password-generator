/**
 * @jest-environment jsdom
 */
const pwgenerator = require("../src/password-generator.js");

// illegal test and good case with node.js is in constructor.password-generator.test.js

// good case with web is in constructor.in-web.password-generator.test.js

test('test of constructor(null) with window', ()=>{
    //const window = {};
    //window.crypto = new mock();
    expect(() => {
        new pwgenerator();
    }).not.toThrow(/.*/);
});
