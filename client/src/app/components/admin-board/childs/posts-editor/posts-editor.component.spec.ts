import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsEditorComponent } from './posts-editor.component';

describe('PostsEditorComponent', () => {
  let component: PostsEditorComponent;
  let fixture: ComponentFixture<PostsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
