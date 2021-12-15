import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import {
  ColumnMenuService,
  ContextMenuService,
  EditService,
  ExcelExportService,
  InfiniteScrollService,
  PageService,
  PdfExportService,
  ReorderService,
  ResizeService,
  SortService,
  ToolbarService,
  TreeGridModule,
} from '@syncfusion/ej2-angular-treegrid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TreeGridModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    PageService,
    InfiniteScrollService,
    EditService,
    SortService,
    ResizeService,
    ExcelExportService,
    PdfExportService,
    ContextMenuService,
    ToolbarService,
    ReorderService,
    ColumnMenuService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
