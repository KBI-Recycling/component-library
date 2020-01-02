module.exports = {
  title: 'KBI Components',
  version: '1.0.0',
  pagePerSection: true,
  sortProps: props => {
    const required = props.filter(prop => prop.required);
    const notRequired = props.filter(prop => !prop.required);
    return [...required, ...notRequired];
  },
  sections: [
    {
      name: 'Test Components',
      components: 'src/TestComponent/**/*.js',
    },
    {
      name: 'Formik Components',
      components: 'src/Formik/**/*.js',
    },
  ],
};
