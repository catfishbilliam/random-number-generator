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
    if (randomNum <= 0.6) { // 60% chance
      group = "Treatment Group (60%)";
    } else {
      // Assign to sub-control groups (40% split equally into 3 parts)
      const controlNum = randomNum; // Use the same number for further subdivision
      if (controlNum <= 0.7333) { // 60% + 13.33% = 73.33%
        group = "Control Group 1 (13.33%)";
      } else if (controlNum <= 0.8666) { // 73.33% + 13.33% = 86.66%
        group = "Control Group 2 (13.33%)";
      } else { // Remaining 13.33%
        group = "Control Group 3 (13.33%)";
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
