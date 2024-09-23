import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  //apiUrlEmployee = window['env'] && window['env']['apiUrl'] ? window['env']['apiUrl'] : 'http://localhost:7150/api/Employee';
  apiUrlEmployee = environment.apiUrl;

  

  constructor(private http: HttpClient, private datepipe: DatePipe) {}

  getAllEmployee(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.apiUrlEmployee + '/getall')
      .pipe(
        map((data: Employee[]) =>
          data.map((item: Employee) => {
            const createdDate = item.createdDate ? new Date(item.createdDate) : null;
            return new Employee(
              item.id,
              item.name,
              createdDate
                ? this.datepipe.transform(createdDate, 'dd/MM/yyyy HH:mm:ss', undefined)?.toString()
                : 'No Date'
            );
          })
        )
      );
  }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(
      this.apiUrlEmployee + '/getbyid/?id=' + employeeId
    );
  }

  createEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<Employee>(
      this.apiUrlEmployee + '/create',
      employee,
      httpOptions
    );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put<Employee>(
      this.apiUrlEmployee + '/update',
      employee,
      httpOptions
    );
  }

  deleteEmployeeById(employeeid: number) {
    return this.http.delete(this.apiUrlEmployee + '/Delete/?id=' + employeeid);
  }
}
