let inputValue = document.getElementById('todo-input');
let addButton = document.getElementById('add-btn');

addButton.addEventListener('click', function () {
    if (inputValue.value !== '') {

        console.log(inputValue.value);
        // 定義 li
        let newTodoListItem = document.createElement('li');


        // 定義checkbox
        let newCheckbox = document.createElement('input');
        newCheckbox.type = 'checkbox';

        // 定義 X button按鈕 
        let newCloseButton = document.createElement('button')
        // 把button元素添加類名
        newCloseButton.className = 'close-btn';



        // 定義 text
        let newItemText = document.createTextNode(inputValue.value);


        // li的內容加入checkbox text button
        newTodoListItem.appendChild(newCheckbox);
        newTodoListItem.appendChild(newItemText);
        newTodoListItem.appendChild(newCloseButton);

        // 抓取 ul 
        let todoList = document.getElementById('todo-list');
        // 新增剛剛建立好的 li
        todoList.appendChild(newTodoListItem);
        // 清空輸入框
        inputValue.value = '';

        newCloseButton.addEventListener('click', function () {
            // alert('刪除：' + newTodoListItem.innerText );
            newTodoListItem.remove();

        })
    }
})

