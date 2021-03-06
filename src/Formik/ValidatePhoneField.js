/* eslint-disable no-invalid-this */
import * as yup from 'yup';
import libphonenumber from 'google-libphonenumber';
const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

// eslint-disable-next-line require-jsdoc
export default function validatePhoneField() {
  yup.addMethod(yup.string, 'validPhoneNumber', function(message) {
    return this.test('validPhoneNumber', message, function(value) {
      if (!value) return yup.string();
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
