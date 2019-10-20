'use strict';

// ---------- Взаимодействие пользователя с сайтом, открытие окна попап настроек персонжа
// Файл dialog.js
(function () {
  var userDialog = document.querySelector('.setup');
  var iconAvatar = document.querySelector('.setup-open');
  var iconCloseUserDialog = userDialog.querySelector('.setup-close');
  var iconAvatarFocus = iconAvatar.querySelector('.setup-open-icon');
  var inputName = userDialog.querySelector('.setup-user-name');

  var KEY_ENTER = 13;
  var KEY_ESC = 27;

  window.KEY_ENTER = KEY_ENTER;
  window.KEY_ESC = KEY_ESC;

  var onUserDialogClose = function (evt) {
    if (evt.keyCode === KEY_ESC) {
      closePopap();
    }
  };

  var onUserDialogFocusOpen = function (evt) {
    if (iconAvatarFocus === document.activeElement) {
      if (evt.keyCode === KEY_ENTER) {
        openPopap();
      }
    }
  };

  var onUserDialogFocusClose = function (evt) {
    if (iconCloseUserDialog === document.activeElement) {
      if (evt.keyCode === KEY_ENTER) {
        closePopap();
      }
    }
  };

  var onFormCancelSubmit = function (evt) {
    if (inputName === document.activeElement) {
      if (evt.keyCode === KEY_ENTER) {
        evt.preventDefault();
      }
    }
  };

  var openPopap = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onUserDialogClose);
    document.addEventListener('keydown', onUserDialogFocusClose);
    document.removeEventListener('keydown', onUserDialogFocusOpen);
    document.addEventListener('keydown', onFormCancelSubmit, false);
  };

  var closePopap = function () {
    if (inputName !== document.activeElement) {
      userDialog.classList.add('hidden');
      userDialog.style.top = null;
      userDialog.style.left = null;
      document.removeEventListener('keydown', onUserDialogClose);
      document.removeEventListener('keydown', onUserDialogFocusClose);
      document.removeEventListener('keydown', onFormCancelSubmit, false);
      document.addEventListener('keydown', onUserDialogFocusOpen);
    }
  };

  iconAvatar.addEventListener('click', openPopap);
  document.addEventListener('keydown', onUserDialogFocusOpen);

  iconCloseUserDialog.addEventListener('click', closePopap);
})();


// ----------- Перетаскивание попап

(function () {
  var userDialog = document.querySelector('.setup');
  var avatarPopap = userDialog.querySelector('.upload');

  avatarPopap.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var dragged = false;

    var startCoord = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (movEvt) {
      movEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoord.x - movEvt.clientX,
        y: startCoord.y - movEvt.clientY
      };

      startCoord.x = movEvt.clientX;
      startCoord.y = movEvt.clientY;

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clEvt) {
          clEvt.preventDefault();
          avatarPopap.removeEventListener('click', onClickPreventDefault);
        };
        avatarPopap.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
