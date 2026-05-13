import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AssignmentsBoard } from './assignments-board';

import { AssignmentService } from '../../../infrastructure/assignment.service';
import { IncidentService } from '../../../../incidents/infrastructure/incident.service';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AssignmentsBoard', () => {

  let component: AssignmentsBoard;
  let fixture: ComponentFixture<AssignmentsBoard>;

  // MOCK AssignmentService
  const assignmentServiceMock = {

    getMyAssignments: jasmine.createSpy('getMyAssignments').and.returnValue(

      of([
        {
          id: 1,
          incidentId: 10,

          priority: 'HIGH',
          status: 'OPEN',

          title: 'Test Incident',
          description: 'Test Description',

          assignedTo: 'Tester',
          createdAt: new Date(),

          documentUrl: ''
        }
      ])

    ),

    updatePriority: jasmine.createSpy('updatePriority').and.returnValue(
      of({})
    ),

    start: jasmine.createSpy('start').and.returnValue(
      of({})
    ),

    close: jasmine.createSpy('close').and.returnValue(
      of({})
    )

  };

  // MOCK IncidentService
  const incidentServiceMock = {

    updateDocumentUrl: jasmine.createSpy('updateDocumentUrl').and.returnValue(
      of({})
    )

  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        AssignmentsBoard,
        MatDialogModule,
        MatSnackBarModule
      ],

      providers: [

        {
          provide: AssignmentService,
          useValue: assignmentServiceMock
        },

        {
          provide: IncidentService,
          useValue: incidentServiceMock
        }

      ]

    }).compileComponents();

    fixture = TestBed.createComponent(AssignmentsBoard);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  // TEST 1
  it('should create assignments board component', () => {

    expect(component).toBeTruthy();

  });

  // TEST 2
  it('should load assignments', () => {

    expect(component.assignments.length).toBe(1);

  });

  // TEST 3 - INTEGRATION TEST
  it('should change priority using assignment service', () => {

    const assignment = component.assignments[0];

    component.onChangePriority(
      assignment,
      'LOW'
    );

    expect(
      assignmentServiceMock.updatePriority
    ).toHaveBeenCalled();

  });

});
