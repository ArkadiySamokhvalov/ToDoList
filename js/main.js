"use strict";

let plan = document.querySelector('#plan');
let plus = document.querySelector('.plus');
let current = document.querySelector('.current');
let finished = document.querySelector('.finished');
let span = document.querySelectorAll('span');
let currentPlans = [];
let finishedPlans = [];

function isEmpty() {
  if (current.querySelector('.task') === null) {
    span[0].textContent = 'Нет текущих задач';
  } else {
    span[0].textContent = '';
  }

  if (finished.querySelector('.task') === null) {
    span[1].textContent = 'Нет выполненных задач';
  } else {
    span[1].textContent = '';
  }
}

function createTask(text, flag) {
  let task = document.createElement('div');
  task.setAttribute('class', 'task');
  let output = document.createElement('input');
  output.setAttribute('class', 'output');
  output.setAttribute('disabled', 'disabled');
  output.value = text;
  let buttons = document.createElement('div');
  buttons.setAttribute('class', 'buttons');
  let btnDelete = document.createElement('img');
  btnDelete.setAttribute('class', 'delete');
  btnDelete.setAttribute('src', 'img/trash.png');
  let btnCheck = document.createElement('img');
  if (flag === 'f') {
    btnCheck.setAttribute('class', 'uncheck');
    btnCheck.setAttribute('src', 'img/check.png');
  } else if (flag === 'c') {
    btnCheck.setAttribute('class', 'check');
    btnCheck.setAttribute('src', 'img/uncheck.png');
  }

  task.addEventListener('click', (e) => {
    if (e.target.className === 'delete') {
      if (task.parentNode.className === 'finished') {
        finishedPlans.splice(finishedPlans.indexOf(text), 1);
        localStorage.setItem('finishedPlans', JSON.stringify(finishedPlans));
      } else if (task.parentNode.className === 'current') {
        currentPlans.splice(currentPlans.indexOf(text), 1);
        localStorage.setItem('currentPlans', JSON.stringify(currentPlans));
      }
      task.remove();
      isEmpty();
    }
  });

  btnCheck.addEventListener('click', () => {
    btnCheck.classList.toggle('uncheck');
    btnCheck.classList.toggle('check');

    if (btnCheck.className === 'uncheck') {
      btnCheck.setAttribute('src', 'img/check.png');
      finished.appendChild(task);
      currentPlans.splice(currentPlans.indexOf(text), 1);
      localStorage.setItem('currentPlans', JSON.stringify(currentPlans));
      finishedPlans.push(text);
      localStorage.setItem('finishedPlans', JSON.stringify(finishedPlans));
      isEmpty();
    }

    if (btnCheck.className === 'check') {
      btnCheck.setAttribute('src', 'img/uncheck.png');
      current.appendChild(task);
      currentPlans.push(text);
      localStorage.setItem('currentPlans', JSON.stringify(currentPlans));
      finishedPlans.splice(finishedPlans.indexOf(text), 1);
      localStorage.setItem('finishedPlans', JSON.stringify(finishedPlans));
      isEmpty();
    }

  });

  buttons.appendChild(btnDelete);
  buttons.appendChild(btnCheck);
  task.appendChild(output);
  task.appendChild(buttons);

  return task;
}

if (localStorage.getItem("currentPlans")) {
  currentPlans = JSON.parse(localStorage.getItem("currentPlans"));

  for (let item of currentPlans) {
    current.appendChild(createTask(item, 'c'));
  }
}

if (localStorage.getItem("finishedPlans")) {
  finishedPlans = JSON.parse(localStorage.getItem("finishedPlans"));

  for (let item of finishedPlans) {
    finished.appendChild(createTask(item, 'f'));
  }
}

isEmpty();

plus.addEventListener('click', () => {
  if (plan.value !== '') {
    current.appendChild(createTask(plan.value, 'c'));
    isEmpty();
    currentPlans.push(plan.value);
    localStorage.setItem('currentPlans', JSON.stringify(currentPlans));
    plan.value = '';
  }
});

plan.addEventListener('keydown', (e) => {
  if (e.keyCode === 13 ) {
    if (plan.value !== '') {
      current.appendChild(createTask(plan.value, 'c'));
      isEmpty();
      currentPlans.push(plan.value);
      localStorage.setItem('currentPlans', JSON.stringify(currentPlans));
      plan.value = '';
    }
  }
});