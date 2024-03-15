document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('.h, .k');

    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior

            // Determine the direction of the slide based on the class name
            var slideDirection = this.classList.contains('k') ? 'slideLeft' : 'slideRight';

            // Add the class to trigger animation
            this.classList.add(slideDirection);

            // Delay navigation until after animation completes
            var nextURL = this.getAttribute('href');
            setTimeout(function() {
                window.location.href = nextURL;
            }, 1000); // Adjust delay to match animation duration
        });
    });
});
