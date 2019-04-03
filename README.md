# ngx-datatable-wy

> fork from  [@swimlane/ngx-datatable](https://github.com/swimlane/ngx-datatable)

support Angular7.0, wyy branch for publish.

```cmd
 # postversion
 npm run postversion [tag]
```

## add

* Horizontal scrolling does not trigger updateRows() methods.

```javascript
  // src/components/body/body.component.ts
  onBodyScroll() {
    // ...

    // this.updateRows(); // source code
    if(event.direction) { // Vertical scroll
      this.updateRows();
    }
  }
```

* Add refresh() method to refresh dataTable.

```javascript
  // src/components/datatable.component.ts
  recalculate(): void {
    this.recalculateDims();
    this.recalculateColumns();
    this.cd.markForCheck(); // +++
  }
```

## bugfix

* [trackByProp]

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