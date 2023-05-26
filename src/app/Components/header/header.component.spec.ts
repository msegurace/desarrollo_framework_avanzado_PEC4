import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';

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
  it('should show Authenticated menu options', async () => {
    const headerMenusService =
      fixture.debugElement.injector.get(HeaderMenusService);

    const buttonsAuth: boolean[] = [false, false, false, false, false];

    const headerInfo: HeaderMenus = {
      showAuthSection: true,
      showNoAuthSection: false,
    };
    headerMenusService.headerManagement.next(headerInfo);

    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      const buttonDebugElements = fixture.debugElement.queryAll(
        By.css('button')
      );

      buttonDebugElements.forEach((but) => {
        console.log(but.nativeElement.textContent);
        switch (but.nativeElement.textContent) {
          case 'Home':
            buttonsAuth[0] = true;
            break;
          case 'Admin posts':
            buttonsAuth[1] = true;
            break;
          case 'Admin categories':
            buttonsAuth[2] = true;
            break;
          case 'Profile':
            buttonsAuth[3] = true;
            break;
          case 'Logout':
            buttonsAuth[4] = true;
            break;
        }
      });
      console.log(
        buttonsAuth[0] +
          ' ' +
          buttonsAuth[1] +
          ' ' +
          buttonsAuth[2] +
          ' ' +
          buttonsAuth[3] +
          ' ' +
          buttonsAuth[4]
      );

      expect(
        buttonsAuth[0] &&
          buttonsAuth[1] &&
          buttonsAuth[2] &&
          buttonsAuth[3] &&
          buttonsAuth[4]
      ).toBeTruthy();
    });
  });

  //TEST 7: si estamos autenticados que muestre las opciones correctas
  it('should show NOT Authenticated menu options', async () => {
    const buttonsAuth: boolean[] = [false, false, false];
    const headerMenusService =
      fixture.debugElement.injector.get(HeaderMenusService);

    const headerInfo: HeaderMenus = {
      showAuthSection: false,
      showNoAuthSection: true,
    };
    headerMenusService.headerManagement.next(headerInfo);
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      const buttonDebugElements = fixture.debugElement.queryAll(
        By.css('button')
      );

      buttonDebugElements.forEach((but) => {
        switch (but.nativeElement.textContent) {
          case 'Home':
            buttonsAuth[0] = true;
            break;
          case 'Login':
            buttonsAuth[1] = true;
            break;
          case 'Register':
            buttonsAuth[2] = true;
            break;
        }
      });
      expect(buttonsAuth[0] && buttonsAuth[1] && buttonsAuth[2]).toBeTruthy();
    });
  });
});
