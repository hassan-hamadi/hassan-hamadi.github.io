import PocketBase from 'pocketbase';

const pb = new PocketBase('https://sql-inject.pockethost.io');

// Function to handle login form submission
async function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message'); // Error message container

  try {
    // Clear previous error message
    errorMessage.textContent = '';
    errorMessage.style.color = 'red'; // Default color for error messages

    const records2 = await pb.collection('accounts').getFullList({
      sort: '-created',
    });
    const uname = records2[0].username;
    const pass = records2[0].password;
    console.log("records2:", records2);

    let correct = false;
    console.log(username==uname);
    console.log(password==pass);
    if(username==uname && password==pass){
      correct = true;
      console.log('crr, ', correct);
    } else { correct = false; }

    // Querying the database in a way that could be vulnerable to SQL injection
    //const query = `username='${username}' AND password='${password}'`;

    //const records = await pb.collection('users').getFirstListItem(query);

    //const records = await pb.collection('posts').getFirstListItem('username="admin" AND password="password"');
    
    //console.log("records:", records);

    if (correct) {
      errorMessage.style.color = 'green';
      errorMessage.textContent = 'Login successful!';
    } else {
      errorMessage.textContent = 'Invalid username or password';
    }
  } catch (error) {
    console.error('Error during login:', error);
    errorMessage.textContent = 'An error occurred while trying to log in. Please try again later.';
  }
}

// Attach the form submit event to handleLogin function
document.getElementById('loginForm').addEventListener('submit', handleLogin);
