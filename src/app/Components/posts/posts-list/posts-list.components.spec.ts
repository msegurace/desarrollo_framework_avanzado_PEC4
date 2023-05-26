import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { Router } from '@angular/router';
import { PostsListComponent } from './posts-list.component';
import { PostService } from 'src/app/Services/post.service';
import { PostDTO } from 'src/app/Models/post.dto';

describe('PostListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PostsListComponent],
      providers: [PostService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //TEST 1: Que se cree el componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //TEST 2: cuando se lance loadPosts se lance la llamada getPostsByUserId
  it('loadPosts success from subscription', () => {
    const postService = fixture.debugElement.injector.get(PostService);

    //Añado un userId para que entre en la condición del componente.
    const localStorageService =
      fixture.debugElement.injector.get(LocalStorageService);
    localStorageService.set('user_id', 'xxxx');

    const listPosts: PostDTO[] = [];

    const spy = spyOn(postService, 'getPostsByUserId').and.returnValue(
      of(listPosts)
    );

    component['loadPosts']();

    expect(spy).toHaveBeenCalled();

    expect(component.posts.length).toBe(0);
  });

  //TEST 3: cuando se llame a createPost que se lance navigateByUrl
  it('createPost success from subscription', () => {
    const router = fixture.debugElement.injector.get(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.createPost();

    expect(spy).toHaveBeenCalledWith('/user/post/');
  });

  //TEST 4: cuando se llame a updatePost que se lance navigateByUrl
  it('updatePost success from subscription', () => {
    const router = fixture.debugElement.injector.get(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.updatePost('1');

    expect(spy).toHaveBeenCalledWith('/user/post/1');
  });
});
