import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

// PrimeNG Components for demos
import { FullCalendarModule } from '@fullcalendar/angular';

// Application Components
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { AppActionBarComponent } from './app.actionbar.component';
import { AppConfigComponent } from './app.config.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';

// Demo page
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { FormLayoutDemoComponent } from './demo/view/formlayoutdemo.component';
import { FloatLabelDemoComponent } from './demo/view/floatlabeldemo.component';
import { InputDemoComponent } from './demo/view/inputdemo.component';
import { InvalidStateDemoComponent } from './demo/view/invalidstatedemo.component';
import { ButtonDemoComponent } from './demo/view/buttondemo.component';
import { TableDemoComponent } from './demo/view/tabledemo.component';
import { ListDemoComponent } from './demo/view/listdemo.component';
import { TreeDemoComponent } from './demo/view/treedemo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { MediaDemoComponent } from './demo/view/mediademo.component';
import { MenusComponent } from './demo/view/menus/menus.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { IconsComponent } from './utilities/icons.component';
import { AppCrudComponent } from './pages/app.crud.component';
import { AppCalendarComponent } from './pages/app.calendar.component';
import { AppInvoiceComponent } from './pages/app.invoice.component';
import { AppHelpComponent } from './pages/app.help.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { AppTimelineDemoComponent } from './pages/app.timelinedemo.component';
import { AppLoginComponent } from './pages/app.login.component';

import { CountryService } from './demo/service/countryservice';
import { CustomerService } from './demo/service/customerservice';
import { EventService } from './demo/service/eventservice';
import { IconService } from './demo/service/iconservice';
import { NodeService } from './demo/service/nodeservice';
import { PhotoService } from './demo/service/photoservice';
import { ProductService } from './demo/service/productservice';
import { BreadcrumbService } from './app.breadcrumb.service';
import { MenuService } from './app.menu.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { SharedModule } from './shared/shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule,
        FullCalendarModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            },
            defaultLanguage: 'es'
        })
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppConfigComponent,
        AppActionBarComponent,
        DashboardDemoComponent,
        FormLayoutDemoComponent,
        FloatLabelDemoComponent,
        InputDemoComponent,
        InvalidStateDemoComponent,
        ButtonDemoComponent,
        TableDemoComponent,
        ListDemoComponent,
        TreeDemoComponent,
        PanelsDemoComponent,
        OverlaysDemoComponent,
        MediaDemoComponent,
        MenusComponent,
        MessagesDemoComponent,
        MessagesDemoComponent,
        MiscDemoComponent,
        ChartsDemoComponent,
        EmptyDemoComponent,
        FileDemoComponent,
        IconsComponent,
        AppCrudComponent,
        AppCalendarComponent,
        AppLoginComponent,
        AppInvoiceComponent,
        AppHelpComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppTimelineDemoComponent,
        AppAccessdeniedComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, MenuService, BreadcrumbService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}