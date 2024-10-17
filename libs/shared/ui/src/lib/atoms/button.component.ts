import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EventBusService } from '@daily-words/services';

@Component({
  selector: 'dw-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    @switch (type()) { @case ('basic') {
    <button mat-button (click)="onClick()">{{ label() }}</button>
    } @case ('raised') {
    <button mat-raised-button (click)="onClick()">{{ label() }}</button>
    } @case ('stroked') {
    <button mat-stroked-button (click)="onClick()">{{ label() }}</button>
    } @case ('flat') {
    <button mat-flat-button (click)="onClick()">{{ label() }}</button>
    } @case ('icon') {
    <button mat-icon-button [attr.aria-label]="ariaLabel()" (click)="onClick()">
      <mat-icon>{{ icon() }}</mat-icon>
    </button>
    } @case ('fab') {
    <button mat-fab [attr.aria-label]="ariaLabel()" (click)="onClick()">
      <mat-icon>{{ icon() }}</mat-icon>
    </button>
    } @case ('mini-fab') {
    <button mat-mini-fab [attr.aria-label]="ariaLabel()" (click)="onClick()">
      <mat-icon>{{ icon() }}</mat-icon>
    </button>
    } @default {
    <button mat-button (click)="onClick()">{{ label() }}</button>
    } }
  `,
  styles: ``,
})
export class ButtonComponent {
  type = input<ButtonType>('basic');
  label = input<string>('Button');
  ariaLabel = input<string>('Button');
  icon = input<string>('home');
  event = input.required<string>();

  eventBusService = inject(EventBusService);

  onClick() {
    console.log('Button clicked', this.event());
    this.eventBusService.emit(this.event());
  }
}

type ButtonType =
  | 'basic'
  | 'raised'
  | 'stroked'
  | 'flat'
  | 'icon'
  | 'fab'
  | 'mini-fab';
