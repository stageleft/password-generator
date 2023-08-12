// const mock = require("../__test__/test-mock.js");
class mock {
    // setup : const mock_instance = new mock(array_of_return_value);
    constructor(init_array) {
        if (toString.call(init_array) === '[object Undefined]') {
            init_array = [];
        } else if (toString.call(init_array) !== '[object Array]') {
            throw 'initialize error. use Array.'
        }
        this.call_count = 0;
        this.return_array = init_array;
    }
    // mock specification : 
    //  (1) if mock call count is less than init_array.length, return init_array[mock call count]
    //  (2) otherwise, throw Exception.
    ret_value() {
        if (this.call_count >= this.return_array.length) {
            throw 'call count over. call:' + this.call_count + ', array_length:' + this.return_array.length;
        }
        let ret_value = this.return_array[this.call_count];
        this.call_count = this.call_count + 1;
        return [ret_value];
    }
    // mock call: mock_instance.getRandomValues(dummy_Array);
    getRandomValues() {
        return this.ret_value();
    }
}

module.exports = mock;
