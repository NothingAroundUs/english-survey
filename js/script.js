(function () {
    'use strict';

    // Enable Bootstrap validation styles
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();

// Show or hide additional input field for "Other" option
document.querySelector('#q7').addEventListener('change', function () {
    var otherContainer = document.querySelector('#q7OtherContainer');
    var otherInput = document.querySelector('#q7_other');
    if (this.value === 'Other') {
        otherContainer.style.display = 'block';
        otherInput.setAttribute('required', 'true');
    } else {
        otherContainer.style.display = 'none';
        otherInput.removeAttribute('required');
        otherInput.value = '';
        otherInput.classList.remove('is-invalid');
    }
});

document.querySelector('#q7_other').addEventListener('input', function () {
    if (this.value.trim() === '') {
        this.classList.add('is-invalid');
    } else {
        this.classList.remove('is-invalid');
    }
});

// Clear form and reset validation styles
function clearForm() {
    const form = document.querySelector('#surveyForm');
    form.reset();

    const otherInputContainer = document.querySelector('#q7OtherContainer');
    if (otherInputContainer) {
        otherInputContainer.style.display = 'none';
    }

    void form.offsetHeight; // Force reflow

    setTimeout(function () {
        form.classList.remove('was-validated');
    }, 3);
}

// Add spinner and submission handling logic
window.addEventListener("load", function () {
    const form = document.querySelector('#surveyForm');
    const link = document.querySelector('#goToThanks');
    const spinner = document.querySelector('.spinner-border');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Form validation
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        // Disable submit button and show spinner
        submitButton.disabled = true;
        spinner.classList.remove('d-none');

        // Prepare form data
        const data = new FormData(form);
        const action = form.action;

        // Submit the form
        fetch(action, {
            method: 'POST',
            body: data,
        })
            .then(response => {
                if (response.ok) {
                    // Redirect to thank you page
                    link.click();
                } else {
                    throw new Error('Failed to submit form');
                }
            })
            .catch(error => {
                alert("An error occurred: " + error.message);
            })
            .finally(() => {
                // Stop spinner and re-enable button (if needed)
                spinner.classList.add('d-none');
                submitButton.disabled = false;
            });
    });
});
