const waitlistForm = document.querySelector("#waitlist-form");
const waitlistStatus = document.querySelector("#waitlist-status");

if (waitlistForm && waitlistStatus) {
  waitlistForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = waitlistForm.querySelector(".waitlist-submit");
    const buttonLabel = submitButton.querySelector(".button-label");
    const buttonLoading = submitButton.querySelector(".button-loading");

    const formData = new FormData(waitlistForm);
    const encodedData = new URLSearchParams(formData);

    waitlistStatus.textContent = "";
    waitlistStatus.className = "form-status";

    submitButton.disabled = true;
    buttonLabel.hidden = true;
    buttonLoading.hidden = false;

    try {
      const response = await fetch(waitlistForm.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encodedData.toString(),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success !== false) {
        waitlistForm.reset();

        waitlistStatus.textContent =
          "You're on the list. Check your inbox for confirmation.";

        waitlistStatus.classList.add("is-success");
      } else if (response.status === 429) {
        throw new Error(
          "Too many signup attempts. Please wait a moment and try again."
        );
      } else {
        throw new Error(
          result?.message ||
            "The signup could not be completed. Please try again."
        );
      }
    } catch (error) {
      console.error("Conduit waitlist signup failed:", error);

      waitlistStatus.textContent =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      waitlistStatus.classList.add("is-error");
    } finally {
      submitButton.disabled = false;
      buttonLabel.hidden = false;
      buttonLoading.hidden = true;
    }
  });
}

// Tracks when a developer actually commits to clicking your TestFlight download link
const testFlightButton = document.getElementById('testflight-download-btn');

testFlightButton.addEventListener('click', () => {
    rdt('track', 'Lead'); // Tells the Reddit Ad dashboard you generated a high-value lead!
});