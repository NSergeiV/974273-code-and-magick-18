'use strict';

// ----------- Настройка вида персонажа в попап
// Файл setup.js
(function () {
  var nameWizard = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnameWizard = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColorWizard = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColorWizard = ['black', 'red', 'blue', 'yellow', 'green'];

  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var randomCase = function (choice) {
    return choice[Math.floor(Math.random() * (choice.length - 0)) + 0];
  };

  var wizards = [];

  var generationWizards = function () {
    for (var i = 0; i < 4; i++) {
      wizards[i] = {
        name: randomCase(nameWizard),
        surname: randomCase(surnameWizard),
        coatColor: randomCase(coatColorWizard),
        eyesColor: randomCase(eyesColorWizard)
      };
    }
  };

  generationWizards();

  var creatingCopies = function () {
    var setupSimilar = document.querySelector('.setup-similar');
    setupSimilar.classList.remove('hidden');
    var wizardsBlock = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    var setupSimilarLabel = template.querySelector('.setup-similar-label');
    var wizardCoat = template.querySelector('.wizard-coat');
    var wizardEyes = template.querySelector('.wizard-eyes');

    for (var i = 0; i < wizards.length; i++) {
      var wizardElement = template.cloneNode(true);

      setupSimilarLabel.textContent = wizards[i].name + ' ' + wizards[i].surname;
      wizardCoat.style.fill = wizards[i].coatColor;
      wizardEyes.style.fill = wizards[i].eyesColor;

      fragment.appendChild(wizardElement);
    }

    wizardsBlock.appendChild(fragment);
  };

  creatingCopies();

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
})();
