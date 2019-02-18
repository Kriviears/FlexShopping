/* eslint-disable strict */

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

$(function(){
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    const item = $(this).find('#shopping-list-entry').val();
    $('.shopping-list').append(makeItem(item));
    console.log(item);
  });


  $('ul').on('click', '.shopping-item-toggle', function(event){
    event.preventDefault();
    
    $(this).parent().parent()
      .find('.shopping-item').toggleClass('shopping-item__checked');
  });

  $('ul').on('click', '.shopping-item-delete', function(event){
    event.preventDefault();

    $(this).parent().parent().remove();
  });
});

