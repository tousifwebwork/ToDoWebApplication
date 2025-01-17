// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event listener
addTaskButton.addEventListener('click', addTask);

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  // Add task to the UI
  const taskItem = createTaskElement(taskText);
  taskList.appendChild(taskItem);

  // Save task to local storage
  saveTaskToLocalStorage(taskText);

  // Clear input field
  taskInput.value = '';
}

// Function to create a task element
function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    li.remove();
    removeTaskFromLocalStorage(taskText);
  });

  li.appendChild(deleteButton);
  return li;
}

// Save task to local storage
function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const taskItem = createTaskElement(task);
    taskList.appendChild(taskItem);
  });
}

// Remove task from local storage
function removeTaskFromLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
