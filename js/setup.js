'use strict';

// ----------- Настройка вида персонажа в попап
// Файл setup.js
(function () {
  var coatColorWizard = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColorWizard = ['black', 'red', 'blue', 'yellow', 'green'];

  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var randomCase = function (choice) {
    return choice[Math.floor(Math.random() * (choice.length - 0)) + 0];
  };

  // Блок вывода случайных волшебников из массива данных с сервера
  var creatingCopies = function (wizards) {
    var setupSimilar = document.querySelector('.setup-similar');
    setupSimilar.classList.remove('hidden');
    var wizardsBlock = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    var setupSimilarLabel = template.querySelector('.setup-similar-label');
    var wizardCoat = template.querySelector('.wizard-coat');
    var wizardEyes = template.querySelector('.wizard-eyes');

    for (var i = 0; i < 4; i++) {
      var wizard = wizards[Math.floor(Math.random() * wizards.length)];
      var wizardElement = template.cloneNode(true);

      setupSimilarLabel.textContent = wizard.name;
      wizardCoat.style.fill = wizard.colorCoat;
      wizardEyes.style.fill = wizard.colorEyes;

      fragment.appendChild(wizardElement);
    }

    wizardsBlock.appendChild(fragment);
  };
  // Конец блока вывода случайных волшебников

  // Блок изменения внешнего вида волшебника: глаза, плащь, фаирбол.

  var setupWizardMain = document.querySelector('.setup-wizard');
  var colorCoatWizardMain = setupWizardMain.querySelector('.wizard-coat');
  var colorEyesWizardMain = setupWizardMain.querySelector('.wizard-eyes');
  var colorFireballWrap = document.querySelector('.setup-fireball-wrap');

  var colorsForFireball = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  colorCoatWizardMain.addEventListener('click', function () {
    document.querySelector('input[name="coat-color"][value]').value = colorCoatWizardMain.style.fill = randomCase(coatColorWizard);
  });

  colorEyesWizardMain.addEventListener('click', function () {
    document.querySelector('input[name="eyes-color"][value]').value = colorEyesWizardMain.style.fill = randomCase(eyesColorWizard);
  });

  colorFireballWrap.addEventListener('click', function () {
    document.querySelector('input[name="fireball-color"][value]').value = colorFireballWrap.style.background = randomCase(colorsForFireball);
  });
  // Конец блока изменения внешности

  // Блок отбражения ошибки при загрузки случайных волшебников с сервера
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

  window.backend.load(creatingCopies, errorHandler); // Зопуск функции запроса данных с сервера

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
