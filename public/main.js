// Add click listeners to horn button and all name buttons
document.querySelector("#hornBtn").addEventListener("click", sendMessage);

const nameButtons = document.querySelectorAll(".name-button");
nameButtons.forEach((button) =>
  button.addEventListener("click", toggleNameButton)
);

// Toggle name buttons when they are selected
function toggleNameButton(e) {
  const name = e.target.htmlFor;

  if (document.getElementById(name).checked !== true) {
    this.classList.add("name-button-toggled");
    e.target.checked = true;
  } else {
    this.classList.remove("name-button-toggled");
    e.target.checked = false;
  }
}

async function sendMessage(e) {
  e.preventDefault();
  const message = document.querySelector("#msg").value;

  // Get recipients from toggled name buttons
  let recipients = [];
  document.querySelectorAll(".name-button").forEach((element) => {
    if (document.getElementById(element.htmlFor).checked) {
      recipients.push(element.htmlFor);
    }
  });
  document.querySelector("#hornSound").play();

  try {
    // Translate message with call to server
    const response = await axios.post("/translate", {
      message: message,
      recipients: recipients,
    });
    const translatedMessage = response.data.message;
    window.alert("Sent the following message: " + translatedMessage);
  } catch (error) {
    console.error("error", error);
  }
  // Clear message box
  document.getElementById("msg").value = "";
}
