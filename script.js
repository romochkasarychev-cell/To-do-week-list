const dayMap = {
  'Понедельник': 'monday',
  'Вторник': 'tuesday',
  'Среда': 'wednesday',
  'Четверг': 'thursday',
  'Пятница': 'friday',
  'Суббота': 'saturday',
  'Воскресенье': 'sunday'
};
let tasks = {
  monday: [],
  tuesday: [],
  wednesday: [], // Обьект для создания задач
  thursday: [],
  friday: [],
  saturday: [],
  sunday: []
};

const modal = document.querySelector('#modal');
const openModal = document.querySelector('#openModal');
const modalClose = document.querySelector('#modal_close');
const modalCancel = document.querySelector('#task_cancel');
const taskForm = document.querySelector('#modal_form');

function createTask() {
const taskName = document.querySelector('#task_name').value;
const taskDescription = document.querySelector('#task_descr').value;
const selectedDay = document.querySelector('#task_day').value;


const task = {
  id:Date.now(),
  name: taskName,
  description: taskDescription,
  day: selectedDay,
  createdAt: new Date()
}
tasks[selectedDay].push(task);
  
  console.log('Задача создана:', task);
  console.log('Все задачи:', tasks);
  taskForm.reset();
  modal.style.display = "none";
  displayTask(task);
}
function displayTask(task) {
  const dayContainer = document.querySelector(`[date-day="${task.day}"]`);
  if(dayContainer){
    const taskList = dayContainer.querySelector('.task-list');
    if(taskList){
      const taskElement = document.createElement('li');
      taskElement.className = 'task-item';
      taskElement.setAttribute('data-task-id',task.id);
      taskElement.setAttribute('draggable','true')
      taskElement.innerHTML = `
      <div class="task_content">
      <h4>${task.name}</h4>
      ${task.description ? `<p>${task.description}</p>` : ''} 
      <small>Создано: ${task.createdAt.toLocaleTimeString()}</small>
      </div>
      <button class="delete-task" onclick="deleteTask(${task.id})")>×</button>
      `;
      addDragnDropHandlers(taskElement);
      taskList.appendChild(taskElement);
    }
  }
}


openModal.addEventListener('click',()=> {
  modal.style.display = "block";
})
modalClose.addEventListener('click',()=>{
  modal.style.display = "none";
})
modalCancel.addEventListener('click',()=>{
  modal.style.display = "none";
})
// Обработчик отправки формы
taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  createTask();
});

// Закрытие модалки по клику вне ее области
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

  function deleteTask(taskId) {
  // Ищем задачу во всех днях
  for (const day in tasks) {
    const taskIndex = tasks[day].findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      // Удаляем задачу из массива
      tasks[day].splice(taskIndex, 1);
      
      // Удаляем задачу из DOM
      const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
      if (taskElement) {
        taskElement.remove();
      }
      
      console.log('Задача удалена, ID:', taskId);
      break;
    }
  }
}
// // drag & drop
function addDragnDropHandlers(taskElement){
  taskElement.addEventListener("dragstart",(event)=>{
  event.target.classList.add("dragging");
  event.dataTransfer.setData("text/plain", event.target.getAttribute('data-task-id'));
})
taskElement.addEventListener("dragend",(event)=>{
  event.target.classList.remove("dragging")
})
}
function initializeDropZones(){
  const dropZones = document.querySelectorAll('.days');
  dropZones.forEach(zone => {
    zone.addEventListener('dragover',(event)=>{
      event.preventDefault();
      zone.classList.add('drag-over');
  })
    zone.addEventListener('dragleave',(event)=>{
      zone.classList.remove('drag-over');
       });
      zone.addEventListener('drop',(event)=>{
         event.preventDefault();
         zone.classList.remove('drag-over');
         const taskId = event.dataTransfer.getData('text/plain');
      const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
      const targetDay = zone.getAttribute('date-day');
      if (taskElement && targetDay) {
        // Перемещаем задачу в DOM
        const taskList = zone.querySelector('.task-list');
        if (taskList) {
          taskList.appendChild(taskElement);
          
          // Обновляем данные в объекте tasks
          updateTaskDay(taskId, targetDay);  
        }
      } 
      });
          
  });
}

//update task
function updateTaskDay(taskId,newDay){
  taskId = parseInt(taskId);
  for(day in tasks){
    const taskIndex = tasks[day].findIndex(task => task.id === taskId);
      if(taskIndex!==-1){
        const[task] = tasks[day].splice(taskIndex,1);
        task.day = newDay;
        tasks[newDay].push(task);
        break;
      }
  }
}
document.addEventListener('DOMContentLoaded', function() {
  initializeDropZones();
});