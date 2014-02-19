define([
  'knockout'
], function(
  ko
){

  ko.bindingHandlers['esc'] = {
    init: function(element, valueAccessor, allBindings, viewModel, context){

      var escapeWasClicked = ko.unwrap(valueAccessor());

      function wasEscapeClicked(data, event){
        if (event.keyCode == 27) {
          return escapeWasClicked(data, event);
        }else{
          return true;
        }
      }

      ko.bindingHandlers.event.init(element, function(){
        return {keyup: wasEscapeClicked}
      }, allBindings, viewModel, context);


    }
  }

  ko.bindingHandlers['enter'] = {
    init: function(element, valueAccessor, allBindings, viewModel, context){

      var enterWasClicked = ko.unwrap(valueAccessor());

      function wasEnterClicked(data, event){
        if (event.keyCode == 13) {
          return enterWasClicked(data, event);
        }else{
          return true;
        }
      }

      ko.bindingHandlers.event.init(element, function(){
        return {keyup: wasEnterClicked}
      }, allBindings, viewModel, context);


    }
  }

});