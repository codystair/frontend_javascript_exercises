let form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();

  let email = document.getElementById('email').value;
  let name = document.getElementById('name').value;

  let request = new XMLHttpRequest();
  request.open('POST', '/api/staff_members');

  let data = { email: email, name: name, };
  let json = JSON.stringify(data);

  request.setRequestHeader('Content-Type', 'application/json');

  request.addEventListener('load', event => {
    if (request.status === 201) {
      let id = JSON.parse(request.response).id;
      alert(`Successfully created staff with id: ${id}`);
    } else {
      alert(request.responseText);
    }
  });

  request.send(json);
});
