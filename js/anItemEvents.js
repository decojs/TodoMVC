define([
  'deco/proclaimWhen'
], function(
  proclaimWhen
){

  return proclaimWhen.extend({
    hasBeenAdded: function(id, title){ },
    hasBeenRemoved: function(id){ },
    hasBeenEdited: function(id, title){ },
    hasBeenCompleted: function(id){ },
    hasBeenNotCompleted: function(id){ }
  });
  
});