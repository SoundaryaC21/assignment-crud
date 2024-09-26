import { Component } from '@angular/core';
import { ContactService, IContact } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  contacts: IContact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContacts().subscribe((data) => {
      console.log(data);
      this.contacts = data;
    });
  }

  deleteContact(id: string) {
    this.contactService.deleteContact(id).subscribe(() => {
      this.getContacts();
    });
  }
}
