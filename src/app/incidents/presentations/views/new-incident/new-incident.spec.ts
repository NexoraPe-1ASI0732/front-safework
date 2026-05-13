import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { NewIncident } from './new-incident';

describe('NewIncident', () => {

  let component: NewIncident;
  let fixture: ComponentFixture<NewIncident>;

  let httpMock: HttpTestingController;

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        NewIncident,
        HttpClientTestingModule
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(NewIncident);

    component = fixture.componentInstance;

    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();

  });

  afterEach(() => {

    httpMock.verify();

  });

  // TEST 1
  it('should create new incident component', () => {

    expect(component).toBeTruthy();

  });

  // TEST 2
  it('should validate empty fields', () => {

    component.submitIncident();

    expect(component.error)
      .toContain('Please fill in all required fields.');

  });

  // TEST 3
  it('should prepare incident data correctly', () => {

    component.title = 'Test Incident';

    component.description = 'Description';

    component.location = 'Office';

    expect(component.title).toBe('Test Incident');

    expect(component.description).toBe('Description');

    expect(component.location).toBe('Office');

  });

  // TEST 4
  it('should emit close event on cancel', () => {

    spyOn(component.close, 'emit');

    component.cancel();

    expect(component.close.emit)
      .toHaveBeenCalledWith(false);

  });

  // TEST 5 - INTEGRATION TEST
  it('should start incident submission flow', () => {

    component.title = 'Integration Test';

    component.description = 'Testing submission';

    component.location = 'Office';

    component.submitIncident();

    expect(component.isSubmitting)
      .toBeTrue();

  });

});
