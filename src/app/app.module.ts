import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Application components - unprotected
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

// Application components - protected
import { StoryTrackerModule } from './modules/storytracker/storytracker.module';

// Services and configuration
import { SharedModule, SharedService } from './services/shared.service';
import { DataService } from './services/data.service';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'about', component: AboutComponent },
    { path: 'docs', component: DocumentationComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        AboutComponent,
        DocumentationComponent,
        SignupComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        StoryTrackerModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        SharedService,
        SharedModule.init(),
        DataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
