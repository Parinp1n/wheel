
// Immediately invoked function expression
// to not pollute the global scope
(function() {
  const wheel = document.querySelector('.wheel');
  const startButton = document.querySelector('.button');
  const display = document.querySelector('.display');

  let deg = 72
  let zoneSize = 62; // deg

  // Counter clockwise
  const symbolSegments = {
    1: { name: "SAD AEROBIC", videoId: "g-B7tpa7Ilc" },
    2: { name: "สิฮิน้องบ่", videoId: "yU8rnrnXSMo" },
    3: { name: "จินนี่จ๋า", videoId: "nii-jnwBiqY" },
    4: { name: "ธาตุทองซาวด์", videoId: "EduAOS7yXHg" },
    5: { name: "Taki Taki", videoId: "VZOBjI-Vm8w" },
  };

  const handleWin = (actualDeg) => {
    const winningSymbol = symbolSegments[Math.ceil(actualDeg / zoneSize)];
    display.innerHTML = winningSymbol.name;
    window.open(`https://www.youtube.com/watch?v=${winningSymbol.videoId}`, '_blank');
  };

  startButton.addEventListener('click', () => {
    // Reset display
    display.innerHTML = "-";
    // Disable button during spin
    startButton.style.pointerEvents = 'none';
    // Calculate a new rotation between 5000 and 10 000
    deg = Math.floor(5000 + Math.random() * 5000);
    // Set the transition on the wheel
    wheel.style.transition = 'all 5s ease-out';
    // Rotate the wheel
    wheel.style.transform = `rotate(${deg}deg)`;
    // Apply the blur
    wheel.classList.add('blur');
  });

  wheel.addEventListener('transitionend', () => {
    // Remove blur
    wheel.classList.remove('blur');
    // Enable button when spin is over
    startButton.style.pointerEvents = 'auto';
    // Need to set transition to none as we want to rotate instantly
    wheel.style.transition = 'none';
    // Calculate degree on a 360 degree basis to get the "natural" real rotation
    // Important because we want to start the next spin from that one
    // Use modulus to get the rest value
    const actualDeg = deg % 360;
    // Set the real rotation instantly without animation
    wheel.style.transform = `rotate(${actualDeg}deg)`;
    // Calculate and display the winning symbol
    handleWin(actualDeg);
  });
})();