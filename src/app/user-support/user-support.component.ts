import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { Message, MessageNode, ExampleFlatNode } from '../interface/interfaces';

/*const TREE_DATA: MessageNode[] = [
  {
    name: 'Prethodno poslane poruke',
    children: [
      {
        name: 'Ovo je Vasa prva poruka.',
        children: [{ name: 'Status: Odgovoreno' }],
      },
      {
        name: 'Ovo je Vasa druga poruka',
        children: [{ name: 'Status: Neodgovoreno' }],
      },
    ]
  },
];
*/

@Component({
  selector: 'app-user-support',
  templateUrl: './user-support.component.html',
  styleUrls: ['./user-support.component.css']
})
export class UserSupportComponent implements OnInit {


  TREE_DATA: MessageNode[] = [];

  constructor(private snackbar: MatSnackBar,
    private messageService: MessageService,
    private userService: UserService,
    private cdr: ChangeDetectorRef) {
  }
  activeUser: any;
  ngOnInit(): void {
    const ls = localStorage.getItem("activeUserId");
    const activeUserId = ls != null ? parseInt(ls, 10) : 0;
    this.userService.getUserById(activeUserId).subscribe(
      user => {
        this.activeUser = user;
      }
    );

    //za dobavljanje prethodnih poruka
    this.messageService.getUserMessages(1).subscribe(
      messages => {

        if (messages.length != 0) {
          this.TREE_DATA = [
            {
              name: 'Prethodno poslane poruke',
              children: []
            }
          ];
        }

        console.log(messages);
        for (const m of messages) {
          const node: MessageNode = {
            name: m.text,
            children: [
              { name: `Status: ${m.status == 1 ? 'Nepregledano' : m.status == 2 ? 'Pregledano' : 'Odgovoreno'}` }
            ]
          };
          this.TREE_DATA[0].children?.push(node);
        }
        setTimeout(() => this.dataSource.data = this.TREE_DATA, 0);
        console.log(this.TREE_DATA);
      }
    );

    /*za tree*/
    //this.dataSource.data = this.TREE_DATA;
  }

  messageText: string = '';
  message: Message = {
    text: '',
    status: 1,
    user: null // ovde upisati id korisnika kad se uradi prijava
  };


  sendMessage(): void {
    console.log(this.messageText);
    /*ovde obraditi slanje poruke i kad vrati rezultat da je uspjesno poslana 
    prikazai snack bar, dodati i drugi snack bar ako poruka nije poslana */

    this.message.text = this.messageText;
    this.message.user = this.activeUser;

    //upisivanje poruke u bazu
    this.messageService.addNewMessage(this.message).subscribe(
      (response: number) => {
        console.log("response " + response);
        if (response == 1) {
          this.snackbar.open("Uspješno ste poslali poruku. Očekujte odgovor na Vašem email nalogu.", "",
            {
              duration: 4000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            }
          )
        } else {
          this.snackbar.open("Slanje poruke nije uspjelo. Pokušajte kasnije ponovo.", "",
            {
              duration: 4000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            }
          )
        }
      }
    );

    this.snackbar._openedSnackBarRef?.afterDismissed().subscribe(() => this.cdr.detectChanges());

    this.messageText = '';/*isprazni textarea nakon slanja poruke */

    //trebace i odmah azurirati da se prikaze poruka koja je upravo poslana
    //pozvati funkciju da opet ucita poruke i ima na pocetnoj stranici
    //kod filtera i searcha kako da ucita opet elemente
  }

  /*za prikaz prethodnih poruka */
  private _transformer = (node: MessageNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}



