import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, DatePipe],
  template: `
    <div class="container mt-4" style="max-width: 600px;">
      <div class="card shadow">
        <div class="card-body">

          <h3 class="mb-4 text-center">📝 Smart List</h3>

          <p>Total items: {{ filteredItems().length }}</p>

          <div class="input-group mb-3 shadow-sm">
            <input
              type="text"
              class="form-control"
              [(ngModel)]="searchTerm"
              placeholder="Search items"
            />
          </div>

          <div class="d-flex flex-wrap justify-content-center gap-2 mb-3">
            <button class="btn btn-secondary" (click)="sortItems()">Sort A-Z</button>
            <button class="btn btn-info" (click)="sortByNewest()">Newest</button>
            <button class="btn btn-info" (click)="sortByOldest()">Oldest</button>
            <button class="btn btn-danger" (click)="clearAll()">Clear All</button>
          </div>

          <div class="input-group mb-3 shadow-sm">
            <input
              type="text"
              class="form-control"
              [(ngModel)]="newItem"
              placeholder="Add new item"
            />
            <button class="btn btn-primary" (click)="addItem()">Add</button>
          </div>

          <ul class="list-group">
            <li *ngFor="let item of filteredItems()" class="list-group-item">
              <div *ngIf="editingItem !== item" class="d-flex justify-content-between align-items-center">
                <div>
                  {{ item.text }}
                  <small class="text-muted ms-2">
                    ({{ item.timestamp | date:'short' }})
                  </small>
                </div>
                <div>
                  <button class="btn btn-sm btn-warning me-2" (click)="startEdit(item)">Edit</button>
                  <button class="btn btn-danger btn-sm" (click)="deleteItem(item)">Delete</button>
                </div>
              </div>

              <div *ngIf="editingItem === item" class="d-flex w-100">
                <input type="text" [(ngModel)]="editValue" class="form-control border-primary me-2"/>
                <button class="btn btn-success btn-sm" (click)="saveEdit()">Save</button>
                <button class="btn btn-secondary btn-sm" (click)="cancelEdit()">Cancel</button>
              </div>
            </li>
          </ul>

        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsListComponent {
  items = signal<{ text: string; timestamp: Date }[]>([
    { text: 'Item 1', timestamp: new Date() },
    { text: 'Item 2', timestamp: new Date() },
    { text: 'Item 3', timestamp: new Date() }
  ]);

  newItem = '';
  searchTerm = '';
  editingItem: { text: string; timestamp: Date } | null = null;
  editValue = '';

  addItem() {
    if (this.newItem.trim()) {
      const newEntry = { text: this.newItem.trim(), timestamp: new Date() };
      this.items.update(items => [...items, newEntry]);
      this.newItem = '';
    }
  }

  deleteItem(itemToDelete: { text: string; timestamp: Date }) {
    this.items.update(items => items.filter(item => item !== itemToDelete));
  }

  startEdit(itemToEdit: { text: string; timestamp: Date }) {
    this.editingItem = itemToEdit;
    this.editValue = itemToEdit.text;
  }

  saveEdit() {
    if (this.editValue.trim() && this.editingItem) {
      this.items.update(items =>
        items.map(item =>
          item === this.editingItem
            ? { ...item, text: this.editValue.trim() }
            : item
        )
      );
      this.editingItem = null;
      this.editValue = '';
    }
  }

  cancelEdit() {
    this.editingItem = null;
    this.editValue = '';
  }

  clearAll() {
    this.items.set([]);
  }

  sortItems() {
    this.items.update(items =>
      [...items].sort((a, b) => a.text.localeCompare(b.text))
    );
  }

  sortByNewest() {
    this.items.update(items =>
      [...items].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    );
  }

  sortByOldest() {
    this.items.update(items =>
      [...items].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    );
  }

  filteredItems() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.items();
    return this.items().filter(item =>
      item.text.toLowerCase().includes(term)
    );
  }
}
