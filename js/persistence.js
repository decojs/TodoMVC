define([
  'anItemEvents'
], function(
  whenAnItem
){

  function loadTodos(){
    try{
      return JSON.parse(localStorage.getItem('todos-deco') || '[]');
    }catch(o_O){
      return [];
    }
  }

  function saveTodos(list){
    localStorage.setItem('todos-deco', JSON.stringify(list));
  }


  function updateTodos(update){
    return function(){
      var todos = loadTodos();
      todos.find = find.bind(null, todos);
      update.apply(todos, arguments)
      saveTodos(todos);
    }
  }

  function find(list, id){
    return list.filter(function(item){
      return item.id === id;
    })[0];
  }

  whenAnItem.hasBeenAdded(updateTodos(function(id, content){
    this.push({
      id: id,
      content: content,
      completed: false
    });
  }));

  whenAnItem.hasBeenRemoved(updateTodos(function(id){
    this.splice(this.indexOf(this.find(id)), 1);
  }));

  whenAnItem.hasBeenEdited(updateTodos(function(id, content){
    this.find(id).content = content;
  }));

  whenAnItem.hasBeenCompleted(updateTodos(function(id){
    this.find(id).completed = true;
  }));

  whenAnItem.hasBeenNotCompleted(updateTodos(function(id){
    this.find(id).completed = false;
  }));

  
  return {
    newId: function(){
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
      });
    },

    load: loadTodos
  };

});