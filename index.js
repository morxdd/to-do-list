import { closeIcon } from "./svg-icons.js";

let inputValue = document.getElementById('todo-input');
let addButton = document.getElementById('add-btn');

// 監聽 inputValue 輸入事件，add的顏色顯示
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
        newTodoListItem.draggable = "true";


        // 定義checkbox
        let newCheckbox = document.createElement('button');
        newCheckbox.className = 'itemCheckbox';

        // 定義 X button按鈕 
        let newCloseButton = document.createElement('button')
        // 把button元素添加類名
        newCloseButton.className = 'close-btn';
        // button 插入SVG
        newCloseButton.innerHTML = closeIcon;

        // 去除輸入值的前後空白
        let trimmedInputValue = inputValue.value.trim();
        // 定義 text，把修剪過的輸入值拿來用
        let newItemText = document.createElement('div');
        newItemText.innerHTML = trimmedInputValue;
        newItemText.className = "item-text"

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
        addButton.classList.remove('active');

        // 監聽 close 按鈕
        newCloseButton.addEventListener('click', function () {
            newTodoListItem.remove();
        })
        // 監聽 checkbox
        // 定義一個模擬的 checkbox 狀態
        let isChecked = false;
        newCheckbox.addEventListener('click', function () {
            isChecked = !isChecked;
            if (isChecked) {
                newTodoListItem.classList.add('completed');
                newCheckbox.classList.add('checked');
            } else {
                newTodoListItem.classList.remove('completed');
                newCheckbox.classList.remove('checked');
            }
        })

        // 拖動功能
        // 監聽項目的開始拖動
        newTodoListItem.addEventListener('dragstart', function (e) {
            newTodoListItem.classList.add('dragging');
        })
        // 監聽項目的結束拖動
        newTodoListItem.addEventListener('dragend', function(e){
            newTodoListItem.classList.remove('dragging');
        })

        document.querySelectorAll('li').forEach(item => {
            item.addEventListener('dragover', function(e){
                // 允許放置
                e.preventDefault();
            
                const draggingItem = document.querySelector('.dragging');
                this.parentNode.insertBefore(draggingItem, this);
            })
        })

    }
})

// 監聽 input，鍵入Enter，執行點擊動作
inputValue.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.isComposing) {
        addButton.click();
    }
})




