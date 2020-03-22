import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { NgToastConfig, NgToastPosition, NgToastType } from '.';
import { translateYAnimation } from './ng-toast-animations';

@Component({
  selector: 'lib-ng-toast',
  animations: [
    translateYAnimation
  ],
  templateUrl: './ng-toast.component.html',
  styleUrls: ['./ng-toast.component.scss']
})
export class NgToastComponent implements OnInit, AfterViewInit {

  @Input()
  set messageValue(message: string) {
    this.message = message;
    this.state = 'opened';
  }
  get messageValue(): string { return this.message; }
  @Input()
  set titleValue(title: string) {
    this.title = title;
    this.state = 'opened';
  }
  get titleValue(): string { return this.title; }
  get stateValue(): string { return this.state; }

  @Input() config: NgToastConfig;
  @Output() closed: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('toast', { static: false }) toast: ElementRef;

  private state: 'opened' | 'closed' = 'closed';
  private message: string;
  private title: string;
  private componentRef: any;
  private toastElementRef: HTMLElement;
  private positionConfig = {
    [NgToastPosition.BottomCenter]: 'center',
    [NgToastPosition.BottomFullWidth]: 'stretch',
    [NgToastPosition.BottomLeft]: 'flex-start',
    [NgToastPosition.BottomRight]: 'flex-end',
    [NgToastPosition.TopCenter]: 'center',
    [NgToastPosition.TopFullWidth]: 'stretch',
    [NgToastPosition.TopLeft]: 'flex-start',
    [NgToastPosition.TopRight]: 'flex-end'
  };
  private typeConfig = {
    [NgToastType.Success]: 'mediumseagreen',
    [NgToastType.Info]: 'dodgerblue',
    [NgToastType.Warning]: 'orange',
    [NgToastType.Error]: 'red'
  };
  private bottomPositions = [
    NgToastPosition.BottomCenter,
    NgToastPosition.BottomFullWidth,
    NgToastPosition.BottomLeft,
    NgToastPosition.BottomRight
  ];

  constructor() { }


  ngOnInit(): void {
    if (this.config.autoClose) {
      this.onAutoClose();
    }
  }

  ngAfterViewInit(): void {
    this.toastElementRef = this.toast.nativeElement;
    this.componentRef = this.toastElementRef.parentNode;
    this.setPosition();
    this.setType();
  }

  @HostListener('click', ['$event'])
  onClick() {
    if (this.config.tapDismiss) {
      this.closed.emit();
    }
  }

  private onAutoClose() {
    setTimeout(() => {
      this.closed.emit();
    }, this.config.duration);
  }

  private setPosition() {
    if (this.bottomPositions.indexOf(this.config.position) !== -1) {
      this.componentRef.style.justifyContent = 'flex-end';
    } else {
      this.componentRef.style.justifyContent = 'flex-start';
    }
    this.componentRef.style.alignItems = this.positionConfig[this.config.position];
  }

  private setType() {
    this.toastElementRef.style.backgroundColor = this.typeConfig[this.config.type];
  }

}
