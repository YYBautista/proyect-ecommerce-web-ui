import { Component, OnInit } from '@angular/core';
import { Category } from '../../../common/category';
import { CategoryService } from '../../../Services/category.service';
import { ToastrService } from 'ngx-toastr';
import { HeaderAdminComponent } from '../../header-admin/header-admin.component';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  imports: [NgFor, HeaderAdminComponent, RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.listCategories();
  }

  public listCategories() {
    this.categoryService
      .getCategoryList()
      .subscribe((data) => (this.categories = data));
  }

  public deleteCategoryById(id: number) {
    console.log('id de la categoria antes de eliminar : ' + id);

    Swal.fire({
      title: '¿Estas seguro que quiere eliminar este registro?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService
          .deleteCategoryByid(id)
          .subscribe(() => this.listCategories());
        Swal.fire({
          title: 'Categoria Eliminada!',
          text: ' La categoria se a eliminado exitosamente.',
          icon: 'success',
        });
      }
    });
  }
}
