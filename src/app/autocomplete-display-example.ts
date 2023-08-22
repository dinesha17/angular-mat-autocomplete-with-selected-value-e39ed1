import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

export interface User {
  name: string;
  value: string;
}

/**
 * @title Display value autocomplete
 */
@Component({
  selector: "autocomplete-display-example",
  templateUrl: "autocomplete-display-example.html",
  styleUrls: ["autocomplete-display-example.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteDisplayExample implements OnInit {
  myControl = new FormControl();
  options: User[] = [
    { name: "Maryyyyyyyyyyyyyyyyyyyyyyyyy here", value: "1" },
    { name: "Shelleyyyyyyyyyyyyyyyyyyyyyyy there", value: "2" },
    { name: "Igorrrrrrrrrrrrrrrrrrr where", value: "3" }
  ];
  filteredOptions: Observable<User[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice()))
    );
  }

  displayFn(user?: User): string | undefined {
    console.log(user ? user.value : "",'ggg');
    return user ? user.name : undefined;
  }
  returnFn(user?: User): string | undefined {
    return user ? user.value : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
}

/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
