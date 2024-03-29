// パスワード生成ツール・パスワード生成方法
// 入力：JSON
// {
//     pwclass: ["パスワード使用文字クラス１","パスワード使用文字クラス２",...,"パスワード使用文字クラスｎ"], （Array[String]）
//     pwlength: パスワード長（Number）
// }
// 入力制限：
// class, length ともに存在すること。
//   classに指定される「パスワード使用文字クラス」は、必ず１文字以上を記入した文字列であること。空配列も認めない。
//      パスワード使用文字クラスは、利用する文字そのものを指定し、256文字未満であること。
//   length の長さは、class.length 以上の大きさで指定されること。また、65536未満であること。
class pwgenerator {
    constructor(crypto_module) {
        this.random_max = Uint8Array.BYTES_PER_ELEMENT * 256 - 1;
        this.length_max = 65535;
        if (crypto_module === null || crypto_module === undefined) {
            if (typeof(window) === 'object' && window.crypto !== null) {
                this.cryptomodule = window.crypto;
            } else {
                throw 'Crypto module is not defined.';
            }
        } else {
            if(typeof(crypto_module.getRandomValues) === 'function') {
                this.cryptomodule = crypto_module;
            } else {
                throw 'Crypto module is illegal. It needs getRandomValues().';
            }
        }
    }
    validate(input) {
        if (toString.call(input) !== '[object Object]') {
            return false;
        }
        if (toString.call(input.pwclass) !== '[object Array]') {
            return false;
        } else if (input.pwclass.length <= 0) {
            return false;
        } else {
            for (let letters of input.pwclass) {
                if (toString.call(letters) !== '[object String]' || letters.length < 1 || this.random_max < letters.length) {
                    return false;
                }
            }
        }
        if (toString.call(input.pwlength) !== '[object Number]' || input.pwlength < input.pwclass.length || this.length_max < input.pwlength) {
            return false;
        }
        return true;
    }
    calc_random(ubound){ // return random integer value from 0 to (ubound - 1)
        if (ubound === 0) {
            return 0;
        }

        let count = Math.floor( this.random_max / ubound );
        let seed_max = ubound * count;
        let seed;
        do {
            // see https://developer.mozilla.org/ja/docs/Web/API/Crypto/getRandomValues
            seed = this.cryptomodule.getRandomValues(new Uint8Array(1))[0];
        } while (seed >= seed_max);
        return seed % ubound;
    }
    calc_random_letter(pwclass){
        return pwclass[this.calc_random(pwclass.length)];
    }
    generate_with_each_pwclass(pwclass, pwlength) {
        let result = "";
        for (let i = 0; i < pwlength; i++) {
            result = result + this.calc_random_letter(pwclass);
        }
        return result;
    }
    change_index_to_last(input_string, charIndexToLast) {
        return input_string.substring(0, charIndexToLast) +
               input_string.substring(charIndexToLast + 1, input_string.length) +
               input_string[charIndexToLast]; 
    }
    change_random_index_to_last(input_string) {
        let result_string = this.change_index_to_last(input_string, this.calc_random(input_string.length));
        for (let j = 0; j < input_string.length * 100; j++) {
            result_string = this.change_index_to_last(result_string, this.calc_random(input_string.length));
        }
        return result_string
    }
    generate(input) {
        if (this.validate(input) === false) {
            return null;
        }

        // generate letters from input.pwclass
        let result_string = "";
        let letter_count = input.pwlength;
        let pwclass_max_index = input.pwclass.length - 1;
        for (let i = 0; i < pwclass_max_index; i++) {
            let count_letters_to_calc = letter_count - (pwclass_max_index - i);
            let letters_to_calc = this.calc_random(count_letters_to_calc) + 1; // range : from 1 to (input.pwlength - pwclass_max_index)
            result_string = result_string + this.generate_with_each_pwclass(input.pwclass[i], letters_to_calc);
            letter_count = letter_count - letters_to_calc;
        }
        result_string = result_string + this.generate_with_each_pwclass(input.pwclass[pwclass_max_index], letter_count);

        // shuffle letters
        return this.change_random_index_to_last(result_string);
    }
}

module.exports = pwgenerator;
