import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  selected = 'author';

  constructor(private fb: FormBuilder) { }
  
  search(){
  }

  myForm = this.fb.group({
    search: new FormControl('author')
  });

}
