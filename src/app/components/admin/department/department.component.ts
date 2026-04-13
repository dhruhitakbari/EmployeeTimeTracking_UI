import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department, DepartmentByIdRequest } from './model/department.model';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from './department.service';

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

  // Modal reference
  private formModal: any;

  constructor(
    // private deptService: DepartmentService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadDepartments();
  }

  // 1. Initialize the Reactive Form
  initForm() {
    this.departmentForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(2)]],
      Description: ['']
    });
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

  // 5. Submit Form (Create or Update)
  onSubmit() {
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
      error: () => this.isLoading = false
    });
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
