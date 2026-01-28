import {Routes} from '@angular/router';
import {AppLayout} from '../component/layout/app.layout';
import {Dashboard} from '../../dashboard/dashboard';
import {PartComponent} from '../../part';
import {FenestrationComponent} from '../../fenestration';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      {path: '', component: Dashboard},
      {path: 'part', component: PartComponent},
      {path: 'fenestration', component: FenestrationComponent},
    ]
  }
];
