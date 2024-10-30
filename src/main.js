import PocketBase from 'pocketbase';

const pb = new PocketBase('https://sql-inject.pockethost.io');

async function displayRecords() {
  try {
    const records = await pb.collection('accounts').getFullList({
      sort: '-created',
    });
    console.log("records:", records);

    const recordsContainer = document.getElementById('records');
    recordsContainer.innerHTML = '';

    /*records.forEach(record => {
      const recordElement = document.createElement('div');
      recordElement.textContent = JSON.stringify(record);
      recordsContainer.appendChild(recordElement);
    });
    */
    const uname = records[0].username;
    const pass = records[0].password;
    console.log(uname, pass);
    const recordElement = document.createElement('div');
    recordElement.textContent = JSON.stringify(uname+pass);
    recordsContainer.appendChild(recordElement);
  } catch (error) {
    console.error('Error fetching records:', error);
  }
}

displayRecords();
