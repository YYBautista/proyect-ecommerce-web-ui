import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderAdminComponent } from '../../header-admin/header-admin.component';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../common/category';

@Component({
  selector: 'app-category-add',
  imports: [HeaderAdminComponent, FormsModule],

  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css',
})
export class CategoryAddComponent implements OnInit {
  id!: number;
  name: string = '';

  constructor(
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getCategoryById();
  }

  public addCategory() {
    console.log(this.name);

    let category = new Category(this.id, this.name);
    this.categoryService.createdCategory(category).subscribe((res) => {
      this.toastrService.success(
        'Categoria registrada Exitosamente!',
        'Categorias'
      );
      this.router.navigate(['admin/category']);
    });
  }

  public getCategoryById() {
    this.activatedRoute.params.subscribe((category) => {
      let id = category['id'];
      if (id) {
        console.log('valor de la variable id: ' + id);
        this.categoryService.categoryById(id).subscribe((data) => {
          this.id = data.id;
          this.name = data.name;
        });
      }
    });
  }
}
