let scheduleCount = 0;
let staffMembers = [];
let schedules = [];

function createSchedule(staffMembers) {
  let form = document.querySelector('form');
  let submit = document.getElementById('submit');
  let fieldset = document.createElement('fieldset');
  fieldset.id = `schedule-${scheduleCount}`;
  let legend = document.createElement('legend');
  legend.textContent = `Schedule ${scheduleCount}`;
  let staffLabel = document.createElement('label');
  staffLabel.setAttribute('for', 'name');
  staffLabel.textContent = 'Staff Name:';
  let name = document.createElement('select');
  name.id = 'name';
  staffMembers.forEach(member => {
    let newOption = document.createElement('option');
    newOption.value = String(member.id);
    newOption.textContent = member.name;
    name.appendChild(newOption);
  });
  let dateLabel = document.createElement('label');
  dateLabel.setAttribute('for', 'date');
  dateLabel.textContent = 'Date:';
  let date = document.createElement('input');
  date.id = 'date';
  date.type = 'text';
  date.setAttribute('placeholder', 'mm-dd-yy');
  let timeLabel = document.createElement('label');
  timeLabel.setAttribute('for', 'time');
  timeLabel.textContent = 'Time:';
  let time = document.createElement('input');
  time.id = 'time';
  time.type = 'text';
  time.setAttribute('placeholder', 'hh:mm');

  fieldset.appendChild(legend);
  fieldset.appendChild(staffLabel);
  fieldset.appendChild(name);
  fieldset.appendChild(dateLabel);
  fieldset.appendChild(date);
  fieldset.appendChild(timeLabel);
  fieldset.appendChild(time);
  form.insertBefore(fieldset, submit);
}

(function () {
  let request = new XMLHttpRequest();
  request.open('GET', '/api/staff_members');
  request.responseType = 'json';
  request.send();
  request.addEventListener('load', event => {
    staffMembers = request.response;
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  let addButton = document.getElementById('add');
  let form = document.querySelector('form');

  addButton.addEventListener('click', event => {
    event.preventDefault();
    scheduleCount += 1;
    createSchedule(staffMembers);
    schedules.push(document.getElementById(`schedule-${scheduleCount}`));
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    let data = { schedules: [] };

    let request = new XMLHttpRequest();
    request.open('POST', '/api/schedules');
    request.setRequestHeader('Content-Type', 'application/json');    

    schedules.forEach(schedule => {
      let id = Number(schedule.querySelector('#name').value);
      let date = schedule.querySelector('#date').value;
      let time = schedule.querySelector('#time').value;

      data.schedules.push({
        staff_id: id,
        date: date,
        time: time,
      });
    });

    let json = JSON.stringify(data);

    request.send(json);

    request.addEventListener('load', event => {
      switch(request.status) {
        case 201:
          alert('Schedule added!');
          form.reset();
          break;
        case 400:
          alert(request.responseText);
      }
    });
  });
});
