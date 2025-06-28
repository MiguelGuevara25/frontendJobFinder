import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private apiUrl = 'https://www.reddit.com/search.json';

  constructor(private http: HttpClient) {}

  buscarPosts(query: string): Observable<any> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(query)}&restrict_sr=on&sort=relevance&t=all`;
    return this.http.get(url);
  }
}
