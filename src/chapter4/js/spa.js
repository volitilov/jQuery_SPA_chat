/*
* spa.js
* Модуль корневого пространства имен
*/


var spa = (function() {
  var initModule = function($container) {
    // служебные действия ...
    
    spa.shell.initModule( $container );
  }

  return {initModule: initModule};
}());
