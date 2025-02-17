export default function decorate(block) {
  const formHTML = `
      <form class="feedback-form">
          <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" id="name" name="name" required>
              <span class="error-message"></span>
          </div>
          <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required>
              <span class="error-message"></span>
          </div>
          <div class="form-group">
              <label for="experience">Experience:</label>
              <select id="experience" name="experience" required>
                  <option value="">Select</option>
                  <option value="Good">Good</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Bad">Bad</option>
              </select>
              <span class="error-message"></span>
          </div>
          <div class="form-group">
              <label for="comments">Comments:</label>
              <input type="text" id="comments" name="comments" required>
              <span class="error-message"></span>
          </div>
          <button type="submit">Submit</button>
      </form>
  `;

  block.innerHTML = formHTML;
  const form = block.querySelector(".feedback-form");

  function validateField(input) {
      const errorSpan = input.nextElementSibling;
      errorSpan.textContent = "";

      if (!input.value.trim()) {
          errorSpan.textContent = "This field is required.";
          return false;
      }

      if (input.id === "name" && !/^[A-Za-z\s]+$/.test(input.value)) {
          errorSpan.textContent = "Name should contain only letters.";
          return false;
      }

      if (input.id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          errorSpan.textContent = "Enter a valid email address.";
          return false;
      }

      return true;
  }

  form.addEventListener("submit", async function (event) {
      event.preventDefault();

      let isValid = true;
      form.querySelectorAll("input, select").forEach((input) => {
          if (!validateField(input)) {
              isValid = false;
          }
      });

      if (!isValid) return;

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
          const response = await fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
              method: "POST",
              body: JSON.stringify(data),
              headers: { "Content-Type": "application/json" },
          });

          const result = await response.json();

          alert(result.message || "Feedback submitted successfully!");
          form.reset();
      } catch (error) {
          console.error("Error submitting feedback:", error);
          alert("Failed to submit feedback. Please try again.");
      }
  });

  form.querySelectorAll("input, select").forEach((input) => {
      input.addEventListener("input", () => validateField(input));
  });
}
