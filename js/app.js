// -----> NOTES TAKING WEBSITE

let notelist = [];

// Saved Notes at onload Situation
document.body.onload = () => {
    notelist = JSON.parse(localStorage.getItem("notes"));
    if (Array.isArray(notelist)) {
        if (notelist.length != 0) {
            notelist.forEach((note, note_id, allNotes) => {
                noteCard(note.id, note.title, note.description);
            });
        } 
        else {
            notelist = [];
            emptyNotelist();
        }
    }
    else {
        notelist = [];
        emptyNotelist();
    }
};


// Will Listen when "Add Note" button will be clicked
document.querySelector('.addnote_btn').addEventListener('click', (event) => {
    event.preventDefault();

    const note_title = document.querySelector('#notefield_title');
    const note_content = document.querySelector('#notefield_content');

    if (note_title.value.trim() != "" && note_content.value.trim() != "") {
        let initial_note_id;
        if (Array.isArray(notelist) == false)
            initial_note_id = 0;

        // Adding a Note 
        const note_object = {
            id: notelist.length,
            title: note_title.value.trim(),
            description: note_content.value.trim()
        };
        notelist.push(note_object);
        localStorage.setItem("notes", JSON.stringify(notelist));

        // Show Note-List
        document.querySelector('.saved_notes').innerHTML = "";
        notelist = JSON.parse(localStorage.getItem("notes"));

        // Checking and Printing Notelist otherwise Empty Box
        if (Array.isArray(notelist)) {
            if (notelist.length != 0) {
                notelist.forEach((note, note_id, allNotes) => {
                    noteCard(note.id, note.title, note.description);
                });
            } 
            else {
                notelist = [];
                emptyNotelist();
            }
        }
        else {
            notelist = [];
            emptyNotelist();
        }
    }
    else {
        alert("Field is Empty. \n or \nInput Value is Inappropriate.");
        note_title.value = "";
        note_content.value = "";
        return false;
    }

    note_title.value = "";
    note_content.value = "";
});


// Clear Notelist
document.querySelector('#clear_notelist').addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.saved_notes').innerHTML = "";
    localStorage.removeItem("notes");
    emptyNotelist();
});


// Delete Note Funcitonality
const deleteNote = (delete_note_id) => {
    delete_note_id = parseInt(delete_note_id.substring(12)) - 1;

    // Delete Note Index in Notelist
    let delete_notelist_index;

    notelist.forEach((note, note_index) => {
        if (note.id == delete_note_id) {
            delete_notelist_index = note_index;
            return false;
        }
    });

    notelist.splice(delete_notelist_index, 1);
    localStorage.setItem("notes", JSON.stringify(notelist));

    if (notelist != null && notelist.length != 0) {
        document.querySelector('.saved_notes').innerHTML = "";
        notelist.forEach((note, note_id, allNotes) => {
            noteCard(note.id, note.title, note.description);
        });
    }
    else {
        document.querySelector('.saved_notes').innerHTML = "";
        emptyNotelist();
    }
}


// Search Note Functionality
document.querySelector("#search_field").addEventListener('input', (event) => {
    let request_value = event.target.value.toLowerCase();

    // Emptying the Notes Box
    const notes_box = document.querySelector(".saved_notes");
    notes_box.innerHTML = "";

    // Printing the Searched Notes
    notelist.forEach((note, note_index, notes) => {
        let [title, description] = [note.title.toLowerCase(), note.description.toLowerCase()];
        if(title.includes(request_value) || description.includes(request_value)) {
            noteCard(note.id, note.title, note.description);
        }
    });

    // Checking that Result Found or Not
    if(notes_box.innerHTML == "") {
        noResultFound();
    }
});


// Card for a Note
const noteCard = (note_id, title, description) => {
    const note_box = document.querySelector('.saved_notes');

    const note_grid = document.createElement('div');
    note_grid.className = "col-md-4 col-sm-6 col-12 mt-3";
    note_grid.id = `note_${note_id + 1}`;

    const note_card = document.createElement('div');
    note_card.className = "card";

    const note_card_body = document.createElement("div");
    note_card_body.className = "card-body";

    const note_title = document.createElement("h5");
    note_title.className = "card-title";
    note_title.innerText = title;

    const note_description = document.createElement("p");
    note_description.className = "card-text";
    note_description.innerText = description;

    const note_delete_btn = document.createElement("a");
    note_delete_btn.href = "#";
    note_delete_btn.className = "btn delete_note_btn";
    note_delete_btn.id = `delete_note_${note_id + 1}`;
    note_delete_btn.addEventListener('click', (event) => {
        deleteNote(event.target.id);
    });
    note_delete_btn.innerText = "Delete Note";

    note_card_body.append(note_title, note_description, note_delete_btn);
    note_card.appendChild(note_card_body);
    note_grid.appendChild(note_card);
    note_box.appendChild(note_grid);
}


// Empty Notelist
const emptyNotelist = () => {
    const note_box = document.querySelector('.saved_notes');

    const empty_grid = document.createElement('div');
    empty_grid.className = "col-md-10 offset-md-1";

    const empty_note = document.createElement('div');
    empty_note.className = "empty_notelist";

    const empty_logo = document.createElement('img');
    empty_logo.className = "empty_notelist_logo";
    empty_logo.src = "./img/emptyNotelist.png";
    empty_logo.alt = "Empty Notelist";

    const empty_heading = document.createElement('h3');
    empty_heading.className = "empty_heading";
    empty_heading.innerText = "Nothing to Show !!!";

    const empty_description = document.createElement('h5');
    empty_description.className = "empty_description";
    empty_description.innerText = "Use the \"Add Note\" Section to Add a Note";

    empty_note.append(empty_logo, empty_heading, empty_description);
    empty_grid.appendChild(empty_note);
    note_box.appendChild(empty_grid);
}


// No Results Found
const noResultFound = () => {
    const note_box = document.querySelector('.saved_notes');

    const noResult_grid = document.createElement('div');
    noResult_grid.className = "col-md-10 offset-md-1";

    const noResult_note = document.createElement('div');
    noResult_note.className = "no_result_found";

    const noResult_logo = document.createElement('img');
    noResult_logo.className = "no_result_found_logo";
    noResult_logo.src = "./img/no_result_found.png";
    noResult_logo.alt = "No Result Found";

    noResult_note.appendChild(noResult_logo);
    noResult_grid.appendChild(noResult_note);
    note_box.appendChild(noResult_grid);
}