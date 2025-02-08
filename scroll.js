const modals = document.querySelectorAll(".modal");

modals.forEach((scrollContainer) => {
    scrollContainer.addEventListener("wheel", (evt) => {
        evt.preventDefault();

        const deltaY = evt.deltaY; // Up/down scroll

        // If screen width is greater than 1024px, convert vertical scroll to horizontal
        if (window.innerWidth > 1024) {
            scrollContainer.scrollLeft += deltaY;
        } else {
            // For screens under 1025px, apply normal vertical scroll
            scrollContainer.scrollTop += deltaY;
        }
    });
});