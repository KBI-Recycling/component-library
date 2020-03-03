/* eslint-disable no-invalid-this */
import * as Yup from 'yup';
// eslint-disable-next-line require-jsdoc
export default function validateAutoObject() {
  Yup.addMethod(Yup.object, 'exists', function(message) {
    return this.test('not empty string', message, function(value) {
      if (!value && value !== null) {
        throw this.createError({
          path: `${this.path}`,
        });
      }
      return true;
    });
  });
}
