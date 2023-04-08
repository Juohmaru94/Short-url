// Get the input and button elements
const urlInput = document.querySelector(".url-input");
const submitBtn = document.querySelector(".submit-btn");
const warningMessage = document.querySelector(".warning-message");
const successMessage = document.querySelector(".success-message");

// Get the div element that will display the shortened URL
const shortUrlContainer = document.querySelector(".short-url-container");

// Add an event listener to the form element for the "submit" event
submitBtn.addEventListener("click", async (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  //Reset state of previous messages
  warningMessage.classList.add("hidden");
  successMessage.classList.add("hidden");
  warningMessage.classList.add("warning-message");
  warningMessage.classList.add("success-message");

  // Get the original URL from the input field
  const originalUrl = urlInput.value;

  // Check if the URL is valid
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  if (!urlPattern.test(originalUrl)) {
    const warningMessage = document.querySelector(".warning-message");
    warningMessage.innerText = "Please enter a valid URL";
    warningMessage.classList.remove("hidden");
    warningMessage.classList.remove("success-message");
    warningMessage.classList.add("warning-message");
    shortUrlContainer.style.display = "none";
    return;
  }

  // Send a POST request to the Bitly API to shorten the URL
  const response = await fetch(`https://api-ssl.bitly.com/v4/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 21e36b0ae920b7d968e70e26073479e01ddc659d",
    },
    body: JSON.stringify({ long_url: originalUrl }),
  });

  // Parse the response as JSON
  const data = await response.json();
  successMessage.innerText = "Your shortened link is ready!";
  successMessage.classList.remove("hidden");
  successMessage.classList.remove("warning-message");
  successMessage.classList.add("success-message");
  // Get the shortened URL from the response data
  const shortUrl = data.link;

  // Update the contents of the short URL container with the shortened URL
  shortUrlContainer.style.display = "block";
  // Make the short URL container visible
  shortUrlContainer.textContent = shortUrl;
});
