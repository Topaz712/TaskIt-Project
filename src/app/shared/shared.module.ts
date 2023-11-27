import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FilterByStatusPipe } from "./filter-by-status.pipe";

@NgModule({
  declarations: [
    DropdownDirective,
    FilterByStatusPipe
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    DropdownDirective,
    FilterByStatusPipe
  ]
})
export class SharedModule {}
