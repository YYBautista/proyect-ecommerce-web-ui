import { Component, OnInit } from '@angular/core';
import { ProductServicesService } from '../../Services/product-services.service';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../common/category';
import { CategoryService } from '../../Services/category.service';
import { NgFor } from '@angular/common';
import { SessionStorageService } from '../../Services/session-storage.service';
@Component({
  selector: 'app-product-add',
  imports: [HeaderAdminComponent, RouterLink, FormsModule, NgFor],
  standalone: true,
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent implements OnInit {
  id!: number;
  code!: string;
  name!: string;
  description!: string;
  price: number = 0;
  urlImage!: string;
  userId!: number;
  idCategory!: number;
  categories: Category[] = [];
  selectFile!: File;
  user!: number;

  constructor(
    private productService: ProductServicesService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getProductById();
    this.getCategories();
    this.user = this.sessionStorageService.getItem('token').id;
    this.userId = this.user;
  }

  public addProduct() {
    const formData = new FormData();
    formData.append('id', this.id ? this.id.toString() : '0');
    formData.append('code', this.code || '');
    formData.append('name', this.name || '');
    formData.append('description', this.description || '');
    formData.append('price', this.price ? this.price.toString() : '0');
    formData.append('image', this.selectFile || '');
    formData.append('urlImage', this.urlImage || '');
    formData.append('userId', this.userId ? this.userId.toString() : '0');
    formData.append(
      'idCategory',
      this.idCategory ? this.idCategory.toString() : '0'
    );

    console.log('FormData enviado:', formData);

    this.productService.createProduct(formData).subscribe((data) => {
      console.log(data);
      if (this.id == 0) {
        this.toastr.success('Producto Registrado exitosamente!', 'Productos');
      } else
        this.toastr.success('Producto actualizado exitosamente!', 'Productos');
      this.router.navigate(['/admin/product']);
    });
  }

  public getProductById() {
    this.activatedRoute.params.subscribe((prod) => {
      let id = prod['id'];
      if (id) {
        this.productService.getProductById(id).subscribe((data) => {
          this.id = data.id;
          this.code = data.code;
          this.name = data.name;
          this.description = data.description;
          this.price = data.price;
          this.urlImage = data.urlImage;
          this.userId = data.userId;
          this.idCategory = data.idCategory;
        });
        console.log('el valor de la variable id : ' + id);
      }
    });
  }

  public onfileSelected(event: any) {
    this.selectFile = event.target.files[0];
  }

  public getCategories() {
    return this.categoryService
      .getCategoryList()
      .subscribe((data) => (this.categories = data));
  }
}
