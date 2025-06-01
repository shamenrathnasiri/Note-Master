import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  notes: { title: string; description: string }[] = [];
  newNote = { title: '', description: '' };

  addNote() {
    if (this.newNote.title && this.newNote.description) {
      this.notes.push({ ...this.newNote });
      this.newNote = { title: '', description: '' };
    }
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
  }
}


