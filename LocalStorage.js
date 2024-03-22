
class LocalStorage {
  constructor() {
  }

  addItemToStorage(item){
    if(localStorage.getItem('items') === null){
      localStorage.setItem('items', JSON.stringify([{ todo: item}]))
    } else {
      const items = JSON.parse(localStorage.getItem('items'))
      items.push({todo: item})
      localStorage.setItem('items', JSON.stringify(items))
    }
  }

  doesItemAlreadyExist(item){
    const items = localStorage.getItem('items')
    console.log('items', items)
    let doesItemAlreadyExist = false
    if(items !== null){
      const itemsArr = JSON.parse(items)
      itemsArr.forEach((element) => {
        if(element.todo === item){
          doesItemAlreadyExist = true
        }
      })
    }
    return doesItemAlreadyExist
  }

  removeItemFromStorage(item){
    const items = JSON.parse(localStorage.getItem('items'))
    items.forEach((element, index) => {
      if(element.todo === item){
        items.splice(index, 1)
      }
    })
    localStorage.setItem('items', JSON.stringify(items))
  }



}

export default LocalStorage;