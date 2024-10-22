import { closeIcon } from "./svg-icons.js";

let inputValue = document.getElementById('todo-input');
let addButton = document.getElementById('add-btn');

// 定義 空陣列 用來存放待辦事項
let todos = JSON.parse(localStorage.getItem('todos')) || [];

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

        // 創建新待辦事項物件
        let newTodo = {
            text: trimmedInputValue,
            completed: false // 初始狀態未完成
        };

        // 將待辦事項加入陣列
        todos.push(newTodo);
        // 將陣列轉換為字串，並存入 localStorage
        localStorage.setItem('todos', JSON.stringify(todos));


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
            let todoIndex = todos.findIndex(todo => todo.text === trimmedInputValue)
            // 從陣列中刪除
            todos.splice(todoIndex, 1);
            // 更新 localStorage
            localStorage.setItem('todos', JSON.stringify(todos));


            newTodoListItem.remove();
        })
        // 監聽 checkbox
        // 定義一個模擬的 checkbox 狀態
        // let isChecked = false; //這是臨時變數 改為使用localStoage 的物件
        newCheckbox.addEventListener('click', function () {
            // 尋找該項目在將存入 localStorage 中的索引
            let todoIndex = todos.findIndex(todo => todo.text === trimmedInputValue);

            // alert(todoIndex)
            // 切換 completed 狀態
            todos[todoIndex].completed = !todos[todoIndex].completed;
            // 更新 localStorage
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todos[todoIndex].completed) {
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
        });

        // 監聽項目的結束拖動
        newTodoListItem.addEventListener('dragend', function (e) {
            newTodoListItem.classList.remove('dragging');
            updateTodosOrder(); // 更新todos陣列和localStorage

            function updateTodosOrder() {
                const todoListItems = document.querySelectorAll('li'); // 獲取所有 li 元素
                const newTodos = []; // 用來存放重新排序後的 todos

                todoListItems.forEach(item => {
                    const textElement = item.querySelector('.item-text');
                    if (textElement) {
                        // console.log('找到 item-text: ', textElement.innerText);
                        const text = textElement.innerText; // 獲取每個項目的文字
                        const matchedTodo = todos.find(todo => todo.text === text); // 找到對應的待辦事項
                        // console.log(matchedTodo);
                        
                        newTodos.push(matchedTodo); // 按新的順序推入新的陣列
                    } else {
                        console.warn('找不到 item-text，可能有問題的 li 元素: ', item);
                    }
                });

                // 更新todos陣列和localStorage
                todos = newTodos;
                localStorage.setItem('todos', JSON.stringify(todos)); // 更新 localStorage
            }
        });
        // 為新增的 li 添加 dragover 事件
        newTodoListItem.addEventListener('dragover', function (e) {
            // 允許放置
            e.preventDefault();

            const draggingItem = document.querySelector('.dragging');
            // 獲取父元素 ul
            const todoList = this.parentNode;
            const isLastItem = this === todoList.lastChild;

            if (isLastItem) {
                todoList.appendChild(draggingItem)
            } else {
                this.parentNode.insertBefore(draggingItem, this);
            }
        })


    }
})

// 監聽 input，鍵入Enter，執行點擊動作
inputValue.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.isComposing) {
        addButton.click();
    }
})

// 讀取並顯示待辦事項
window.addEventListener('DOMContentLoaded', function () {
    let todoList = document.getElementById('todo-list');
    
    todos.forEach(todo => {
        // 定義 li
        let newTodoListItem = document.createElement('li');
        newTodoListItem.draggable = "true";

        // 定義 checkbox
        let newCheckbox = document.createElement('button');
        newCheckbox.className = 'itemCheckbox';

        // 定義 X button 按鈕 
        let newCloseButton = document.createElement('button');
        newCloseButton.className = 'close-btn';
        newCloseButton.innerHTML = closeIcon;

        // 定義 text，把 todo.text 拿來用
        let newItemText = document.createElement('div');
        newItemText.innerHTML = todo.text;
        newItemText.className = "item-text";

        // li 的內容加入 checkbox, text, close button
        newTodoListItem.appendChild(newCheckbox);
        newTodoListItem.appendChild(newItemText);
        newTodoListItem.appendChild(newCloseButton);

        // 如果已完成，增加對應樣式
        if (todo.completed) {
            newTodoListItem.classList.add('completed');
            newCheckbox.classList.add('checked');
        }

        // 將 li 加入到 ul
        todoList.appendChild(newTodoListItem);

        // 監聽 close 按鈕
        newCloseButton.addEventListener('click', function () {
            let todoIndex = todos.findIndex(t => t.text === todo.text);
            todos.splice(todoIndex, 1);  // 刪除對應的項目
            localStorage.setItem('todos', JSON.stringify(todos));  // 更新 localStorage
            newTodoListItem.remove();  // 從 UI 上移除項目
        });

        // 監聽 checkbox
        newCheckbox.addEventListener('click', function () {
            let todoIndex = todos.findIndex(t => t.text === todo.text);
            todos[todoIndex].completed = !todos[todoIndex].completed;  // 切換完成狀態
            localStorage.setItem('todos', JSON.stringify(todos));  // 更新 localStorage

            // 更新樣式
            if (todos[todoIndex].completed) {
                newTodoListItem.classList.add('completed');
                newCheckbox.classList.add('checked');
            } else {
                newTodoListItem.classList.remove('completed');
                newCheckbox.classList.remove('checked');
            }
        });

        // 拖動功能（可以重用你現有的拖動邏輯）
        newTodoListItem.addEventListener('dragstart', function (e) {
            newTodoListItem.classList.add('dragging');
        });

        newTodoListItem.addEventListener('dragend', function (e) {
            newTodoListItem.classList.remove('dragging');
            updateTodosOrder(); // 更新 todos 陣列和 localStorage
        });

        newTodoListItem.addEventListener('dragover', function (e) {
            e.preventDefault();
            const draggingItem = document.querySelector('.dragging');
            const isLastItem = this === todoList.lastChild;
            if (isLastItem) {
                todoList.appendChild(draggingItem);
            } else {
                this.parentNode.insertBefore(draggingItem, this);
            }
        });
    });
});



