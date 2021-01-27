// -----> NOTES TAKING WEBSITE

const notelist = [];

// Will Listen when "Add Note" button will be clicked
document.querySelector('.addnote_btn').addEventListener('click', (event) => {
    event.preventDefault();

    const note_title = document.querySelector('#notefield_title');
    const note_content = document.querySelector('#notefield_content');

    if (note_title.value.trim() != "" && note_content.value.trim() != "") {
        // Adding a Note
        const note_object = {
            title: note_title.value.trim(),
            description: note_content.value.trim()
        };
        notelist.push(note_object);
        localStorage.setItem("notes", JSON.stringify(notelist));

        // Show Note-List
        document.querySelector('.saved_notes').innerHTML = "";
        const saved_notes = JSON.parse(localStorage.getItem("notes"));
        saved_notes.forEach((note, note_id, allNotes) => {
            noteCard(note_id, note.title, note.description);
        });
    }
    else {
        alert("Field is Empty. \n or \nInput Value is Inappropriate.");
        note_title.value = "";
        note_content.value = "";
        return false;
    }

    note_title.value = "";
    note_content.value = "";
    console.log(notelist);
});


// Card for a Note
const noteCard = (note_id, title, description) => {
    const note_box = document.querySelector('.saved_notes');

    const note_grid = document.createElement('div');
    note_grid.className = "col-md-4 col-sm-6 col-12 mt-3";
    note_grid.id = "note_" + note_id;

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
    note_delete_btn.innerText = "Delete Note";

    note_card_body.append(note_title, note_description, note_delete_btn);
    note_card.appendChild(note_card_body);
    note_grid.appendChild(note_card);
    note_box.appendChild(note_grid);
}


// Clear Notelist
document.querySelector('#clear_notelist').addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.saved_notes').innerHTML = "";
    localStorage.removeItem("notes");
});