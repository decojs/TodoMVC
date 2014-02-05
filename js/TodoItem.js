define([
  'knockout',
  'anItemEvents'
], function(
  ko,
  anItem
){
  
  function TodoItem(id, todo, completed){
    var self = this;

    this.id = id;

    this.completed = ko.observable(completed || false);
    this.editing = ko.observable(false);

    this.content = ko.observable(todo.trim() || "");

    this.content.subscribe(function(value){
      self.content(value.trim());
      self.editing(false);
      anItem.hasBeenEdited(id, value);
    });

    this.completed.subscribe(function(completed){
      if(completed){
        anItem.hasBeenCompleted(id);
      }else{
        anItem.hasBeenNotCompleted(id);
      }
    });

    this.edit = function(){
      self.editing(true);
    };

  };

  TodoItem.create = function(item){
    return new TodoItem(item.id, item.content, item.completed);
  };

  return TodoItem;

});