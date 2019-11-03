'use strict';

// ----------- Настройка вида персонажа в попап
// Файл setup.js
(function () {
  var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var wizards = [];
  var coatColor;
  var eyesColor;

  var randomCase = function (choice) {
    return choice[Math.floor(Math.random() * (choice.length - 0)) + 0];
  };

  // Блок сортировки похожих волшебников
  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var updateWizards = function () {
    window.render(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  var onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });
  // Конец блока сортировки похожих волшебников

  // Блок изменения внешнего вида волшебника: глаза, плащь, фаирбол.
  var setupWizardMain = document.querySelector('.setup-wizard');
  var colorCoatWizardMain = setupWizardMain.querySelector('.wizard-coat');
  var colorEyesWizardMain = setupWizardMain.querySelector('.wizard-eyes');
  var colorFireballWrap = document.querySelector('.setup-fireball-wrap');

  colorCoatWizardMain.addEventListener('click', function () {
    var newColor = randomCase(COAT_COLOR);
    colorCoatWizardMain.style.fill = newColor;
    document.querySelector('input[name="coat-color"][value]').value = newColor;
    onCoatChange(newColor);
  });

  colorEyesWizardMain.addEventListener('click', function () {
    var newColor = randomCase(EYES_COLOR);
    colorEyesWizardMain.style.fill = newColor;
    document.querySelector('input[name="eyes-color"][value]').value = newColor;
    onEyesChange(newColor);
  });

  colorFireballWrap.addEventListener('click', function () {
    var newColor = randomCase(FIREBALL_COLOR);
    colorFireballWrap.style.background = newColor;
    document.querySelector('input[name="fireball-color"][value]').value = newColor;
  });
  // Конец блока изменения внешности

  // Блок отображения ошибки при загрузки случайных волшебников с сервера
  var node = document.createElement('div');
  var errorHandler = function (errorMessage) {
    node.classList.add('errorBlock');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  // Конец блока ошибки

  window.backend.load(successHandler, errorHandler); // Зопуск функции запроса данных с сервера

  // Блок отправки формы на сервер и закрытие попап после успешной отправки.
  var form = document.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      window.userDialog.classList.add('hidden');
      if (document.querySelector('.errorBlock')) {
        document.querySelector('.errorBlock').remove();
      }
      form.querySelector('input[name="username"]').value = null;
    }, errorHandler);
    evt.preventDefault();
  });
  // Конец блока отправки на сервер

})();
