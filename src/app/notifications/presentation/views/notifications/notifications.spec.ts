import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { of } from 'rxjs';

import { Notifications } from './notifications';

import { NotificationService } from '../../../infrastructure/notification.service';

import { TranslateModule } from '@ngx-translate/core';

// MOCK del NotificationCardComponent
@Component({
  selector: 'app-notification-card',
  standalone: true,
  template: ''
})
class MockNotificationCardComponent {

  @Input() notification: any;

}

describe('Notifications', () => {

  let component: Notifications;
  let fixture: ComponentFixture<Notifications>;

  // MOCK NotificationService
  const notificationServiceMock = {

    getMyNotifications: jasmine.createSpy('getMyNotifications').and.returnValue(

      of([
        {
          id: 1,
          title: 'Test Notification',
          message: 'Notification Message',
          createdAt: new Date().toISOString()
        }
      ])

    )

  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        TranslateModule.forRoot(),
        MockNotificationCardComponent
      ],

      providers: [

        {
          provide: NotificationService,
          useValue: notificationServiceMock
        }

      ]

    })
      .overrideComponent(Notifications, {

        set: {
          imports: [
            MockNotificationCardComponent,
            TranslateModule
          ]
        }

      })
      .compileComponents();

    fixture = TestBed.createComponent(Notifications);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  // TEST 1
  it('should create notifications component', () => {

    expect(component).toBeTruthy();

  });

  // TEST 2
  it('should load notifications', () => {

    expect(component.notifications.length).toBe(1);

  });

  // TEST 3 - INTEGRATION TEST
  it('should refresh notifications using notification service', () => {

    component.refreshNotifications();

    expect(
      notificationServiceMock.getMyNotifications
    ).toHaveBeenCalled();

  });

});
