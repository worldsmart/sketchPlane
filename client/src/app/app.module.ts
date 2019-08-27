import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './service/auth.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { OfftopComponent } from './components/offtop/offtop.component';
import { FanficComponent } from './components/fanfic/fanfic.component';
import { InfoComponent } from './components/info/info.component';
import { FlashActivitesComponent } from './components/flash-activites/flash-activites.component';
import { AdminBoardComponent } from './components/admin-board/admin-board.component';
import { NewsEditorComponent } from './components/admin-board/childs/news-editor/news-editor.component';
import { PostsEditorComponent } from './components/admin-board/childs/posts-editor/posts-editor.component';
import { UsersEditorComponent } from './components/admin-board/childs/users-editor/users-editor.component';
import { TexteditorComponent } from './components/texteditor/texteditor.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MainComponent,
    OfftopComponent,
    FanficComponent,
    InfoComponent,
    FlashActivitesComponent,
    AdminBoardComponent,
    NewsEditorComponent,
    PostsEditorComponent,
    UsersEditorComponent,
    TexteditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }
