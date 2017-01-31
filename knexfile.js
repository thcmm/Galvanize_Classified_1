// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/classified_dev'},
  test: {
    client: 'pg',
    connection: 'postgres://localhost/classified_test'},
  production: { },
};
