import Player from '@vimeo/player';

import throttle from 'lodash.throttle';

const iframeEl = document.querySelector('iframe');

const player = new Player(iframeEl);

player.on('timeupdate', throttle(playerOn, 1000));

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));

function playerOn(data) {
  const playerSeconds = data.seconds;
  localStorage.setItem('videoplayer-current-time', playerSeconds);
}
