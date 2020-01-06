import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Formik, Form} from 'formik';

/**
 * A component that combines Formik's <a href='https://jaredpalmer.com/formik/docs/api/formik' target='_blank'>Formik</a> and
 * <a href='https://jaredpalmer.com/formik/docs/api/form' target='_blank'>Form</a> components with preset KBI boilerplate.
 * Commonly used Formik props are described below in the PROPS & METHODS section. Less commonly used props can also be passed;
 * see <a href='https://jaredpalmer.com/formik/docs/api/formik' target="_blank">Formik API</a> for details.
 *
 * @version 1.0.0
 * @author [Gerry Blackmon](https://github.com/gblackiv)
 * @author [Daniel Kinsbursky](https://github.com/kbi-daniel)
 * @author [Chris Voss](https://github.com/ChrisJVoss)
 * @param {object} props Properties passed down from parent component.
 * @return {JSX} A react JSX component.
 * @public
 *
 */
const FormikForm = (props) => {
  const {children, initialErrors, initialStatus, initialTouched, initialValues, onSubmit, validationSchema, ...otherProps} = props;
  const formikProps = useMemo(() => ({
    initialErrors,
    initialStatus,
    initialTouched,
    initialValues,
    onSubmit,
    validateOnChange: false,
    validationSchema,
    ...otherProps,
  }), [initialErrors, initialStatus, initialTouched, initialValues, onSubmit, otherProps, validationSchema]);
  return (
    <Formik {...formikProps} {...otherProps}>
      {formikProps => (
        <Form style={{width: '100%'}} noValidate method="post">
          {children && children({...formikProps})}
        </Form>
      )}
    </Formik>
  );
};

FormikForm.propTypes = {
  /** All JSX passed down through FormikForm tags (e.g. `<FormikForm>{children}</FormikForm>`). */
  children: PropTypes.func.isRequired,
  /** Initial field errors of the form, Formik will make these values available to render methods component as `errors`. */
  initialErrors: PropTypes.object,
  /** An arbitrary value for the initial `status` of the form. If the form is reset, this value will be restored. */
  initialStatus: PropTypes.object,
  /** Initial visitied fields of the form, Formik will make these values available to render methods component as `touched`. */
  initialTouched: PropTypes.object,
  /** Initial field values of the form, Formik will make these values available to render methods component as `values`. */
  initialValues: PropTypes.object,
  /** Your form submission handler. It is passed your forms values and the "FormikBag". ***Signature:*** `(values, formikBag) => {}` */
  onSubmit: PropTypes.func,
  /** A <a href='https://github.com/jquense/yup'>Yup schema</a> or a function that returns a Yup schema. This is used for validation. Errors are mapped by key to the inner component's `errors`. Its keys should match those of `values`. */ //eslint-disable-line
  validationSchema: PropTypes.func,
};
export default FormikForm;
