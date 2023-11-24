import { gsap } from "https://cdn.skypack.dev/gsap"
import { Draggable } from 'https://cdn.skypack.dev/gsap/Draggable';
let n_note=0;
gsap.registerPlugin(Draggable);

function createNote(parent) {
    console.log(parent);
    const note = document.createElement('div');
    note.classList.add('note');
    n_note++;
    note.id = `note_${n_note}`;
    note.innerHTML = `
        <div class="note-header">
            <input type="text" data-clickable="true" class="note-header-text" placeholder="Note">
            <div class="note-header-close">x</div>
        </div>
        <div data-clickable="true" class="note-body">
            <input class="note-body-text"></input>
        </div>
    `;
    parent.appendChild(note);
    document.querySelectorAll('[data-clickable="true"]').forEach(element => {
        element.addEventListener('click', function(event) {
            event.stopPropagation();
            this.focus();  
        });
        element.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.blur();
            }
        });
    });
    Draggable.create(`#note_${n_note}`, {
        type: "x,y",
        bounds: "#canvas-container",
        clickabletest: true,
        touchable: true // Habilitar el arrastre táctil
    });
    return note;
}

document.querySelectorAll('#add-note').forEach(button => {
    button.addEventListener('click', function() {
        const note = createNote(document.getElementById('canvas-container'));
        note.querySelector('.note-header-close').addEventListener('click', function() {
            note.remove();
        });
    });
});

