import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() submitLabel!: string;
  @Input() initialText: string = '';

  form!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [this.initialText, Validators.required],
    });
  }

  @Output()
  handleSubmit = new EventEmitter<string>(); /*za slanje podataka u commponents formu */
  onSubmit(): void {
    this.handleSubmit.emit(this.form.value.title); //emituje unesenu vrijednost
    this.form.reset();
  }

}
