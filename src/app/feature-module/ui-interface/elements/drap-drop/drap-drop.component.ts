import { Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-drap-drop',
    templateUrl: './drap-drop.component.html',
    styleUrls: ['./drap-drop.component.scss'],
    standalone: false
})
export class DrapDropComponent  {
  public dragCardOne:Array<{ tittle:string, content: string }>= [
    {
      tittle: 'Draggable Card 1',
      content:
        'Jelly beans sugar plum cheesecake cookie oat cake soufflé.Tootsie roll bonbon liquorice tiramisu pie powder.Donut sweet roll marzipan pastry cookie cake tootsie roll oat cake cookie.',
    },
    {
      tittle: 'Draggable Card 2',
      content:
        'Jelly beans sugar plum cheesecake cookie oat cake soufflé.Tootsie roll bonbon liquorice tiramisu pie powder.Donut sweet roll marzipan pastry cookie cake tootsie roll oat cake cookie.',
    },
    {
      tittle: 'Draggable Card 3',
      content:
        'Jelly beans sugar plum cheesecake cookie oat cake soufflé.Tootsie roll bonbon liquorice tiramisu pie powder.Donut sweet roll marzipan pastry cookie cake tootsie roll oat cake cookie.',
    },
  ];
  public basicListGroup: Array<{ tittle:string, content: string }>  = [
    {
      tittle: 'Darren Elder',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
    },
    {
      tittle: 'Linda Ellis',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
    },
    {
      tittle: 'Toney Ritch',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
    },
    {
      tittle: 'Flora Jag',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
    },
    {
      tittle: 'Linda Marris',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
    },
  ];

  public todoList: Array<string> = [
    'Cras justo odio',
    'Dapibus ac facilisis in',
    'Morbi leo risus',
    'Porta ac consectetur ac',
    'Vestibulum at eros',
  ];
  public doneList: Array<string> = [
    'Cras justo odio',
    'Dapibus ac facilisis in',
    'Morbi leo risus',
    'Porta ac consectetur ac',
    'Vestibulum at eros',
  ];


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.basicListGroup,
      event.previousIndex,
      event.currentIndex
    );
  }

  dropTodo(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
