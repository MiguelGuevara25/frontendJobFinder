import { Component } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forum',
  imports: [CommonModule,FormsModule],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css',
})
export class ForumComponent {
  buscarQuery: string = '';
  posts: any[] = [];
  isLoading: boolean = false;
  noResults: boolean = false;

  constructor(private fS: ForumService) {}

  buscarDebates(): void {
    this.isLoading = true;
    this.noResults = false;
    this.fS.buscarPosts(this.buscarQuery).subscribe((result: any) => {
      if (result.data.children.length === 0) {
        this.noResults = true;
      } else {
        this.posts = result.data.children;
      }
      this.isLoading = false;
    });
  }
}
