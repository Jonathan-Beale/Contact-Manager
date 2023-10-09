function displayLogin() {
                var i, loginTab, signupTab;

                signupTab = document.getElementsByClassName("tab-signup");
                for (i = 0; i < signupTab.length; i++) {
                    signupTab[i].style.display = "none";
                }

                loginTab = document.getElementsByClassName("tab-login");
                for (i = 0; i < loginTab.length; i++) {
                    loginTab[i].style.display = "flex";
                }
            }

            function displaySignup() {
                var i, loginTab, signupTab;

                loginTab = document.getElementsByClassName("tab-login");
                for (i = 0; i < loginTab.length; i++) {
                    loginTab[i].style.display = "none";
                }

                signupTab = document.getElementsByClassName("tab-signup");
                for (i = 0; i < signupTab.length; i++) {
                    signupTab[i].style.display = "flex";
                }
            }

            
            async function signup(username, password) {
              const response = await fetch('http://bestloginservice.shop:5000/signup', {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json',},
                  body: JSON.stringify({ username, password })
              });
            
              if (!response.ok) { 
                  throw new Error(`HTTP error! status: ${response.status}`); }
              const data = await response.json();
              return data;
            }
            
            async function addContact(Name, Phone, Email) {
              const response = await fetch('http://bestloginservice.shop:5000/addContact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ Name, Email, Phonel})
              });

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              return data;
            }
            
            async function removeContact(contactId) {
              const response = await fetch('http://bestloginservice.shop:5000/deleteContact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ID })
              });

              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              return data;
            }
            
            async function editContact(ID, Name, Email, Phone) {
              const response = await fetch('http://bestloginservice.shop:5000/editContact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ Name, Phone, Email })
              });
          
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              return data;
            }
            
            async function getUserDetails(Username, Password) {
                const response = await fetch('http://bestloginservice.shop:5000/user', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify({ Username: Username, Password: Password })
                });
                
                if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); console.log("Help!"); }
                const data = await response.json();
                if (data.error === '') {
                    return { id: data.id };
                } else {
                    return null; // Logs "User not found"
                }
            }

            async function validateLogin() {
                var email = document.getElementById("loginEmail").value;
                var password = document.getElementById("loginPassword").value;

                // Replace the current admin access with a search against the databas
                //document.getElementById("Login Message").innerHTML = "Help.";
                var user = await getUserDetails(email, password);
                //var test = testScript();
                //document.getElementById("Login Message").innerHTML = "help";
                if(user) {
                    console.log("Login Success!");
                    
                    // REPLACEME with the user's ID
                    userID = user.ID
                    localStorage.setItem('userId', userID);
                    window.location.href = "home.html";  // Redirects to home.html
                } else {
                    document.getElementById("Login Message").innerHTML = "Incorrect email or password.";
                    console.log("Wrong credentials: \nemail: user@admin.com,\n password: admin");
                }
            }

            async function validateSignup() {
                var email = document.getElementById("signupEmail").value;
                var pw1 = document.getElementById("signupPassword").value;
                var pw2 = document.getElementById("signupPasswordConfirm").value;
                
                // Replace the current admin access with a search against the database
                if (email == "user@admin.com")
                {
                    document.getElementById("Email Message").innerHTML = "An account already exists for this email.";
                    document.getElementById("Password Message").innerHTML = "";
                }

                if (pw1 != pw2) {
                    document.getElementById("Password Message").innerHTML = "Passwords do not match.";
                    document.getElementById("Email Message").innerHTML = "";
                }

                else if (email != "user@admin.com" && pw1 == pw2) {
                    // Still needs to add new account to database
                    var newUser = await signup(email, pw1);
                    window.location.href = "home.html";
                }
            }


            document.addEventListener("DOMContentLoaded", function () {
                const registrationForm = document.getElementById("registrationForm");
                const messageElement = document.getElementById("message");

                registrationForm.addEventListener("submit", function (e) {
                    e.preventDefault(); // Prevent the form from submitting

                    // Get the values entered by the user
                    const email = registrationForm.email.value;
                    /*const password = registrationForm.password.value;*/

                    // Load and parse the JSON data from users.json (you can use Fetch API here)
                    const users = [
                        { "email": "user1@example.com" },
                        { "email": "user2@example.com" },
                        { "email": "user@admin.com" },
                        { "email": "david@bandit.com" },
                        { "email": "burt@bandit.com" },
                        { "email": "sam@bandit.com" }
                    ];

                    // Check if the entered email already exists
                    const userExists = users.some(user => user.email === email);

                    if (userExists) {
                        messageElement.textContent = "This email is already registered.";
                    } else {
                        // Add the new user to the list (you can also save it to your JSON file here)
                        users.push({ email, password });
                        messageElement.textContent = "User registered successfully!";
                        registrationForm.reset(); // Clear the form
                    }
                });
            });