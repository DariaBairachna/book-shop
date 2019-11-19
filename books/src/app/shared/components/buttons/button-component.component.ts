import { Component, OnInit, Inject, Input } from '@angular/core';
import { ButtonViewModel } from 'app/shared/models';

@Component({
    selector: 'button-component',
    templateUrl: './button-component.component.html',
    styleUrls: ['./button-component.component.scss']
})
export class ButtonComponent implements OnInit {
    @Input() buttonData: ButtonViewModel;

    constructor( ) {
    }


    ngOnInit() {
    }



}
