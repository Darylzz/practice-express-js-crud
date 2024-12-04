"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _todoController = _interopRequireDefault(require("../controller/todoController.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/", _todoController["default"].postTodo);
router.put("/:id", _todoController["default"].putTodo);
router.patch("/:id", _todoController["default"].patchTodo);
router["delete"]("/:id", _todoController["default"].deleteTodo);
router.get("/", _todoController["default"].getTodo);
router.get("/:id", _todoController["default"].getTodoById);
router.post("/bulk", _todoController["default"].postBulkTodo);
router["delete"]("/", _todoController["default"].multipleDeleteTodo);
var _default = exports["default"] = router;