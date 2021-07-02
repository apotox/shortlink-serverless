
const AUTH0_CLIENT_ID = 'UOsO5CgQ3WhqosVrDiRy0O7O0B4ktRS2';
const AUTH0_DOMAIN = 'dev--qn37npy.eu.auth0.com';
const AUTH0_CALLBACK_URL = 'https://bd1db851516d.ngrok.io/dev'; // eslint-disable-line
const PUBLIC_ENDPOINT = 'https://bd1db851516d.ngrok.io/dev';
const PRIVATE_ENDPOINT = 'https://bd1db851516d.ngrok.io/dev/';

// initialize auth0 lock
const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, { // eslint-disable-line no-undef

  auth: {
    params: {
      scope: 'openid email',
    },
    responseType: 'token id_token',
  },
});

function updateUI() {
  const isLoggedIn = localStorage.getItem('id_token');
  if (isLoggedIn) {
    // swap buttons
    document.getElementById('btn-login').style.display = 'none';
    document.getElementById('btn-logout').style.display = 'inline';
    const profile = JSON.parse(localStorage.getItem('profile'));
    // show username
    document.getElementById('nick').textContent = profile.email;
  }
}

// Handle login
lock.on('authenticated', (authResult) => {
  console.log(authResult);
  lock.getUserInfo(authResult.accessToken, (error, profile) => {
    if (error) {
      // Handle error
      return;
    }

    document.getElementById('nick').textContent = profile.nickname;

    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));

    updateUI();
  });
});

updateUI();

// Handle login
document.getElementById('btn-login').addEventListener('click', () => {
  lock.show();
});

// Handle logout
document.getElementById('btn-logout').addEventListener('click', () => {
  localStorage.removeItem('id_token');
  localStorage.removeItem('access_token');
  localStorage.removeItem('profile');
  document.getElementById('btn-login').style.display = 'flex';
  document.getElementById('btn-logout').style.display = 'none';
  document.getElementById('nick').textContent = '';
});


// Handle private api call
document.getElementById('btn-private').addEventListener('click', () => {
  // Call private API with JWT in header
  const token = localStorage.getItem('id_token');
  
   // block request from happening if no JWT token present
   if (!token) {
    alert('You must login to short a link!')
    return false
  }

  const payload = {
    linkUrl: document.getElementById('long-url').value
  }
  // Do request to private endpoint
  fetch(PRIVATE_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then((data) => {
      console.log('Token:', data);
      document.getElementById('message').textContent = '';
      document.getElementById('message').textContent = `https://bd1db851516d.ngrok.io/dev/l/${data.linkId}`;
    })
    .catch((e) => {
      console.log('error', e);
    });
});
