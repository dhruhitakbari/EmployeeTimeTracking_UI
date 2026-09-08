import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FormFieldConfig } from '../../../models/form/form-field.model';
import {
  Department,
  DepartmentByIdRequest
} from './model/department.model';

import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from './department.service';
import { DynamicFormService } from '../../../services/dynamic-form.service';

import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
  providers: [ConfirmationService]
})
export class DepartmentComponent implements OnInit {

  // =====================================================
  // DATA
  // =====================================================

  departments: Department[] = [];

  departmentForm!: FormGroup;

  selectedDepartment: Department | null = null;


  // =====================================================
  // STATE
  // =====================================================

  isLoading = false;

  isViewLoading = false;

  isEditMode = false;

  currentDeptId: number | null = null;


  // =====================================================
  // DIALOG STATE
  // =====================================================

  displayFormDialog = false;

  displayViewDialog = false;


  // =====================================================
  // FORM CONFIGURATION
  // =====================================================

  fields: FormFieldConfig[] = [

    {
      name: 'Name',
      type: 'text',
      label: 'Department Name',
      required: true,
      placeholder: 'Enter department name',
      minLength: 3
    },

    {
      name: 'Description',
      type: 'text',
      label: 'Description',
      required: true,
      placeholder: 'Enter description'
    }

  ];


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private departmentService: DepartmentService,
    private dynamicFormService: DynamicFormService,
    private confirmationService: ConfirmationService
  ) { }


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.departmentForm =
      this.dynamicFormService.buildForm(this.fields);

    this.loadDepartments();

  }


  // =====================================================
  // GET ALL DEPARTMENTS
  // =====================================================

  loadDepartments(): void {

    this.isLoading = true;

    this.departmentService.getAll().subscribe({

      next: (res) => {

        if (res.success) {

          this.departments = res.data;

        }
        else {

          this.toastr.error(
            res.message || 'Failed to load departments'
          );

        }

        this.isLoading = false;

      },

      error: () => {

        this.toastr.error(
          'Failed to connect to server'
        );

        this.isLoading = false;

      }

    });

  }


  // =====================================================
  // ADD
  // =====================================================

  openAddModal(): void {

    this.isEditMode = false;

    this.currentDeptId = null;

    this.departmentForm.reset();

    this.displayFormDialog = true;

  }


  // =====================================================
  // CREATE
  // =====================================================

  insertDepartmentClick(event: any): void {

    if (this.departmentForm.invalid) {

      this.departmentForm.markAllAsTouched();

      return;

    }


    this.isLoading = true;

    const obj: Department = {
      ...this.departmentForm.value
    };


    this.departmentService.create(obj).subscribe({

      next: (res) => {

        if (res.success) {

          this.toastr.success(
            res.message || 'Department created successfully'
          );

          this.displayFormDialog = false;

          this.loadDepartments();

        }
        else {

          this.toastr.error(
            res.message || 'Failed to create department'
          );

        }

        this.isLoading = false;

      },

      error: (err) => {

        this.toastr.error(
          err?.error?.message ||
          'Failed to create department'
        );

        this.isLoading = false;

      }

    });

  }


  // =====================================================
  // EDIT
  // =====================================================

  openEditModal(dept: Department): void {

    this.isEditMode = true;

    this.currentDeptId = dept.departmentId;

    this.displayFormDialog = true;

    this.isLoading = true;


    if (!this.currentDeptId) {

      this.isLoading = false;

      return;

    }


    const request: DepartmentByIdRequest = {

      id: this.currentDeptId

    };


    this.departmentService.getById(request).subscribe({

      next: (res) => {

        if (res.success && res.data) {

          this.departmentForm.patchValue({

            Name: res.data.name,

            Description: res.data.description

          });
        }
        else {
          this.toastr.error(
            res.message || 'Department not found'
          );
          this.displayFormDialog = false;
        }
        this.isLoading = false;
      },

      error: () => {
        this.toastr.error(
          'Failed to fetch department details'
        );
        this.isLoading = false;
        this.displayFormDialog = false;

      }

    });

  }


  // =====================================================
  // UPDATE
  // =====================================================

  updateDepartmentClick(event: any): void {

    if (this.departmentForm.invalid) {

      this.departmentForm.markAllAsTouched();

      return;

    }


    if (!this.currentDeptId) {

      this.toastr.error(
        'Department ID is missing'
      );

      return;

    }


    this.isLoading = true;


    const obj: Department = {

      ...this.departmentForm.value,

      departmentId: this.currentDeptId

    };


    this.departmentService.update(obj).subscribe({

      next: (res) => {

        if (res.success) {

          this.toastr.success(
            res.message || 'Department updated successfully'
          );

          this.displayFormDialog = false;

          this.loadDepartments();

        }
        else {

          this.toastr.error(
            res.message || 'Failed to update department'
          );

        }

        this.isLoading = false;

      },

      error: (err) => {

        this.toastr.error(
          err?.error?.message ||
          'Failed to update department'
        );

        this.isLoading = false;

      }

    });

  }


  // =====================================================
  // VIEW
  // =====================================================

  openViewModal(dept: Department): void {

    this.currentDeptId = dept.departmentId;

    this.selectedDepartment = null;

    this.isViewLoading = true;

    this.displayViewDialog = true;


    if (!this.currentDeptId) {

      this.isViewLoading = false;

      return;

    }


    const request: DepartmentByIdRequest = {

      id: this.currentDeptId

    };


    this.departmentService.getById(request).subscribe({

      next: (res) => {

        if (res.success) {

          this.selectedDepartment = res.data;

        }
        else {

          this.toastr.error(
            res.message || 'Department not found'
          );

          this.displayViewDialog = false;

        }

        this.isViewLoading = false;

      },

      error: () => {

        this.toastr.error(
          'Failed to fetch department details'
        );

        this.isViewLoading = false;

        this.displayViewDialog = false;

      }

    });

  }


  // =====================================================
  // DELETE
  // =====================================================

  onDelete(id: number): void {

    this.confirmationService.confirm({

      message:
        'Are you sure you want to delete this department?',

      header:
        'Delete Department',

      icon:
        'pi pi-exclamation-triangle',

      acceptLabel:
        'Yes, Delete',

      rejectLabel:
        'Cancel',

      accept: () => {

        this.deleteDepartment(id);

      }

    });

  }


  private deleteDepartment(id: number): void {

    this.isLoading = true;


    this.departmentService.delete(id).subscribe({

      next: (res) => {

        if (res.success) {

          this.toastr.success(
            res.message || 'Department deleted successfully'
          );

          this.loadDepartments();

        }
        else {

          this.toastr.error(
            res.message || 'Failed to delete department'
          );

        }

        this.isLoading = false;

      },

      error: (err) => {

        this.toastr.error(
          err?.error?.message ||
          'Failed to delete department'
        );

        this.isLoading = false;

      }

    });

  }

}
