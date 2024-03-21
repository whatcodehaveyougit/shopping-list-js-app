/**
 * @jest-environment jsdom
 */

import ToDo from './ToDo.js'; // ES6 import syntax

describe('testing to do list', () => {
  let ToDoInstance
  beforeEach(() => {
    global.alert = jest.fn();
    const html =    `<div class="container">
    <header>
      <img src="images/note.png" alt="" />
      <h1>Shopping List</h1>
    </header>
    <form id="item-form">
      <div class="form-control">
        <input
          type="text"
          class="form-input"
          id="item-input"
          name="item"
          placeholder="Enter Item"
        />
      </div>
      <div class="form-control">
        <button type="submit" class="btn">
          <i class="fa-solid fa-plus"></i> Add Item
        </button>
      </div>
    </form>
    <div class="filter">
      <input
        type="text"
        class="form-input-filter"
        id="filter"
        placeholder="Filter Items"
      />
    </div>
    <ul id="item-list" class="items"></ul>
    <button id="clear" class="btn-clear" style="display: none">
      Clear All
    </button>
  </div>`;
    document.body.innerHTML = html
    ToDoInstance = new ToDo();
  })


  it('User should not be able to add ToDo list item that is empty', () => {
    ToDoInstance.addItemToDOM('')
    expect(document.querySelector(`#item-list`).innerHTML).toBe('');
    expect(alert).toHaveBeenCalledTimes(1);
  });

  it('User should not be able to add ToDo list item that is empty', () => {
    ToDoInstance.addItemToDOM('test')
    expect(document.querySelector(`#item-list`).innerHTML).toBe('<li>test<button class=\"remove-item btn-link text-red\"><icon class=\"fa-solid fa-xmark\"></icon></button></li>');
    expect(alert).toHaveBeenCalledTimes(0);
  });
});
