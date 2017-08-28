/*
* spa.shell.js
* Модуль Shell для SPA
*/

/*eslint-disable no-unused-vars*/
/*global $, spa*/


spa.shell = (function() {
  //--------- НАЧАЛО ПЕРЕМЕННЫХ В ОБЛАСТИ ВИДИМОСТИ МОДУЛЯ --------
  let
    configMap = {
      main_html: String()
      + '<header class="spa-shell-head">'
        + '<div class="spa-shell-head-logo"></div>'
        + '<div class="spa-shell-head-acct"></div>'
        + '<div class="spa-shell-head-search"></div>'
      + '</header>'
      + '<main class="spa-shell-main">'
        + '<div class="spa-shell-main-nav"></div>'
        + '<div class="spa-shell-main-content"></div>'
      + '</main>'
      + '<div class="spa-shell-foot"></div>'
      + '<div class="spa-shell-chat"></div>'
      + '<div class="spa-shell-modal"></div>',

      chat_extend_time: 1000,
      chat_retract_time: 300,
      chat_extend_height: 450,
      chat_retract_height: 15,
    },
    stateMap = { $container: null },
    jqueryMap = {},

    setJqueryMap, initModule, toggleChat;
  //--------- КОНЕЦ ПЕРЕМЕННЫХ В ОБЛАСТИ ВИДИМОСТИ МОДУЛЯ ---------


  //--------- НАЧАЛО СЛУЖЕБНЫХ МЕТОДОВ ----------------------------
  
  //--------- КОНЕЦ СЛУЖЕБНЫХ МЕТОДОВ -----------------------------


  //--------- НАЧАЛО МЕТОДОВ DOM ----------------------------------
  // Начало метода DOM /setJqueryMap/
  setJqueryMap = function() {
    let $container = stateMap.$container;
    jqueryMap = { 
      $container: $container, 
      $chat: $container.find( '.spa-shell-chat' ),
    };
  };
  // Конец метода DOM /setJqueryMap/


  // Начало метода DOM /toggleChat/
  // Назначение : свернуть или раскрыть окно чата
  // Аргументы :
  // * do_extend – если true, раскрыть окно; если false – свернуть
  // * callback – необязательная функция, которая вызывается в конце
  // *   анимации
  // Параметры :
  // * chat_extend_time, chat_retract_time
  // * chat_extend_height, chat_retract_height
  // Возвращает : булево значение
  // * true – анимация окна чата начата
  // * false – анимация окна чата не начата
  //
  toggleChat = function(do_extend, callback) {
    let
      px_chat_ht  = jqueryMap.$chat.height(),
      is_open     = px_chat_ht === configMap.chat_extend_height,
      is_closed   = px_chat_ht === configMap.chat_retract_height,
      is_sliding  = !is_open && !is_closed;

    // во избежание гонки
    if ( is_sliding ) { return false; }

    // Начало раскрытия окна чата
    if ( do_extend ) {
      jqueryMap.$chat.animate(
        { height: configMap.chat_extend_height },
        configMap.chat_extend_time,
        function() {
          if (callback) { callback( jqueryMap.$chat ); }
        }
      );
      return true;
    }
    // Конец раскрытия окна чата

    // Начало сворачивания окна чата
    jqueryMap.$chat.animate(
      { height: configMap.chat_retract_height },
      configMap.chat_retract_time,
      function() {
        if (callback) { callback( jqueryMap.$chat ); }
      }
    );
    return true;
    // Конец сворачивания окна чата
  };
  // Конец метода DOM /toggleChat/
  //--------- КОНЕЦ МЕТОДОВ DOM -----------------------------------


  //--------- НАЧАЛО ОБРАБОТЧИКОВ СОБЫТИЙ -------------------------

  //--------- КОНЕЦ ОБРАБОТЧИКОВ СОБЫТИЙ --------------------------


  //--------- НАЧАЛО ОТКРЫТЫХ МЕТОДОВ -----------------------------
  // Начало открытого метода /initModule/
  initModule = function($container) {
    // загрузить HTML и кэшировать коллекции jQuery
    stateMap.$container = $container;
    $container.html( configMap.main_html );
    setJqueryMap();

    // тестировать переключение
    setTimeout( function () {toggleChat( true ); }, 3000 );
    setTimeout( function () {toggleChat( false );}, 8000 );
  };
  // Конец открытого метода /initModule/

  return { initModule: initModule };
  //--------- КОНЕЦ ОТКРЫТЫХ МЕТОДОВ ------------------------------
}());
