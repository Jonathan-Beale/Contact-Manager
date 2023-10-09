async function getContactDetails(userId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ID: userId })
    };

    const contactIdsResponse = await fetch('/list', requestOptions);
    const contactIdsData = await contactIdsResponse.json();
    let contactIds = contactIdsData.ContactList.split(',');

    let contacts = [];
    for (let i = 0; i < contactIds.length; i++) {
        let contactId = contactIds[i];
        const contactDetailsRequestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ID: contactId })
        };
        const contactDetailsResponse = await fetch('/readContact', contactDetailsRequestOptions);
        const contactDetailsData = await contactDetailsResponse.json();

        const contactDetail = {
            Name: contactDetailsData.Name,
            Email: contactDetailsData.Email,
            Phone: contactDetailsData.Phone
        };

        contacts.push(contactDetail);
    }

    return contacts;  
}

async function displayContacts() {
    const USERID = localStorage.getItem('userId');
    console.log(USERID);
    const contacts = await getContactDetails(USERID);
    console.log(contacts);
    for(let i = 0; i < contacts.length; i++) {
      let contactHtml = addContactHTML();

      contactHtml[0].textContent = contacts[i].Name;
      contactHtml[1].textContent = contacts[i].Phone;
      contactHtml[2].textContent = contacts[i].Email;
      contactHtml[3].textContent = contacts[i].Date;
      contactHtml[4].textContent = contacts[i].ID;
    }
}

displayContacts();


function editContact(contactRow) {
    // Get all the <td> elements within the <tr>
    var tdElements = contactRow.querySelectorAll(".contact-detail");

    // Loop through each <td> element
    for (var i = 0; i < tdElements.length; i++) {
        var td = tdElements[i];
        td.contentEditable = true;
    }
    // Hide "Edit" button, show "Save" and "Cancel" buttons
    contactRow.querySelector(".edit-button").style.display = "none";
    contactRow.querySelector(".save-button").style.display = "inline";

}



function confirmEdit(contactRow) {
    // Get all the <td> elements within the <tr>
    var tdElements = contactRow.querySelectorAll(".contact-detail");
    var updatedInfo = [4] // An array of the details from the row 
    updatedInfo[0] = contactRow.ID
    // Loop through each <td> element
    for (var i = 0; i < tdElements.length; i++) {
        var td = tdElements[i];
        updatedInfo[i+1] = td.textContent
        td.contentEditable = false;
    }
    
    updateContact(updatedInfo)

    // Show "Edit" button, hide "Save" and "Cancel" buttons
    contactRow.querySelector(".edit-button").style.display = "inline";
    contactRow.querySelector(".save-button").style.display = "none";
}

async function updateContact(infoArray) {
    // add contacts here, array order: [ID, name, phone, email, date]
    //var contact = functioncall(parameters)

    const [ID, name, phone, email, date] = infoArray;
    let contact = {}; 
    
    if (typeof ID === 'undefined'){
        try {
            const response = await addContact(name, phone, email);
            contact.ID = response.ID; 
            console.log("New contact created with ID:", contact.ID);
        } 
        catch (error) {
            console.error("Error creating a new contact:", error);
        }  
    }
    else{
        try {
            const response = await updateContact(ID, name, phone, email);
            contact.ID = ID; 
            console.log("Contact updated successfully:", response.message);
        } 
        catch (error) {
            console.error("Error updating the contact:", error);
        }
    
    }
    console.log("Contact object:", contact);
}

async function addContact(Name, Phone, Email) {
    const response = await fetch('http://bestloginservice.shop:5000/addContact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Name, Email, Phone})
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
            
async function updateContact(ID, Name, Email, Phone) {
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

function copyContent(element) {
    if(element.contentEditable == "true") {
        return
    } else console.log(element)
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

function showBanner(element) {
    var banner = document.getElementById("feedbackBanner");
    if(element.contentEditable == "true") {
      banner.textContent = "Click to Edit";
    } else banner.textContent = "Click to Copy";
}

function hideBanner() {
    var banner = document.getElementById("feedbackBanner");
    banner.textContent = "";
}

async function deleteContact(thisRow) {
    let table = document.querySelector("table");
    var row = thisRow.closest("tr");

    if (confirm("Are you sure you want to delete this contact?")) {
        table.deleteRow(row.rowIndex);
        contact_ID = row.dataset.id;
        await removeContact(contact_ID);
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

function addContactHTML() {
    
        // Create a new <tr> element for the new item
        var newRow = document.createElement("tr");
        newRow.className = "contact"; // Add the "contact" class to the new row

        // Create <td> elements for each column in the new row        
        var nameTd = document.createElement("td");
        nameTd.classList.add("contact-detail");
        
        nameTd.onclick = function() {
            copyContent(this);
        };
        
        nameTd.onmouseenter = function() {
            showBanner(this);
        };
        
        nameTd.onmouseleave = function() {
            hideBanner();
        };
        nameTd.contentEditable = "true";

    
        var phoneTd = document.createElement("td");
        phoneTd.classList.add("contact-detail");
        
        phoneTd.onclick = function() {
            copyContent(this);
        };
        
        phoneTd.onmouseenter = function() {
            showBanner(this);
        };
        
        phoneTd.onmouseleave = function() {
            hideBanner();
        };
        phoneTd.contentEditable = "true";


        var emailTd = document.createElement("td");
        emailTd.classList.add("contact-detail");
        
        emailTd.onclick = function() {
            copyContent(this);
        };
        
        emailTd.onmouseenter = function() {
            showBanner(this);
        };
        
        emailTd.onmouseleave = function() {
            hideBanner();
        };
        emailTd.contentEditable = "true";


        var dateTd = document.createElement("td");
        dateTd.classList.add("contact-detail");
        
        dateTd.onclick = function() {
            copyContent(this);
        };
        
        dateTd.onmouseenter = function() {
            showBanner(this);
        };
        
        dateTd.onmouseleave = function() {
            hideBanner();
        };
        dateTd.contentEditable = "true";
        dateTd.textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });

        var actionsTd = document.createElement("td");
        actionsTd.innerHTML = `
            
        
                            <button class="action-button edit-button" style="display: none;" onclick="editContact(this.parentNode.parentNode)" id="edit-button"><img src="images/edit-icon.png" /></button>
                            <button class="action-button save-button" style="display: inline;" onclick="confirmEdit(this.parentNode.parentNode)"><img src="images/confirm-icon.png" /></button>
                            <button class="action-button delete-button" onclick="deleteContact(this)"><img src="images/delete-icon.png" /></button>
    
        `;

        // Append the <td> elements to the new row
        newRow.appendChild(nameTd);
        newRow.appendChild(phoneTd);
        newRow.appendChild(emailTd);
        newRow.appendChild(dateTd);
        newRow.appendChild(actionsTd);

        // Append the new row to the table
        var table = document.querySelector("tbody");
        table.appendChild(newRow);
      
        return [nameTd, phoneTd, emailTd, dateTd, newRow]
}