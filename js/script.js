(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()

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
    const link = document.querySelector('#goToThanks')
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        const data = new FormData(form);
        const action = e.target.action;

        fetch(action, {
            method: 'POST',
            body: data,
        })
            .then(() => {
                link.click()
            })
            .catch(error => {
                alert("Error submitting form.");
            });
    });
});