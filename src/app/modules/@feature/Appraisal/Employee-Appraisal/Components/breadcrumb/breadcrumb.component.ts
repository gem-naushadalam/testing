import { Component, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

import { BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnDestroy {
  public items: BreadCrumbItem[] = [
    {
      text: 'Appraisal Form',
      title: 'Appraisal Form',
    },
    {
      text: 'Goals',
      title: 'Goals',
    },
    {
      text: 'Achievements',
      title: 'Achievements',
    },
    {
      text: 'Final Submit',
      title: 'Final Submit',
    },
  ];

  private routesData: Subscription = new Subscription();

  constructor(private router: Router) {
    this.initRoutes();
  }

  public ngOnDestroy(): void {
    this.routesData.unsubscribe();
  }

  public onItemClick(item: BreadCrumbItem): void {
    const selectedItemIndex = this.items.findIndex((i) => i.text === item.text);
    const url = this.items.slice(0, selectedItemIndex + 1).map((i) => i.text);
    this.router.navigate(url);
  }

  private initRoutes(): void {
    this.routesData = this.router.events.subscribe((d) => {
      // Exclude query parameters from URL
      const route = this.router.url;
      this.items = route
        .substring(
          0,
          route.indexOf('?') !== -1 ? route.indexOf('?') : route.length
        )
        .split('/')
        .filter(Boolean)
        .map((segment, i, arr) => {
          return {
            text: segment.charAt(0).toUpperCase() + segment.slice(1),
            title: segment,
          };
        });

      this.items = [
        {
          text: 'Appraisal Form',
          title: 'Appraisal Form',
          // icon: 'home',
        },
        ...this.items,
      ];
    });
  }
}
