import {Component, OnInit, ElementRef, Input, Output, OnChanges, SimpleChange, EventEmitter, Self} from 'angular2/core';
import {NgControl, ControlValueAccessor} from 'angular2/common';

@Component({
    selector: 'select2',
    template: '<select class="form-control"></select>'
})
export class Select2Component implements OnInit, OnChanges, ControlValueAccessor {
    private _selectElement: any;
    @Input() data: Array<any> = new Array<any>();
    @Input() placeholder: string;
    @Input() multiple: boolean = false;
    @Input() value: any;
    private _change: EventEmitter<any> = new EventEmitter<any>();
   
    constructor(@Self() cd: NgControl, public element: ElementRef) {
        cd.valueAccessor = this;
    }
    
    ngOnInit() {
        this._selectElement = jQuery(this.element.nativeElement.childNodes[0]);
        this.setDataSelect2(this.data);
        this._selectElement.on("change", e => { this._change.emit(this._selectElement.val()); });
    }
    
    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        if (changes['data']) {
            if (this._selectElement) {
                this.setDataSelect2(changes['data'].currentValue);
            }
        }
    }
    
    writeValue(value: any): void {
        this.setValueSelect2(value);
    }
    
    registerOnChange(fn: () => any): void {
        this._change.subscribe(fn); 
    }
    
    registerOnTouched(fn: () => any): void { }
    
    private setDataSelect2(data: Array<any>) {
        this._selectElement.select2({
            data: data,
            theme: 'bootstrap',
            placeholder: this.placeholder,
            multiple: this.multiple
        });
    }
    
    private setValueSelect2(value: any) {
        this._selectElement.select2({
            theme: 'bootstrap',
            placeholder: this.placeholder,
            multiple: this.multiple
        }).val(value).trigger('change');
    }
}