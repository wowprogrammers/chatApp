let texts = ["Welcome to wow chat...", "Lets talk with your loved one's...", "Lets Get Started and connect..."];
let index = 0;
let element = document.getElementById("text");
let text = texts[index];
let charIndex = 0;
let isRevealing = true;

// Function to change the text
function changeText() {
  if (isRevealing) {
    element.innerHTML = text.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === text.length) {
      isRevealing = false;
      setTimeout(changeText, 700); // Display complete text for 2 seconds
    } else {
      setTimeout(changeText, 100); // Delay between each revealed character
    }
  } else {
    element.innerHTML = text.substring(0, charIndex);
    charIndex--;

    if (charIndex === 0) {
      isRevealing = true;
      index = (index + 1) % texts.length;
      text = texts[index];
      setTimeout(changeText, 400); // Delay before revealing the next text
    } else {
      setTimeout(changeText, 100); // Delay between each hidden character
    }
  }
}

// Start the text loop
changeText();