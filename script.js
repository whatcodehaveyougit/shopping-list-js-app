const input = document.getElementById("item-input")
const form = document.getElementById('item-form')
const list = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const itemFilter = document.getElementById('filter')

// functions

function addToDo(e){
  e.preventDefault();
  const listItem = document.createElement('li')
  const text = document.createTextNode(input.value)
  const button = createDeleteButton()
  listItem.appendChild(text)
  listItem.appendChild(button)
  list.appendChild(listItem)
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
    e.target.parentElement.parentElement.remove();
    checkUI()
  }
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

// Listeners

form.addEventListener('submit', addToDo)
list.addEventListener('click', removeItem)
document.addEventListener('DOMContentLoaded', () => {
  checkUI()
})