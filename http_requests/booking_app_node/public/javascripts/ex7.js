function cancelSchedule(id) {
  let xhr = new XMLHttpRequest();
  xhr.open('DELETE', `/api/schedules/${id}`);
  xhr.addEventListener('load', event => {
    switch(xhr.status) {
      case 204:
        alert('Schedule cancelled!');
        break;
      case 403:
        alert(xhr.responseText);
        break;
    }
  });
  xhr.send();
}

function cancelBooking(id) {
  let xhr = new XMLHttpRequest();
  xhr.open('PUT', `/api/bookings/${id}`);
  xhr.addEventListener('load', event => {
    switch(xhr.status) {
      case 204:
        alert('Booking cancelled!');
        break;
      case 404:
        alert(xhr.responseText);
        break;
    }
  });
  xhr.send();
}
