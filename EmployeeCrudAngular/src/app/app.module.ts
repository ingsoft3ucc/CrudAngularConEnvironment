import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, LOCALE_ID } from '@angular/core'; // Importar LOCALE_ID
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common'; // Importar DatePipe y registerLocaleData
import { FormsModule } from "@angular/forms";
import { AddemployeeComponent } from './addemployee/addemployee.component';


export function initializeApp(): () => Promise<void> {
  return () => {
    return new Promise<void>((resolve) => {
      const script = document.createElement('script');
      script.src = 'assets/env.js';
      script.onload = () => {
        resolve();
      };
      document.head.appendChild(script);
    });
  };
}


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AddemployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DatePipe,
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    multi: true,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



