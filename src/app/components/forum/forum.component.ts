import { Component } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginatorModule],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent {
  buscarQuery = '';
  posts: any[] = [];
  isLoading = false;
  noResults = false;

  pageSize = 3;
  pageIndex = 0;
  afterTokens: (string | null)[] = [null];
  lengthSimulada = 100;

  constructor(private fS: ForumService) {}

  buscarDebates(): void {
    if (!this.buscarQuery.trim()) return;

    this.resetPaginator();
    this.isLoading = true;

    this.fS.buscarPosts(this.buscarQuery, null, this.pageSize).subscribe({
      next: (res) => {
        this.posts = res?.data?.children || [];
        this.noResults = this.posts.length === 0;
        this.afterTokens[1] = res.data.after;
      },
      complete: () => (this.isLoading = false),
    });
  }

  onPageChange(event: PageEvent): void {
    const newPageIndex = event.pageIndex;
    const newPageSize = event.pageSize;

    // Si cambió el tamaño de página, reiniciamos
    if (newPageSize !== this.pageSize) {
      this.pageSize = newPageSize;
      this.buscarDebates();
      return;
    }

    if (newPageIndex === 0) {
      this.pageIndex = 0;
      this.buscarDebates();
      return;
    }

    const after = this.afterTokens[newPageIndex];
    if (after === undefined) return;

    this.isLoading = true;
    this.fS.buscarPosts(this.buscarQuery, after, this.pageSize).subscribe({
      next: (res) => {
        this.posts = res?.data?.children || [];
        this.pageIndex = newPageIndex;
        this.noResults = this.posts.length === 0;

        if (!this.afterTokens[newPageIndex + 1]) {
          this.afterTokens[newPageIndex + 1] = res.data.after;
        }
      },
      complete: () => (this.isLoading = false),
    });
  }

  private resetPaginator(): void {
    this.posts = [];
    this.pageIndex = 0;
    this.afterTokens = [null];
    this.noResults = false;
  }
}
