let inputValue =document.getElementById('todo-input');
let addButton = document.getElementById('add-btn');

addButton.addEventListener('click',function(){
    console.log(inputValue.value);
    let newTodoListItem = document.createElement('li');
    // li 的內容寫入 inputValue 的 value
    newTodoListItem.innerText = inputValue.value;

    // 抓取 ul 新增剛剛建立好的 li
    let todoList = document.getElementById('todo-list');
    todoList.appendChild(newTodoListItem);
    inputValue.value = '';
})
