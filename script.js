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
  const treatmentCount = Math.floor(participantCount * 0.6); // 60%
  const controlCount = participantCount - treatmentCount;    // 40%
  const controlSubCount = Math.floor(controlCount / 3);      // Divide remaining 40% into 3 equal parts
  const extra = controlCount % 3; // Handle uneven splits

  let control1Count = controlSubCount;
  let control2Count = controlSubCount;
  let control3Count = controlSubCount;

  // Distribute any leftover participants due to rounding
  if (extra > 0) control1Count++;
  if (extra > 1) control2Count++;

  // Counters for each group
  let treatmentAssigned = 0;
  let control1Assigned = 0;
  let control2Assigned = 0;
  let control3Assigned = 0;

  // Generate random numbers and assign groups
  for (let i = 0; i < participantCount; i++) {
    const randomNum = Math.random(); // Generate random number between 0 and 1
    let group = "";

    if (treatmentAssigned < treatmentCount) {
      group = "Treatment Group (60%)";
      treatmentAssigned++;
    } else if (control1Assigned < control1Count) {
      group = "Control Group 1 - Cats vs. Dogs (13.33%)";
      control1Assigned++;
    } else if (control2Assigned < control2Count) {
      group = "Control Group 2 - Best Music Genre (13.33%)";
      control2Assigned++;
    } else {
      group = "Control Group 3 - Best Airline (13.33%)";
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
  csvContent += "Participant ID,Random Number,Group Assignment\n";

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
