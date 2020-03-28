import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { translateYAnimation } from './ngx-toast-animations';
import { NgToastConfig } from './ngx-toast-config.model';
import { NgToastPosition } from './ngx-toast-position.enum';
import { NgToastType } from './ngx-toast-type.enum';
import { toastStates, flexPositions, typeConfigClasses } from './ngx-toast-constant';

@Component({
  selector: 'lib-ngx-toastf',
  animations: [
    translateYAnimation
  ],
  templateUrl: './ngx-toast.component.html',
  styleUrls: ['./ngx-toast.component.scss']
})
export class NgToastComponent implements OnInit, AfterViewInit {

  @Input()
  set messageValue(message: string) {
    this.message = message;
    this.state = toastStates.opened;
  }
  get messageValue(): string { return this.message; }
  @Input()
  set titleValue(title: string) {
    this.title = title;
  }
  get titleValue(): string { return this.title; }
  get stateValue(): string { return this.state; }

  @Input() config: NgToastConfig;
  @Output() closed: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('toast', { static: false }) toast: ElementRef;

  private state = toastStates.closed;
  private message: string;
  private title: string;
  private componentRef: any;
  private toastElementRef: HTMLElement;
  private typeConfig = typeConfigClasses;
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

  @HostListener('click')
  onClick(): void {
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
    let position: string;
    if (this.bottomPositions.indexOf(this.config.position) !== -1) {
      this.componentRef.style.justifyContent = flexPositions.flexEnd;
    } else if (this.config.position === NgToastPosition.Center) {
      this.componentRef.style.justifyContent = flexPositions.center;
    } else {
      this.componentRef.style.justifyContent = flexPositions.flexStart;
    }
    switch (this.config.position) {
      case NgToastPosition.BottomCenter:
      case NgToastPosition.TopCenter:
      case NgToastPosition.Center:
        position = flexPositions.center;
        break;
      case NgToastPosition.BottomFullWidth:
      case NgToastPosition.TopFullWidth:
        position = flexPositions.stretch;
        break;
      case NgToastPosition.BottomLeft:
      case NgToastPosition.TopLeft:
        position = flexPositions.flexStart;
        break;
      default:
        position = flexPositions.flexEnd;
        break;
    }
    this.componentRef.style.alignItems = position;
  }

  private setType() {
    this.toastElementRef.classList.add(this.typeConfig[this.config.type]);
  }

}
