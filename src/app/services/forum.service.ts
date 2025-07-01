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

  buscarPosts(
    query: string,
    after: string | null = null,
    limit: number = 5
  ): Observable<any> {
    let url = `https://www.reddit.com/search.json?q=${encodeURIComponent(
      query
    )}&limit=${limit}`;
    if (after) url += `&after=${after}`;
    return this.http.get(url);
  }
}
