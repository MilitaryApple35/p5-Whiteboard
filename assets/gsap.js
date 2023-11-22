import { gsap } from "https://cdn.skypack.dev/gsap"
import { Draggable } from "https://cdn.skypack.dev/@shopify/draggable"
let n_note=0;
gsap.registerPlugin(Draggable);

function createNote(parent){
    console.log(parent);
    const note = document.createElement('div');
    note.classList.add('note');
    n_note++;
    note.innerHTML = `
        <div id="note_${n_note}" class="note-header">
            <div class="note-header-text">Note</div>
            <div class="note-header-close">x</div>
        </div>
        <div class="note-body">
            <textarea class="note-body-text"></textarea>
        </div>
    `;
    parent.appendChild(note);
    new Draggable(document.getElementById(`note_${n_note}`), {
        bounds: "#canvas-container",
        ondrag: function() {
            this.target.style.boxShadow = "box-shadow: 0px 10px 24px 0px rgba(0,0,0,0.15)"; // Fix: Added missing semicolon
        },
        ondragend: function() {
            this.target.style.boxShadow = "none";
        }
    });
    console.log(note);
    return note;
}

document.querySelectorAll('#add-note').forEach(button => {
    console.log('button');
    button.addEventListener('click', function() {
        console.log('clicked');
        const note = createNote(document.getElementById('canvas-container'));
        note.querySelector('.note-header-close').addEventListener('click', function() {
            note.remove();
        });
    });
});

