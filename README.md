# ngx-datatable-wy

> fork from  [@swimlane/ngx-datatable](https://github.com/swimlane/ngx-datatable)

support Angular7.0, wyy branch for publish.

```cmd
 # postversion
 npm run postversion [tag]
```

## Feature

* [DataTableBodyComponent](src/components/body/body.component.ts) only vertical scrolling trigger updateRows() methods.

```javascript
  onBodyScroll() {
    // ...
    // this.updateRows(); // source code
    if(event.direction) { // Vertical scroll
      this.updateRows();
    }
  }
```

* [DatatableComponent](src/components/datatable.component.ts) Update recalculate(): add markForCheck.

```javascript
  recalculate(): void {
    this.recalculateDims();
    this.recalculateColumns();
    this.cd.markForCheck(); // +++
  }
```

* [DataTableSelectionComponent](src/components/body/selection.component.ts) Update selectRow(): emit current selected row.

```javascript
  selectRow(event: KeyboardEvent | MouseEvent, index: number, row: any): void {
    //...
    this.select.emit({
      selected,
      row // +++ 选中行返回当前行数据
    });
  }
```

## Bugfix

* [DataTableBodyComponent](src/components/body/body.component.ts) [trackByProp]

```javascript
constructor(private cd: ChangeDetectorRef) {
  // declare fn here so we can get access to the `this` property
  this.rowTrackingFn = function(this: any, index: number, row: any): any {
    const idx = this.getRowIndex(row);
    if (this.trackByProp) {
      return row[this.trackByProp]; // to fix
      // return `${idx}-${this.trackByProp}`; // source code
    } else {
      return idx;
    }
  }.bind(this);
}
```