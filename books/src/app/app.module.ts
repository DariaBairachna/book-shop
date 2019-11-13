import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './shared/layout/layout.module';
import { AlertComponent } from './shared/components/alert/alert.component';
import { CoreModule } from './core/core.module';
@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    LayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    AlertComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
