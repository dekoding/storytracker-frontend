import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

/** Third-party dependencies
 * - Includes ngx-bootstrap and ngx-quill
 */

import { QuillModule } from 'ngx-quill';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RatingModule } from 'ngx-bootstrap/rating';
import { TabsModule } from 'ngx-bootstrap/tabs';

/** Protected components
 * - Includes ngx-bootstrap and ngx-quill
 */

import { StoriesComponent } from '../../components/stories/stories.component';
import { StoryComponent } from '../../components/stories/storydetail/story.component';
import { NewStoryComponent } from '../../components/stories/newstory/newstory.component';
import { SubmissionsComponent } from '../../components/submissions/submissions.component';
import { SubmissionComponent } from '../../components/submissions/submissiondetail/submission.component';
import { NewSubmissionComponent } from '../../components/submissions/newsubmission/newsubmission.component';
import { ReadersComponent } from '../../components/readers/readers.component';
import { ReaderComponent } from '../../components/readers/readerdetail/reader.component';
import { NewReaderComponent } from '../../components/readers/newreader/newreader.component';
import { SearchPipe } from '../../pipes/search.pipe';

import { StorynavComponent } from '../../components/shared/storynav/storynav.component';

import { SharedService } from '../../services/shared.service';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../auth.guard';

const routes:Routes = [
    { path: 'stories', component: StoriesComponent, canActivate: [AuthGuard] },
    { path: 'stories/:storyId', component: StoryComponent, canActivate: [AuthGuard] },
    { path: 'stories/new', component: NewStoryComponent, canActivate: [AuthGuard] },

    { path: 'stories/:storyId/submissions', component: SubmissionsComponent, canActivate: [AuthGuard] },
    { path: 'stories/:storyId/submissions/:subId', component: SubmissionComponent, canActivate: [AuthGuard] },
    { path: 'stories/:storyId/submissions/new', component: NewSubmissionComponent, canActivate: [AuthGuard] },

    { path: 'stories/:storyId/readers', component: ReadersComponent, canActivate: [AuthGuard] },
    { path: 'stories/:storyId/readers/:readerId', component: ReaderComponent, canActivate: [AuthGuard] },
    { path: 'stories/:storyId/readers/new', component: NewReaderComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        QuillModule,
        RouterModule.forRoot(routes),
        AccordionModule.forRoot(),
        AlertModule.forRoot(),
        ButtonsModule.forRoot(),
        CollapseModule.forRoot(),
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        RatingModule.forRoot(),
        TabsModule.forRoot(),
    ],
    declarations: [
        StoriesComponent,
        StoryComponent,
        NewStoryComponent,
        SubmissionsComponent,
        SubmissionComponent,
        NewSubmissionComponent,
        ReadersComponent,
        ReaderComponent,
        NewReaderComponent,
        SearchPipe,
        StorynavComponent
    ],
    exports: [
        StoriesComponent,
        StoryComponent,
        NewStoryComponent,
        SubmissionsComponent,
        SubmissionComponent,
        NewSubmissionComponent,
        ReadersComponent,
        ReaderComponent,
        NewReaderComponent,
        SearchPipe,
        StorynavComponent
    ],
    providers: [
        SharedService,
        DataService,
        AuthService,
        AuthGuard
    ]
})
export class StoryTrackerModule { }
