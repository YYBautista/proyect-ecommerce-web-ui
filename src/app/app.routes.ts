import { Routes } from '@angular/router';
import { HomeComponent } from './componets/home/home.component';
import { ProductListComponent } from './componets/product-list/product-list.component';
import { ProductAddComponent } from './componets/product-add/product-add.component';
import { CategoryListComponent } from './componets/category/category-list/category-list.component';
import { CategoryAddComponent } from './componets/category/category-add/category-add.component';
import { DetailProductComponent } from './componets/cart/detail-product/detail-product.component';
import { SumaryOrderComponent } from './componets/orders/sumary-order/sumary-order.component';
import { PaymentSuccessComponent } from './componets/payment-success/payment-success.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/product', component: ProductListComponent },
  { path: 'admin/product/addProduct', component: ProductAddComponent },
  { path: `admin/product/updateProduct/:id`, component: ProductAddComponent },
  { path: 'admin/category', component: CategoryListComponent },
  { path: 'admin/category/addCategory', component: CategoryAddComponent },
  {
    path: 'admin/category/updateCategory/:id',
    component: CategoryAddComponent,
  },
  { path: 'cart/detailProduct/:id', component: DetailProductComponent },
  { path: 'cart/summary', component: SumaryOrderComponent },
  { path: 'payment/success', component: PaymentSuccessComponent },
];
