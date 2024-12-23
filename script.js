// Store data for CSV download
let records = [];

// Event listener for generating a random number
document.getElementById('generate-btn').addEventListener('click', () => {
  // Generate a random number between 0 and 1
  const randomNum = Math.random();

  // Display the number
  document.getElementById('result').textContent = `Random Number: ${randomNum.toFixed(4)}`;

  let group = ""; // Variable to store group assignment

  // Assign to treatment or control group
  if (randomNum <= 0.6) {
    group = "Treatment Group (60%)";
  } else {
    // Further randomize within the control group
    if (randomNum <= 0.73) {  // 0.6 to 0.73 (13.33%)
      group = "Control Group 1";
    } else if (randomNum <= 0.86) {  // 0.73 to 0.86 (13.33%)
      group = "Control Group 2";
    } else {  // 0.86 to 1.0 (13.33%)
      group = "Control Group 3";
    }
  }

  // Display group assignment
  document.getElementById('group').textContent = `Assigned to: ${group}`;

  // Save to records
  records.push({ number: randomNum.toFixed(4), group });

  console.log(records); // Debugging - logs data to console
});

// Event listener for downloading CSV
document.getElementById('download-btn').addEventListener('click', () => {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Random Number,Group Assignment\n";

  records.forEach(row => {
    csvContent += `${row.number},${row.group}\n`;
  });

  // Create a download link
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'random_group_assignments.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
