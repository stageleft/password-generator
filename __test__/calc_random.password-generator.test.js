const pwgenerator = require("../src/password-generator.js");
const crypto = require('node:crypto');

let password_generator = new pwgenerator(crypto.webcrypto);
let i; // loop value

// module test
test('test of calc_random(0)', ()=>{
    expect(password_generator.calc_random(0)).toBe(0)
});
test('test of calc_random(1)', ()=>{
    for (i = 0; i < 100; i++) {
        expect(password_generator.calc_random(1)).toBe(0)
    }
});
test('test of calc_random(2)', ()=>{
    for (i = 0; i < 100; i++) {
        let random = password_generator.calc_random(2)
        expect(random).toBeGreaterThanOrEqual(0);
        expect(random).toBeLessThan(2);
    }
});
test('test of calc_random(255)', ()=>{
    for (i = 0; i < 1000; i++) {
        let random = password_generator.calc_random(255)
        expect(random).toBeGreaterThanOrEqual(0);
        expect(random).toBeLessThan(255);
    }
});
