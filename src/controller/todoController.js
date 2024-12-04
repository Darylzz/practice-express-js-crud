let todoList = [];

exports.postTodo = (req, res) => {
  const filter = todoList.filter((todo) => todo.id === req.body.id);
  if (filter.length > 0) {
    res.status(400).send({ message: "this todo already exists", success: false });
  } else {
    todoList.push(req.body);
    res.status(200).send({ message: "ok", success: true });
  }
};

exports.putTodo = (req, res) => {
  const filter = todoList.findIndex((todo) => todo.id === req.params.id);
  if (filter !== -1) {
    todoList[filter] = req.body;
    res.status(200).send({ message: "ok", success: true, data: todoList[filter] });
  } else {
    res.status(404).send({ message: "not found todo", success: false });
  }
};

exports.patchTodo = (req, res) => {
  const filter = todoList.findIndex((todo) => todo.id === req.params.id);
  if (filter !== -1) {
    todoList[filter] = { ...todoList[filter], ...req.body };
    res.status(200).send({ message: "ok", success: true, data: todoList[filter] });
  } else {
    res.status(404).send({ message: "not found todo", success: false });
  }
};

exports.deleteTodo = (req, res) => {
  const filter = todoList.findIndex((todo) => todo.id === req.params.id);
  if (filter !== -1) {
    todoList.splice(filter, 1);
    res.status(200).send({ message: "ok", success: true });
  } else {
    res.status(404).send({ message: "not found todo", success: false });
  }
};

exports.getTodo = (req, res) => {
  res.status(200).send({ message: "ok", success: true, data: todoList });
};

exports.getTodoById = (req, res) => {
  const filter = todoList.find((todo) => todo.id === req.params.id);
  if (filter) {
    res.status(200).send({ message: "ok", success: true, data: filter });
  } else {
    res.status(404).send({ message: "not found todo", success: false });
  }
};

exports.postBulkTodo = (req, res) => {
  if (req.body.length > 1) {
    const idOfData = todoList.map((todo) => todo.id);
    const idOfReq = req.body.map((todo) => todo.id);
    const duplicateId = idOfData.filter((id) => idOfReq.includes(id));
    if (duplicateId.length > 0) {
      res.status(400).send({ message: "todo already exists", success: false });
    } else {
      todoList = todoList.length > 0 ? [...todoList, ...req.body] : req.body;
      res.status(200).send({ message: "ok", success: true, data: req.body });
    }
  } else {
    const filter = todoList.filter((todo) => todo.id === req.body.id);
    if (filter.length > 0) {
      res.status(400).send({ message: "todo already exists", success: false });
    } else {
      todoList.push(req.body);
      res.status(200).send({ message: "ok", success: true });
    }
  }
};

exports.multipleDeleteTodo = (req, res) => {
  const listIds = req.query.ids.split(",");
  if (listIds.length > 0) {
    const idOfData = todoList.map((todo) => todo.id);
    const excludeIds = listIds.filter((id) => !idOfData.includes(id));
    if (listIds.length > 1) {
      if (excludeIds.length > 0) {
        res.status(400).send({ message: "some todo not has in list", success: false });
      } else {
        todoList = todoList.filter((todo) => !listIds.includes(todo.id));
        res.status(200).send({ message: "ok", success: true, data: todoList });
      }
    } else {
      const findIndex = todoList.findIndex((todo) => todo.id === listIds[0]);
      todoList.splice(findIndex, 1);
      res.status(200).send({ message: "ok", success: true, data: todoList });
    }
  } else {
    res.status(400).send({ message: "bad request", success: false });
  }
};
