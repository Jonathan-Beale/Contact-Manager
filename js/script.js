function copyContent(element) {
    // Implement your logic to copy content here
    console.log('Copying content:', element.textContent);
}

function showBanner() {
    // Implement your logic to show a banner here
    console.log('Showing banner');
}

function hideBanner() {
    // Implement your logic to hide the banner here
    console.log('Hiding banner');
}

function editContact(name, phone, email, date) {
    //// Build the URL for the edit page with query parameters
    //const editUrl = `edit-contact.html?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&date=${encodeURIComponent(date)}`;

    //// Open the edit page in a new window or tab
    //window.open(editUrl, '_blank');

    const editUrl = `edit-contact.html?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&date=${encodeURIComponent(date)}`;

    // Calculate the position to center the popup
    const popupWidth = 500; // Set the width of your popup
    const popupHeight = 600; // Set the height of your popup
    const left = (window.innerWidth - popupWidth) / 2;
    const top = (window.innerHeight - popupHeight) / 2;

    // Open the edit page in a centered popup
    const popupWindow = window.open(
        editUrl,
        'editContactPopup',
        `width=${popupWidth}, height=${popupHeight}, left=${left}, top=${top}`
    );

    // Focus the popup window (optional)
    if (popupWindow) {
        popupWindow.focus();
    }
}


function addContact() {
    //// Build the URL for the edit page with query parameters
    //const editUrl = `edit-contact.html?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&date=${encodeURIComponent(date)}`;

    //// Open the edit page in a new window or tab
    //window.open(editUrl, '_blank');

    const editUrl = `add-contact.html`;

    // Calculate the position to center the popup
    const popupWidth = 500; // Set the width of your popup
    const popupHeight = 600; // Set the height of your popup
    const left = (window.innerWidth - popupWidth) / 2;
    const top = (window.innerHeight - popupHeight) / 2;

    // Open the edit page in a centered popup
    const popupWindow = window.open(
        editUrl,
        'addContactPopup',
        `width=${popupWidth}, height=${popupHeight}, left=${left}, top=${top}`
    );

    // Focus the popup window (optional)
    if (popupWindow) {
        popupWindow.focus();
    }
}










