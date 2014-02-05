define([
  'knockout'
], function(
  ko
){
  
  return function TodoItem(todo){

    this.completed = ko.observable(false);
    this.editing = ko.observable(false);

    this.content = ko.observable(todo || "");

  };

});