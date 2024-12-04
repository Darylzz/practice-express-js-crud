"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var todoList = [];
exports.postTodo = function (req, res) {
  var filter = todoList.filter(function (todo) {
    return todo.id === req.body.id;
  });
  if (filter.length > 0) {
    res.status(400).send({
      message: "this todo already exists",
      success: false
    });
  } else {
    todoList.push(req.body);
    res.status(200).send({
      message: "ok",
      success: true
    });
  }
};
exports.putTodo = function (req, res) {
  var filter = todoList.findIndex(function (todo) {
    return todo.id === req.params.id;
  });
  if (filter !== -1) {
    todoList[filter] = req.body;
    res.status(200).send({
      message: "ok",
      success: true,
      data: todoList[filter]
    });
  } else {
    res.status(404).send({
      message: "not found todo",
      success: false
    });
  }
};
exports.patchTodo = function (req, res) {
  var filter = todoList.findIndex(function (todo) {
    return todo.id === req.params.id;
  });
  if (filter !== -1) {
    todoList[filter] = _objectSpread(_objectSpread({}, todoList[filter]), req.body);
    res.status(200).send({
      message: "ok",
      success: true,
      data: todoList[filter]
    });
  } else {
    res.status(404).send({
      message: "not found todo",
      success: false
    });
  }
};
exports.deleteTodo = function (req, res) {
  var filter = todoList.findIndex(function (todo) {
    return todo.id === req.params.id;
  });
  if (filter !== -1) {
    todoList.splice(filter, 1);
    res.status(200).send({
      message: "ok",
      success: true
    });
  } else {
    res.status(404).send({
      message: "not found todo",
      success: false
    });
  }
};
exports.getTodo = function (req, res) {
  res.status(200).send({
    message: "ok",
    success: true,
    data: todoList
  });
};
exports.getTodoById = function (req, res) {
  var filter = todoList.find(function (todo) {
    return todo.id === req.params.id;
  });
  if (filter) {
    res.status(200).send({
      message: "ok",
      success: true,
      data: filter
    });
  } else {
    res.status(404).send({
      message: "not found todo",
      success: false
    });
  }
};
exports.postBulkTodo = function (req, res) {
  if (req.body.length > 1) {
    var idOfData = todoList.map(function (todo) {
      return todo.id;
    });
    var idOfReq = req.body.map(function (todo) {
      return todo.id;
    });
    var duplicateId = idOfData.filter(function (id) {
      return idOfReq.includes(id);
    });
    if (duplicateId.length > 0) {
      res.status(400).send({
        message: "todo already exists",
        success: false
      });
    } else {
      todoList = todoList.length > 0 ? [].concat(_toConsumableArray(todoList), _toConsumableArray(req.body)) : req.body;
      res.status(200).send({
        message: "ok",
        success: true,
        data: req.body
      });
    }
  } else {
    var filter = todoList.filter(function (todo) {
      return todo.id === req.body.id;
    });
    if (filter.length > 0) {
      res.status(400).send({
        message: "todo already exists",
        success: false
      });
    } else {
      todoList.push(req.body);
      res.status(200).send({
        message: "ok",
        success: true
      });
    }
  }
};
exports.multipleDeleteTodo = function (req, res) {
  var listIds = req.query.ids.split(",");
  if (listIds.length > 0) {
    var idOfData = todoList.map(function (todo) {
      return todo.id;
    });
    var excludeIds = listIds.filter(function (id) {
      return !idOfData.includes(id);
    });
    if (listIds.length > 1) {
      if (excludeIds.length > 0) {
        res.status(400).send({
          message: "some todo not has in list",
          success: false
        });
      } else {
        todoList = todoList.filter(function (todo) {
          return !listIds.includes(todo.id);
        });
        res.status(200).send({
          message: "ok",
          success: true,
          data: todoList
        });
      }
    } else {
      var findIndex = todoList.findIndex(function (todo) {
        return todo.id === listIds[0];
      });
      todoList.splice(findIndex, 1);
      res.status(200).send({
        message: "ok",
        success: true,
        data: todoList
      });
    }
  } else {
    res.status(400).send({
      message: "bad request",
      success: false
    });
  }
};