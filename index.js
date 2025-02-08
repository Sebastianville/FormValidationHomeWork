const registration = document.getElementById('registration')
const errorDisplay = document.getElementById('errorDisplay');

//cache the input field
const username = registration.elements['username']
console.log(username)
const email = registration.elements['email']
const password = registration.elements['password']
const passwordCheck = registration.elements['passwordCheck']
const terms = registration.elements['terms']

username.addEventListener("input", function (e) {
    const value = e.target.value.trim();
    
    let errorMessage = "";
   
    // The username cannot be blank
    if (value === "") {
      errorMessage =
        "The Username cannot be blank. Please enter a valid username.";
      username.focus();
    }
    // The username must contain at least two unique characters (using regex)
    else if (!/(.)(?!\1).*?/.test(value)) {
      errorMessage = "The Username must contain at least two unique characters.";
      username.focus();
    }
    // The username must be at least four characters long
    else if (value.length < 4) {
      errorMessage = "The Username must contain at least 4 characters.";
      username.focus();
    }
    // The username cannot contain special characters or whitespace
    else if (/[^a-zA-Z0-9]/.test(value)) {
      errorMessage =
        "The Username cannot contain special characters or whitespace.";
      username.focus();
    }
    // Show or hide the error message dynamically
    if (errorMessage) {
      errorDisplay.innerText = errorMessage;
      errorDisplay.style.display = "block";
      errorDisplay.style.color = "red";
    } else {
      errorDisplay.style.display = "none";
    }
});


email.addEventListener("input", function (e) {
    const value = e.target.value.trim();
    
    let errorMessage = "";

    // The email cannot be blank
    if (value === "") {
        errorMessage = "The Email cannot be blank. Please enter a valid email address.";
        email.focus();
    }
    // The email must follow a valid structure
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMessage = "Please enter a valid email address.";
        email.focus();
    }
    // The email must not be from 'example.com'
    else if (value.endsWith("@example.com")) {
        errorMessage = "Email cannot be from the domain 'example.com'.";
        email.focus();
    }

    // Show or hide the error message dynamically
    if (errorMessage) {
        errorDisplay.innerText = errorMessage;
        errorDisplay.style.display = "block";
        errorDisplay.style.color = "red";
    } else {
        errorDisplay.innerText = ""; // Ensure error message clears
        errorDisplay.style.display = "none";
    }
});

password.addEventListener('input', function(e) {
    const value = e.target.value.trim()
    let errorMessage = "";

    if(value === ''){
        errorMessage = "Password cannot be blank. Please enter a password";
        password.focus()
    } else if (value.length < 12) {
        errorMessage = "Password must contain at least 12 characters"
        password.focus()
    } 
    else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
        errorMessage = "Password must contain at least one uppercase and one lowercase letter.";
        password.focus();
    }
    // Password must contain at least one number
    else if (!/\d/.test(value)) {
        errorMessage = "Password must contain at least one number.";
        password.focus();
    }
    // Password must contain at least one special character
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        errorMessage = "Password must contain at least one special character.";
        password.focus();
    }
    // Password cannot contain the word 'password' 
    else if (/password/i.test(value)) {
        errorMessage = "Password cannot contain the word 'password'.";
        password.focus();
    }
    // Password cannot contain the username
    else if (value.includes(username.value)) {
        errorMessage = "Password cannot contain the username.";
        password.focus();
    }

    // Show or hide the error message dynamically
    if (errorMessage) {
        errorDisplay.innerText = errorMessage;
        errorDisplay.style.display = "block";
        errorDisplay.style.color = "red";
    } else {
        errorDisplay.innerText = "";
        errorDisplay.style.display = "none";
    }
})

passwordCheck.addEventListener("input", function (e) {
    const value = e.target.value.trim();
    
    let errorMessage = "";

    // Passwords must match
    if (value !== password.value) {
        errorMessage = "Passwords do not match.";
        passwordCheck.focus();
    }

    // Show or hide the error message dynamically
    if (errorMessage) {
        errorDisplay.innerText = errorMessage;
        errorDisplay.style.display = "block";
        errorDisplay.style.color = "red";
    } else {
        errorDisplay.innerText = "";
        errorDisplay.style.display = "none";
    }
});



registration.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
    
    //! Store username and email in lowercase
    const usernameValue = username.value.trim().toLowerCase(); 
    const emailValue = email.value.trim().toLowerCase(); 
    const passwordValue = password.value.trim();
 
    let errorMessage = "";

    //! Retrieve existing users from localStorage or initialize an empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Validate username uniqueness by using some because when the first username comes up it should return true 
    if (users.some(user => user.username === usernameValue)) {
        errorMessage = "That username is already taken. Please choose a different one.";
        username.focus();
    }

    // Validate terms and conditions
    else if (!terms.checked) {
        errorMessage = "You must accept the Terms and Conditions to proceed.";
        terms.focus();
    }

    // Show error message or store user data
    if (errorMessage) {
        errorDisplay.innerText = errorMessage;
        errorDisplay.style.display = "block";
        errorDisplay.style.color = "red";
    } else {

        //!Store new user in localStorage
        users.push({ username: usernameValue, email: emailValue, password: passwordValue });
        localStorage.setItem("users", JSON.stringify(users));

        // Clear form fields
        registration.reset();

        // Show success message
        errorDisplay.innerText = "Registration successful!";
        errorDisplay.style.display = "block";
        errorDisplay.style.color = "green";
    }
});