import { Component, OnInit } from '@angular/core';
import { ProductServicesService } from '../../Services/product-services.service';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../common/category';
import { CategoryService } from '../../Services/category.service';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-product-add',
  imports: [HeaderAdminComponent, RouterLink, FormsModule, NgFor],
  standalone: true,
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent implements OnInit {
  id: number = 0;
  code: string = '00674';
  name: string = '';
  description: string = '';
  price: number = 0;
  urlImage: string = '';
  userId: number = 1;
  idCategory: number = 3;
  categories: Category[] = [];

  selectFile!: File;

  constructor(
    private productService: ProductServicesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getProductById();
    this.getCategories();
  }

  public addProduct() {
    const formData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('code', this.code);
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('image', this.selectFile);
    formData.append('urlImage', this.urlImage);
    formData.append('userId', this.userId.toString());
    formData.append('idCategory', this.idCategory.toString());

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
