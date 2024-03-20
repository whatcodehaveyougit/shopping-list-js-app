const input = document.getElementById("item-input")
const form = document.getElementById('item-form')
const list = document.getElementById('item-list')



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
  console.log('remove item');
  console.log(e)
  if(e.target.parentElement.classList.contains('remove-item')){
    e.target.parentElement.parentElement.remove();
  }
}


// Listeners

form.addEventListener('submit', addToDo)
list.addEventListener('click', removeItem)