const pwgenerator = require("../src/password-generator.js");
const mock = require("./test-mock.js");
const null_module = null;

// illegal test
test('test of constructor(null)', ()=>{
    expect(() => {
        new pwgenerator();
    }).toThrow('Crypto module is not defined.');
});
test('test of constructor(undefined)', ()=>{
    expect(() => {
        new pwgenerator(undefined);
    }).toThrow('Crypto module is not defined.');
});
test('test of constructor(illegal mock)', ()=>{
    expect(() => {
        new pwgenerator({});
    }).toThrow('Crypto module is illegal. It needs getRandomValues().');
});

// good case with node.js is in integrated test.
test('test of constructor(undefined)', ()=>{
    expect(() => {
        new pwgenerator(new mock());
    }).not.toThrow(/.*/);
});

// good case with web is in constructor.in-web.password-generator.test.js
