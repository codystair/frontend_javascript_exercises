function getSchedules() {
  let request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:3000/api/schedules');
  request.responseType = 'json';
  request.timeout = 5000;
  
  request.addEventListener('load', event => {
    let schedules = request.response;
    let result = {};

    if (schedules.length === 0) {
      console.log('There are currently no schedules availabe for booking.');
    }

    schedules.forEach(schedule => {
      let id = `staff ${schedule.staff_id}`;

      if (result[id]) {
        result[id] += 1;
      } else {
        result[id] = 1;
      }
    });

    console.log(result);
  });

  request.addEventListener('timeout', event => {
    request.abort();
    console.log("Your request timed out.  Please try again.");
  });

  request.addEventListener('loadend', event => {
    console.log('Request completed.');
  });

  request.send();
}
