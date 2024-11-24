import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RegistrationService } from './registration.service';
export function UniqueEmailValidator(service: RegistrationService): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>=>{
    return service.getUserByEmail(c.value).pipe(
      map(users => {
        return users && users.length > 0 ? { 'uniqueEmail': true } : null;
      })
    )
  }
}
@Directive({
  selector: '[UniqueEmail]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailValidatorDirective, multi: true }]
})
export class UniqueEmailValidatorDirective implements AsyncValidator {


  constructor(private service: RegistrationService) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return UniqueEmailValidator(this.service)(c);
  }

}
