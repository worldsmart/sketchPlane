import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { OfftopComponent } from './components/offtop/offtop.component';
import { FanficComponent } from './components/fanfic/fanfic.component';
import { InfoComponent } from './components/info/info.component';
import {AdminBoardComponent} from './components/admin-board/admin-board.component';
import {TokenVerifyGuard} from './guard/token-verify.guard';
import {NewsEditorComponent} from './components/admin-board/childs/news-editor/news-editor.component';
import {PostsEditorComponent} from './components/admin-board/childs/posts-editor/posts-editor.component';
import {UsersEditorComponent} from './components/admin-board/childs/users-editor/users-editor.component';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'offtop', component: OfftopComponent},
  { path: 'fanfic', component: FanficComponent },
  { path: 'info', component: InfoComponent },
  { path: 'admin', component: AdminBoardComponent, children: [
      { path: 'news-editor', component: NewsEditorComponent},
      { path: 'posts-editor', component: PostsEditorComponent},
      { path: 'users-editor', component: UsersEditorComponent}
    ] , canActivate: [TokenVerifyGuard]},
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
