let dateList = document.getElementById('date-list');

let dates = [];
(() => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/bookings');
  xhr.responseType = 'json';
  xhr.addEventListener('load', event => {
    dates = xhr.response;
    populateDates(dates);
  });
  xhr.send();
})();

function populateDates(dates) {
  dates.forEach(date => {
    let bookings = [];
    let li = document.createElement('li');
    let link = document.createElement('a');

    link.textContent = date;

    link.addEventListener('click', event => {
      // event.preventDefault();

      let ul = document.createElement('ul');
      (() => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/bookings/' + date);
        xhr.responseType = 'json';
        xhr.addEventListener('load', event => {
          bookings = xhr.response;
          bookings.forEach(booking => {
            let li = document.createElement('li');
            li.textContent = booking.join(' | ');
            ul.appendChild(li);
          });
          li.appendChild(ul);
        });
        xhr.send();
      })();

      

      
    });
    li.appendChild(link);
    dateList.appendChild(li);
  });
}

