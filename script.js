document.getElementById('generate-btn').addEventListener('click', () => {
    // Generate a random number between 0 and 1
    const randomNum = Math.random(); 
  
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
  
    // Display the result
    document.getElementById('result').textContent = `Assigned to: ${group}`;
  });
  