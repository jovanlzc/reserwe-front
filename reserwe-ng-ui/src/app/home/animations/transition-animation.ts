import {trigger, animate, style, query, transition, state} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* => *', [

    query(':enter',
      [
        style({opacity: 0, transform: 'translateY(20px)'})
      ],
      {optional: true}
    ),

    query(':leave',
      [
        style({opacity: 1}),
        animate('0.0s', style({opacity: 0}))
      ],
      {optional: true}
    ),

    query(':enter',
      [
        style({opacity: 0}),
        animate('500ms .3s ease', style({opacity: 1, transform: 'translateY(0)'}))
      ],
      {optional: true}
    )

  ])
]);
export const switchAnimation = trigger('switchTrigger', [
  state('fadeIn', style({
    opacity: '1',
    transform: 'translateY(50%)'
  })),
  transition('void => *', [style({opacity: '0'}), animate('1000ms')])
]);
