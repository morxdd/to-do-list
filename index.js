import { closeIcon } from "./svg-icons.js";

let inputValue = document.getElementById('todo-input');
let addButton = document.getElementById('add-btn');

// 監聽 inputValue 輸入事件
inputValue.addEventListener('input', function () {
    if (inputValue.value.trim() !== '') {
        addButton.classList.add('active');
    } else {
        addButton.classList.remove('active');
    }
})


// addButton 監聽點擊事件
addButton.addEventListener('click', function () {
    if (inputValue.value.trim() !== '') {

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
        // button 插入SVG
        newCloseButton.innerHTML = closeIcon;

        // 去除輸入值的前後空白
        let trimmedInputValue = inputValue.value.trim();
        // 定義 text，把修剪過的輸入值拿來用
        let newItemText = document.createTextNode(trimmedInputValue);


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
        // 監聽 checkbox
        newCheckbox.addEventListener('change', function () {
            if (newCheckbox.checked) {
                newTodoListItem.classList.add('completed')
            } else {
                newTodoListItem.classList.remove('completed')
            }
        })
    }
})



