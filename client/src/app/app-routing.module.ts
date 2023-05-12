import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { SellerLayoutComponent } from './seller-layout/seller-layout.component';
import { OrderComponent } from './seller-layout/order/order.component';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './admin-layout/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'admin', component: AdminLayoutComponent,
    children:
      [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // перенаправление
        { path: 'dashboard', component: DashboardComponent }, // дочерний роут
        // { path: 'time', component: TimeComponent }, // дочерний роут
        // { path: 'category', component: CategoryComponent }, // дочерний роут
        // { path: 'position', component: PositionComponent }, // дочерний роут
        // { path: 'customer', component: CustomerComponent }, // дочерний роут
        // { path: 'storage', component: StorageComponent }, // дочерний роут
        // { path: 'storage-history', component: StorageHistoryComponent }, // дочерний роут
        // { path: 'payments', component: PaymentsComponent }, // дочерний роут
        // { path: 'users', component: UsersComponent }, // дочерний роут
        // { path: 'shift', component: ShiftComponent }, // дочерний роут
        // { path: 'writeOffs', component: WriteOffComponent }, // дочерний роут
        // { path: 'statistic', component: StatisticComponent }, // дочерний роут
        // { path: 'check-history', component: CheckHistoryComponent }, // дочерний роут
      ]
  },

  {
    path: 'seller', component: SellerLayoutComponent,
    children:
    [
     { path: '', redirectTo: 'order', pathMatch: 'full' }, // дочерний роут
     { path: 'order', component: OrderComponent }, // дочерний роут
    //  { path: 'list', component: ListComponent }, // дочерний роут
    // { path: 'payment', component: PaymentComponent },
    //  { path: 'storage-edit', component: StorageEditComponent } // дочерний роут // дочерний роут
    ]
  },

  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
