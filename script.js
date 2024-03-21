const input = document.getElementById("item-input")
const form = document.getElementById('item-form')
const list = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const itemFilter = document.getElementById('filter')

function addItemToStorage(item){
  if(localStorage.getItem('items') === null){
    localStorage.setItem('items', JSON.stringify([{ todo: item}]))
  } else {
    const items = JSON.parse(localStorage.getItem('items'))
    console.log(items)
    items.push({todo: item})
    localStorage.setItem('items', JSON.stringify(items))
  }
}

// functions

function addToDo(e){
  e.preventDefault();
  const listItem = document.createElement('li')
  const text = document.createTextNode(input.value)
  const button = createDeleteButton()
  listItem.appendChild(text)
  listItem.appendChild(button)
  list.appendChild(listItem)
  addItemToStorage(input.value)
  input.value = ''
  checkUI()
}

function createDeleteButton(){
  const btn = document.createElement('button')
  btn.classList = 'remove-item btn-link text-red'
  const icon = document.createElement('incon')
  icon.classList = 'fa-solid fa-xmark'
  btn.appendChild(icon)
  return btn;
}

function removeItem(e){
  if(e.target.parentElement.classList.contains('remove-item')){
    removeItemFromStorage(e.target.parentElement.parentElement.firstChild.textContent)
    e.target.parentElement.parentElement.remove();
    checkUI()
  }
}

function removeItemFromStorage(item){
  const items = JSON.parse(localStorage.getItem('items'))
  items.forEach((element, index) => {
    if(element.todo === item){
      items.splice(index, 1)
    }
  })
  localStorage.setItem('items', JSON.stringify(items))
}

function checkUI() {
  const items = list.querySelectorAll('li')
  if(items.length === 0){
    clearBtn.style.display = 'none'
    itemFilter.style.display = 'none'
  } else {
    clearBtn.style.display = 'block'
    itemFilter.style.display = 'block'
  }
}

function clearItems(){
  alert('Are you sure you want to clear all items?')
  list.innerHTML = ''
  localStorage.clear('items')
  checkUI()
}

function filterItems(e){
  const text = e.target.value.toLowerCase()
  document.querySelectorAll('li').forEach((item) => {
    const task = item.firstChild.textContent.toLowerCase()
    if(task.indexOf(text) != -1){
      item.style.display = 'flex'
    } else {
      item.style.display = 'none'
    }
  })
}

function loadItemsFromLocalStorage(){
  console.log('loading items from local storage')
  if(localStorage.getItem('items') !== null){
    const items = JSON.parse(localStorage.getItem('items'))
    items.forEach((item) => {
      const listItem = document.createElement('li')
      const text = document.createTextNode(item.todo)
      const button = createDeleteButton()
      listItem.appendChild(text)
      listItem.appendChild(button)
      list.appendChild(listItem)
    })
  }
}

// Listeners

form.addEventListener('submit', addToDo)
list.addEventListener('click', removeItem)
clearBtn.addEventListener('click', clearItems)
itemFilter.addEventListener('keyup', filterItems)
document.addEventListener('DOMContentLoaded', () => {
  loadItemsFromLocalStorage();
  checkUI()
})