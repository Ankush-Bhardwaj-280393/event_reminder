function getMonthDayString() {
  // Get today's date
  const today = new Date();

  // Get month and day, ensuring leading zeros
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, '0');

  // Create the MM-DD string
  const monthDayString = `${month}-${day}`;

  return monthDayString;
}

fetch('../data/birthday_json.json') // Fetch JSON data
// fetch('https://ankush-bhardwaj-280393.github.io/event_reminder/data/birthday_json.json') // Fetch JSON data
  .then(response => response.json()) // Convert response to JSON
  .then(birthdays_json => {
      // Filter users based on birthday
      const today_birthday = birthdays_json.birthdays.filter(birthday => birthday.birthday_str === getMonthDayString());

      // Select the div where filtered data will be displayed
      const userInfoDiv = document.getElementById('birthdays');

      // Generate HTML for filtered users
      if (today_birthday.length > 0) {
          userInfoDiv.innerHTML = "<u><h3>Today's Birthdays</h3></u> <br>" +
          today_birthday.map(birthday => `
              <p><strong>Name:</strong> ${birthday.Name}</p>
              <br>
          `).join('');
      } else {
          userInfoDiv.innerHTML = "<u><h3>Today's Birthdays</h3></u> <br>"+
          "<p>No birthdays today.</p>";
      }

  })
  .catch(error => console.error('Error fetching data:', error));


fetch('../data/anniversary_json.json') // Fetch JSON data
  .then(response => response.json()) // Convert response to JSON
  .then(anniversary_json => {
      // Filter users based on birthday
      const today_anniversary = anniversary_json.anniversaries.filter(anniversary => anniversary.anniversary_str === getMonthDayString());

      // Select the div where filtered data will be displayed
      const userInfoDiv = document.getElementById('anniversaries');

      // Generate HTML for filtered users
      if (today_anniversary.length > 0) {
          userInfoDiv.innerHTML = "<u><h3>Today's Anniversaries</h3></u> <br>"+
          today_anniversary.map(anniversary => `
              <p><strong>Name:</strong> ${anniversary.Name}</p>
              <p><strong>Spouse:</strong> ${anniversary.Spouse}</p>
              <br>
          `).join('');
      } else {
          userInfoDiv.innerHTML = "<u><h3>Today's Anniversaries</h3></u> <br>"+
          "<p>No Anniversary today.</p>";
      }

  })
  .catch(error => console.error('Error fetching data:', error));