import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { LoginForm } from './login-form';

import { TranslateModule } from '@ngx-translate/core';

import { IamStore } from '../../../application/iam.store';

describe('LoginForm', () => {

  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;

  // MOCK IamStore
  const iamStoreMock = {

    signIn: jasmine.createSpy('signIn')

  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        LoginForm,
        TranslateModule.forRoot()
      ],

      providers: [

        provideHttpClient(),
        provideRouter([]),

        {
          provide: IamStore,
          useValue: iamStoreMock
        }

      ]

    }).compileComponents();

    fixture = TestBed.createComponent(LoginForm);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  // TEST 1
  it('should create login form component', () => {

    expect(component).toBeTruthy();

  });

  // TEST 2
  it('should validate login form', () => {

    expect(component.loginForm.invalid)
      .toBeTrue();

  });

  // TEST 3 - INTEGRATION TEST
  it('should call signIn from IamStore', () => {

    component.loginForm.setValue({

      email: 'test@test.com',
      password: '123456'

    });

    component.onLogin();

    expect(
      iamStoreMock.signIn
    ).toHaveBeenCalled();

  });

});
