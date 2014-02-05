define([
  'knockout'
], function(
  ko
){

  ko.observable.fn.ignorableSubscribe = function(reaction){

    var react = true;

    this.subscribe(function(value){

      if(react){
        reaction(value);
      }
      react = true;

    });

    this.disregardNextUpdate = function(){
      react = false;
    };

    this.updateWithoutNotifyingSubscribers = function(value){
      if(this() === value) return;

      react = false;
      this(value);
    };


  };

});