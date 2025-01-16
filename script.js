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

  // Calculate quotas
  const treatmentQuota = Math.floor(participantCount * 0.6); // 60% for treatment
  const controlQuota = participantCount - treatmentQuota;    // Remaining 40% for control

  let treatmentAssigned = 0;
  let controlAssigned = 0;

  // Generate random numbers and assign groups
  for (let i = 0; i < participantCount; i++) {
    const randomNum = Math.random(); // Generate random number between 0 and 1
    let group = "";

    // Assign based on random number thresholds
    if (randomNum <= 0.6 && treatmentAssigned < treatmentQuota) {
      group = "Treatment Group (60%)";
      treatmentAssigned++;
    } else {
      group = "Control Group (40%)";
      controlAssigned++;
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
  const downloadFilename = "matched_group_assignments.csv";
  link.setAttribute('download', downloadFilename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
