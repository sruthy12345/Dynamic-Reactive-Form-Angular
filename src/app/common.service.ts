import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  
    controls=[
        {
            "name":"firstName",
            "label":"First Name",
            "value":"",
            "type":"text",
            "validators":{
                "required":true,
              "minLength":3,
              "maxLength":10
            }
        },
        {
            "name":"lastName",
            "label":"Last Name",
            "value":"",
            "type":"text",
            "validators":{    "minLength":1,
              "maxLength":10}
        },
        {
            "name":"profCheck",
            "label":"Are you a professional",
            "value":false,
            "type":"checkbox",
            "validators":{}
        },
        {
            "name":"citizenType",
            "label":"Citizen Type",
            "value":null,
            "type":"radio",
            "validators":{},
            "options": [
                { "label": "Indian", "value": "indian" },
                { "label": "Non-Indian", "value": "non-indian" }
              ]
        }
      

]
successPopup(title: string | HTMLElement) {
  return Swal.fire({
    title,
    confirmButtonColor: '#00b300',
    customClass: {
      confirmButton: 'btn-success',
    },
  });
}

errorPopup(title: string | HTMLElement, text = '') {
  return Swal.fire({
    title,
    text,
    confirmButtonColor: '#f44336',
    customClass: {
      confirmButton: 'btn-error',
    },
  });
}
}
