document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("input-todo");
  const buttonTodo = document.getElementById("button-todo");
  const ulTodo = document.getElementById("ul-todo");
  const buttonDeleteAll = document.querySelector("#button-delete-all");

  let editMode = false;
  let editElement = null;

  buttonTodo.addEventListener("click", () => {
    const text = inputTodo.value;
    if (text.trim()) {
      createTodo(text);
      inputTodo.value = "";
      saveAllTodo();
    }
  });

  inputTodo.addEventListener("click", () => {
    if (editMode) {
      inputTodo.blur();
      alert("Please complete initial todo task edit.");
      return;
    }
  });

  //to delete all todos
  buttonDeleteAll.addEventListener("click", () => {
    if (confirm("are you sure? It will remove all todos.")) {
      deleteAllTodos();
    }
  });

  const deleteAllTodos = () => {
    ulTodo.innerHTML = "";
    saveAllTodo();
  };

  const createTodo = (task) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-start";
    li.innerHTML = `<span class="text-todo">${task}</span>
    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
      <button type="button" class="btn btn-danger">Edit</button>
      <button type="button" class="btn btn-warning">Delete</button>
    </div>`;
    ulTodo.appendChild(li);
  };

  ulTodo.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-warning")) {
      if (editMode) {
        alert("Please complete initial todo task edit.");
        return;
      }
      if (confirm("Are you sure? It will delete todo task permanently.")) {
        e.target.closest(".list-group-item").remove();
        saveAllTodo();
      }
    }
    const handleEditTodo = (e) => {
      const editDiv = document.querySelector(".edit-div");
      if (e.target.classList.contains("update")) {
        editElement.children[0].textContent = editDiv.children[0].value;
        editDiv.replaceWith(editElement);
        saveAllTodo();
        editMode = false;
      }
      if (e.target.classList.contains("cancle")) {
        editDiv.replaceWith(editElement);
        editMode = false;
      }
    };
    if (e.target.classList.contains("btn-danger")) {
      if (editMode) {
        alert("Please complete initial todo task edit.");
        return;
      }

      editMode = true;
      const li = e.target.closest(".list-group-item");
      const taskText = li.querySelector(".text-todo").textContent;
      const editDiv = document.createElement("div");
      editElement = li;

      editDiv.className = "input-group edit-div";
      editDiv.innerHTML = `<input type="text" class="form-control editInput" value="${taskText}"  >
                          <button class="btn btn-outline-secondary update" type="button" id="update">Update</button>
                          <button class="btn btn-outline-secondary cancle" type="button" id="cancle">Cancle</button>`;
      li.replaceWith(editDiv);
      editDiv.addEventListener("click", handleEditTodo);
    }
  });

  const saveAllTodo = () => {
    const allTodos = [...document.querySelectorAll(".text-todo")].map(
      (task) => task.textContent
    );

    localStorage.setItem("allTodos", JSON.stringify(allTodos));
  };

  const loadAllTodo = () => {
    const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
    ulTodo.innerHTML = "";
    allTodos.forEach((task) => createTodo(task));
  };

  loadAllTodo();

  //drag and drop
  let isDragging = false;
  let cursorCord = {
    x: null,
    y: null,
  };
  let initialDraggableCord = {
    todo: null,
    x: null,
    y: null,
    width: null,
  };
  ulTodo.addEventListener("mousedown", (e) => {
    const draggableLi = e.target;
    if (!draggableLi.classList.contains("list-group-item")) return;
    isDragging = !isDragging;
    initialDraggableCord.todo = draggableLi;
    draggableLi.classList.add('draggable')
    const draggableLiCord = draggableLi.getBoundingClientRect();
    initialDraggableCord.x = draggableLiCord.left;
    initialDraggableCord.y = draggableLiCord.top;
    initialDraggableCord.width = draggableLiCord.width;
    cursorCord.x = e.clientX;
    cursorCord.y = e.clientY;
  });
  ulTodo.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const distCursor = {
      x: e.clientX - cursorCord.x,
      y: e.clientY - cursorCord.y,
    };
    initialDraggableCord.todo.style.position = "fixed";
    initialDraggableCord.todo.style.width = initialDraggableCord.width + "px";
    initialDraggableCord.todo.style.zIndex = "999";
    initialDraggableCord.todo.style.top =
      initialDraggableCord.y + distCursor.y + "px";
  });
  ulTodo.addEventListener("mouseup", (e) => {
    if (isDragging) {
      initialDraggableCord.todo.remove();
      isDragging = !isDragging;
      cursorCord.x = null;
      cursorCord.y = null;
      const dropTarget = document.elementFromPoint(e.clientX, e.clientY);

      if (!dropTarget.classList.contains("list-group-item")) {
        //if its outside
        ulTodo.insertAdjacentElement("beforeend", initialDraggableCord.todo);
      } else {
        const dropTargetCords = dropTarget.getBoundingClientRect();
        const dropTargetHeight = dropTargetCords.height;
        const cursorDistOnTargetFromTop = e.clientY - dropTargetCords.top;
        if (cursorDistOnTargetFromTop < dropTargetHeight / 2) {
          dropTarget.insertAdjacentElement(
            "beforebegin",
            initialDraggableCord.todo
          );
        } else {
          dropTarget.insertAdjacentElement(
            "afterend",
            initialDraggableCord.todo
          );
        }
      }
      saveAllTodo();
      loadAllTodo();
      initialDraggableCord.todo.style.zIndex = "0";
    }
  });
});
