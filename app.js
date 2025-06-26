// app.js

document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'tasks';

  // --- ランダム表示用 ---
  const drawButton = document.getElementById('drawButton');
  const result = document.getElementById('result');

  if (drawButton && result) {
    drawButton.addEventListener('click', () => {
      const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

      if (tasks.length === 0) {
        result.textContent = 'タスクがありません。';
        return;
      }

      const randomIndex = Math.floor(Math.random() * tasks.length);
      const chosenTask = tasks[randomIndex];

      result.textContent = chosenTask;

      tasks.splice(randomIndex, 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    });
  }

  // --- タスク追加用 ---
  const taskInput = document.getElementById('taskInput');
  const addButton = document.getElementById('addButton');
  const message = document.getElementById('message');

  if (addButton && taskInput && message) {
    addButton.addEventListener('click', () => {
      const newTask = taskInput.value.trim();

      if (newTask === '') {
        message.textContent = 'タスクを入力してください。';
        return;
      }

      const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      tasks.push(newTask);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

      taskInput.value = '';
      message.textContent = 'タスクを追加しました！';
    });
  }

  // --- タスクリスト表示＋削除機能 ---
  const taskList = document.getElementById('taskList');
  const deleteButton = document.getElementById('deleteButton');

  if (taskList) {
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (tasks.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'タスクはありません。';
      taskList.appendChild(li);
    } else {
      tasks.forEach((task, index) => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = index;
        checkbox.classList.add('task-checkbox');

        const label = document.createElement('label');
        label.textContent = task;

        li.appendChild(checkbox);
        li.appendChild(label);
        taskList.appendChild(li);
      });
    }
  }

  if (deleteButton) {
    deleteButton.addEventListener('click', () => {
      const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      const checkboxes = document.querySelectorAll('.task-checkbox');

      const newTasks = [];

      checkboxes.forEach((checkbox, i) => {
        if (!checkbox.checked) {
          newTasks.push(tasks[i]);
        }
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
      location.reload(); // ページ再読み込みして反映
    });
  }

});
