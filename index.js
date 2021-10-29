/********/
/*TO DO*/
/*******/

// Adjustable number of lights per click
// Adjustable Rows
// GitHub repository
// Winning confetti
// Settings tab
// Mobile responsive
// Limited time mode
// Limited clicks mode
// Sound effects
// Background music
// Different color schemes
// Language support

/***********/
/*Variables*/
/***********/
let lights = Array.prototype.slice.call(document.querySelectorAll('.light'));
const body = document.querySelector('body');
const backgroundColor = 'rgb(230, 230, 230)';
const slider = document.querySelector('input');
const thumb = document.querySelector('.slider-thumb');
const tooltip = document.querySelector('.tooltip');
const progress = document.querySelector('.progress');
const time = document.querySelector('.time');
let timerOn = false;
let timeCounter = 0;
let timer = null;
const clicks = document.querySelector('.clicks');
let counter = 0;
const container = document.querySelector('.container');
const restart = document.querySelector('.restart');
const full = document.querySelector('.full');

/***********/
/*Functions*/
/***********/
const shuffle = (light) => {
  light.classList.remove('on');
  const random = Math.floor(Math.random() * 10);
  if (random % 2 == 0) {
    light.classList.add('on');
  }
  return;
};

const customSlider = () => {
  const values = [
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
  ];
  const val = values.indexOf(slider.value) * 6.666666666666667 + '%';
  tooltip.innerHTML = slider.value;
  progress.style.width = val;
  thumb.style.left = val;
};

const updateLights = () => {
  //Updates for higher values
  if (lights.length < slider.value) {
    while (lights.length != slider.value) {
      const light = document.createElement('div');
      light.classList.add('light');
      light.addEventListener('click', () => {
        updateCounters();
        onOff(light);
      });
      container.appendChild(light);
      lights = Array.prototype.slice.call(document.querySelectorAll('.light'));
      shuffle(light);
    }
  }
  //Updates for lower values
  else if (lights.length > slider.value) {
    while (lights.length != slider.value) {
      const light = lights[0];
      const parent = container;
      parent.removeChild(light);
      lights = Array.prototype.slice.call(document.querySelectorAll('.light'));
    }
  }
};

const updateCounters = () => {
  //Update time
  if (timerOn == false) {
    timerOn = true;
    timer = setInterval(() => {
      timeCounter++;
      time.textContent = `Time:${timeCounter}s`;
    }, 1000);
  }
  //Update clicks
  counter++;
  clicks.textContent = `Clicks:${counter}`;
  return;
};

const restartApp = () => {
  //Reset counter
  counter = 0;
  clicks.textContent = 'Clicks:0';
  //Reset time
  clearInterval(timer);
  timerOn = false;
  timeCounter = 0;
  time.textContent = 'Time:0s';
  //Reset pointerEvents
  lights.forEach((light) => (light.style.pointerEvents = 'auto'));
  //Reset background
  body.style.backgroundColor = backgroundColor;
  return;
};

const checkLight = (light) => {
  if (!light.classList.contains('on')) {
    return light.classList.add('on');
  }
  return light.classList.remove('on');
};

const checkNextLight = (nextLight) => {
  if (!nextLight.classList.contains('on')) {
    return nextLight.classList.add('on');
  }
  return nextLight.classList.remove('on');
};

const checkLastLight = (lastLight) => {
  if (!lastLight.classList.contains('on')) {
    return lastLight.classList.add('on');
  }
  return lastLight.classList.remove('on');
};

const checkFinish = () => {
  if (lights.every((light) => light.classList.contains('on'))) {
    //Change background
    body.style.cssText =
      'background-color: rgb(140, 221, 151); transition: background-color 250ms';
    //Change pointerEvents to none
    lights.forEach((light) => (light.style.pointerEvents = 'none'));
    //End timer
    clearInterval(timer);
    return;
  }
  return;
};

const onOff = (light) => {
  const nextLight = lights[lights.indexOf(light) + 1];
  const lastLight = lights[lights.indexOf(light) - 1];

  if (nextLight == undefined) {
    checkLastLight(lastLight);
    checkLight(light);
    checkFinish();
    return;
  } else if (lastLight == undefined) {
    checkNextLight(nextLight);
    checkLight(light);
    checkFinish();
    return;
  } else {
    if (!light.classList.contains('on')) {
      checkNextLight(nextLight);
      checkLastLight(lastLight);
      light.classList.add('on');
      checkFinish();
      return;
    }

    checkNextLight(nextLight);
    checkLastLight(lastLight);
    light.classList.remove('on');
    checkFinish();
    return;
  }
};

/******/
/*Main*/
/******/
customSlider();

lights.forEach((light) => {
  shuffle(light);
});

slider.addEventListener('input', () => {
  updateLights();
  customSlider();
  restartApp();
  return;
});

slider.addEventListener('mouseenter', () => {
  tooltip.classList.remove('hidden');
});

slider.addEventListener('mouseleave', () => {
  tooltip.classList.add('hidden');
});

lights.forEach((light) =>
  light.addEventListener('click', () => {
    updateCounters();
    onOff(light);
  })
);

restart.addEventListener('click', () => {
  restartApp();
  lights.forEach((light) => {
    shuffle(light);
  });
});

// full.addEventListener('click', () => {
//   lights.forEach((light) => {
//     light.classList.add('on');
//     lights[lights.length - 1].classList.remove('on');
//     lights[lights.length - 2].classList.remove('on');
//     lights.forEach((light) => (light.style.pointerEvents = 'auto'));
//     checkFinish();
//   });
// });