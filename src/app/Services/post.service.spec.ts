import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PostService, deleteResponse, updateResponse } from './post.service';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CategoryDTO } from '../Models/category.dto';
import { PostDTO } from '../Models/post.dto';

const categoryList: CategoryDTO[] = [
  {
    categoryId: '1',
    userId: '',
    css_color: '',
    description: '',
    title: '',
  },
];

const postList: PostDTO[] = [
  {
    postId: '1',
    categories: categoryList,
    description: '',
    num_dislikes: 0,
    num_likes: 0,
    publication_date: new Date(),
    title: '',
    userAlias: '',
    userId: '',
  },
  {
    postId: '2',
    categories: categoryList,
    description: '',
    num_dislikes: 0,
    num_likes: 0,
    publication_date: new Date(),
    title: '',
    userAlias: '',
    userId: '',
  },
  {
    postId: '3',
    categories: categoryList,
    description: '',
    num_dislikes: 0,
    num_likes: 0,
    publication_date: new Date(),
    title: '',
    userAlias: '',
    userId: '',
  },
];

const newPost: PostDTO = {
  postId: '3',
  categories: categoryList,
  description: '',
  num_dislikes: 0,
  num_likes: 0,
  publication_date: new Date(),
  title: '',
  userAlias: '',
  userId: '',
};

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  //TEST 1: Comprobar que el servicio se crea correctamente
  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  //TEST 2: Comprobar que getPosts devuelve lista
  it('GET Method and getPosts return a list of Posts', () => {
    service.getPosts().subscribe((resp: PostDTO[]) => {
      expect(resp).toEqual(postList);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts');

    expect(req.request.method).toBe('GET');

    req.flush(postList);
  });

  //TEST 3: Comprobar que getPostsByUserId devuelve lista
  it('GET Method and getPostsByUserId return a list of Posts', () => {
    service.getPostsByUserId('1').subscribe((resp: PostDTO[]) => {
      expect(resp).toEqual(postList);
    });

    const req = httpMock.expectOne('http://localhost:3000/users/posts/1');

    expect(req.request.method).toBe('GET');

    req.flush(postList);
  });

  //TEST 4: Comprobar que createPost crea la categoría y el método es POST
  it('POST Method and createPost creates Post', () => {
    service.createPost(newPost).subscribe((resp: PostDTO) => {
      expect(resp).toEqual(newPost);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts');

    expect(req.request.method).toBe('POST');

    req.flush(newPost);
  });

  //TEST 5: Comprobar que getPostById obtiene una categoría y el método es GET
  it('GET Method and getPostById return a Post', () => {
    service.getPostById('1').subscribe((resp: PostDTO) => {
      expect(resp).toEqual(postList[0]);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/1');

    expect(req.request.method).toBe('GET');

    req.flush(postList[0]);
  });

  //TEST 6: Comprobar que updatePost actualiza la categoría y el método es PUT
  it('PUT Method and updatePost updates Post', () => {
    service.updatePost('1', postList[0]).subscribe((resp: PostDTO) => {
      expect(resp).toEqual(postList[0]);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/1');

    expect(req.request.method).toBe('PUT');

    req.flush(postList[0]);
  });

  //TEST 7: Comprobar que deletePost borra la categoría y el método es DELETE
  it('DELETE Method and deletePost deletes Post', () => {
    service.deletePost('4').subscribe((resp: deleteResponse) => {
      expect(resp).toEqual(resp);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/4');

    expect(req.request.method).toBe('DELETE');

    //Records affected
    req.flush(1);
  });

  //TEST 9: Comprobar que likePost actualiza likes y el método es PUT
  it('PUT Method and likePost updates Post', () => {
    service.likePost('1').subscribe((resp: updateResponse) => {
      expect(resp).toEqual(resp);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/like/1');

    expect(req.request.method).toBe('PUT');

    req.flush(1);
  });

  //TEST 9: Comprobar que likePost actualiza likes y el método es PUT
  it('PUT Method and disLikePost updates Post', () => {
    service.dislikePost('1').subscribe((resp: updateResponse) => {
      expect(resp).toEqual(resp);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/dislike/1');

    expect(req.request.method).toBe('PUT');

    req.flush(1);
  });
});
