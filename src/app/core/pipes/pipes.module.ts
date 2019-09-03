import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NgMathPipesModule } from 'angular-pipes';
import { FloorPipe } from 'angular-pipes';

import { TimeDifferencePipe } from './time-difference.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { FileSizePipe } from './file-size.pipe';
import { SortByPipe } from './sort-by.pipe';
import { FilterPipe } from './filter.pipe';
import { TrimPipe } from './trim.pipe';
import { LengthPipe } from './length.pipe';
import { FirstWordPipe } from './first-word.pipe';
import { OmitFirstWordPipe } from './omit-first-word.pipe';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    NgMathPipesModule
  ],
  declarations: [
    TimeDifferencePipe,
    TimeAgoPipe,
    FileSizePipe,
    SortByPipe,
    FilterPipe,
    TrimPipe,
    LengthPipe,
    FirstWordPipe,
    OmitFirstWordPipe,
  ],
  exports: [
    FloorPipe,
    TimeDifferencePipe,
    TimeAgoPipe,
    FileSizePipe,
    SortByPipe,
    FilterPipe,
    TrimPipe,
    LengthPipe,
    FirstWordPipe,
    OmitFirstWordPipe,

  ],
  entryComponents: [],
})
export class PipesModule {}
