define([
  'knockout',
  'TodoItem'
], function(
  ko,
  TodoItem
){

  return function TodoListVM(model, when){
    var self = this;

    this.newItemContent = ko.observable("");

    this.todos = ko.observableArray([]);

    this.selectAll = ko.observable(false);

    this.numberOfTodos = ko.computed(function(){
      return self.todos().filter(function(item){
        return item.completed() == false;
      }).length;
    });

    this.pluralItemsTodo = ko.computed(function(){
      return self.numberOfTodos() != 1;
    });

    this.numberOfDones = ko.computed(function(){
      return self.todos().filter(function(item){
        return item.completed();
      }).length;
    });

    this.anyCompletedItems = ko.computed(function(){
      return self.numberOfDones() > 0;
    });

    this.newItemContent.subscribe(function(value){
      if(value.length){
        self.todos.push(new TodoItem(value));
        self.newItemContent("");
      }
    });

    this.listNotEmpty = ko.computed(function(){
      return self.todos().length > 0;
    });

    this.areAllSelected = ko.computed(function(){
      return self.todos().every(function(item){
        return item.completed();
      });
    });

    this.areAllSelected.subscribe(function(allAreSelected){
      self.selectAll.updateWithoutNotifyingSubscribers(allAreSelected);
    });

    this.selectAll.ignorableSubscribe(function(value){
      self.todos().forEach(function(item){
        item.completed(value);
      });
    });

    this.remove = function(item){
      self.todos.remove(item);
    };

    this.removeCompletedItems = function(){
      self.todos.remove(function(item){
        return item.completed();
      });
    };

  };

});