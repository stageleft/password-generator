const pwgenerator = require("../src/password-generator.js");
const mock = require("../__test__/test-mock.js");

// module test
test('test of calc_random(0)', ()=>{
    const mock_webcrypto = new mock([[0],[255]]);
    const password_generator = new pwgenerator(mock_webcrypto);
    expect(password_generator.calc_random(0)).toBe(0)
    expect(password_generator.calc_random(0)).toBe(0)
});
test('test of calc_random(1)', ()=>{
    const mock_webcrypto = new mock([[0],[255],[254]]);
    const password_generator = new pwgenerator(mock_webcrypto);
    expect(password_generator.calc_random(1)).toBe(0)
    expect(password_generator.calc_random(1)).toBe(0)
});
test('test of calc_random(2)', ()=>{
    const mock_webcrypto = new mock([[0],[255],[254],[253]]);
    const password_generator = new pwgenerator(mock_webcrypto);
    expect(password_generator.calc_random(2)).toBe(0)
    expect(password_generator.calc_random(2)).toBe(1)
});
test('test of calc_random(255)', ()=>{
    const mock_webcrypto = new mock([[0],[255],[254]]);
    const password_generator = new pwgenerator(mock_webcrypto);
    expect(password_generator.calc_random(255)).toBe(0)
    expect(password_generator.calc_random(255)).toBe(254)
});
