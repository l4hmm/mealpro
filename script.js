function scrollToNextSection(nextSectionId) {
  const nextSection = document.getElementById(nextSectionId);
  window.scrollTo({
    top: nextSection.offsetTop,
    behavior: 'smooth'
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Select sections
  const step1Section = document.querySelector("section.steps.protein"); // Fixed to target the section, not just the card
  const step2Section = document.querySelector("section.steps.carb");
  const step3Section = document.querySelector("section.steps.ChosenMeal");
  const step4Section = document.querySelector("section.steps.slectectMeal");

  // Select Step 1, Step 2, and Step 3 cards
  const step1Cards = document.querySelectorAll("section.steps.protein .card");
  const step2Cards = document.querySelectorAll("section.steps.carb .card");
  const step3Cards = document.querySelectorAll("section.steps.ChosenMeal .card");

  const mealRefSpan = document.querySelector('.mealRef span');
  // Reference to Step 4 container
  const step4Container = step4Section.querySelector(".card-container");

  // Track selected items
  let selectedProtein = null;
  let selectedCarb = null;
  let selectedMeal = null;
  let previouslySelectedMeal = null;  // To track previous selection for the second card
  let selectedIconStyle = "";  // To store the icon style for the second card

  // Hide Steps 3 and 4 initially
  step3Section.style.display = "none";
  step4Section.style.display = "none";

  // Function to update Step 3 visibility
  const updateStep3Visibility = () => {
    if (selectedProtein && selectedCarb) {
      step3Section.style.display = "block"; // Show Step 3

      setTimeout(() => {
        step3Section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    } else {
      step3Section.style.display = "none"; // Hide Step 3
      step4Section.style.display = "none"; // Always hide Step 4 if Step 3 is hidden
    }
  };

  // Handle Step 1: Card click for protein selection
  step1Cards.forEach((card) => {
    card.addEventListener("click", () => {
      // Toggle selection
      if (selectedProtein === card) {
        selectedProtein = null;
        card.classList.remove("selected");
      } else {
        if (selectedProtein) selectedProtein.classList.remove("selected");
        selectedProtein = card;
        card.classList.add("selected");
      }

      // Update Step 3 visibility
      updateStep3Visibility();
    });
  });

  // Handle Step 2: Card click for carb selection
  step2Cards.forEach((card) => {
    card.addEventListener("click", () => {
      // Toggle selection
      if (selectedCarb === card) {
        selectedCarb = null;
        card.classList.remove("selected");
      } else {
        if (selectedCarb) selectedCarb.classList.remove("selected");
        selectedCarb = card;
        card.classList.add("selected");
      }

      // Update Step 3 visibility
      updateStep3Visibility();
    });
  });

  // Handle Step 3: Meal selection
  step3Cards.forEach((card) => {
    card.addEventListener("click", () => {
      // Highlight selected meal
      step3Cards.forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");

      selectedMeal = card;

      // Extract meal details
      const mealName = card.querySelector("h2").textContent;
      const mealImageSrc = card.querySelector("img").src;
      const mealDescription = card.querySelector("p").textContent;

      // Extract and store icon styling (background color or other styles)
      const iconElement = card.querySelector(".card-icon");
      selectedIconStyle = getComputedStyle(iconElement).cssText; // Capture all inline styles

      // Clear Step 4 container
      while (step4Container.firstChild) {
        step4Container.removeChild(step4Container.firstChild);
      }

      // Create elements for the selected meal in Step 4
      const mealCard = document.createElement("div");
      mealCard.classList.add("card");

      // Create a new icon element and apply the styles from the selected protein card
      const newIconElement = document.createElement("div");
      newIconElement.classList.add("card-icon");
      newIconElement.style.cssText = selectedIconStyle; // Apply the stored styles from Step 3 icon

      const mealTitle = document.createElement("h2");
      mealTitle.textContent = mealName;

      const mealImage = document.createElement("img");
      mealImage.src = mealImageSrc;
      mealImage.alt = "Selected Meal";

      const mealText = document.createElement("p");
      mealText.textContent = mealDescription;

      const mealButton = document.createElement("button");
      mealButton.textContent = "Check out Recipe!";
      mealButton.classList.add("button");

      // Append elements to Step 4 container
      mealCard.appendChild(newIconElement); // Append the new icon with style
      mealCard.appendChild(mealTitle); // Add the title
      mealCard.appendChild(mealImage);
      mealCard.appendChild(mealText);
      mealCard.appendChild(mealButton);
      step4Container.appendChild(mealCard);

      // Create section card with reset functionality
      const secondMealCard = document.createElement("div");
      secondMealCard.classList.add("card", "second-card");
      const resetButton = document.createElement("button");
      resetButton.textContent = "Choose another meal";
      resetButton.classList.add("button");
      secondMealCard.appendChild(resetButton);

      // Append second card to step 4
      step4Container.appendChild(secondMealCard);

      // Show Step 4
      step4Section.style.display = "block";

      // Ensure the scroll happens after layout update
      requestAnimationFrame(() => {
        step4Section.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      // Store the first selected meal for later use
      previouslySelectedMeal = { mealName, mealImageSrc, mealDescription };

      // Ensure the second meal card is created and listener is added after DOM updates
      secondMealCard.addEventListener("click", () => {
        // Check if the span exists
        if (mealRefSpan) {
          mealRefSpan.textContent = "Meal 2";  // Update the span to "Meal 2"
        }

        // Reset selections and bring user back to Step 1
        selectedProtein = null;
        selectedCarb = null;
        selectedMeal = null;
        
        // Remove the 'selected' class from all cards
        step1Cards.forEach((card) => card.classList.remove("selected"));
        step2Cards.forEach((card) => card.classList.remove("selected"));

        // Hide Step 3 and Step 4 sections
        step3Section.style.display = "none";
        step4Section.style.display = "none";

        // Ensure the Step 1 section is visible
        step1Section.style.display = "block";  // Ensure the section is visible

        // Use requestAnimationFrame to ensure that the layout updates before scrolling
        requestAnimationFrame(() => {
          // Scroll to Step 1 section
          step1Section.scrollIntoView({
            behavior: 'smooth',
            block: 'start',  // Ensures the top of the section aligns with the viewport
          });
        });
      });
    });
  });
});
