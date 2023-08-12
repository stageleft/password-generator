const pwgenerator = require("../src/password-generator.js");
const mock = require("./test-mock.js");
const mock_webcrypto = new mock([0]);
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

test('test of validate(class/letter with multi pwclass is collect algorhythm)', ()=>{
    const random_spec = {pwclass: ["ab", "AB", "01"], pwlength: 6};
    // mock random values
    let mock_array = [];
    mock_array.push(1); // letter count + 1 from "ab".
    mock_array.push([1, 2]); // letter choices from "ab".
    mock_array.push(1); // letter count + 1 from "AB".
    mock_array.push([1, 2]); // letter choices from "AB".
    // letter count from "01" is (random_spec.pwlength - 2 - 2)
    mock_array.push([1, 2]); // letter choices from "01".
    mock_array.push([...Array(random_spec.pwlength * 101)].map((_, i) => i % random_spec.pwlength)) // shuffle count
    const mock_webcrypto_256 = new mock(mock_array.flat());
    const password_generator_256 = new pwgenerator(mock_webcrypto_256);
    expect(password_generator_256.validate(random_spec)).toBe(true);
    result_password = password_generator_256.generate(random_spec);
    expect(result_password.length).toBe(6);
    expect((result_password.match( /[ab]/g ) || []).length).toBe(2);
    expect((result_password.match( /[AB]/g ) || []).length).toBe(2);
    expect((result_password.match( /[01]/g ) || []).length).toBe(2);
});
