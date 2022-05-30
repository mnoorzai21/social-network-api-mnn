const { connect, connection } = require("mongoose");

connect("mongodb://localhost/socialNetworkApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
