const formDOM = document.querySelector('.form')
const nam = document.querySelector('#Name');
const mail = document.querySelector('#email');
const pass = document.querySelector('#password');
const mobile = document.querySelector('#personalmobile');
const Blood = document.querySelector('#Bloodgroup');
const PT = document.querySelector('#PTC');

const addon = document.querySelector('.alertbox');




formDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  const Name = nam.value
  const email = mail.value
  const password = pass.value
  const personalmobile = mobile.value
  const Bloodgroup = Blood.value
  const PTC = PT.value
  try {
    const { data } = await axios.post('/register', { Name, email, password, personalmobile, Bloodgroup, PTC });
    console.log(data);
    if (data.message == "success") {
      nam.value='';
      mail.value='';
      pass.value='';
      mobile.value='';
      Blood.value='';
      PT.value='';
      window.location.href = "login.html";
    }
  } catch (error) {
    addon.innerHTML = `<div class="alert alert-primary alert-dismissible fade show" role="alert">
    <strong> ${error.response.data.message}</strong>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>`
  }

})






