import { Component } from '@angular/core';
import { Department } from '../department/model/department.model';
import { User, UserByIdRequest } from './model/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DynamicFormService } from '../../../services/dynamic-form.service';
import { FormFieldConfig } from '../../../models/form/form-field.model';
import { UserService } from './user.service';

// Declare bootstrap variable to use the Modal via TS
declare var bootstrap: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
    // Users: User[] = [];
    //   userForm!: FormGroup;

    //   // State variables
    //   isLoading = false;
    //   isEditMode = false;
    //   currentUserId: number | null = null;

    //   // for View
    //   selectedUser: Department | null = null;
    //   isViewLoading = false;
    //   private viewModalInstance: any;

    //   // Modal reference
    //   private formModal: any;
    //   // userForm!: FormGroup;
    //   constructor(
    //     // private deptService: userService,
    //     private fb: FormBuilder,
    //     private toastr: ToastrService,
    //     private userService: UserService,
    //     private dynamicFormService: DynamicFormService
    //   ) { }

    //   // ONLY THIS CONFIG — no form HTML needed
    //   fields: FormFieldConfig[] = [
    //     { name: 'FirstName', type: 'text', label: 'First Name',  required: true, placeholder: 'Enter first name' },
    //     { name: 'LastName', type: 'text', label: 'Last Name',  required: true, placeholder: 'Enter last name' },
    //     { name: 'Email', type: 'email', label: 'Email Address',  required: true, placeholder: 'employee@company.com' },
    //   ]


    //   ngOnInit(): void {
    //     this.loadUsers();
    //      this.userForm = this.dynamicFormService.buildForm(this.fields);
    //      console.log(this.userForm);
    //   }

    //   onFormSubmit(value: any): void {
    //     console.log(value); // { Name: '...', Description: '...' }
    //     // call your service here
    //   }

    //   // 2. Fetch Data
    //   loadUsers() {
    //     this.isLoading = true;
    //     // Calling the inherited 'getAll()' method from ApiBaseService
    //     this.userService.getAll().subscribe({
    //       next: (res) => {
    //         if (res.success) {
    //           this.Users = res.data;
    //         }
    //         this.isLoading = false;
    //       },
    //       error: () => {
    //         this.toastr.error('Failed to connect to server');
    //         this.isLoading = false;
    //       }
    //     });
    //   }

    //   // 3. Open Modal (Add Mode)
    //   openAddModal() {
    //     this.isEditMode = false;
    //     this.currentUserId = null;
    //     this.userForm.reset();
    //     this.showModal();
    //   }


    //   // 5. Submit Form (Create or Update)
    //   insertDepartmentClick(event: any) {
    //     debugger;
    //     if (this.userForm.invalid) return;

    //     this.isLoading = true;
    //     let obj = <Department>{};
    //     obj = this.userForm.value;

    //     this.userService.create(obj).subscribe({
    //       next: (res) => {
    //         debugger;
    //         if (res.success) {
    //           this.toastr.success(res.message);
    //           this.loadUsers(); // Refresh list
    //           this.hideModal();
    //         } else {
    //           this.toastr.error(res.message);
    //         }
    //         this.isLoading = false;
    //       },
    //       error: (err) =>{
    //         this.toastr.error(err.error.message);
    //         this.isLoading = false
    //       }
    //     });
    //   }

    //   // 4. Open Modal (Edit Mode)
    //   openEditModal(user: User) {
    //     this.isEditMode = true;
    //     this.currentUserId = user.UserId;
    //     if (this.currentUserId) {
    //       const request: UserByIdRequest = { id: this.currentUserId };
    //       this.userService.getById(request).subscribe({
    //         next: (res) => {
    //           if (res) {
    //             console.log(res);
    //             this.userForm.controls['FirstName'].setValue(res.data.firstName);
    //             this.userForm.controls['LastName'].setValue(res.data.lastname);
    //             // this.dynamicFormService.patchValue(this.userForm, res.data);
    //           }
    //           this.isLoading = false;
    //         },
    //         error: () => {
    //           this.toastr.error('Failed to connect to server');
    //           this.isLoading = false;
    //         }
    //       });
    //       // Fill the form with existing data
    //       // this.userForm.patchValue({
    //       //   Name: dept.name
    //       // });

    //       this.showModal();
    //     }
    //   }

    //   updateDepartmentClick(event: any) {
    //       debugger;
    //     this.isLoading = true;
    //     let obj = <Department>{};
    //     obj = this.userForm.value;
    //     obj.departmentId = this.currentUserId!;
    //     this.userService.update(obj).subscribe({
    //       next: (res) => {
    //         debugger;
    //         if (res.success) {
    //           this.toastr.success(res.message);
    //           this.loadUsers(); // Refresh list
    //           this.hideModal();
    //         } else {
    //           this.toastr.error(res.message);
    //         }
    //         this.isLoading = false;
    //       },
    //       error: (err) => {
    //         this.toastr.error(err.error.message);
    //         this.isLoading = false
    //       }
    //     });
    //   }


    //   openViewModal(dept: Department) {
    //      this.currentUserId = dept.departmentId;

    //   // Show the modal immediately so the user sees the loading spinner
    //   const modalElement = document.getElementById('viewDeptModal');
    //   if (modalElement) {
    //     this.viewModalInstance = new bootstrap.Modal(modalElement);
    //     this.viewModalInstance.show();
    //   }

    //   // Set loading to true and clear old data
    //   this.isViewLoading = true;
    //   this.selectedUser = null;
    //   debugger;
    //   // Call the new API endpoint!
    //  if (this.currentUserId) {
    //       const request: UserByIdRequest = { id: this.currentUserId };
    //       this.userService.getById(request).subscribe({
    //         next: (res) => {
    //       if (res.success) {
    //         this.selectedUser = res.data;
    //       } else {
    //         this.toastr.error(res.message);
    //         this.viewModalInstance?.hide(); // Hide if failed
    //       }
    //       this.isViewLoading = false;
    //     },
    //     error: () => {
    //       this.toastr.error('Failed to fetch department details');
    //       this.isViewLoading = false;
    //       this.viewModalInstance?.hide();
    //     }
    //   });
    // }
    //   }

    //   // 6. Delete Department
    //   onDelete(id: number) {
    //     if (confirm('Are you sure you want to delete this department?')) {
    //       // this.deptService.delete(id).subscribe({
    //       //   next: (res) => {
    //       //     if (res.success) {
    //       //       this.toastr.success(res.message);
    //       //       this.loadUsers();
    //       //     } else {
    //       //       this.toastr.error(res.message);
    //       //     }
    //       //   }
    //       // });
    //     }
    //   }

    //   // --- Bootstrap Modal Helpers ---
    //   private showModal() {
    //     this.isLoading = false;
    //     const modalElement = document.getElementById('deptModal');
    //     if (modalElement) {
    //       this.formModal = new bootstrap.Modal(modalElement);
    //       this.formModal.show();
    //     }
    //   }

    //   private hideModal() {
    //     if (this.formModal) {
    //       this.formModal.hide();
    //     }
    //   }
}
