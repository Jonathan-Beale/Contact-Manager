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

function passwordMatch(event, signup) {
    var pw1, pw2;

    pw1 = signup.pw1.value;
    pw2 = signup.pw2.value;

    if (pw1 != pw2) {
        document.getElementById("Password Message").innerHTML = "Passwords do not match.";
        return false;
    }

    else if (pw1 == pw2) {
        return true;
    }
}