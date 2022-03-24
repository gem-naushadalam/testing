import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { ProjectsComponent } from '../projects/projects.component';
import { ProjectModuleService } from 'src/app/services/project-module/project-module.service';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit,OnChanges{
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  readonly home = { icon: 'pi pi-home', url: '#/project-management' };
  public menuItems: MenuItem[] = [];
  @Input() item = true;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public project: ProjectModuleService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(
        () =>
          {this.menuItems = this.createBreadcrumbs(this.activatedRoute.root)
          }
      );
  }

  ngOnInit(): void {

  }
  ngOnChanges(){
    console.log(this.item);
    this.menuItems =  this.createBreadcrumbs(this.activatedRoute.root);
  
  }

  createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '#',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;
    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
      let label =
        child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
  
   
      if (label !== null && label !== undefined) {
        if (label === 'project') {
          var data = this.activatedRoute.snapshot.params.type;
          if (data) {
            var arr = data?.split('@');
            label = arr[1];
          }
        }
        if(this.item == false && label == 'Verticals'){
          label = 'Industries';
        }
        breadcrumbs.push({ label, url });
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    // if (children.length === 0)
    return breadcrumbs;
  }
}
