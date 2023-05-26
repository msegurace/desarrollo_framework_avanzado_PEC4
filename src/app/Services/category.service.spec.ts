import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CategoryService, deleteResponse } from './category.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CategoryDTO } from '../Models/category.dto';

const categoryList: CategoryDTO[] = [
  {
    categoryId: '1',
    userId: '',
    css_color: '',
    description: '',
    title: '',
  },
  {
    categoryId: '2',
    userId: '',
    css_color: '',
    description: '',
    title: '',
  },
  {
    categoryId: '3',
    userId: '',
    css_color: '',
    description: '',
    title: '',
  },
];

const newCategory: CategoryDTO = {
  categoryId: '4',
  userId: '',
  css_color: '',
  description: '',
  title: '',
};

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  //TEST 1: Comprobar que el servicio se crea correctamente
  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  //TEST 2: Comprobar que getCategoriesByUserId devuelve lista
  it('GET Method and getCategoriesByUserId return a list of categories', () => {
    service.getCategoriesByUserId('1').subscribe((resp: CategoryDTO[]) => {
      expect(resp).toEqual(categoryList);
    });

    const req = httpMock.expectOne('http://localhost:3000/users/categories/1');

    expect(req.request.method).toBe('GET');

    req.flush(categoryList);
  });

  //TEST 3: Comprobar que createCategory crea la categoría y el método es POST
  it('POST Method and createCategory creates category', () => {
    service.createCategory(newCategory).subscribe((resp: CategoryDTO) => {
      expect(resp).toEqual(newCategory);
    });

    const req = httpMock.expectOne('http://localhost:3000/categories');

    expect(req.request.method).toBe('POST');

    req.flush(newCategory);
  });

  //TEST 4: Comprobar que getCategoryById obtiene una categoría y el método es GET
  it('GET Method and getCategoryById return a category', () => {
    service.getCategoryById('1').subscribe((resp: CategoryDTO) => {
      expect(resp).toEqual(categoryList[0]);
    });

    const req = httpMock.expectOne('http://localhost:3000/categories/1');

    expect(req.request.method).toBe('GET');

    req.flush(categoryList[0]);
  });

  //TEST 5: Comprobar que updateCategory actualiza la categoría y el método es PUT
  it('PUT Method and updateCategory updates category', () => {
    service
      .updateCategory('1', categoryList[0])
      .subscribe((resp: CategoryDTO) => {
        expect(resp).toEqual(categoryList[0]);
      });

    const req = httpMock.expectOne('http://localhost:3000/categories/1');

    expect(req.request.method).toBe('PUT');

    req.flush(categoryList[0]);
  });

  //TEST 6: Comprobar que deleteCategory borra la categoría y el método es DELETE
  it('DELETE Method and deleteCategory deletes category', () => {
    service.deleteCategory('4').subscribe((resp: deleteResponse) => {
      expect(resp).toEqual(resp);
    });

    const req = httpMock.expectOne('http://localhost:3000/categories/4');

    expect(req.request.method).toBe('DELETE');

    //Records affected
    req.flush(1);
  });
});
