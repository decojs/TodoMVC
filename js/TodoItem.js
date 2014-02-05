define([
  'knockout'
], function(
  ko
){
  
  return function TodoItem(todo){
    var self = this;

    this.completed = ko.observable(false);
    this.editing = ko.observable(false);

    this.content = ko.observable(todo || "");

    this.content.subscribe(function(value){
      if(value){
        self.editing(false);
      }
    })

    this.edit = function(){
      self.editing(true);
    };

  };

});