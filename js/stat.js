'use strict';

var CLOUD_Y = 10;
var CLOUD_X = 100;
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var SHADOW_CLOUD = 10;
var COLUMN_WIDTH = 40;
var COLUMN_HEIGHT = 150;
var COLUMN_DISTANCE = 50;
var LINE_HEIGHT = 20;
var rivalPosition = CLOUD_X + COLUMN_DISTANCE;
var maxTime = 0;

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(CLOUD_X + SHADOW_CLOUD, CLOUD_Y + SHADOW_CLOUD, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = 'white';
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.font = 'bold 16px PT Mono';
  ctx.fillStyle = 'black';
  ctx.fillText('Ура вы победили!', CLOUD_X + SHADOW_CLOUD, CLOUD_Y + SHADOW_CLOUD + LINE_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + SHADOW_CLOUD, CLOUD_Y + SHADOW_CLOUD + LINE_HEIGHT * 2);

  for (var b = 0; b < times.length; b++) {
    if (maxTime < times[b]) {
      maxTime = Math.floor(times[b]);
    }
  }

  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var time = Math.floor(times[i]);

    if (name === 'Вы') {
      ctx.fillStyle = 'black';
      ctx.fillText(time, rivalPosition, CLOUD_Y + (COLUMN_HEIGHT - ((COLUMN_HEIGHT / maxTime) * time)) + (CLOUD_HEIGHT - COLUMN_HEIGHT - LINE_HEIGHT * 2.3));
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(rivalPosition, CLOUD_Y + (COLUMN_HEIGHT - ((COLUMN_HEIGHT / maxTime) * time)) + (CLOUD_HEIGHT - COLUMN_HEIGHT - LINE_HEIGHT * 2), COLUMN_WIDTH, (COLUMN_HEIGHT / maxTime) * time);
      ctx.fillStyle = 'black';
      ctx.fillText(name, rivalPosition, CLOUD_Y + (CLOUD_HEIGHT - LINE_HEIGHT));
      rivalPosition = rivalPosition + COLUMN_DISTANCE + COLUMN_WIDTH;
    } else {
      ctx.fillStyle = 'black';
      ctx.fillText(time, rivalPosition, CLOUD_Y + (COLUMN_HEIGHT - ((COLUMN_HEIGHT / maxTime) * time)) + (CLOUD_HEIGHT - COLUMN_HEIGHT - LINE_HEIGHT * 2.3));
      ctx.fillStyle = 'hsl(235, ' + Math.floor(Math.random() * (100)) + '%, 50%)';
      ctx.fillRect(rivalPosition, CLOUD_Y + (COLUMN_HEIGHT - ((COLUMN_HEIGHT / maxTime) * time)) + (CLOUD_HEIGHT - COLUMN_HEIGHT - LINE_HEIGHT * 2), COLUMN_WIDTH, (COLUMN_HEIGHT / maxTime) * time);
      ctx.fillStyle = 'black';
      ctx.fillText(name, rivalPosition, CLOUD_Y + (CLOUD_HEIGHT - LINE_HEIGHT));
      rivalPosition = rivalPosition + COLUMN_DISTANCE + COLUMN_WIDTH;
    }
  }
};
