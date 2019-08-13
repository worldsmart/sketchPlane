import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { OfftopComponent } from './components/offtop/offtop.component';
import { FanficComponent } from './components/fanfic/fanfic.component';
import { InfoComponent } from './components/info/info.component';
import {WsDisconnectGuard} from './guard/ws-disconnect.guard';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'offtop', component: OfftopComponent, canDeactivate: [WsDisconnectGuard]},
  { path: 'fanfic', component: FanficComponent },
  { path: 'info', component: InfoComponent },
  { path: '**',   redirectTo: '/main' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
