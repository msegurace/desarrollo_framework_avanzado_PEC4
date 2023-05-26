import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesListComponent } from './categories-list.component';
import { CategoryService } from 'src/app/Services/category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoryDTO } from 'src/app/Models/category.dto';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { Router } from '@angular/router';

describe('CategoryListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CategoriesListComponent],
      providers: [CategoryService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //TEST 1: Que se cree el componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //TEST 2: cuando se lance loadCategories se lance la llamada getCategoriesByUserId
  it('loadCategories success from subscription', () => {
    const categoryService = fixture.debugElement.injector.get(CategoryService);

    //Añado un userId para que entre en la condición del componente.
    const localStorageService =
      fixture.debugElement.injector.get(LocalStorageService);
    localStorageService.set('user_id', 'xxxx');

    const listCategories: CategoryDTO[] = [];

    const spy = spyOn(categoryService, 'getCategoriesByUserId').and.returnValue(
      of(listCategories)
    );

    component['loadCategories']();

    expect(spy).toHaveBeenCalled();

    expect(component.categories.length).toBe(0);
  });

  //TEST 3: cuando se llame a createCategory que se lance navigateByUrl
  it('createCategory success from subscription', () => {
    const router = fixture.debugElement.injector.get(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.createCategory();

    expect(spy).toHaveBeenCalledWith('/user/category/');
  });

  //TEST 4: cuando se llame a updateCategory que se lance navigateByUrl
  it('updateCategory success from subscription', () => {
    const router = fixture.debugElement.injector.get(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.updateCategory('1');

    expect(spy).toHaveBeenCalledWith('/user/category/1');
  });
});
