var classificationOptions = {
  Vertebrate: ['Animals', 'Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  'Warm-blooded': ['Animals', 'Bear', 'Whale', 'Ostrich'],
  'Cold-blooded': ['Animals', 'Salmon', 'Turtle'],
  Mammal: ['Animals', 'Bear', 'Whale'],
  Bird: ['Animals', 'Ostrich'],
};

var animalOptions = {
  Bear: ['Classifications', 'Vertebrate', 'Warm-blooded', 'Mammal'],
  Turtle: ['Classifications', 'Vertebrate', 'Cold-blooded'],
  Whale: ['Classifications', 'Vertebrate', 'Warm-blooded', 'Mammal'],
  Salmon: ['Classifications', 'Vertebrate', 'Cold-blooded'],
  Ostrich: ['Classifications', 'Vertebrate', 'Warm-blooded', 'Bird'],
};

var classifications = document.getElementById('animal-classifications');
var animals = document.getElementById('animals');
var clearBtn = document.getElementById('clear');

classifications.addEventListener('change', function(event) {
  var selection = event.target.value;
  var valid = classificationOptions[selection];
  Array.from(animals.children).forEach(option => {
    if (!valid.includes(option.value)) {
      option.classList.add('hide');
    }
  });
});

animals.addEventListener('change', function(event) {
  var selection = event.target.value;
  var valid = animalOptions[selection];
  Array.from(classifications.children).forEach(option => {
    if (!valid.includes(option.value)) {
      option.classList.add('hide');
    }
  });
});

clearBtn.addEventListener('click', function(event) {
  Array.from(animals.children).forEach(option => {
    option.classList.remove('hide');
  });
  Array.from(classifications.children).forEach(option => {
    option.classList.remove('hide');
  });
});
