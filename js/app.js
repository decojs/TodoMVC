(function( window ) {
	'use strict';


  require.config({

    paths:{
      'knockout': '/bower_components/knockout.js/knockout'
    },
    
    packages:[
      {name: 'deco', location: '/bower_components/deco/Dist', main: 'deco'},
      {name: 'when', location: '/bower_components/when', main: 'when' },
    ]
  });

  require(['deco', 'koExtensions', 'koBindings'], function(deco){
    deco.config().start();
  });


})( window );
