  // ==UserScript==
// @name         OplusM AUTODAS Phoenix
// @namespace    https://oplusm.fr
// @version      1.8
// @description  Envoie semi-automatique de prevenance Phoenix
// @author       Adi Lasri
// @match        https://phoenixintnl.service-now.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/AdemStars/AUTODAS-PHOENIX/main/autodas.js
// @downloadURL  https://raw.githubusercontent.com/AdemStars/AUTODAS-PHOENIX/main/autodas.js
// ==/UserScript==


(function () {
  //'use strict';

  window.addEventListener('load', function () {
    setTimeout(function () { // récuparation des data nécéssaire


        var idElement = document.getElementById("sys_display.ni.QSf723b2941b1f3010b96aed3cbc4bcb8e").value;
        var idDas = document.getElementById("sys_readonly.u_pti_request_external.number").value;
        var idSociete = document.getElementById("sys_display.ni.QScc82f2541b1f3010b96aed3cbc4bcbb2").value;
        var idAdresse = document.getElementById("u_pti_request_external.u_pti_site_id.name").value;
        var idInter = document.getElementById("sys_display.ni.QS40753ed41b1f3010b96aed3cbc4bcb34").value;
        var idDesc = document.getElementById("ni.QS979972981b1f3010b96aed3cbc4bcb2f").value;
        var idDatedebut= document.getElementById("ni.QS1bf4f6d41b1f3010b96aed3cbc4bcbc6").value;
        idDatedebut = idDatedebut.slice(0,10);
        var idDatefin = document.getElementById("ni.QSef3532d41b1f3010b96aed3cbc4bcb98").value;
        idDatefin = idDatefin.slice(0,10);
        if (idDatefin == idDatedebut){
          var DATE=" le "+idDatedebut;
        }
      else{
        DATE=' le '+idDatedebut+" jusqu\'au "+idDatefin;
      }
        var idOperateur = document.getElementById("sys_display.ni.QS79d1f6541b1f3010b96aed3cbc4bcbce").value;
        var idInterplus = document.getElementById("sys_display.u_pti_request_external.u_y_type_of_work_subcategory").value;
        var idCrewN = document.getElementById("ni.QSe81936581b1f3010b96aed3cbc4bcbb8").value;
        var idCrewE = document.getElementById("ni.QS04f5ed0987e511109ab496883cbb35bf").value;
        var idCrewP = document.getElementById("ni.QSef39f2981b1f3010b96aed3cbc4bcb1c").value;

                // Sélectionnez le tableau par son ID
          var table = document.getElementById("3957249c1b3bf050b96aed3cbc4bcbd3_table");
          var tbody = table.querySelector("tbody");
      console.log(table);
      var contacts = [];
      if (tbody && tbody.children.length >= 2) {


          // Sélectionnez toutes les lignes du tableau, en excluant la première ligne (entête)
          var rows = table.getElementsByTagName("tr");
          // Créez un tableau pour stocker les informations de contact


          for (var i = 1; i < rows.length; i++) {
            // Sélectionnez toutes les cellules de la ligne
            var cells = rows[i].getElementsByTagName("td");


            // Récupérez les données de chaque cellule
            var nomPersonnel = cells[1].textContent;
            var numeroTelephone = cells[3].textContent;
            var societe = cells[4].textContent;
            var contact = nomPersonnel +" | "+ numeroTelephone+" | "+ societe;
            // Ajoutez le contact au tableau contacts
            contacts.push(contact);
          }
      }


      // Prompt des informations récupéré dans la console
      console.log("Code site: " + idElement + " Code das : " + idDas + " Société : " + idSociete + " Nature inter :" + idInter + " Description inter : " + idDesc + " Contact : " + contact + " Adresse : " + idAdresse + " Operateur : "+ idOperateur);
      console.log("Date debut : " + idDatedebut + " Date fin : " + idDatefin);
      // Appelez la fonction pour la première fois
      sendEmail(idElement, idDas, idSociete, idAdresse, idInter, idDesc, contacts, DATE,idCrewN,idCrewE,idCrewP,idOperateur);

    }, 10000);
   });




  // fonction de création du mail
  function sendEmail(idElement, idDas, idSociete, idAdresse, idInter, idDesc, contact, DATE ,idCrewN,idCrewE,idCrewP,idOperateur) {
    var recipient = ''; // pas de destinataire automatique
    var subject = "[PHOENIX TOWER] Demande d'accès sur le site " + idElement + " / "+ idDas+ " / " +idAdresse + DATE  ;
    var body = 'Bonjour, %0A%0A';
    body += 'Nous vous informons que la société ' + idSociete + ' souhaite intervenir sur votre site situé au ' + idAdresse + DATE + '. %0A%0A'; //corps du mail
    body += 'Ci-dessous les informations concernant l’opération :%0A%0A';
    body += 'Référence du site : ' + idElement + '.%0A';
    body += 'Lieu de l\'intervention : ' + '.%0A';
    body += 'Nature d\'intervention : ' + idInter + '.%0A';
    body += 'Sur les équipements de l\’opérateur : ' + idOperateur + '%0A';
    body += 'Equipements spéciaux  : ' + '.%0A';
    body += 'Motif de l’intervention : ' + idDesc;
    body += '%0ALes Intervenants sont : %0A';
    body += idCrewN+" | "+idCrewE+" | "+idCrewP+"%0A";
    for (var i = 0; i < contact.length; i++) {
        body += contact[i] + "%0A";
    }
    body += '%0AAvons-nous votre accord pour l’intervention ? %0A';
    body += '%0APar ailleurs, pouvez-vous, svp nous donner le contact du gardien ou de la personne sur place en cas de problème ? %0A';
    body += 'Dans l’attente de votre retour.%0A';
    body += 'Cordialement,%0A';


    //var mailtoLink = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body); // encapsulage dans le mailto
    var urlOWA = "https://outlook.office365.com/owa/?path=/mail/action/compose&to=&subject="+subject+"&body="+body;

    window.open(urlOWA, "_blank");
    //window.location.href = mailtoLink;
  };
})();
