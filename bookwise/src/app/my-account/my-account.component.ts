import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserRegisterService } from '../utils/service/user-register.service';
import { SearchCreditCardService } from '../utils/service/search-credit-card.service';
import { SearchCepService } from '../utils/service/search-cep.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UserRegisterRequest } from '../utils/request/user-register.request';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {
  isEditing: boolean = false;


}
