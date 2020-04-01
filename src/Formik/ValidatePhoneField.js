/* eslint-disable no-invalid-this */
import * as yup from 'yup';
import libphonenumber from 'google-libphonenumber';
const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
const alphaChars = /[a-zA-Z]+/;

// eslint-disable-next-line require-jsdoc
export default function validatePhoneField() {
  yup.addMethod(yup.string, 'validPhoneNumber', function(message) {
    return this.test('validPhoneNumber', message, function(value) {
      if (!value) return;
      if (value.match(alphaChars)) {
        throw this.createError({
          path: `${this.path}`,
        });
      }
      const number = phoneUtil.parseAndKeepRawInput(value, 'US');
      if (!phoneUtil.isValidNumber(number)) {
        throw this.createError({
          path: `${this.path}`,
        });
      }
      return true;
    });
  });
}
