exports.postgresConfig = function (database) {
  var postgresString = 'postgres://root:root@localhost:5432/' + database;
  return postgresString;
};
