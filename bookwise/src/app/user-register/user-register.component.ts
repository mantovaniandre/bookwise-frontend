import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';



@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {

  ngOnInit() {
    // Mostra o primeiro card e esconde os outros
    $("#form-steps .card:first-child").addClass("d-block");

    // Clica no botão "Próximo" para ir para o próximo card
    $(".next").click(function() {
      var currentCard = $(this).closest(".card");
      var nextCard = currentCard.next(".card");
      currentCard.removeClass("d-block").addClass("d-none");
      nextCard.removeClass("d-none").addClass("d-block");
    });

    // Clica no botão "Anterior" para voltar para o card anterior
    $(".prev").click(function() {
      var currentCard = $(this).closest(".card");
      var prevCard = currentCard.prev(".card");
      currentCard.removeClass("d-block").addClass("d-none");
      prevCard.removeClass("d-none").addClass("d-block");
    });
  }

}