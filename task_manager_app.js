// Check for existing tasks in local storage
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
const renderTasks = () => {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(({ id, text, completed }) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <input type="checkbox" ${completed ? 'checked' : ''} onchange="toggleTask(${id})">
      <span style="text-decoration: ${completed ? 'line-through' : 'none'}">${text}</span>
      <button onclick="editTask(${id})">Edit</button>
      <button onclick="deleteTask(${id})">Delete</button>
    `;
    taskList.appendChild(taskItem);
  });
};

// Function to add a new task
const addTask = () => {
  const taskInput = document.getElementById('taskInput');
  const text = taskInput.value.trim();

  if (text !== '') {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    taskInput.value = '';
  }
};

// Function to toggle task completion
const toggleTask = (taskId) => {
  tasks.forEach((task) => {
    if (task.id === taskId) {
      task.completed = !task.completed;
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
};

// Function to edit a task
const editTask = (taskId) => {
  const newText = prompt('Edit task:', tasks.find(task => task.id === taskId).text);

  if (newText !== null) {
    tasks.forEach((task) => {
      if (task.id === taskId) {
        task.text = newText.trim();
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
};

// Function to delete a task
const deleteTask = (taskId) => {
  const confirmed = confirm('Are you sure you want to delete this task?');

  if (confirmed) {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    tasks.splice(0, tasks.length, ...updatedTasks); // Update tasks array
    renderTasks();
  }
};

// Initial rendering of tasks
renderTasks();