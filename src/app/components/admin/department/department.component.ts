import { FormFieldConfig } from './../../../models/form/form-field.model';
import { Component, DebugElement, NgModuleRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department, DepartmentByIdRequest } from './model/department.model';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from './department.service';
import { DynamicFormService } from '../../../services/dynamic-form.service';

// Declare bootstrap variable to use the Modal via TS
declare var bootstrap: any;

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {

  departments: Department[] = [];
  departmentForm!: FormGroup;

  // State variables
  isLoading = false;
  isEditMode = false;
  currentDeptId: number | null = null;

  // for View
  selectedDepartment: Department | null = null;
  isViewLoading = false;
  private viewModalInstance: any;

  // Modal reference
  private formModal: any;
  // departmentForm!: FormGroup;
  constructor(
    // private deptService: DepartmentService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private departmentService: DepartmentService,
    private dynamicFormService: DynamicFormService
  ) { }

  // ONLY THIS CONFIG — no form HTML needed
  fields: FormFieldConfig[] = [
    {name: 'Name', type:'text', label:'Department Name', required:true, placeholder: 'enter name', minLength:3 },
    { name: 'Description', type: 'text', label: 'Description',  required: true, placeholder: 'Enter description' }
  ]


  ngOnInit(): void {
    this.loadDepartments();
     this.departmentForm = this.dynamicFormService.buildForm(this.fields);
     console.log(this.departmentForm);
  }

  onFormSubmit(value: any): void {
    console.log(value); // { Name: '...', Description: '...' }
    // call your service here
  }

  // 2. Fetch Data
  loadDepartments() {
    this.isLoading = true;
    // Calling the inherited 'getAll()' method from ApiBaseService
    this.departmentService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          this.departments = res.data;
        }
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Failed to connect to server');
        this.isLoading = false;
      }
    });
  }

  // 3. Open Modal (Add Mode)
  openAddModal() {
    this.isEditMode = false;
    this.currentDeptId = null;
    this.departmentForm.reset();
    this.showModal();
  }


  // 5. Submit Form (Create or Update)
  insertDepartmentClick(event: any) {
    debugger;
    if (this.departmentForm.invalid) return;

    this.isLoading = true;
    let obj = <Department>{};
    obj = this.departmentForm.value;

    this.departmentService.create(obj).subscribe({
      next: (res) => {
        debugger;
        if (res.success) {
          this.toastr.success(res.message);
          this.loadDepartments(); // Refresh list
          this.hideModal();
        } else {
          this.toastr.error(res.message);
        }
        this.isLoading = false;
      },
      error: (err) =>{
        this.toastr.error(err.error.message);
        this.isLoading = false
      }
    });
  }

  // 4. Open Modal (Edit Mode)
  openEditModal(dept: Department) {
    this.isEditMode = true;
    this.currentDeptId = dept.departmentId;
    if (this.currentDeptId) {
      const request: DepartmentByIdRequest = { id: this.currentDeptId };
      this.departmentService.getById(request).subscribe({
        next: (res) => {
          if (res) {
            console.log(res);
            this.departmentForm.controls['Name'].setValue(res.data.name);
            this.departmentForm.controls['Description'].setValue(res.data.description);
            // this.dynamicFormService.patchValue(this.departmentForm, res.data);
          }
          this.isLoading = false;
        },
        error: () => {
          this.toastr.error('Failed to connect to server');
          this.isLoading = false;
        }
      });
      // Fill the form with existing data
      // this.departmentForm.patchValue({
      //   Name: dept.name
      // });

      this.showModal();
    }
  }

  updateDepartmentClick(event: any) {
      debugger;
    this.isLoading = true;
    let obj = <Department>{};
    obj = this.departmentForm.value;
    obj.departmentId = this.currentDeptId!;
    this.departmentService.update(obj).subscribe({
      next: (res) => {
        debugger;
        if (res.success) {
          this.toastr.success(res.message);
          this.loadDepartments(); // Refresh list
          this.hideModal();
        } else {
          this.toastr.error(res.message);
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error(err.error.message);
        this.isLoading = false
      }
    });
  }


  openViewModal(dept: Department) {
     this.currentDeptId = dept.departmentId;

  // Show the modal immediately so the user sees the loading spinner
  const modalElement = document.getElementById('viewDeptModal');
  if (modalElement) {
    this.viewModalInstance = new bootstrap.Modal(modalElement);
    this.viewModalInstance.show();
  }

  // Set loading to true and clear old data
  this.isViewLoading = true;
  this.selectedDepartment = null;
  debugger;
  // Call the new API endpoint!
 if (this.currentDeptId) {
      const request: DepartmentByIdRequest = { id: this.currentDeptId };
      this.departmentService.getById(request).subscribe({
        next: (res) => {
      if (res.success) {
        this.selectedDepartment = res.data;
      } else {
        this.toastr.error(res.message);
        this.viewModalInstance?.hide(); // Hide if failed
      }
      this.isViewLoading = false;
    },
    error: () => {
      this.toastr.error('Failed to fetch department details');
      this.isViewLoading = false;
      this.viewModalInstance?.hide();
    }
  });
}
  }

  // 6. Delete Department
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this department?')) {
      // this.deptService.delete(id).subscribe({
      //   next: (res) => {
      //     if (res.success) {
      //       this.toastr.success(res.message);
      //       this.loadDepartments();
      //     } else {
      //       this.toastr.error(res.message);
      //     }
      //   }
      // });
    }
  }

  // --- Bootstrap Modal Helpers ---
  private showModal() {
    this.isLoading = false;
    const modalElement = document.getElementById('deptModal');
    if (modalElement) {
      this.formModal = new bootstrap.Modal(modalElement);
      this.formModal.show();
    }
  }

  private hideModal() {
    if (this.formModal) {
      this.formModal.hide();
    }
  }
}
