const mock = require("../__test__/test-mock.js");

// error case
test('test of test_mock()', ()=>{
    const mock_instance = new mock();
    expect(() => {
        return mock_instance.getRandomValues();
    }).toThrow('call count over');
})
test('test of test_mock(0)', ()=>{
    expect(() => {
        new mock(0);
    }).toThrow('initialize error. use Array.');
})

// good case
test('test of test_mock([0])', ()=>{
    const mock_instance = new mock([0]);
    expect(mock_instance.getRandomValues()).toBe(0);
})

test('test of test_mock([0,1])', ()=>{
    const mock_instance = new mock([0,1]);
    expect(mock_instance.getRandomValues()).toBe(0);
    expect(mock_instance.getRandomValues()).toBe(1);
})

test('test of test_mock([[0,1],[2,3]])', ()=>{
    const mock_instance = new mock([[0,1],[2,3]]);
    expect(mock_instance.getRandomValues()).toEqual([0,1]);
    expect(mock_instance.getRandomValues()).toEqual([2,3]);
})
