import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';import 
{ ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyACpvwBhVxH59Z1aPBPvJ5T2sYGg_K7nOQ",
  authDomain: "tutoang-cb235.firebaseapp.com",
  databaseURL: "https://tutoang-cb235.firebaseio.com",
  projectId: "tutoang-cb235",
  storageBucket: "tutoang-cb235.appspot.com",
  messagingSenderId: "136678459995",
  appId: "1:136678459995:web:2aadea70f88852c0f70d7e",
  measurementId: "G-3ZYZEP2GXS"
};

firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
