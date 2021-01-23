const todoForm = document.querySelector(".todoForm");
const todoInput = todoForm.querySelector(".js-todo");
const pendingList = document.querySelector(".pendingList");
const finishedList = document.querySelector(".finishedList");
//DOM 준비

const Pkey = "PENDING";
const Fkey = "FINISHED";     
let pendingTasks = [];
let finishedTasks = [];
//변수 만들기

function savePending(){
  localStorage.setItem(Pkey, JSON.stringify(pendingTasks));
}
function saveFinished(){
  localStorage.setItem(Fkey, JSON.stringify(finishedTasks));
}
function filterFn(){
    return pendingTasks.id !== 1;
}
//로컬에 리스트 표시 및 삭제

function paintPending(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const doneBtn = document.createElement("button");
    const span = document.createElement("span");
    delBtn.innerText = "❌";
    doneBtn.innerText = "✅";
    span.innerHTML = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(doneBtn);
    pendingList.appendChild(li);
    const newId = pendingTasks.length + 1;
    li.id = newId;
    const todoObj = {
        text: text,
        id: newId 
    };
    pendingTasks.push(todoObj);
    delBtn.id = newId;
    doneBtn.id = newId;
    delBtn.addEventListener("click", delPending);
    doneBtn.addEventListener("click", move2Finished);
    savePending();
}
function paintFinished(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const backBtn = document.createElement("button");
    const span = document.createElement("span");
    delBtn.innerText = "❌";
    backBtn.innerText = "⏪";
    span.innerHTML = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(backBtn);
    finishedList.appendChild(li);
    const newId = finishedTasks.length + 1;
    li.id = newId;
    const doneObj = {
        text: text,
        id: newId 
    };
    finishedTasks.push(doneObj);
    delBtn.id = newId;
    backBtn.id = newId;
    delBtn.addEventListener("click", delFinished);
    backBtn.addEventListener("click", move2Pending);
    saveFinished();
}
//html에 리스트 표시, 삭제, 이동

function delPending(event){
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    const cleanPending = pendingTasks.filter(function(pendingTasks){
        return pendingTasks.id !== parseInt(li.id);
    });
    pendingTasks = cleanPending;
    savePending();
}
function delFinished(event){
    const btn = event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);
    const cleanFinished = finishedTasks.filter(function(finishedTasks){
        return finishedTasks.id !== parseInt(li.id);
    });
    finishedTasks = cleanFinished;
    saveFinished();
}
//pending, finished 리스트 삭제

function move2Finished(event){
    const btn = event.target;
    const li = btn.parentNode;
    const text = li.children[0].innerHTML;
    paintFinished(text);
    delPending(event);
}
function move2Pending(event){
    const btn = event.target;
    const li = btn.parentNode;
    const text = li.children[0].innerHTML;
    paintPending(text);
    delFinished(event);
}
//pending, finished 리스트간 이동

function loadPending(){
    const realSavePending = localStorage.getItem(Pkey);
    if (realSavePending !== null){
        const parsedPending = JSON.parse(realSavePending);
        parsedPending.forEach(function(task){
            paintPending(task.text);
        });
    }
}
function loadFinished(){
    const realSaveFinished = localStorage.getItem(Fkey);
    if (realSaveFinished !== null){
        const parsedFinished = JSON.parse(realSaveFinished);
        parsedFinished.forEach(function(done){
            paintFinished(done.text);
        });
    }
}
//로컬에 저장!!

function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintPending(currentValue);
    todoInput.value = "";
}
//제출시 생기는 일 들

function init(){
    loadPending();
    loadFinished();
    todoForm.addEventListener("submit", handleSubmit);
}

init();
//끝!!!!!!!!!!