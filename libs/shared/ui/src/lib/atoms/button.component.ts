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
    <button mat-button (click)="onClick()" class="dw-button">
      {{ label() }}
    </button>
    } @case ('raised') {
    <button mat-raised-button (click)="onClick()" class="dw-raised-button">
      {{ label() }}
    </button>
    } @case ('stroked') {
    <button mat-stroked-button (click)="onClick()" class="dw-stroked-button">
      {{ label() }}
    </button>
    } @case ('flat') {
    <button mat-flat-button (click)="onClick()" class="dw-flat-button">
      {{ label() }}
    </button>
    } @case ('icon') {
    <button
      mat-icon-button
      [attr.aria-label]="ariaLabel()"
      (click)="onClick()"
      class="dw-icon-button"
    >
      <mat-icon>{{ icon() }}</mat-icon>
    </button>
    } @case ('fab') {
    <button
      mat-fab
      [attr.aria-label]="ariaLabel()"
      (click)="onClick()"
      class="dw-fab-button"
    >
      <mat-icon>{{ icon() }}</mat-icon>
    </button>
    } @case ('mini-fab') {
    <button
      mat-mini-fab
      [attr.aria-label]="ariaLabel()"
      (click)="onClick()"
      class="dw-mini-fab-button"
    >
      <mat-icon>{{ icon() }}</mat-icon>
    </button>
    } @default {
    <button mat-button (click)="onClick()" class="dw-button">
      {{ label() }}
    </button>
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
