document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const itemsLeft = document.getElementById('items-left');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all';

    // Render initial todos
    renderTodos();

    // Add new task
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            const newTodo = {
                id: Date.now().toString(),
                text: text,
                completed: false
            };
            todos.push(newTodo);
            saveAndRender();
            todoInput.value = '';
        }
    });

    // Handle checkbox changes (toggle completion)
    todoList.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            const item = e.target.closest('.todo-item');
            if (!item) return;
            const id = item.dataset.id;
            todos = todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed: e.target.checked };
                }
                return todo;
            });
            saveAndRender();
        }
    });

    // Handle list clicks (delete)
    todoList.addEventListener('click', (e) => {
        const item = e.target.closest('.todo-item');
        if (!item) return;

        const id = item.dataset.id;

        if (e.target.closest('.delete-btn')) {
            // Delete task
            item.classList.add('fade-out');
            setTimeout(() => {
                todos = todos.filter(todo => todo.id !== id);
                saveAndRender();
            }, 300); // match animation duration
        }
    });

    // Clear completed tasks
    clearCompletedBtn.addEventListener('click', () => {
        todos = todos.filter(todo => !todo.completed);
        saveAndRender();
    });

    // Handle filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTodos();
        });
    });

    // Render logic
    function renderTodos() {
        todoList.innerHTML = '';
        
        let filteredTodos = todos;
        if (currentFilter === 'active') {
            filteredTodos = todos.filter(t => !t.completed);
        } else if (currentFilter === 'completed') {
            filteredTodos = todos.filter(t => t.completed);
        }

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.dataset.id = todo.id;
            
            li.innerHTML = `
                <label class="checkbox-container">
                    <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                    <span class="checkmark"></span>
                </label>
                <span class="task-text">${escapeHTML(todo.text)}</span>
                <button class="delete-btn" aria-label="Delete task">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            `;
            
            todoList.appendChild(li);
        });

        updateStats();
    }

    // Save to localStorage and re-render
    function saveAndRender() {
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    // Update items left count
    function updateStats() {
        const activeCount = todos.filter(t => !t.completed).length;
        itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
    }

    // Utility to prevent XSS
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
});
