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

    this.editContent = ko.observable(todo.trim() || "");

    this.editing.ignorableSubscribe(function(value){
      if(value === false){
        var trimmedValue = self.editContent().trim();
        self.content(trimmedValue);
        self.editing(false);
        anItem.hasBeenEdited(id, trimmedValue);
      }
    });

    this.completed.subscribe(function(completed){
      if(completed){
        anItem.hasBeenCompleted(id);
      }else{
        anItem.hasBeenNotCompleted(id);
      }
    });

    this.edit = function(){
      self.editContent(self.content());
      self.editing(true);
    };

    this.cancelEdit = function(){
      self.editing.updateWithoutNotifyingSubscribers(false);
    };

    this.completeEdit = function(){
      self.editing(false);
    };

  };

  TodoItem.create = function(item){
    return new TodoItem(item.id, item.content, item.completed);
  };

  return TodoItem;

});