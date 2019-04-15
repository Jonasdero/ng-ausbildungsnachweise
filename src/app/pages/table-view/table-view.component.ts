import { Component, OnInit, ViewChild } from '@angular/core';
import { WeekService, DateService } from '../../shared';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  weeks = [];
  dataSource: MatTableDataSource<Week>;
  displayedColumns = ['select', 'nr', 'date', 'department', 'hsum', 'delete'];
  selection = new SelectionModel<Week>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.weeks.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(week?: Week): string {
    if (!week) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(week) ? 'deselect' : 'select'} row ${this.getNumber(week)}`;
  }
  constructor(private weekService: WeekService, private dateService: DateService) { }

  ngOnInit() {
    this.getWeeks();
  }

  getWeeks() {
    this.weeks = this.weekService.weeks;
    this.dataSource = new MatTableDataSource<Week>(this.weeks);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  clearWeeks() {
    const weeksToDelete = [];
    for (const week of this.weeks) {
      if (this.selection.isSelected(week)) {
        weeksToDelete.push(week);
      }
    }
    this.weekService.deleteMultipleWeeks(weeksToDelete);
    this.getWeeks();
    setTimeout(() => this.selection.clear(), 10);
  }
  duplicateWeeks() {
    const weeksToDuplicate = [];
    for (const week of this.weeks) {
      if (this.selection.isSelected(week)) {
        weeksToDuplicate.push(week);
      }
    }
    this.weekService.duplicateMultipleWeeks(weeksToDuplicate);
    this.getWeeks();
    setTimeout(() => this.selection.clear(), 10);
  }
  duplicateWeek(week: Week) {
    this.weekService.duplicateWeek(week);
    this.getWeeks();
    setTimeout(() => this.selection.clear(), 10);
  }
  deleteWeek(week: Week) {
    this.weekService.deleteWeek(week);
    this.getWeeks();
    setTimeout(() => this.selection.clear(), 10);
  }
  getNumber(week: Week) { return this.dateService.getNumber(week.date); }
  getHSum(week: Week) { return week.weekdays.reduce((a, b) => a + b.hours, 0); }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
