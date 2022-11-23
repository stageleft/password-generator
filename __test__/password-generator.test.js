const pwgenerator = require("../src/password-generator.js");
const crypto = require('node:crypto');

let password_generator = new pwgenerator(crypto.webcrypto);
let i; // loop value

// integrated test
test('test with 1 letter, 1 class with 1 letter', ()=>{
    let setup = {
        "pwclass": ["1"],
        "pwlength": 1
    };
    let password = password_generator.generate(setup);
    expect(password).toBe("1");
});

test('test with 2 letter, 1 class with 1 letter', ()=>{
    let setup = {
        "pwclass": ["1"],
        "pwlength": 2
    };
    let password = password_generator.generate(setup);
    expect(password).toMatch(/1{2}/);
});

test('test with 32 letter, 1 class with 10 letter', ()=>{
    let setup = {
        "pwclass": ["0123456789"],
        "pwlength": 32
    };
    for (i = 0; i < 100; i++) {
        let password = password_generator.generate(setup);
        expect(password).toMatch(/[0-9]{32}/);
    }
});