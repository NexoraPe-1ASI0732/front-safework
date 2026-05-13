import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Analytics } from './analytics';

import { AnalyticsService } from '../../../services/analytics.service';

import { TranslateModule } from '@ngx-translate/core';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

describe('Analytics', () => {

  let component: Analytics;
  let fixture: ComponentFixture<Analytics>;

  // Mock del servicio
  const analyticsServiceMock = {

    getAnalytics: jasmine.createSpy('getAnalytics').and.returnValue(

      of({

        analytics: {

          open: {
            count: 5,
            percentage: 25
          },

          assigned: {
            count: 3,
            percentage: 15
          },

          in_progress: {
            count: 7,
            percentage: 35
          },

          closed: {
            count: 5,
            percentage: 25
          }

        }

      })

    )

  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        Analytics,
        TranslateModule.forRoot()
      ],

      providers: [

        {
          provide: AnalyticsService,
          useValue: analyticsServiceMock
        }

      ]

    }).compileComponents();

    fixture = TestBed.createComponent(Analytics);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  // TEST 1
  it('should create analytics component', () => {

    expect(component).toBeTruthy();

  });

  // TEST 2
  it('should load analytics data', () => {

    expect(component.analyticsOptions.length).toBe(4);

  });

  // TEST 3
  it('should fill chart data', () => {

    expect(component.pieChartData.datasets[0].data.length).toBe(4);

  });

  // TEST 4 - INTEGRATION TEST
  it('should call analytics service', () => {

    component.loadData();

    expect(
      analyticsServiceMock.getAnalytics
    ).toHaveBeenCalled();

  });

});
