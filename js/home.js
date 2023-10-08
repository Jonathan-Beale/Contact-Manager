// JavaScript to handle collapsing/expanding contacts
const contactNames = document.querySelectorAll('.contact-name');

contactNames.forEach(contactName => {
    contactName.addEventListener('click', () => {
        const contact = contactName.closest('.contact');
        contact.classList.toggle('show');
        contactName.classList.toggle('show');
    });
});

editing = false;
function editContact(contactRow) {
    // Get all the <td> elements within the <tr>
    var tdElements = contactRow.querySelectorAll(".contact-detail");
    editing = true;

    // Loop through each <td> element
    for (var i = 0; i < tdElements.length; i++) {
        var td = tdElements[i];
        td.contentEditable = true;
    }
    // Hide "Edit" button, show "Save" and "Cancel" buttons
    contactRow.querySelector(".edit-button").style.display = "none";
    contactRow.querySelector(".save-button").style.display = "inline";

}



function cancelEdit(contactRow) {
    // Get all the <td> elements within the <tr>
    var tdElements = contactRow.querySelectorAll(".contact-detail");
    editing = false;

    // Loop through each <td> element
    for (var i = 0; i < tdElements.length; i++) {
        var td = tdElements[i];

        td.contentEditable = false;
    }

    // Show "Edit" button, hide "Save" and "Cancel" buttons
    contactRow.querySelector(".edit-button").style.display = "inline";
    contactRow.querySelector(".save-button").style.display = "none";
}


function copyContent(element) {
    if(editing) {
        return
    }
    var range = document.createRange();
    range.selectNode(element);
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)

    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    // Change the background color

    var banner = document.getElementById("feedbackBanner");
    banner.textContent = "Copied!";
    banner.style.backgroundColor = "#007f5b";

    // Set a timeout to revert the background color after 1000 milliseconds (1 second)
    setTimeout(function () {
        banner.style.backgroundColor = "#333";
    }, 200);

    // For debugging, alert tells you what was copied
    // alert("Text copied: " + element.textContent);
}

function showBanner() {
    var banner = document.getElementById("feedbackBanner");
    banner.textContent = "Click to Copy";
}

function hideBanner() {
    var banner = document.getElementById("feedbackBanner");
    banner.textContent = "";
}

// Deletes a contact from the table, **not** from database
function deleteContact(thisRow) {
    let table = document.querySelector("table");
    var row = thisRow.closest("tr");

    if (confirm("Are you sure you want to delete this contact?")) {
        table.deleteRow(row.rowIndex);
    }
}


function searchContacts() {
    var searchValue = document.getElementById("searchInput").value.toLowerCase();
    var contactRows = document.querySelectorAll('.contact');

    contactRows.forEach(contactRow => {
        var contactFullName = contactRow.querySelector('td:first-child').textContent.toLowerCase();
        var contactLastName = contactFullName.split(' ')[1]; // Get the last name from the full name

        if (contactFullName.startsWith(searchValue) || contactLastName.startsWith(searchValue)) {
            contactRow.style.display = ""; // Show the row if the contact name or last name starts with the search value
        } else {
            contactRow.style.display = "none"; // Hide the row if the contact name or last name does not start with the search value
        }
    });
}

function addContact() {
    
        // Create a new <tr> element for the new item
        var newRow = document.createElement("tr");
        newRow.className = "contact"; // Add the "contact" class to the new row

        // Create <td> elements for each column in the new row
        var nameTd = document.createElement("td");
        nameTd.className = "contact-detail";
        nameTd.contentEditable = true;

    
        var phoneTd = document.createElement("td");
        phoneTd.className = "contact-detail ";
        phoneTd.contentEditable = true;

        var emailTd = document.createElement("td");
        emailTd.className = "contact-detail";
        emailTd.contentEditable = true;

        var dateTd = document.createElement("td");
        dateTd.className = "contact-detail ";
        dateTd.contentEditable = true;

        var actionsTd = document.createElement("td");
        actionsTd.innerHTML = `
            
        <button class="action-button edit-button" style="display: none;" onclick="editContact(this.parentNode.parentNode)" id="edit-button"><img src="images/edit-icon.png" /></button>
        <button class="action-button save-button" style="display: inline;" onclick="cancelEdit(this.parentNode.parentNode)"><img src="images/confirm-icon.png" /></button>
        <button class="action-button delete-button" onclick="deleteContact(this)"><img src="images/delete-icon.png" /></button>
    
        `;

        // Append the <td> elements to the new row
        newRow.appendChild(nameTd);
        newRow.appendChild(phoneTd);
        newRow.appendChild(emailTd);
        newRow.appendChild(dateTd);
        newRow.appendChild(actionsTd);

        // Append the new row to the table
        var table = document.querySelector("table");
        table.appendChild(newRow);
    
}