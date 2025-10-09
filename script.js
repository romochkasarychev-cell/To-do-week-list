const dayMap = {
  'Понедельник': 'monday',
  'Вторник': 'tuesday',
  'Среда': 'wednesday',
  'Четверг': 'thursday',
  'Пятница': 'friday',
  'Суббота': 'saturday',
  'Воскресенье': 'sunday'
};

const modal = document.querySelector('#modal');
const openModal = document.querySelector('#openModal');
const modalClose = document.querySelector('#modal_close');
const modalCancel = document.querySelector('#task_cancel')
openModal.addEventListener('click',()=> {
  modal.style.display = "block";
})
modalClose.addEventListener('click',()=>{
  modal.style.display = "none";
})
modalCancel.addEventListener('click',()=>{
  modal.style.display = "none";
})