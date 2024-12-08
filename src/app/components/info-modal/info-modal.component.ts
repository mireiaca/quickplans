import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {

  title: string = '';
  content: string = '';
  additionalInfo: string = '';

  // Estilos
  contentBgColor = '#117C6F';
  white = '#FFFFFF';
  none = 'none';
  auto = 'auto';
  textCenter = 'center';
  inline = 'inline-block';

  constructor(
    public dialogRef: MatDialogRef<InfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.content = data.content;
    this.additionalInfo = data.additionalInfo;
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }
}
