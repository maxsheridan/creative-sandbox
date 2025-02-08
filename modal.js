document.addEventListener("DOMContentLoaded", function() {
    function resetVideoPlayers() {
        document.querySelectorAll(".video-player").forEach((videoPlayer) => {
            const video = videoPlayer.querySelector("video");
            const overlay = videoPlayer.querySelector(".overlay");
            
            // Pause the video and reset the current time
            video.pause();
            video.currentTime = 0;

            // Reset overlay visibility (make it visible again when reset)
            overlay.style.opacity = 1;  // Show the overlay when the video is reset
        });
    }

    function updateActiveState(modalId) {
        document.querySelectorAll("button, a").forEach(el => el.classList.remove("active"));
        document.querySelectorAll(`button[onclick="openModal('${modalId}')"], a[onclick="openModal('${modalId}')"]`).forEach(el => el.classList.add("active"));
    }

    window.openModal = function(modalId) {
        const modalContent = document.getElementById(modalId);
    
        // Do nothing if the requested modal is already displayed
        if (modalContent && getComputedStyle(modalContent).display === 'block') {
            return;
        }
    
        // Close all modals
        document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
    
        if (modalContent) {
            modalContent.style.display = 'block';
        }
    
        // Reset video players (ensures the overlay is visible again)
        resetVideoPlayers();
        updateActiveState(modalId);
    
        // Only update the URL hash if the modal is actually changing
        if (window.location.hash !== `#${modalId.replace("Modal", "")}`) {
            window.location.hash = modalId.replace("Modal", "");
        }
    
        // Reset scroll position to the top-left
        if (modalContent && modalContent.classList.contains('modal') && modalContent.classList.contains('scroll')) {
            modalContent.scrollTop = 0;
            modalContent.scrollLeft = 0;
        }
    };

    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.replace('#', '');
        if (hash && document.getElementById(`${hash}Modal`)) {
            openModal(`${hash}Modal`);
        } else {
            resetToHome();
        }
    });

    window.resetToHome = function() {
        const workModal = document.getElementById('workModal');
        
        // Do nothing if the workModal is already displayed
        if (workModal && getComputedStyle(workModal).display === 'block') {
            return;
        }
    
        // Close all modals
        document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
    
        if (workModal) {
            workModal.style.display = 'block';  // Display the work modal
        }
    
        // Remove active state from all links and buttons
        document.querySelectorAll("button, a").forEach(el => el.classList.remove("active"));
    
        // Add the active class to the "Work" button manually
        const workButton = document.querySelector('button[onclick="openModal(\'workModal\')"]');
        if (workButton) {
            workButton.classList.add('active'); // Style the button as active
        }
    
        // Reset scroll position of all modals
        document.querySelectorAll('.modal.scroll').forEach(modal => {
            modal.scrollTop = 0;
            modal.scrollLeft = 0;
        });
    
        history.replaceState(null, null, window.location.pathname);
    };

    
    // Check the initial hash when the page loads
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(`${hash}Modal`)) {
        openModal(`${hash}Modal`);
    } else {
        resetToHome();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Select the "Work" button
    const workButton = document.querySelector('button[onclick="openModal(\'workModal\')"]');
    
    // Add active class to the "Work" button if it exists
    if (workButton) {
        workButton.classList.add('active'); // Style the button as active
    }

    // Call resetToHome to show the workModal when the page loads
    resetToHome();
});