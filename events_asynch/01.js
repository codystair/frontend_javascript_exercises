function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(...callbacks) {
  var callbackInterval;
  var counter = 1;
  var id = setInterval(function() {
    console.log(counter);
    counter += 1;

    if (counter >= 2 * callbacks.length) {
      clearInterval(id);
    }
  }, 1000);

  callbacks.forEach(cb => {
    callbackInterval = Math.floor(Math.random() * callbacks.length * 2);
    setTimeout(cb, callbackInterval * 1000);
  });
}

randomizer(callback1, callback2, callback3);
