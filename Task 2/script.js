document.addEventListener('DOMContentLoaded', () => {

    /* ====================================================
       SECTION 1: Form Validation
       ==================================================== */
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formSuccess = document.getElementById('formSuccess');

    // Email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent page reload
        
        // Reset state
        let isValid = true;
        formSuccess.classList.add('hidden');
        
        // Validate Name
        if (nameInput.value.trim() === '') {
            setError(nameInput);
            isValid = false;
        } else {
            removeError(nameInput);
        }

        // Validate Email
        if (emailInput.value.trim() === '' || !emailRegex.test(emailInput.value.trim())) {
            setError(emailInput);
            isValid = false;
        } else {
            removeError(emailInput);
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            setError(messageInput);
            isValid = false;
        } else {
            removeError(messageInput);
        }

        // If valid, show success message
        if (isValid) {
            formSuccess.classList.remove('hidden');
            contactForm.reset();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                formSuccess.classList.add('hidden');
            }, 3000);
        }
    });

    function setError(inputElement) {
        // Add error class to the parent form-group
        inputElement.closest('.form-group').classList.add('error');
    }

    function removeError(inputElement) {
        inputElement.closest('.form-group').classList.remove('error');
    }

    // Real-time validation removal on input
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                removeError(this);
            }
        });
    });


    /* ====================================================
       SECTION 2: Dynamic To-Do List (DOM Manipulation)
       ==================================================== */
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    const clearAllBtn = document.getElementById('clearAllBtn');
    
    let activeTaskCount = 0;

    // Add Task Event Listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Clear All Tasks
    clearAllBtn.addEventListener('click', () => {
        taskList.innerHTML = '';
        activeTaskCount = 0;
        updateTaskCount();
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === '') return; // Don't add empty tasks

        // Create elements dynamically
        const li = document.createElement('li');
        li.className = 'task-item';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'task-content';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

        // Assemble the task item
        contentDiv.appendChild(checkbox);
        contentDiv.appendChild(span);
        li.appendChild(contentDiv);
        li.appendChild(deleteBtn);

        // Append to list
        taskList.appendChild(li);

        // Clear input
        taskInput.value = '';

        // Increment count
        activeTaskCount++;
        updateTaskCount();

        // Add Event Listeners to new elements
        
        // 1. Delete Task
        deleteBtn.addEventListener('click', function() {
            li.style.animation = 'fadeIn 0.3s reverse';
            setTimeout(() => {
                li.remove();
                if (!checkbox.checked) {
                    activeTaskCount--;
                    updateTaskCount();
                }
            }, 300);
        });

        // 2. Toggle Task Completion
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                li.classList.add('completed');
                activeTaskCount--;
            } else {
                li.classList.remove('completed');
                activeTaskCount++;
            }
            updateTaskCount();
        });
    }

    function updateTaskCount() {
        if (activeTaskCount === 1) {
            taskCount.textContent = '1 task pending';
        } else {
            taskCount.textContent = `${activeTaskCount} tasks pending`;
        }
    }

});
