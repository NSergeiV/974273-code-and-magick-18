'use strict';
// Фаил backend.js
// Отправка и запрос данных сервера
(function () {

  window.backend = {
    // Функция запроса данных с сервера
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      var URL = 'https://js.dump.academy/code-and-magick/data';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения с сервером');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('GET', URL);
      xhr.send();
    },
    // Функция отправки данных формы
    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения с сервером');
      });
      xhr.addEventListener('timeout', function () {
        onError('Отправка данных не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
