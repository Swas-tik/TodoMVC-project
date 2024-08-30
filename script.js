const todoInput = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add-btn');
const clearAll = document.querySelector('.clear-btn')
const main = document.querySelector('.main')
const todoItem = document.querySelector('.item-list span')

const todoList = [];
//Todo list
function renderList() {

  main.innerHTML=""
  
   const todos = todoFilter()

  for(i=0; i<todos.length; i++){
    const todo = todos[i]
  const ul = document.createElement('ul')
  ul.className= 'todo-element'
  ul.className = todo.completed ? 'completed': ''
  ul.setAttribute('data-index',i)
  
  ul.innerHTML=
  `
  <input class="toggle-item" type="checkbox" ${todo.completed ? 'checked' : ''}>
  <li> ${todo.name}</li>
  <p class='close-btn'>&#x2716;</p>
  `

  main.appendChild(ul)

}

 footerUpdate();
}

//add button
function addButton(name){
    todoList.push({name, completed: false})
    renderList();
}

addBtn.addEventListener('click', ()=>{
  if(todoInput.value.trim() !== ''){
      addButton(todoInput.value.trim())
      todoInput.value='';
  }
})

//close button
function closeBtn(index) {
  todoList.splice(index,1)  
  renderList()
}

main.addEventListener('click', (e)=>{
  const target = e.target
  if(target.classList.contains('toggle-item')){
    let index =target.closest('ul').getAttribute('data-index');
    toggleTodo(index)
  }else if(target.classList.contains('close-btn')){
    let index = target.closest('ul').getAttribute('data-index');
    closeBtn(index)
  }
})


function toggleTodo(index) {
  todoList[index].completed = !todoList[index].completed;
  renderList();
}

//filter function
function todoFilter() {
  const filter = getFilter();
  return todoList.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
  });
}
function getFilter() {
  const hash = window.location.hash;
  if (hash.includes('active')) return 'active';
  if (hash.includes('completed')) return 'completed';
  return 'all';
}

//footer
function footerUpdate(){
  let todoCount = 0
  let hasCompleted = false
  for(i=0; i< todoList.length; i++){
    if(!todoList[i].completed){
      todoCount++;
    }else{
      hasCompleted =true;
    }
    todoItem.textContent = todoCount;
    clearAll.style.display = hasCompleted ? 'block': 'none' 
  }
}

clearAll.addEventListener('click', closeBtn)
window.addEventListener('hashchange', renderList);
  renderList();