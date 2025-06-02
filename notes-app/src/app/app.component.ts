import { Component } from '@angular/core';
import { NoteComponent } from './note/note.component';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NoteComponent],
  template: `<app-note></app-note>
`
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
