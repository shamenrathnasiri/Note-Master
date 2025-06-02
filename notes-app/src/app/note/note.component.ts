import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService, Note } from './note.service';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  notes: Note[] = [];
  newNote: Note = { title: '', description: '' };
  editingNote: Note | null = null;

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.noteService.getNotes().subscribe({
      next: (notes) => (this.notes = notes),
      error: (err) => console.error('Error loading notes:', err),
    });
  }

  addNote() {
    if (!this.newNote.title || !this.newNote.description) return;
    this.noteService.addNote(this.newNote).subscribe({
      next: () => {
        this.newNote = { title: '', description: '' };
        this.loadNotes();
      },
      error: (err) => console.error('Error adding note:', err),
    });
  }

  editNote(note: Note) {
    this.editingNote = { ...note };
  }

  updateNote() {
    if (!this.editingNote) return;
    this.noteService.updateNote(this.editingNote).subscribe({
      next: () => {
        this.editingNote = null;
        this.loadNotes();
      },
      error: (err) => console.error('Error updating note:', err),
    });
  }

  cancelEdit() {
    this.editingNote = null;
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id).subscribe({
      next: () => this.loadNotes(),
      error: (err) => console.error('Error deleting note:', err),
    });
  }
}
