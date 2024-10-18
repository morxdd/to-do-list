let inputValue = document.getElementById('todo-input');
let addButton = document.getElementById('add-btn');

addButton.addEventListener('click', function () {
    console.log(inputValue.value);
    let newTodoListItem = document.createElement('li');
    // 定義 X 按鈕 
    let newCloseButton = document.createElement('button')
    // 把button元素添加類名
    newCloseButton.className = 'close-btn';

    // li 的內容寫入 inputValue 的 value
    newTodoListItem.innerText = inputValue.value;

    // 在 li 中加入剛剛定義的X按鈕
    newTodoListItem.appendChild(newCloseButton);

    // 抓取 ul 
    let todoList = document.getElementById('todo-list');
    // 新增剛剛建立好的 li
    todoList.appendChild(newTodoListItem);
    // 清空輸入框
    inputValue.value = '';

    newCloseButton.addEventListener('click', function () {
        alert('刪除：' + newTodoListItem.innerText );
        newTodoListItem.remove();

    })
})

