

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const GETButton = document.querySelector(".GET-button");
const orderList = document.querySelector(".list-group");
const inputFieldPOST = document.querySelector(".input-field-post");

const getRandomIndex = () => {
  return Math.floor(Math.random() * 200) + 1;
};
const toastMessage = (status, message, data) => {
  const div = document.createElement("div");

  div.innerHTML = `
    <h2> Status: ${status}</h2>
    <hr>
    ${message ? `<span>Message: ${message}</span>` : ""}
    <br/>
    ${data && Object.keys(data).length !== 0? `
        <span>Id: ${data.id}</span>
        <br/>
        <span>Title: ${data.title}</span>
    `: ""
    }
    ${status === 200 && Object.keys(data).length === 0? `<span> Selected todo is deleted!!</span>`: ""}
`;

  Toastify({
    node: div,
    duration: 3000,
    backgroundColor: status === 200 || status === 201 ? "green" : "red",
  }).showToast();
};

const createTodoLi = (todo) => {
  const li = document.createElement("li");
  li.className =
    "list-group-item d-flex justify-content-between align-items-start";
  li.id = todo.id;
  li.innerHTML = `
            <div class="ms-2 me-auto " >
                <div class="fw-bold">Todo Title ID:${todo.id}</div>
                <span class="todo-text">${todo.title}</span>
            </div>
            <div class="d-flex justify-content-end align-items-center gap-3">
                <span class="badge text-bg-${todo.completed ? "success" : "danger"} rounded-pill">
                ${todo.completed ? "Completed" : "Incomplete"}
                </span>
                <button type="button" class="btn btn-primary UPDATE">UPDATE</button>
                <button type="button" class="btn btn-danger DELETE">DELETE</button>
            </div>
            `;
  return li;
};

const getTodos = () => {
  axiosInstance.get("/todos").then((res) => {
    const wholeData = res.data;
    orderList.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const index = getRandomIndex();
      const li = createTodoLi(wholeData[index]);
      orderList.append(li);
    }
  });
};
GETButton.addEventListener("click", getTodos);
const updatingInfo = {
  status: false,
  target: null,
};


const updatehandler = (e)=>{
   
        if (updatingInfo.status) {
          alert("Complete initiated updating!");
          return;
        }
        
        console.log("THis is hcoming");
        const targetLI = e.target.closest(".list-group-item");
    
        const targetTodoText = targetLI.querySelector(".todo-text").textContent;
        updatingInfo.status = true;
        updatingInfo.target = targetLI;
    
        const updateField = document.createElement("div");
        updateField.innerHTML = `
        <div class="input-group mb-3 update-div" id=${targetLI.id}>
            <input type="text" class="form-control updated-text" style="width:60%"  value="${targetTodoText}">
                <select class="form-select " id="validationCustom04" required>
                    <option selected disabled value="">Status</option>
                    <option value="Incomplete">Incomplete</option>
                    <option value="Complete">Complete</option>
                </select>
            <button type="button" class="btn btn-warning SAVE-button">SAVE</button>
        </div>
            `;
        targetLI.replaceWith(updateField);
        const SAVEButton = updateField.querySelector(".SAVE-button");
        SAVEButton.addEventListener("click", (e) => {
          const updateField = e.target.closest(".update-div");
          const id = updateField.id;
          const text = updateField.querySelector(".updated-text").value;
          const status = updateField.querySelector(".form-select").value;
          axiosInstance
            .put(`/todos/${id}`, {
              title: text,
              completed: status === "Complete" ? true : false,
            })
            .then((res) => {
              toastMessage(res.status, res.message, res.data);
              const newLiInfo = {
                id: res.data.id,
                title: res.data.title,
                completed: res.data.completed,
              };
              const newLi = createTodoLi(newLiInfo);
              updateField.replaceWith(newLi);
            })
            .catch((err) => {
              toastMessage(err.status, err.message);
              updateField.replaceWith(updatingInfo.target);
            });
          updatingInfo.status = false;
        });
}


const deletehandler = (e)=>{
    if (updatingInfo.status) {
        alert("Complete initiated updating!");
        return;
      }
      if (confirm("Are you sure ?")) {
        const targetDiv = e.target.closest(".list-group-item");
        const id = targetDiv.id;
  
        axiosInstance
          .delete(`/todos/${id}`)
          .then((res) => {
            targetDiv.remove();
            toastMessage(res.status, res.message, res.data);
          })
          .catch((err) => {
            toastMessage(err.status, err.message);
          });
      }
}
orderList.addEventListener("click", (e) => {
    if (e.target.classList.contains("UPDATE")) {
        updatehandler(e);
    }

  if (e.target.classList.contains("DELETE")) {
    deletehandler(e);
  }
});

inputFieldPOST.addEventListener("click", (e) => {
  if (updatingInfo.status) {
    inputFieldPOST.querySelector(".updated-text").blur();
    alert("Complete initiated updating!");
    return;
  }
  if (e.target.classList.contains("SAVE-button")) {
    const title = inputFieldPOST.querySelector(".updated-text").value;
    const status = inputFieldPOST.querySelector(".form-select").value;
    axiosInstance
      .post("/todos", {
        title: title,
        completed: status === "Complete" ? 1 : 0,
      })
      .then((res) => {
        console.log(res);
        const newLi = createTodoLi({
          id: res.data.id,
          title: res.data.title,
          completed: res.data.completed,
        });
        orderList.append(newLi);
        toastMessage(res.status, res.message, res.data);
      })
      .catch((err) => {
        toastMessage(err.status, err.message);
      });
    inputFieldPOST.querySelector(".updated-text").value = "";
  }
  if(e.target.classList.contains("DELETE-button")){
    if(confirm("Are you sure? It will delete all todos")){
      axiosInstance.delete('/todos/*')
      .then((res)=>{
        toastMessage(res.status,res.message,res.data);
        orderList.innerHTML = ''
      })
      .catch((err)=>{
        toastMessage(err.status,err.message);
      });
    }

  }

});


