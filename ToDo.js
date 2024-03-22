import LocalStorage from './LocalStorage.js'

class ToDo {
  constructor() {
    this.input = document.getElementById("item-input")
    this.form = document.getElementById('item-form')
    this.list = document.getElementById('item-list')
    this.clearBtn = document.getElementById('clear')
    this.itemFilter = document.getElementById('filter')
    this.localStorageObj = new LocalStorage()
    this.startListeners()
  }

  startListeners() {
    // Listeners
    this.form.addEventListener('submit', (e) => this.addToDo(e, this.localStorageObj.doesItemAlreadyExist(this.input.value)).bind(this))
    this.list.addEventListener('click', this.clickItem.bind(this))
    this.clearBtn.addEventListener('click', this.clearItems.bind(this))
    this.itemFilter.addEventListener('keyup', this.filterItems.bind(this))
    document.addEventListener('DOMContentLoaded', () => {
      this.loadItemsFromLocalStorage();
      this.checkUI()
    })
  }

  addItemToDOM(input){
    if(input === ''){
      alert('Please enter a task')
    } else {
      const listItem = document.createElement('li')
      const text = document.createTextNode(input)
      const button = this.createDeleteButton()
      listItem.appendChild(text)
      listItem.appendChild(button)
      this.list.appendChild(listItem)
    }
  }

  addToDo(e, doesItemAlreadyExist){
    e.preventDefault();
    if(doesItemAlreadyExist){
      alert('Item already exists')
    } else {
      this.addItemToDOM(this.input.value)
      this.localStorageObj.addItemToStorage(this.input.value)
      this.input.value = ''
      this.checkUI()
    }
  }

  createDeleteButton(){
    const btn = document.createElement('button')
    btn.classList = 'remove-item btn-link text-red'
    const icon = document.createElement('icon')
    icon.classList = 'fa-solid fa-xmark'
    btn.appendChild(icon)
    return btn;
  }

  didUserClickDelete(e){
    if (e.target.parentElement.classList.contains('remove-item')){
      return true
    }
    return false
  }

  clickItem(e){
    if(e.target.localName == 'li'){
      this.setItemToEdit(e.target)
    } else if(this.didUserClickDelete(e)){
      this.localStorageObj.removeItemFromStorage(e.target.parentElement.parentElement.firstChild.textContent)
      e.target.parentElement.parentElement.remove();
      this.checkUI()
    }
  }

  convertToInput(element) {
    const inputElement = document.createElement('input');
    inputElement.value = element.textContent;
    element.replaceWith(inputElement);
    inputElement.focus();
    inputElement.addEventListener('blur', (e) => this.convertToLi(e.target))
  }

  convertToLi(inputElement) {
    console.log('converting')
    console.log(inputElement)
    const liElement = document.createElement('li')
    const text = document.createTextNode(inputElement.value)
    const button = this.createDeleteButton()
    inputElement.replaceWith(liElement);
    liElement.appendChild(text)
    liElement.appendChild(button)
  }

  // Clear and Filter itesms

  checkUI() {
    const items = this.list.querySelectorAll('li')
    if(items.length === 0){
      this.clearBtn.style.display = 'none'
      this.itemFilter.style.display = 'none'
    } else {
      this.clearBtn.style.display = 'block'
      this.itemFilter.style.display = 'block'
    }
  }

  clearItems(){
    alert('Are you sure you want to clear all items?')
    this.list.innerHTML = ''
    localStorage.clear('items')
    this.checkUI()
  }

  filterItems(e){
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

  setItemToEdit(item){
    this.localStorageObj.removeItemFromStorage(item)
    this.convertToInput(item)
  }

  loadItemsFromLocalStorage(){
    if(localStorage.getItem('items') !== null){
      const items = JSON.parse(localStorage.getItem('items'))
      items.forEach((item) => {
        const listItem = document.createElement('li')
        const text = document.createTextNode(item.todo)
        const button = this.createDeleteButton()
        listItem.appendChild(text)
        listItem.appendChild(button)
        this.list.appendChild(listItem)
      })
    }
  }
}

export default ToDo