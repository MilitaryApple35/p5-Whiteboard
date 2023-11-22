import { gsap } from "https://cdn.skypack.dev/gsap"
import { Draggable } from "https://cdn.skypack.dev/@shopify/draggable"

gsap.declarePlugin(Draggable);

function createNote(parent){
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
        <div class="note-header">
            <div class="note-header-text">Note</div>
            <div class="note-header-close">x</div>
        </div>
        <div class="note-body">
            <textarea class="note-body-text"></textarea>
        </div>
    `;
    parent.appendChild(note);
    gsap.Draggable.create(note, {
        bounds: parent,
        ondrag: function() {
            this.target.style.boxShadow = "box-shadow: 0px 10px 24px 0px rgba(0,0,0,0.15)"; // Fix: Added missing semicolon
        },
        ondragend: function() {
            this.target.style.boxShadow = "none";
        }
    });
    return note;
}

document.getElementById('add-note').forEach(button => {
    button.addEventListener('click', function() {
        const note = createNote(document.getElementById('canvas-container'));
        note.querySelector('.note-header-close').addEventListener('click', function() {
            note.remove();
        });
    });
});
