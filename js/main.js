window.addEventListener("load", function(){
  var contenedorTrello = document.getElementById("contenedorTrello");
  var formTrello = document.getElementById("formTrello");
  var lista = document.getElementById("lista");
  var anadirForm = document.getElementById("anadirForm");
  var inputLista = document.getElementById("inputLista");
  var botonGuardar = document.getElementById("botonGuardar");

  lista.addEventListener("click", function(){
    lista.classList.add("hidden");
    anadirForm.classList.remove("hidden");
    inputLista.focus();
  });

  inputLista.addEventListener("keyup", function(){
    var long = inputLista.value.length;
    if(long <= 0){
      botonGuardar.disabled = true;
    }else if(long >= 1){
      botonGuardar.disabled = false;
    }
  });

  botonGuardar.addEventListener("click", boxForm);

  function boxForm(e){
    e.preventDefault();
    anadirForm.classList.add("hidden");
    lista.classList.remove("hidden");

    var padre = this.parentElement.parentElement;

    var mensajeTrello = document.createElement("div");
    var anadirCard= document.createElement("div");
    var contenedor = document.createElement("div");

    mensajeTrello.classList.add("mensajeTrello");
    anadirCard.classList.add("añadirCard");
    contenedor.classList.add("contenedor");

    mensajeTrello.innerText = inputLista.value;
    inputLista.value = "";

    anadirCard.innerText = "Añadir una Tarjeta...";
    
    contenedorTrello.appendChild(contenedor);
    padre.appendChild(anadirCard);
    padre.insertBefore(mensajeTrello,padre.childNodes[0]);
    contenedor.insertBefore(lista,contenedor.childNodes[0]);
    contenedor.insertBefore(anadirForm,contenedor.childNodes[1]);
    
    padre.addEventListener("dragover", dragSobrePadre);
    padre.addEventListener("drop", soltar);
    anadirCard.addEventListener("click", anadirTarjeta);

    function anadirTarjeta(){
      this.classList.add("hidden");

      var formulario = document.createElement("form");
      var textArea= document.createElement("textarea");
      var botonAnadir = document.createElement("button");
      var iconoLista= document.createElement("i");

      formulario.classList.add("contenedorTarjeta");
      textArea.classList.add("textArea");
      botonAnadir.classList.add("botonCerrar");
      iconoLista.classList.add("icon-cross", "iconoLista");
      
      botonAnadir.setAttribute("type","button");
      botonAnadir.setAttribute("disabled", "true");
      botonAnadir.textContent = "Añadir";

      formulario.insertBefore(textArea, formulario.childNodes[0]);
      formulario.insertBefore(botonAnadir, formulario.childNodes[1]);
      formulario.insertBefore(iconoLista, formulario.childNodes[2]);
      this.parentElement.appendChild(formulario);

      textArea.focus();
      textArea.addEventListener("keyup", function(){
        var long = textArea.value.length;
          if(long <= 0){
            botonAnadir.disabled = true;
          }else if(long >= 1){
            botonAnadir.disabled = false;
          }
      });

      botonAnadir.addEventListener("click", tarjetaWhite);
    }
    function tarjetaWhite(){
      var post = document.createElement("div");

      post.classList.add("post");
      anadirCard.classList.remove("hidden");
      post.setAttribute("draggable", "true");
      post.setAttribute("id","anadirCard");
      this.parentElement.classList.add("hidden");
      
      post.innerText = this.previousSibling.value;

      this.parentElement.parentElement.insertBefore(post,this.parentElement);
      this.parentElement.parentElement.appendChild(anadirCard);

      post.addEventListener("dragstart", dragIniciado);
      post.addEventListener("dragend", dragFinalizado);
      post.addEventListener("dragleave", dragSalioPadre);

    }
    function dragIniciado(e){
      e.dataTransfer.setData("text", this.id);
      this.classList.add("borderPost");
      var content = document.getElementsByClassName("formTrello");
    }
    function dragFinalizado(e){
      this.classList.remove("borderPost");
    }
    function dragSalioPadre(e){
      var content = document.getElementsByClassName("formTrello");
    }
    function dragSobrePadre(e){
      e.preventDefault();
      this.classList.add("pulse", "bounce");
    }
    function soltar(e){
      e.preventDefault();
      var elementoArrastrado = e.dataTransfer.getData("text");
      this.insertBefore(document.getElementById(elementoArrastrado), this.lastElementChild);
      this.classList.add("pulse", "swing");
    }
  }
});