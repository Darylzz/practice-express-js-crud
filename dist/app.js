"use strict";

var _express = _interopRequireDefault(require("express"));
var _todoRoute = _interopRequireDefault(require("./routes/todoRoute.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use("/todo", _todoRoute["default"]);
app.listen(3000, function () {
  console.log("Server running on port 3000", "http://localhost:3000");
});