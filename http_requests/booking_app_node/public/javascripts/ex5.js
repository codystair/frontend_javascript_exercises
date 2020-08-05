let schedules = document.getElementById('schedules');
let email = document.getElementById('email');
let form = document.querySelector('form');

let scheduleData = [];
(function() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/schedules');
  xhr.responseType = 'json';
  xhr.addEventListener('load', event => {
    scheduleData = xhr.response;
  });
  xhr.send();
})();

let staffs = [];
(function() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/staff_members');
  xhr.responseType = 'json';
  xhr.addEventListener('load', event => {
    staffs = xhr.response;
  });
  xhr.send();
})();

function formatSchedule(schedule) {
  let staffName = staffs.filter(staff => staff.id === schedule.staff_id)[0].name;
  return `${staffName} | ${schedule.date} | ${schedule.time}`;
}

function populateSchedules(scheduleData) {
  while (schedules.lastChild) {
    schedules.lastChild.remove();
  }

  scheduleData.filter(schedule => schedule.student_email === null)
              .forEach(schedule => {
                let newOption = document.createElement('option');
                newOption.id = schedule.id;
                newOption.textContent = formatSchedule(schedule);
                schedules.appendChild(newOption);
  });
}

function newStudent(email, bookingSeq) {
  let div = document.createElement('div');
  div.style.backgroundColor = 'beige';
  document.body.appendChild(div);

  let heading = document.createElement('h1');
  heading.textContent = 'Please provide new student details';
  div.appendChild(heading);

  let newForm = document.createElement('form');
  div.appendChild(newForm);

  let emailLabel = document.createElement('label');
  emailLabel.setAttribute('for', 'newEmail');
  emailLabel.textContent = 'Email:';
  newForm.appendChild(emailLabel);

  let newEmail = document.createElement('input');
  newEmail.type = 'email';
  newEmail.id = 'newEmail';
  newEmail.value = email;
  newForm.appendChild(newEmail);

  let nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'name');
  nameLabel.textContent = 'Name:';
  newForm.appendChild(nameLabel);

  let name = document.createElement('input');
  name.type = 'text';
  name.id = 'name';
  newForm.appendChild(name);

  let bookingLabel = document.createElement('label');
  bookingLabel.setAttribute('for', 'booking');
  bookingLabel.textContent = 'Booking Sequence:';
  newForm.appendChild(bookingLabel);

  let booking = document.createElement('input');
  booking.type = 'text';
  booking.id = 'booking';
  booking.value = bookingSeq;
  newForm.appendChild(booking);

  let submit = document.createElement('input');
  submit.type = 'submit';
  newForm.appendChild(submit);

  newForm.addEventListener('submit', event => {
    event.preventDefault();

    let data = { email: email, name: name.value, booking_sequence: Number(booking.value) };
    let json = JSON.stringify(data);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/students');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', event => {
      alert(xhr.responseText);
      if (xhr.status === 201) {
        let options = Array.from(document.querySelectorAll('option'));
        let scheduleId = options.filter(option => option.selected)[0].id;
        let data = { id: scheduleId, student_email: email.value };
        let json = JSON.stringify(data);
        
        (function() {
          let xhr = new XMLHttpRequest();
          xhr.open('POST', '/api/bookings');
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.addEventListener('load', event => {
            alert('Booked!');
          });
          xhr.send(json);
        })();
      }
    });
    xhr.send(json);
  });
}

schedules.addEventListener('click', event => {
  populateSchedules(scheduleData);
});

form.addEventListener('submit', event => {
  event.preventDefault();

  let options = Array.from(document.querySelectorAll('option'));
  let scheduleId = options.filter(option => option.selected)[0].id;
  let data = { id: scheduleId, student_email: email.value };
  let json = JSON.stringify(data);
  
  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/bookings');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('load', event => {
    switch (xhr.status) {
      case 404:
        alert(xhr.responseText);
        let bookingSeq = xhr.responseText.split('booking_sequence')[1].slice(2);
        // call newStudent(email.value)
        newStudent(email.value, bookingSeq);
        break;
      case 204:
        alert('Schedule has been booked!');
        break;
    }
  });
  xhr.send(json);
});
