import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { TreeGrid } from '@syncfusion/ej2-angular-treegrid';
import { EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import {
  BeforeOpenCloseMenuEventArgs,
  MenuEventArgs,
} from '@syncfusion/ej2-angular-navigations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  selectedDataType: String;
  listItemInput: string;
  listItems: any = [];
  dataTypes = [
    { id: 'text', value: 'Text' },
    { id: 'number', value: 'Number' },
    { id: 'date', value: 'Date' },
    { id: 'boolean', value: 'Boolean' },
    { id: 'dropdownList', value: 'Dropdown List' },
  ];
  public hideDiaLog = () => {
    this.ejDialog.hide();
  };
  public onOpenDialog = (event: any) => {
    // Call the show method to open the Dialog
    this.ejDialog.show();
  };

  public saveNew() {
    console.log(this.form.value);
    debugger;
    this.columns.push(this.form.value);
    this.treeGrid.refreshColumns();
    this.hideDiaLog();
    this.data.push({
      ss: 'hasan',
      age: 30,
    },)
  }
  public buttons: Object = [
    {
      click: this.saveNew.bind(this),
      // Accessing button component properties by buttonModel property
      buttonModel: {
        content: 'Save',
        // Enables the primary button
        isPrimary: true,
      },
    },
    {
      click: this.hideDiaLog.bind(this),
      buttonModel: {
        content: 'Cancel',
      },
    },
  ];
  ngAfterViewInit(): void {
    this.columns = [
      {
        field: 'name',
        headerText: 'Name',
        dataType: 'String',
        defaultValue:
          'data type is string then we are going to use as a string value default from user there',
        minWidth: 100,
        fontSize: 12,
        fontColor: 'red',
        backgroundColor: 'white',
        Alignment: 'alignment at column level',
        textWrap: true,
      },
      {
        field: 'lastName',
        headerText: 'Last Name',
        dataType: 'String',
        defaultValue:
          'data type is string then we are going to use as a string value default from user there',
        minWidth: 100,
        fontSize: 12,
        fontColor: 'red',
        backgroundColor: 'white',
        Alignment: 'alignment at column level',
        textWrap: true,
      },
    ];
  }
  constructor(private formBuilder: FormBuilder) {}
  // The Dialog shows within the target element.
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  // @ViewChild('container', { read: ElementRef }) container: ElementRef;
  public targetElement!: HTMLElement;
  public closeOnEscape: boolean = false;
  public headerTemp: NgModel | undefined;
  @ViewChild('treeGrid') treeGrid: TreeGrid;
  title = 'treeGrid';
  public template: any;
  datasource: Object[] = [];
  public data: any[] = [];
  public columnMenuItems: Object[] = [
    {
      text: 'Edit ',
      id: 'edit',
    },
    {
      text: 'New ',
      id: 'new ',
    },
    {
      text: 'Del ',
      id: 'del',
    },
    {
      text: 'chose ',
      id: 'chose',
    },
    {
      text: 'Freez ',
      id: 'freez',
    },
    {
      text: 'Multi Sort',
      id: 'freez',
    },
    {
      text: 'Multi ',
      id: 'multi',
    },
  ];

  // public contextMenuItems: Object[] = [
  //   'Add Column',
  //   'AutoFit',
  //   'AutoFitAll',
  //   'SortAscending',
  //   'SortDescending',
  //   'Edit',
  //   'Delete',
  //   'Save',
  //   'Cancel',
  //   'PdfExport',
  //   'ExcelExport',
  //   'CsvExport',
  //   'FirstPage',
  //   'PrevPage',
  //   'LastPage',
  //   'NextPage',
  // ];

  public pageSettings: Object = { pageSize: 30 };
  // public editSettings = {
  //   allowEditing: true,
  //   allowAdding: true,
  //   allowDeleting: true,
  //   mode: 'Dialog',
  // };

  editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Row',
  };

  // contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending', 'Edit', 'Delete', 'Save', 'Cancel', 'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage', 'LastPage', 'NextPage'];

  contextMenuItems = [
    { text: 'Edit', target: '.e-headercontent', id: 'editCol' },
    { text: 'New', target: '.e-headercontent', id: 'newCol' },
    { text: 'Delete', target: '.e-headercontent', id: 'delCol' },
    { text: 'Ahsan', target: '.e-headercontent', id: 'ahsan' },
    { text: 'junaid', target: '.e-content', id: 'junaid' },
  ];

  // load(args: any): void {
  //    var tree: any = this.treeGrid
  //    debugger;
  //    this.treeGrid.grid.load = function(args){
  //       //  this['viewContainerRef'] = tree['viewContainerRef'];
  //    }
  // }

  public columns: any;
  ngOnInit(): void {
    
    this.data = [
      {
        name: 'Ahsan',
        age: 30,
      },
      {
        name: 'Ali',
        age: 20,
      },
    ];

    // setTimeout(() => {
    //   debugger
    //   this.columns.push({
    //     field: 'junaid',
    //     headerText: 'junaid',
    //     dataType: 'String',
    //     defaultValue:
    //       'data type is string then we are going to use as a string value default from user there',
    //     minWidth: 100,
    //     fontSize: 12,
    //     fontColor: 'red',
    //     backgroundColor: 'white',
    //     Alignment: 'alignment at column level',
    //     textWrap: true,
    //   })
    //   this.data.map(x => x.junaid = '123')
    //   this.treeGrid.refreshColumns();
    //   this.treeGrid.refresh();
    // }, 3000);

    this.initializeForm();
    // this.initilaizeTarget();
    // this.pageSettings = {pageSize: 30};
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      field: ['', Validators.required],
      headerText: ['', [Validators.required, Validators.required]],
      dataType: ['', Validators.required],
      minWidth: ['', [Validators.required]],
      defaultValue: ['', [Validators.required, Validators.minLength(8)]],
      fontSize: ['', [Validators.required]],
      fontColor: ['', [Validators.required]],
      backgroundColor: ['', [Validators.required]],
      Alignment: ['', [Validators.required]],
      textWrap: ['', [Validators.required]],
    });
  }

  contextMenuClick(args: any) {
    if (args.item.id === 'editCol') {
      // Show Edit Col Modal with Custom Form
      alert('edit Column');
    } else if (args.item.id == 'newCol') {
      // Show New Col Modal with Custom Form
      // alert("new Column");
      this.onOpenDialog('');
    } else if (args.item.id == 'delCol') {
      // Show Del Col Modal with Custom Form
      alert('del Column');
    } else if (args.item.id == 'ahsan') {
      // Show Del Col Modal with Custom Form
      alert('Ahsan');
    } else if (args.item.id == 'junaid') {
      // Show Del Col Modal with Custom Form
      alert('junaid');
    }
  }

  contextMenuOpen(args: any): void {
    console.log('Opening Context Menu Modal Triggered');
  }

  // public onOpenDialog = function (event: any): void {
  //   DialogUtility.alert({
  //     title: 'Alert Dialog',
  //     content: '<h1>This is an Alert Dialog</h1>',
  //     // okButton: { text: 'OK', click: this.okClick.bind(this) },
  //     showCloseIcon: true,
  //     closeOnEscape: true,
  //     animationSettings: { effect: 'Zoom' },
  //   });
  // }.bind(this);
  // private okClick(): void {
  //   alert('you clicked OK button');
  // };
  // Add e-fixed class to Dialog element
  public onPreventScroll = (event: any): void => {
    this.ejDialog.cssClass = 'e-fixed';
  };
  // Initialize the Dialog component target element.
  public initilaizeTarget: EmitType<object> = () => {
    // this.targetElement = this.container.nativeElement.parentElement;
  };
  public onOverlayClick: EmitType<object> = () => {
    this.hideDiaLog();
  };
  get f(): any {
    return this.form.controls;
  }

  onChangeDataType() {
    console.log('selectedDataType ', this.selectedDataType);
  }

  onDropdownListItemAdd() {
    const id = this.listItemInput.replace(/\s/gm, '');

    if (id.length && !this.listItems.find((x: any) => x.id === id)) {
      this.listItems.push({ id, value: this.listItemInput });
      console.log('list Items => ', this.listItems);
      this.listItemInput = '';
    }
  }
  onDropdownListItemRemove(index: number) {
      this.listItems.splice(index, 1);
  }
}
