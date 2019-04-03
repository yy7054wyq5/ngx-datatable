import { Component, ChangeDetectorRef, ViewChild, Renderer2 } from '@angular/core';
import { DatatableComponent } from '../../src/components/datatable.component';
@Component({
  selector: 'inline-edit-demo',
  template: `
    <div>
      <h3>
        Inline Editing
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/inline.component.ts" target="_blank"> Source </a>
        </small>
      </h3>
      <section style="padding: 0 40px;">
        <a (click)="add()">增加行</a> / <a (click)="refreshTable()">刷新表格</a> / <a (click)="cutTable(container)">缩减表格高度</a> /
        <a (click)="backTable(container)">恢复表格高度</a>
      </section>
      <section #container>
        <ngx-datatable
          #mydatatable
          class="material"
          [headerHeight]="50"
          [limit]="5"
          [columnMode]="'force'"
          [footerHeight]="50"
          [rowHeight]="'auto'"
          [rows]="rows"
        >
          <ngx-datatable-column name="Name">
            <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row">
              <span title="Double click to edit" (dblclick)="editing[rowIndex + '-name'] = true" *ngIf="!editing[rowIndex + '-name']">
                {{ value }}
              </span>
              <input
                autofocus
                (blur)="updateValue($event, 'name', rowIndex)"
                *ngIf="editing[rowIndex + '-name']"
                type="text"
                [value]="value"
              />
            </ng-template>
          </ngx-datatable-column>
          <ngx-datatable-column name="Gender">
            <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-row="row" let-value="value">
              <span title="Double click to edit" (dblclick)="editing[rowIndex + '-gender'] = true" *ngIf="!editing[rowIndex + '-gender']">
                {{ value }}
              </span>
              <select
                *ngIf="editing[rowIndex + '-gender']"
                (blur)="editing[rowIndex + '-gender'] = false"
                (change)="updateValue($event, 'gender', rowIndex)"
                [value]="value"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </ng-template>
          </ngx-datatable-column>
          <ngx-datatable-column name="Age">
            <ng-template ngx-datatable-cell-template let-value="value"> {{ value }} </ng-template>
          </ngx-datatable-column>
        </ngx-datatable>
      </section>
    </div>
  `
})
export class InlineEditComponent {
  @ViewChild('mydatatable') mydatatable: DatatableComponent;

  editing = {};
  rows = [];

  constructor(private cdr: ChangeDetectorRef, private render: Renderer2) {
    this.fetch(data => {
      this.rows = data;
      // this.mydatatable.refresh();
      this.cdr.detectChanges();
    });
    this.cdr.detach();
  }

  cutTable(container) {
    this.render.setStyle(container, 'height', '0');
    this.render.setStyle(container, 'display', 'none');
    // this.mydatatable.recalculate();
  }

  backTable(container) {
    this.render.removeAttribute(container, 'style');
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

  add() {
    const newRow = this.rows[0];
    for (const key in newRow) {
      if (newRow.hasOwnProperty(key)) {
        newRow[key] = null;
      }
    }

    this.rows = [newRow, ...this.rows];

    this.cdr.detectChanges();
  }

  refreshTable() {
    // document.body.querySelector('nav').remove();
    // document.body.querySelector('content').setAttribute('style', 'margin-left:0');
    this.mydatatable.recalculate();
    this.cdr.detectChanges();
  }
}
