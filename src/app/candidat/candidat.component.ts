import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm , ReactiveFormsModule } from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CandidatServiceService } from '../candidat-service.service';


export class candidat {
  constructor(
    public id: number,
    public nomPrenom: string,
    public email: string,
    public tel: string,
    public date: string,
    public exp: string,
    public qualite: string,
    public employeur: string,
    public salaire: string,
    public motivation: string,
    public disponniblite: string,
    public mobilite: string,
    public eligibilite: string,
    public score: string,
    public duree: string,
    public commentaire: string,
    public statut: string

  ) {
  }
}

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {
  
  candidats: candidat[] = [];
  closeResult=" "
  editForm!: FormGroup;
  private deleteId!: number;
  

  constructor(
    private httpClient:HttpClient,
    private modalService: NgbModal,
    private fb :FormBuilder,
    private serviceCandidat:CandidatServiceService
    ) {
    
  }

  ngOnInit(): void {
    this.getCandidats();
    this.editForm = this.fb.group({
      id: [''],
      nomPrenom: [''],
      email: [''],
      tel: [''],
      date: [''],
      exp: [''],
      qualite: [''],
      employeur: [''],
      salaire: [''],
      motivation: [''],
      disponniblite: [''],
      mobilite: [''],
      eligibilite: [''],
      score: [''],
      duree: [''],
      commentaire: [''],
      statut: ['']
    } );
  }

  getCandidats(){
    this.serviceCandidat.GetCandidat().subscribe(
      response => {
           console.log(response);
            this.candidats = response;
         })
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  onSubmit(f: NgForm) {
    this.serviceCandidat.newCandidat(f.value).subscribe((result) => {
         this.ngOnInit(); 
        });
       this.modalService.dismissAll();
  }

  openDetails(contentDetails: any, candidat: candidat) {
    this.modalService.open(contentDetails, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
  
   document.getElementById('nPrenom')!.setAttribute('value', candidat.nomPrenom);
   document.getElementById('mail')!.setAttribute('value', candidat.email);
   document.getElementById('teleph')!.setAttribute('value', candidat.tel);

   document.getElementById('datePr')!.setAttribute('value', candidat.date);
   document.getElementById('exper')!.setAttribute('value', candidat.exp);
   document.getElementById('qualitedt')!.setAttribute('value', candidat.qualite);

   document.getElementById('employeurdt')!.setAttribute('value', candidat.employeur);
   document.getElementById('salairedt')!.setAttribute('value', candidat.salaire);
   document.getElementById('motivationdt')!.setAttribute('value', candidat.motivation);

   document.getElementById('disponniblite')!.setAttribute('value', candidat.disponniblite);
   document.getElementById('mobilite')!.setAttribute('value', candidat.mobilite);
   document.getElementById('eligibilite')!.setAttribute('value', candidat.eligibilite);

   document.getElementById('score')!.setAttribute('value', candidat.score);
   document.getElementById('duree')!.setAttribute('value', candidat.duree);
   document.getElementById('commentaire')!.setAttribute('value', candidat.commentaire);

   document.getElementById('statutt')!.setAttribute('value', candidat.statut);
  }


  openEdit(targetModal: any, candidat: candidat) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( { 
      
      id: candidat.id, 
      nomPrenom: candidat.nomPrenom,
      email: candidat.email,

      tel: candidat.tel,
      date: candidat.date,
      exp: candidat.exp,

      qualite: candidat.qualite,
      employeur: candidat.employeur,
      salaire: candidat.salaire,

      motivation: candidat.motivation,
      disponniblite: candidat.disponniblite,
      mobilite: candidat.mobilite,

      eligibilite: candidat.eligibilite,
      score: candidat.score,
      duree: candidat.duree,

      commentaire: candidat.commentaire,
      statut: candidat.statut
    });
  }

  
  onSave() {
      this.serviceCandidat.modifierCandidat(this.editForm.value,this.editForm.value.id).subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal: any, candidat: candidat) {
    this.deleteId = candidat.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
 
  onDelete() {
    this.serviceCandidat.deleteCandidat(this.deleteId)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }




}
