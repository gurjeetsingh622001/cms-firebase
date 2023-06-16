import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, map, } from 'rxjs';
import { config } from '../../config'
import { Firestore, addDoc, collection, collectionData, deleteDoc, deleteField, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { initializeApp } from "firebase/app";
import { getFirestore, } from "firebase/firestore";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);


  userUrl: string

  api = `https://identitytoolkit.googleapis.com/v1/accounts`

  dataBaseUrl = 'https://customer-management-syst-5b220-default-rtdb.firebaseio.com'

  constructor(@Inject('userUrl') _userUrl: any, private http: HttpClient, private fs: Firestore, private toastr: ToastrService, private router: Router) {
    this.userUrl = _userUrl
  }

  // async userRegister(form: any) {
  //   const usersCollection = collection(this.fs, 'users');

  //   // Check if the email already exists
  //   const emailQuery = query(usersCollection, where('email', '==', form.email));
  //   const querySnapshot = await getDocs(emailQuery);

  //   if (!querySnapshot.empty) {
  //     this.toastr.error('email already exists')
  //   }
  //   if (querySnapshot.empty) {
  //     // Add the new user
  //     form.id = doc(collection(this.fs, 'id')).id;
  //     return addDoc(usersCollection, form);
  //   }

  //   return

  // }

  userRegister(form: any) {
    console.log(form)
    return this.http.post(this.api + `:signUp?key=${config.APi_KEY}`, form)
  }

  userLogin(form: any) {

    return this.http.post(this.api + `:signInWithPassword?key=${config.APi_KEY}`, form)

  }

  // async userLogin(form: any) {
  //   const usersCollection = collection(this.fs, 'users');

  //   // Check if the email already exists
  //   const emailQuery = query(usersCollection, where('email', '==', form.email));
  //   const querySnapshot = await getDocs(emailQuery);

  //   if (querySnapshot.empty) {
  //     this.toastr.error('email does not exist');
  //     return;
  //   }

  //   // Check if the password is invalid
  //   const passwordQuery = query(usersCollection, where('password', '==', form.password));
  //   const passwordSnapshot = await getDocs(passwordQuery);

  //   if (passwordSnapshot.empty) {
  //     this.toastr.error('Invalid password');
  //     return;
  //   }

  //   // Handle successful login
  //   // ...

  //   localStorage.setItem('loggedInUser', form.email)
  //   return true;

  // }


  async addCustomer(form: any): Promise<void> {
    try {
      console.log(form.email);

      const citiesRef = collection(this.db, "customers");

      const docRef = doc(citiesRef, form.docRefEmail);

      await setDoc(docRef, form);

      this.router.navigate(['/customers/list'])
      this.toastr.success('Document successfully added!')


      return Promise.resolve();
    } catch (error) {
      // console.error("Error adding customer:", error);
      this.toastr.error('Error adding customer')
      throw error;
    }
  }


  getCustomers(filterKey?: any): Observable<any> {
    console.log(filterKey, 'filterKey');

    const customersRef = collection(this.fs, 'customers');
    const storedEmail = localStorage.getItem('loggedInUser'); // Retrieve the stored email from localStorage

    let filteredQuery: any;

    if (filterKey !== undefined && filterKey !== 'all') {
      filteredQuery = query(customersRef, where('userId', '==', storedEmail), where('status', '==', filterKey));
    } else {
      filteredQuery = query(customersRef, where('userId', '==', storedEmail));
    }

    return new Observable((observer) => {
      getDocs(filteredQuery)
        .then((querySnapshot) => {
          const filteredCustomers = querySnapshot.docs.map((doc) => {
            const data = doc.data() as object;
            const id = doc.id;
            return { id, ...data };
          });
          observer.next(filteredCustomers);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }


  async deleteCustomerByEmail(email: string): Promise<void> {
    const docRef = doc(this.db, "customers", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
    } else {
      console.log("No such document exists. Nothing to delete.");
    }
  }


  async getCustomerById(email: string): Promise<any> {
    const docRef = doc(this.db, "customers", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data()
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }



  // async updateCustomerById(email: string, newData: any): Promise<void> {
  //   const docRef = doc(this.db, "customers", email);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     await updateDoc(docRef, newData);

  //     this.toastr.success('Document successfully updated!')
  //     this.router.navigateByUrl('customers/list')
  //   } else {
  //     this.toastr.error('Document successfully updated!')
  //   }
  // }

  async updateCustomerById(email: string, newData: any): Promise<void> {
    const docRef = doc(this.db, "customers", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Include the document reference in the updated data
      newData.docRef = docRef;

      await updateDoc(docRef, newData);

      this.toastr.success('Document successfully updated!');
      this.router.navigateByUrl('customers/list');
    } else {
      this.toastr.error('No such document exists. Cannot update customer.');
    }
  }


  selectBoxValueSubject = new Subject<string>();


  // Expose the subject as an Observable
  get selectBoxValue$(): Observable<string> {
    return this.selectBoxValueSubject.asObservable();
  }

  // Create a method to update the select box value
  updateSelectBoxValue(value: string): void {
    console.log(value)
    this.selectBoxValueSubject.next(value);
  }


}
