import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Note {
  id?: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = 'http://localhost:5000/api/notes';  // Flask backend URL

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  addNote(note: Note): Observable<any> {
    return this.http.post(this.apiUrl, note);
  }

  updateNote(note: Note): Observable<any> {
    return this.http.put(`${this.apiUrl}/${note.id}`, note);
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
