// Store data for CSV download
let records = [];
let matchedRecords = [];

// Event listener for generating random numbers
document.getElementById('generate-btn').addEventListener('click', () => {
  // Clear previous results
  records = [];
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = "";

  // Get the number of participants
  const participantCount = parseInt(document.getElementById('participant-count').value, 10);

  // Quotas for control subgroups
  const controlQuota = Math.floor(participantCount * 0.4);    // 40% for control groups
  const controlSubQuota = Math.floor(controlQuota / 3);       // Divide 40% into 3 subgroups

  let treatmentAssigned = 0;
  let control1Assigned = 0;
  let control2Assigned = 0;
  let control3Assigned = 0;

  // Generate random numbers and assign groups
  for (let i = 0; i < participantCount; i++) {
    const randomNum = Math.random(); // Generate random number between 0 and 1
    let group = "";

    // Assign based on random number thresholds
    if (randomNum <= 0.6) {
      group = "Treatment Group (60%)";
      treatmentAssigned++;
    } else if (randomNum > 0.6 && randomNum <= 0.7333 && control1Assigned < controlSubQuota) {
      group = "Control Group 1 - Best Genres of Music (13.33%)";
      control1Assigned++;
    } else if (randomNum > 0.7333 && randomNum <= 0.8666 && control2Assigned < controlSubQuota) {
      group = "Control Group 2 - Favorite Airline (13.33%)";
      control2Assigned++;
    } else {
      group = "Control Group 3 - Cats vs. Dogs (13.33%)";
      control3Assigned++;
    }

    // Display result
    const resultText = `Participant ${i + 1}: ${randomNum.toFixed(4)} → ${group}`;
    const resultItem = document.createElement('p');
    resultItem.textContent = resultText;
    resultsContainer.appendChild(resultItem);

    // Save to records
    records.push({ number: randomNum.toFixed(4), group });
  }

  alert("Random numbers and groups generated! Now enter participant IDs.");
});

// Event listener for matching IDs
document.getElementById('match-btn').addEventListener('click', () => {
  const idInput = document.getElementById('participant-ids').value;
  const participantIDs = idInput.split(",").map(id => id.trim()); // Get IDs as an array

  // Check if IDs match the number of participants
  if (participantIDs.length !== records.length) {
    alert("Error: Number of participant IDs must match the number of generated participants.");
    return;
  }

  // Match IDs to records
  matchedRecords = records.map((record, index) => ({
    id: participantIDs[index],
    number: record.number,
    group: record.group
  }));

  alert("Participant IDs matched successfully!");
  console.log(matchedRecords); // For debugging
});

// Event listener for downloading CSV
document.getElementById('download-btn').addEventListener('click', () => {
  let csvContent = "data:text/csv;charset=utf-8,";

  // Add headers
  csvContent += "Participant ID,Random Number,Group Assignment\n";

  // Add data rows
  matchedRecords.forEach(row => {
    csvContent += `${row.id},${row.number},${row.group}\n`;
  });

  // Create a download link
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'matched_group_assignments.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
