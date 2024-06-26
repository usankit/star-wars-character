import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterFilterComponent } from './filter/filter.component';


@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    CharacterListComponent,
    CharacterFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule  // Add this import

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
