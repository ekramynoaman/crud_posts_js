// Globle Variable Inputs & Alerts
const email = document.getElementById('inputEmail');
const emailAlert = document.getElementById('emailAlert');
const password = document.getElementById('inputPassword');
const passwordAlert = document.getElementById('passwordAlert');


// Validate Email input
email.addEventListener('blur', () => {

    // Regular Exprission For Valid
    let regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // Reset dispaly of alert div
    emailAlert.style.display = "block";

    // For Store alert message
    let emailError = '';

    // Check if input value not empty
     if (email.value === '' | email.value === null) {

        emailError ='this field is required';

    }
    // Check if input value match regex rules
    else if (regex.test(email.value) == false) {

        emailError = 'this email is invalid';
    }

    // Put error message text in alert div
    emailAlert.innerText = emailError;
});

// Reset dispaly of  all alert divs
email.addEventListener('focus', () => {
    emailAlert.style.display = "none";
    passwordAlert.style.display = "none";
});

// Validate Password input
password.addEventListener('blur', () => {

    // Regular Exprission For Valid
    let regex = /(?=\S{10,})(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[0-9])(?=\S*[!£$%^&\"])(?<!\S)\S{10,20}(?=\s|\Z)/
    
    // Reset dispaly of alert div
    passwordAlert.style.display = "block";

    // For Store alert message
    let passwordError = '';

    // Check if input value not empty
     if (password.value === '' | password.value === null) {

        passwordError ='Password is required';

    }
    
    // Check if input value length not < 6 or > 12 chars
    else if (password.value.length < 6 || password.value.length > 12) {

        passwordError = 'password Should be Min. 6 chars & Max. 12 chars';
    }

    // Check if input value match regex rules
    else if (regex.test(password.value) == false) {

        passwordError = 'Password Should have  upper & lowercase Letters, numric & special character';
    }
    // Put error message text in alert div
    passwordAlert.innerText = passwordError;

});
// Reset dispaly of  all alert divs
password.addEventListener('focus', () => {
    passwordAlert.style.display = "none";
    emailAlert.style.display = "none";

});






