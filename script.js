document.getElementById('generate-btn').addEventListener('click', () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1; // Generates 1–100
    document.getElementById('result').textContent = `Random Number: ${randomNumber}`;
  });
  