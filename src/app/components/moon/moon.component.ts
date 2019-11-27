import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-moon',
    templateUrl: './moon.component.html',
    styleUrls: ['./moon.component.scss']
})
export class MoonComponent implements OnInit {
    @Input() rating: string;

    @Input() large: boolean = false;
    private size: number;

    constructor() { }

    ngOnInit() {
    }
}
