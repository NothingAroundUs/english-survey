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

document.getElementById('q7').addEventListener('change', function () {
    var otherContainer = document.getElementById('q7OtherContainer');
    var otherInput = document.getElementById('q7_other');
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

document.getElementById('q7_other').addEventListener('input', function () {
    if (this.value.trim() === '') {
        this.classList.add('is-invalid');
    } else {
        this.classList.remove('is-invalid');
    }
});