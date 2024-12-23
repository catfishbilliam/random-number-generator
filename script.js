// Store data for CSV download
let records = [];

// Event listener for generating random numbers
document.getElementById('generate-btn').addEventListener('click', () => {
  // Clear previous results
  records = [];
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = "";

  // Get the number of participants
  const participantCount = parseInt(document.getElementById('participant-count').value, 10);

  // Generate random numbers and assign groups
  for (let i = 0; i < participantCount; i++) {
    const randomNum = Math.random(); // Generate random number between 0 and 1
    let group = "";

    // Assign to treatment or control group
    if (randomNum <= 0.6) {
      group = "Treatment Group (60%)";
    } else {
      // Further randomize within the control group
      if (randomNum <= 0.73) {
        group = "Control Group 1";
      } else if (randomNum <= 0.86) {
        group = "Control Group 2";
      } else {
        group = "Control Group 3";
      }
    }

    // Display result
    const resultText = `Participant ${i + 1}: ${randomNum.toFixed(4)} → ${group}`;
    const resultItem = document.createElement('p');
    resultItem.textContent = resultText;
    resultsContainer.appendChild(resultItem);

    // Save to records
    records.push({ participant: i + 1, number: randomNum.toFixed(4), group });
  }
});

// Event listener for downloading CSV
document.getElementById('download-btn').addEventListener('click', () => {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Participant,Random Number,Group Assignment\n";

  records.forEach(row => {
    csvContent += `${row.participant},${row.number},${row.group}\n`;
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
