import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { FormsModule } from '@angular/forms';
import { HeaderUserComponent } from '../../header-user/header-user.component';
import { ItemCart } from '../../../common/item-cart';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/home.service';

@Component({
  selector: 'app-detail-product',
  imports: [FormsModule, HeaderUserComponent],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css',
})
export class DetailProductComponent implements OnInit {
  id!: number;
  name: string = '';
  description = '';
  price: number = 0;
  urlImage: string = '';
  quantity: number = 0;

  ngOnInit(): void {
    this.getProductById();
  }

  constructor(
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  public getProductById() {
    this.activatedRoute.params.subscribe((prod) => {
      let id = prod['id'];
      if (id) {
        this.homeService.getProductById(id).subscribe((data) => {
          this.id = data.id;
          this.name = data.name;
          this.description = data.description;
          this.urlImage = data.urlImage;
          this.price = data.price;
        });
      }
    });
  }

  public addCart(id: number) {
    console.log('id product: ' + id);
    console.log('name product: ' + this.name);
    console.log('price product: ' + this.price);
    console.log('quantity product: ' + this.quantity);

    let item = new ItemCart(id, this.name, this.quantity, this.price);

    this.cartService.addItemCar(item);

    console.log('total  carrito: ');
    console.log(this.cartService.totalCart());

    this.toastr.success(
      'Producto Añadido al Carrito de Compras',
      'Carrito Compras'
    );
  }
}
