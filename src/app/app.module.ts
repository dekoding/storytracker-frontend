import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// NGX-Bootstrap components
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RatingModule } from 'ngx-bootstrap/rating';
import { TabsModule } from 'ngx-bootstrap/tabs';

// Application components - unprotected
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

// Application components - protected
import { StoriesComponent } from './components/stories/stories.component';
import { SubmissionsComponent } from './components/submissions/submissions.component';
import { ReadersComponent } from './components/readers/readers.component';
import { StoryComponent } from './components/story/story.component';
import { SubmissionComponent } from './components/submission/submission.component';
import { ReaderComponent } from './components/reader/reader.component';

// Services
import { SharedService } from './services/shared.service';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'about', component: AboutComponent },
    { path: 'docs', component: DocumentationComponent },

    { path: 'stories', component: StoriesComponent, canActivate: [AuthGuard] },
    { path: 'stories/:storyId/submissions', component: SubmissionsComponent, canActivate: [AuthGuard] },
    { path: 'stories/:storyId/readers', component: ReadersComponent, canActivate: [AuthGuard] },
    { path: 'stories/:storyId', component: StoryComponent, canActivate: [AuthGuard] },
    { path: 'stories/:storyId/submissions/:subId', component: SubmissionComponent, canActivate: [AuthGuard] },
    { path: 'stories/:storyId/readers/readerId', component: ReaderComponent, canActivate: [AuthGuard] }
];

@NgModule({
    declarations: [
        AppComponent,
        StoriesComponent,
        SubmissionsComponent,
        ReadersComponent,
        StoryComponent,
        SubmissionComponent,
        ReaderComponent,
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
//        VendorModule,
        AccordionModule.forRoot(),
        AlertModule.forRoot(),
        ButtonsModule.forRoot(),
        CollapseModule.forRoot(),
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        RatingModule.forRoot(),
        TabsModule.forRoot(),
        RouterModule.forRoot(routes)
    ],
    providers: [
        SharedService,
        DataService,
        AuthService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
