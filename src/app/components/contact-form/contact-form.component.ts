import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  contactForm: FormGroup;
  id: any;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.contactForm = this.fb.group({
      createdAt: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(0)]],
      gender: ['', Validators.required],
      mobilenumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      pan_no: [''],
      adhaar_no: [''],
      status: [true],
    });
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.isEditMode = true;
        this.getContactById(this.id);
      } else {
        this.isEditMode = false; // Set to create mode
      }
    });
  }

  getContactById(id: string) {
    this.contactService.getContactById(id).subscribe((data) => {
      this.contactForm.patchValue(data);
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      if (this.isEditMode) {
        this.contactService
          .updateContact(this.id, this.contactForm.value)
          .subscribe((response) => {
            console.log('Contact updated:', response);
            this.router.navigate(['/contacts']);
          });
      } else {
        this.contactService
          .createContact(this.contactForm.value)
          .subscribe((response) => {
            console.log('Contact created:', response);
            this.router.navigate(['/contacts']);
          });
      }
    }
  }
}
