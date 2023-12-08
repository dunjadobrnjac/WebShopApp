import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';


interface MessageNode {
  name: string;
  children?: MessageNode[];
}

const TREE_DATA: MessageNode[] = [
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
    ],
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-user-support',
  templateUrl: './user-support.component.html',
  styleUrls: ['./user-support.component.css']
})
export class UserSupportComponent {

  constructor(private snackbar: MatSnackBar) {
    /*za tree*/
    this.dataSource.data = TREE_DATA;
  }

  message: string = '';

  sendMessage(): void {
    console.log(this.message);
    /*ovde obraditi slanje poruke i kad vrati rezultat da je uspjesno poslana 
    prikazai snack bar, dodati i drugi snack bar ako poruka nije poslana */
    this.snackbar.open("Uspješno ste poslali poruku. Očekujte odgovor na Vašem email nalogu.", "",
      {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    )

    this.message = '';/*isprazni textarea nakon slanja poruke */
    //trebace i odmah azurirati da se prikaze poruka koja je upravo poslana
    //pozvati funkciju da opet ucita poruke i ima na pocetnoj stranici
    //kod filtera i searcha kako da ucita opet elemente
  }

  /*za prikaz prethidnih poruka */
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



