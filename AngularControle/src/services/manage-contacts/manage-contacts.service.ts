
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { IContacts } from 'src/modals/contact';



@Injectable({
  providedIn: 'root'
})
export class ManageContactsService {


  // 1 - create list of contact
  contacts : Array<IContacts> = [];

   // Get a reference to the database service
  database = firebase.database();

  i = 0;
  
  constructor() { }

  // add User firebase
  addContactOnFirebase(contact: IContacts): Promise<IContacts[]> {
    return new Promise((resolve, reject) => {
       this.database
        .ref(`contacts/${this.contacts.length}`)
        .set({
          firstname: contact.lastname,
          lastname: contact.firstname,
          email: contact.email,
          phone: contact.phone,
        })
        .then(() => {})
        .catch(() => {
          reject("Erreur");
        });
    });
  }

  // add contact to list
  addContact(contact: IContacts): Array<IContacts> {
    this.contacts.push(contact);
    return this.contacts;
  }


  // get all contact firebase
  getContactsOnFirebase(): Promise<Array<IContacts>> {
    return new Promise((resolve, reject) => {
      this.database.ref("contacts").on(
        "child_added",
        (snapshot) => {
          let obj = snapshot.val();
          obj.id = snapshot.key;
          this.contacts.push(obj);
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // update Contact firebase
  updateContactOnFirebase(contact: IContacts, id: number) {
    let update = {};
    update["/contacts/" + id] = contact;

    this.database.ref().update(update);
  }

  // delete Contact firebase
  deleteContact(id: number) {
    this.database.ref(`/contacts/${id}`).remove();
  }

  // delete Listtener
  deleteListener() {
    this.database.ref("contacts").on("child_removed", (child_removed) => {
      let i: number = 0;
      let continuer: boolean = true;
      do {
        if (Number(this.contacts[i].id) === Number(child_removed.key)) {
          console.log("dele");
          this.contacts.splice(i, 1);
          continuer = false;
        }
        ++i;
      } while (continuer && i < this.contacts.length);
    });
  }

  // update Listtener
  updateListener() {
    this.database.ref("contacts").on("child_changed", (child_change) => {
      let i: number = 0;
      let continuer: boolean = true;
      do {
        if (Number(this.contacts[i].id) === Number(child_change.key)) {
          console.log("dele");
          this.contacts[i].firstname = child_change.val().firstname;
          this.contacts[i].lastname = child_change.val().lastname;
          this.contacts[i].email = child_change.val().email;
          this.contacts[i].phone = child_change.val().phone;
          continuer = false;
        }
        ++i;
      } while (continuer && i < this.contacts.length);
    });
  }

  isAuthenticated(): Promise<string> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user.uid);
          resolve(user.uid);
        } else {
          reject("Utilisateur non identifié");
        }
      });
    });
  }

  
}
