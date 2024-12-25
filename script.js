function scrollToNextSection(nextSectionId) {
  const nextSection = document.getElementById(nextSectionId);
  window.scrollTo({
    top: nextSection.offsetTop,
    behavior: 'smooth'
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Select sections
  const step3Section = document.querySelector("section.steps.ChosenMeal");
  const step4Section = document.querySelector("section.steps.slectectMeal");

  // Select Step 1 and Step 2 cards
  const step1Cards = document.querySelectorAll("section.steps.protein .card");
  const step2Cards = document.querySelectorAll("section.steps.carb .card");

  // Select Step 3 cards
  const step3Cards = document.querySelectorAll("section.steps.ChosenMeal .card");

  // Reference to Step 4 container
  const step4Container = step4Section.querySelector(".card-container");

  let selectedProtein = null; // Track selected protein
  let selectedCarb = null;    // Track selected carb

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

      // Extract meal details
      const mealImageSrc = card.querySelector("img").src;
      const mealDescription = card.querySelector("p").textContent;

      // Clear Step 4 container
      while (step4Container.firstChild) {
        step4Container.removeChild(step4Container.firstChild);
      }

      // Create elements for the selected meal in Step 4.
      const mealCard = document.createElement("div");
      mealCard.classList.add("card");

      const mealImage = document.createElement("img");
      mealImage.src = mealImageSrc;
      mealImage.alt = "Selected Meal";

      const mealText = document.createElement("p");
      mealText.textContent = mealDescription;

      // Append elements to Step 4 container
      mealCard.appendChild(mealImage);
      mealCard.appendChild(mealText);
      step4Container.appendChild(mealCard);

      // Show Step 4
      step4Section.style.display = "block";

      // Scroll to Step 4 after rendering
      setTimeout(() => {
        step4Section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    });
  });
});
