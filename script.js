const form = document.getElementById('myForm');
const password1 = document.getElementById('pswrd1');
const password2 = document.getElementById('pswrd2');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (password1.value !== password2.value) {
    password1.classList.add('shake');
    password2.classList.add('shake');

    setTimeout(function () {
      password1.classList.remove('shake');
      password2.classList.remove('shake');
    }, 300);
  }
});