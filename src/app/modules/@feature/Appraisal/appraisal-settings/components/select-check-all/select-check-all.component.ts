import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
// import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-select-check-all',
  templateUrl: './select-check-all.component.html',
  styleUrls: ['./select-check-all.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectCheckAllComponent {
  @Input() model = new FormControl();
  @Input() values: any = [];
  @Input() text = 'Select All';

  isChecked(): boolean {
    return (
      this.model.value &&
      this.values.length &&
      this.model.value.length === this.values.length
    );
  }

  isIndeterminate(): boolean {
    return (
      this.model.value &&
      this.values.length &&
      this.model.value.length &&
      this.model.value.length < this.values.length
    );
  }

  toggleSelection(change: MatCheckboxChange) {
    if (change.checked) {
      this.model.setValue(this.values);
    } else {
      this.model.setValue([]);
    }
  }
}
