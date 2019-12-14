import React from 'react';
import PropTypes from 'prop-types';
import {Formik, Form} from 'formik';

const FormikForm = ({children, ...otherProps}) => (
  <Formik validateOnChange={false} {...otherProps}>
    {formikProps => (
      <Form style={{width: '100%'}} noValidate method="post">
        {children}
      </Form>
    )}
  </Formik>
);

FormikForm.propTypes = {
  children: PropTypes.node.isRequired,
};
export default FormikForm;
