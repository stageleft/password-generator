password-generator.js
====

`password-generator.js` generates a random password string.

This generates password that must contain characters from multiple character classes.

## Example

Sample case: generating a 32-character password containing 1 number, 1 uppercase letter, and 1 lowercase letter.

Rule description:
```json
{
    "pwclass": ["0123456789",
              "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
              "abcdefghijklmnopqrstuvwxyz"],
    "pwlength": 32
}
```

Sample result:
```
CxgtoGQua7uwZJCnj7raSyMG8yttduuT
```

## Rule description

JSON object with 2 parameter.

* pwclass is definition of character classes.
  * pwclass is array of string.
  * Each string is a character class and must contain at least 1 character and cannot exceed 255 characters. Otherwise, rewrite password-generator.js and test it.
  * A password will be generated only from the characters defined in these strings.
  * At least 1 letter of password is selected from each string.
* pwlength is length of password.
  * pwlength is integer.
  * pwlength should be equal or larger than counts of character classes.
  * pwlength should be smaller than 65536. Otherwise, rewrite password-generator.js and test it.

## Usage in Web

See sample_html/password-generator.html as sample.

* include password-generator.js in html file.
```html
<script type="text/javascript" src="../src/password-generator.js"></script>
```
* define pwgenerator() object. 
```html
<script type="text/javascript">
  let password_generator = new pwgenerator();
</script>
```
* define password generation rule.
```html
<script type="text/javascript">
  let number_ALPHABET_alphabet_32 = {
    "pwclass": ["0123456789",
              "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
              "abcdefghijklmnopqrstuvwxyz"],
    "pwlength": 32
  };
</script>
```
* call object.generate() with rule of password.
```html
<script type="text/javascript">
  document.getElementById("result").innerText = password_generator.generate(pwrule);
</script>
```

## (T.B.D.) Usage in Node.js

## (T.B.D.) Specification Detail

## Reference

* [MDM Web Docs](https://developer.mozilla.org/ja/)
  * article of [Crypto.getRandomValues()](https://developer.mozilla.org/ja/docs/Web/API/Crypto/getRandomValues)

## License

[Mozilla Public License 2.0](https://github.com/stageleft/password-generator/blob/main/LICENSE)

## Author

[SUGANO Shogo](https://github.com/stageleft)
