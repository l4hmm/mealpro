// Function to keep glowing affect on card once its clicked //
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
      // Remove the 'selected' class from all cards
      document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
      
      // Add the 'selected' class to the clicked card
      this.classList.add('selected');
    });
  });