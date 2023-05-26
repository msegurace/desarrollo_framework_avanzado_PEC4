import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

class TemporalComponentForRoutes {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;

  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Router }],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            component: TemporalComponentForRoutes,
          },
          {
            path: 'login',
            component: TemporalComponentForRoutes,
          },
          {
            path: 'register',
            component: TemporalComponentForRoutes,
          },
          {
            path: 'posts',
            component: TemporalComponentForRoutes,
          },
          {
            path: 'categories',
            component: TemporalComponentForRoutes,
          },
          {
            path: 'profile',
            component: TemporalComponentForRoutes,
          },
        ]),
      ],
      declarations: [HeaderComponent],

      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  //TEST 1: que se cree correctamente el componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 2: que se navegue correctamente a home
  it('should navigate to home', () => {
    const router = fixture.debugElement.injector.get(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('home');

    expect(spy).toHaveBeenCalledWith('home');
  });

  // TEST 3: que se navegue correctamente a login
  it('should navigate to login', () => {
    const router = TestBed.inject(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('login');

    expect(spy).toHaveBeenCalledWith('login');
  });

  // TEST 4: que se navegue correctamente a register
  it('should navigate to register', () => {
    const router = TestBed.inject(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('register');

    expect(spy).toHaveBeenCalledWith('register');
  });

  // TEST 5: que se navegue correctamente a posts
  it('should navigate to posts', () => {
    const router = TestBed.inject(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('posts');

    expect(spy).toHaveBeenCalledWith('posts');
  });

  // TEST 6: que se navegue correctamente a categories
  it('should navigate to categories', () => {
    const router = TestBed.inject(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('categories');

    expect(spy).toHaveBeenCalledWith('categories');
  });

  // TEST 6: que se navegue correctamente a profile
  it('should navigate to profile', () => {
    const router = TestBed.inject(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('profile');

    expect(spy).toHaveBeenCalledWith('profile');
  });

  //TEST 7: si estamos autenticados que muestre las opciones correctas
  it('should show Authenticated menu options', () => {
    const buttonsAuth: string[] = [];
    fixture.whenStable().then(() => {
      fixture.detectChanges(); // missed
      const buttonDebugElements = fixture.debugElement.queryAll(
        By.css('button')
      );

      but.find(
        (buttonDebugEl) =>
          buttonDebugEl.nativeElement.textContent === 'Dashboard'
      );
      expect(buttonDebugElement!.nativeElement.textContent).toBe('Dashboard');
    });
  });
});
