import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {
  MatButtonModule, MatButtonToggleModule,
  MatCardModule,
  MatChipsModule, MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {MainComponent} from './main/main.component';
import {RouterModule, Routes} from '@angular/router';
import {OrderComponent} from './order/order.component';
import { PancakeObjectComponent } from './order/pancake-object/pancake-object.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';

const appRoutes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'order', component: OrderComponent},
  {path: 'orders', component: OrdersComponent},
  {path: '**', redirectTo: '/main'}
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    OrderComponent,
    PancakeObjectComponent,
    OrdersComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDividerModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
