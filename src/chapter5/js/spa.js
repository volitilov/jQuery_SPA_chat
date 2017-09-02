/*
* spa.js
* Модуль корневого пространства имен
*/


var spa = (function() {
  'use strict';
  var initModule = function($container) {
    // служебные действия ...
    
    spa.model.initModule();
    spa.shell.initModule( $container );
  }

  return {initModule: initModule};
}());
