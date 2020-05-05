import { ManageContactsService } from './../../services/manage-contacts/manage-contacts.service';
import { IContacts } from './../../modals/contact';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concat } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    // contact
    contactForm:FormGroup;

    // list Contact
    contacts: Array<IContacts>;

  

    // AbstractControl class for FormControl, FormGroup
    firstname:AbstractControl;
    lastname:AbstractControl;
    email:AbstractControl;
    phone:AbstractControl;
  
    // interface 
    contact:IContacts;
  

    titlebtn = "Create";

      id = 0;

      keys = []; 

  
    constructor(private formBuilder: FormBuilder,    private manageContact: ManageContactsService,
      private router: Router) { 
     
    
    }


  ngOnInit(): void {

    this.contactForm = this.formBuilder.group({
      firstname:  [null,[Validators.required, Validators.minLength(6)]],
      lastname:   [null,[Validators.required, Validators.minLength(6)]],
      email:      [null,[Validators.required, Validators.email]],
      phone:      [null,[Validators.required, Validators.minLength(6)]],
    });

    this.firstname  = this.contactForm.controls.firstname;
    this.lastname   = this.contactForm.controls.lastname;
    this.email      = this.contactForm.controls.email;
    this.phone      = this.contactForm.controls.phone;


    this.contacts = [];
    this.keys = [];
    console.log("ngOninit");
    this.manageContact.isAuthenticated().then(async (uid: string) => {
      this.manageContact.getContactsOnFirebase().then(() => {});
      this.contacts = this.manageContact.contacts;
      this.manageContact.deleteListener();
      this.manageContact.updateListener();
    });


  }

  onEdit(contact: IContacts):void {

    this.titlebtn = "Update";

    
    this.contactForm.value.firstname = contact.firstname;
    this.contactForm.value.lastname = contact.lastname;
    this.contactForm.value.email = contact.email;
    this.contactForm.value.phone = contact.phone;

    this.contact = contact;
    this.id = contact.id;
  }

  onDelete(id: number) {
    this.manageContact.deleteContact(id);
  } 

  onSubmit(){
    this.contact = {
      firstname: this.contactForm.value.firstname,
      lastname: this.contactForm.value.lastname,
      email: this.contactForm.value.email,
      phone: this.contactForm.value.phone
    };
  

    switch (this.titlebtn) {
      case "Create":
        this.manageContact.addContactOnFirebase(this.contact);

        break;

      case "Update":
        this.manageContact.updateContactOnFirebase(this.contact, this.id);
        break;
    }
    
    
  }



}
