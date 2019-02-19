'use strict';


const STORE = [
  {id: cuid(), name: 'apples', checked: false},
  {id: cuid(), name: 'oranges', checked: false},
  {id: cuid(), name: 'milk', checked: true},
  {id: cuid(), name: 'bread', checked: false}
];

function generateItemElement(item){
  return (`
  <li data-item-id="${item.id}"><span 
  class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' :''}">
  ${item.name}</span>
  <div class="shopping-item-controls">
    <button class="shopping-item-toggle js-item-toggle">
      <span class="button-label">check</span>
    </button>
    <button class="shopping-item-delete js-item-delete">
      <span class="button-label">delete</span>
    </button>
  </div>
</li>`);
}

function generateShoppingItemsString(shoppingList){
  console.log('Generating shopping list element');

  const items = shoppingList.map((item) => generateItemElement(item));

  return items.join('');
}

function renderShoppingList(){
  //render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);

  //inserthtml into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

function makeItem(item){
  return (`<li>
        <span class="shopping-item">${item}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`);
}

function addItemToStore(item){
  console.log(`Adding "${item}" to shopping list`);
  STORE.push({id: cuid(), name: item, checked: false});
}

function handleAddItem(){
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    const newItem = $('.js-shopping-list-entry').val();
    console.log(newItem);
    $('.js-shopping-list-entry').val('');
    addItemToStore(newItem);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemId){
  console.log('Toggling checked property for item with id ' + itemId);
  const item = STORE.find(item => item.id === itemId);
  item.checked = !item.checked;
}

function getItemIdFromElement(item){
  return $(item)
    .closest('li')
    .data('item-id');
}

function handleCheckItem(){
  $('.js-shopping-list').on('click', '.js-item-toggle', function(event){
    event.preventDefault();
    console.log('`handleCheckItem` ran');

    const itemId = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(itemId);
    renderShoppingList();
  });
}

function removeItemFromList(itemId){
  console.log('deleting item with the id '+ itemId);
  const itemIndex = STORE.findIndex(item => item.id === itemId);
  STORE.splice(itemIndex, 1);
}

function handleDeleteItem(){
  $('.js-shopping-list').on('click', '.js-item-delete', function(event){
    event.preventDefault();
    console.log('`handDeleteItem` ran');

    const itemId = getItemIdFromElement(event.currentTarget);
    removeItemFromList(itemId);
    renderShoppingList();
  });
}

$(function(){
  renderShoppingList();
  handleAddItem();
  handleCheckItem();
  handleDeleteItem();
});

