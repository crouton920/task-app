// app.js

document.addEventListener('DOMContentLoaded', () => {
  const drawButton = document.getElementById('drawButton');
  const result = document.getElementById('result');

  drawButton.addEventListener('click', () => {
    // 1. localStorageからタスクリストを読み込む
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (tasks.length === 0) {
      result.textContent = 'タスクがありません。';
      return;
    }

    // 2. ランダムに1つ取り出す
    const randomIndex = Math.floor(Math.random() * tasks.length);
    const chosenTask = tasks[randomIndex];

    // 3. 表示する
    result.textContent = chosenTask;

    // 4. リストから削除して保存
    tasks.splice(randomIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // ...すでにあるコードの続きでOK！

  const taskInput = document.getElementById('taskInput');
  const addButton = document.getElementById('addButton');
  const message = document.getElementById('message');

  if (addButton) {
    addButton.addEventListener('click', () => {
      const newTask = taskInput.value.trim();

      if (newTask === '') {
        message.textContent = 'タスクを入力してください。';
        return;
      }

      // 既存のタスクリストを取得
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

      // 新しいタスクを追加
      tasks.push(newTask);

      // 保存
      localStorage.setItem('tasks', JSON.stringify(tasks));

      // 入力欄をリセット、メッセージ表示
      taskInput.value = '';
      message.textContent = 'タスクを追加しました！';
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // ...すでにあるコードの続きでOK！

  const taskList = document.getElementById('taskList');

  if (taskList) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (tasks.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'タスクはありません。';
      taskList.appendChild(li);
    } else {
      tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
      });
    }
  }
});
