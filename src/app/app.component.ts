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

  public showForm = 1; // 1 = newCol, 2 = insert-row
  public columnOp = 1; // 1 = new column, 2 = edit column, 3 = delete column
  public rowOp = 1; // 1 = insert row, 2 = edit row, 3 = delete row

  public hideDiaLog = () => {
    this.ejDialog.hide();
  };
  public onOpenDialog = (event: any) => {
    // Call the show method to open the Dialog
    this.ejDialog.show();
  };

  public saveNew() {
    if (this.showForm == 1 && this.columnOp == 1) {
      this.columns.push(this.columnPropsModel);
      debugger;
    } else if (this.showForm == 1 && this.columnOp == 2) {
      // Save column which is being edited
    } else if (this.showForm == 2 && this.rowOp == 1) {
      // Insert a new row
      this.data.push()
      const newData = this.data;
      this.data = [];
      setTimeout(() => {
        this.data = newData;
      }, 300);
    } else if (this.showForm == 2 && this.rowOp == 2) {
      // Edit current row
      const rowIdx = this.data.findIndex(x => x.rowId == this.rowToEdit.rowId);
      this.data[rowIdx] = this.rowToEdit;
      const newData = this.data;
      this.data = [];
      setTimeout(() => {
        this.data = newData;
      }, 300);
    }
    this.hideDiaLog();
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

  // Columns properties
  // dataType: 'String',
  // defaultValue:
  //   'data type is string then we are going to use as a string value default from user there',
  // minWidth: 100,
  // fontSize: 12,
  // fontColor: 'red',
  // backgroundColor: 'white',
  // Alignment: 'alignment at column level',
  // textWrap: true,

  actionBegin(args: any) {
  }

  ngAfterViewInit(): void {
    this.columns = [
      {
        field: `rowId`,
        headerText: 'RowID',
        primaryKey: true
      }
    ];

    const names = ["Adam", "Alex", "Aaron", "Ben", "Carl", "Dan", "David", "Edward", "Fred", "Frank", "George", "Hal", "Hank", "Ike", "John", "Jack", "Joe", "Larry", "Monte", "Matthew", "Mark", "Nathan", "Otto", "Paul", "Peter", "Roger", "Roger", "Steve", "Thomas", "Tim", "Ty", "Victor", "Walter", "Anderson", "Ashwoon", "Aikin", "Bateman", "Bongard", "Bowers", "Boyd", "Cannon", "Cast", "Deitz", "Dewalt", "Ebner", "Frick", "Hancock", "Haworth", "Hesch", "Hoffman", "Kassing", "Knutson", "Lawless", "Lawicki", "Mccord", "McCormack", "Miller", "Myers", "Nugent", "Ortiz", "Orwig", "Ory", "Paiser", "Pak", "Pettigrew", "Quinn", "Quizoz", "Ramachandran", "Resnick", "Sagar", "Schickowski", "Schiebel", "Sellon", "Severson", "Shaffer", "Solberg", "Soloman", "Sonderling", "Soukup", "Soulis", "Stahl", "Sweeney", "Tandy", "Trebil", "Trusela", "Trussel", "Turco", "Uddin", "Uflan", "Ulrich", "Upson", "Vader", "Vail", "Valente", "Van Zandt", "Vanderpoel", "Ventotla", "Vogal", "Wagle", "Wagner", "Wakefield", "Weinstein", "Weiss", "Woo", "Yang", "Yates", "Yocum", "Zeaser", "Zeller", "Ziegler", "Bauer", "Baxster", "Casal", "Cataldi", "Caswell", "Celedon", "Chambers", "Chapman", "Christensen", "Darnell", "Davidson", "Davis", "DeLorenzo", "Dinkins", "Doran", "Dugelman", "Dugan", "Duffman", "Eastman", "Ferro", "Ferry", "Fletcher", "Fietzer", "Hylan", "Hydinger", "Illingsworth", "Ingram", "Irwin", "Jagtap", "Jenson", "Johnson", "Johnsen", "Jones", "Jurgenson", "Kalleg", "Kaskel", "Keller", "Leisinger", "LePage", "Lewis", "Linde", "Lulloff", "Maki", "Martin", "McGinnis", "Mills", "Moody", "Moore", "Napier", "Nelson", "Norquist", "Nuttle", "Olson", "Ostrander", "Reamer", "Reardon", "Reyes", "Rice", "Ripka", "Roberts", "Rogers", "Root", "Sandstrom", "Sawyer", "Schlicht", "Schmitt", "Schwager", "Schutz", "Schuster", "Tapia", "Thompson", "Tiernan", "Tisler"];

    for (let rows = 0; rows < 10; rows++) {
      let colObj: any = {};
      colObj['rowId'] = rows + 1;
      this.columns.filter((c: any) => c.field != 'rowId').map((x: any) => x.field).forEach((k: any, idx: any) => {
        colObj[k] = names[Math.floor(Math.random() * 182) + 0]
      });
      this.data.push(colObj)
    }

  }

  actionComplete(e: any) {
    if (e.type !== 'save')
      return;
    const rowIdx = this.data.findIndex(x => x.rowId == e.data.rowId);
    const newChangedData: any = {};
    newChangedData.rowId = e.data.rowId;
    Object.keys(e.data).filter(x => x.includes('field-')).forEach(x => {
      newChangedData[x] = e.data[x]
    });
    this.data[rowIdx] = newChangedData;
    if (e.column.field == "rowId") {
      if (this.data.filter(x => x.rowId == e.data.rowId).length > 1) {
        newChangedData.rowId = e.previousData;
        for (let rows = 0; rows < this.treeGrid.getRows().length; rows++) {
          this.data[rows].rowId = rows + 1;
        }
      }
    }
    const newData = this.data;
    this.data = [];

    setTimeout(() => {
      this.data = newData;
    }, 100);
  }

  constructor(private formBuilder: FormBuilder) { }
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
    mode: 'Cell',
  };

  // contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending', 'Edit', 'Delete', 'Save', 'Cancel', 'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage', 'LastPage', 'NextPage'];

  contextMenuItems = [
    { text: 'Edit', target: '.e-headercontent', id: 'editCol' },
    { text: 'New', target: '.e-headercontent', id: 'newCol' },
    { text: 'Delete', target: '.e-headercontent', id: 'delCol' },
    { text: 'Ahsan', target: '.e-headercontent', id: 'ahsan' },
    { text: 'Insert Row', target: '.e-content', id: 'insert-row' },
    // { text: 'Edit Row', target: '.e-content', id: 'edit-row' },
  ];

  // load(args: any): void {
  //    var tree: any = this.treeGrid
  //    debugger;
  //    this.treeGrid.grid.load = function(args){
  //       //  this['viewContainerRef'] = tree['viewContainerRef'];
  //    }
  // }

  public columns: any = [];

  public columnPropsModel = {
    field: "",
    headerText: "",
    dataType: "",
    minWidth: "",
    defaultValue: "",
    fontSize: "",
    fontColor: "",
    backgroundColor: "",
    Alignment: "",
    textWrap: "",
  };

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.columns.push({
    //     field: 'age',
    //     headerText: 'age',
    //     dataType: 'String',
    //     DefaultValue:
    //       'data type is string then we are going to use as a string value default from user there',
    //     minWidth: 100,
    //     fontSize: 12,
    //     fontColor: 'red',
    //     backgroundColor: 'white',
    //     Alignment: 'alignment at column level',
    //     textWrap: true,
    //   })
    //   this.data.push({
    //     name: 'new',
    //     age: 0,
    //     gender: 'x'
    //   });
    //   const newData = this.data;
    //   this.data = [];
    //   setTimeout(() => {
    //     this.data = newData;
    //   }, 1500);
    // }, 1500);
    // this.initilaizeTarget();

    // this.pageSettings = {pageSize: 30};
  }

  dialogHeader = "";

  public rowToEdit: any = {};
  public rowToAdd: any = {};

  contextMenuClick(args: any) {
    if (args.item.id == 'newCol') {
      // Show New Col Modal with Custom Form
      // alert("new Column");
      this.onOpenDialog('');
      this.dialogHeader = "New Column";
      this.showForm = 1;
      this.columnOp = 1;
      this.columnPropsModel = {
        field: `field-${new Date().getTime()}-${Math.floor(Math.random() * 1000000) + 0}`,
        headerText: '',
        dataType: '',
        minWidth: '',
        defaultValue: '',
        fontSize: '',
        fontColor: '',
        backgroundColor: '',
        Alignment: '',
        textWrap: '',
      };
    } else if (args.item.id === 'editCol') {
      // Show Edit Col Modal with Custom Form
      this.onOpenDialog('');
      this.columnPropsModel = args.column;
      this.showForm = 1;
      this.dialogHeader = "Edit Column";
      this.columnOp = 2;
    } else if (args.item.id == 'delCol') {
      // Show Del Col Modal with Custom Form
      alert('del Column');
    } else if (args.item.id == 'junaid') {
      // Show Del Col Modal with Custom Form
      alert('junaid');
    } else if (args.item.id == 'insert-row') {
      this.showForm = 2;
      this.dialogHeader = "New Row";
      this.onOpenDialog('');
      this.rowOp = 1;
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
