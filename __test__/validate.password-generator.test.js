const pwgenerator = require("../src/password-generator.js");
const mock = require("./test-mock.js");
const mock_webcrypto = new mock([[0]]);
const password_generator = new pwgenerator(mock_webcrypto);

// illegal case test
test('test of validate()', ()=>{
    expect(password_generator.validate()).toBe(false)
});
test('test of validate(not object)', ()=>{
    expect(password_generator.validate([])).toBe(false)
});
test('test of validate(no pwclass)', ()=>{
    const random_spec = {};
    expect(password_generator.validate(random_spec)).toBe(false)
});
test('test of validate(pwclass is null)', ()=>{
    const random_spec = {pwclass: null};
    expect(password_generator.validate(random_spec)).toBe(false)
});
test('test of validate(pwclass has no string)', ()=>{
    const random_spec = {pwclass: []};
    expect(password_generator.validate(random_spec)).toBe(false)
});
test('test of validate(pwclass[0] string is empty)', ()=>{
    const random_spec = {pwclass: [""]};
    expect(password_generator.validate(random_spec)).toBe(false)
});
test('test of validate(pwclass[0] string is longer than largest value)', ()=>{
    let pwclass_letter = "";
    for (let i = 0; i < 256; i++) {
        pwclass_letter = pwclass_letter + "a"
    }
    expect(pwclass_letter.length).toBe(256)
    const random_spec = {pwclass: [pwclass_letter]};
    expect(password_generator.validate(random_spec)).toBe(false)
});
test('test of validate(no pwlength)', ()=>{
    const random_spec = {pwclass: ["a"]};
    expect(password_generator.validate(random_spec)).toBe(false)
});
test('test of validate(pwlength is null)', ()=>{
    const random_spec = {pwclass: ["a"], pwlength: null};
    expect(password_generator.validate(random_spec)).toBe(false)
});
test('test of validate(pwlength is not number)', ()=>{
    const random_spec = {pwclass: ["a"], pwlength: "0"};
    expect(password_generator.validate(random_spec)).toBe(false)
});
test('test of validate(pwlength is less than smallest value)', ()=>{
    const random_spec = {pwclass: ["a"], pwlength: 0};
    expect(password_generator.validate(random_spec)).toBe(false)
});
test('test of validate(pwlength is more than largest value)', ()=>{
    const random_spec = {pwclass: ["a"], pwlength: 65536};
    expect(password_generator.validate(random_spec)).toBe(false)
});

