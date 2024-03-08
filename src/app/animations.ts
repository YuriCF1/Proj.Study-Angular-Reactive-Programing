import { animate, keyframes, query, stagger, style, transition, trigger } from "@angular/animations";

export const enterListAnimationTrigger = trigger('listEnter', [
  transition('* <=> *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(-50px)' }),
      stagger('100ms', [
        animate('500ms ease-out', keyframes([
          style({ opacity: 0, transform: 'translateY(-50px)', offset: 0 }),
          style({ opacity: 0.5, transform: 'translateY(-25px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'none', offset: 1 }),
        ])),
      ]),
    ], { optional: true }),
    query(':leave', [
      stagger('100ms', [
        animate('500ms ease-out', keyframes([
          style({ opacity: 1, transform: 'none', offset: 0 }),
          style({ opacity: 0.5, transform: 'translateY(-25px)', offset: 0.3 }),
          style({ opacity: 0, transform: 'translateY(-50px)', offset: 1 }),
        ])),
      ]),
    ], { optional: true }),
  ]),
  ,
])
