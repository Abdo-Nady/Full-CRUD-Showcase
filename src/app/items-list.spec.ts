import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsList } from './items-list';

describe('ItemsList', () => {
  let component: ItemsList;
  let fixture: ComponentFixture<ItemsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
