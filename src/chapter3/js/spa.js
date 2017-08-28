/*
* spa.js
* модуль корневого пространства имён
*/


const spa = (function() {
  const initModule = $container =>
    spa.shell.initModule( $container );

  return { initModule: initModule };
}());
