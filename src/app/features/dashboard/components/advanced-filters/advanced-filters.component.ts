import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advanced-filters',
  template: `
    <mat-form-field appearance="fill">
      <mat-label>Selecciona un autor</mat-label>
      <mat-select [(value)]="selectedCategory" (selectionChange)="onFilterChange()">
        <mat-option *ngFor="let author of authors" [value]="author">
          {{ author }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, CommonModule],
})
export class AdvancedFiltersComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<string>();
  authors: string[] = [];
  selectedCategory: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Obtener autores únicos desde el API
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts').subscribe((data) => {
      this.authors = [...new Set(data.map((item) => item.userId.toString()))]; // Agrupar por userId
    });
  }

  onFilterChange() {
    this.filterChanged.emit(this.selectedCategory);
  }
}
