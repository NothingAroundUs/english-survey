(function () {
    'use strict';

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

function clearForm() {
    const form = document.querySelector('#surveyForm');
    form.reset();

    const otherInputContainer = document.querySelector('#q7OtherContainer');
    if (otherInputContainer) {
        otherInputContainer.style.display = 'none';
    }

    void form.offsetHeight;

    setTimeout(function () {
        form.classList.remove('was-validated');
    }, 3);
}

window.addEventListener("load", function () {
    const form = document.querySelector('#surveyForm');
    const link = document.querySelector('#goToThanks');
    const spinner = document.querySelector('.spinner-border');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        submitButton.disabled = true;
        spinner.classList.remove('d-none');

        const data = new FormData(form);
        const action = form.action;

        fetch(action, {
            method: 'POST',
            body: data,
        })
            .then(response => {
                if (response.ok) {
                    link.click();
                } else {
                    throw new Error('Failed to submit form');
                }
            })
            .catch(error => {
                alert("An error occurred: " + error.message);
            })
            .finally(() => {
                spinner.classList.add('d-none');
                submitButton.disabled = false;
            });
    });
});
