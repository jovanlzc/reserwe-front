import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [LoginComponent],
  providers: []
})
export class AuthModule {

}
