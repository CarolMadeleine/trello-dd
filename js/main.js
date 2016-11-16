window.addEventListener("load", function(){
  var contenedorTrello = document.getElementById("contenedorTrello");
  var formTrello = document.getElementById("formTrello");
  var lista = document.getElementById("lista");
  var anadirForm = document.getElementById("anadirForm");
  var inputLista = document.getElementById("inputLista");
  var iconoCruz = document.getElementById("iconoCruz");
  var botonGuardar = document.getElementById("botonGuardar");
  var contador = 1;

  lista.addEventListener("click", añadir);
  inputLista.addEventListener("keyup", validarInput);
  botonGuardar.addEventListener("click", boxForm);
  iconoCruz.addEventListener("click", iconoCruzHidden);

  function añadir(e){
    lista.classList.add("hidden");
    anadirForm.classList.remove("hidden");
    inputLista.focus();
  }
  function validarInput(){
    var long = inputLista.value.length;
      if(long <= 0){
        botonGuardar.disabled = true;
      }else if(long >= 1){
        botonGuardar.disabled = false;
      }  
    }
  function boxForm(e){
    e.preventDefault();
    anadirForm.classList.add("hidden");
    lista.classList.remove("hidden");

    var padre = this.parentElement.parentElement;

    var mensajeTrello = document.createElement("div");
    var anadirCard= document.createElement("div");
    var contenedor = document.createElement("div");

    contenedor.classList.add("contenedor");
    mensajeTrello.classList.add("mensajeTrello");
    anadirCard.classList.add("añadirCard");
    padre.setAttribute("draggable", "true");

    mensajeTrello.innerText = inputLista.value;
    inputLista.value = "";

    anadirCard.innerText = "Añadir una Tarjeta...";
    
    contenedorTrello.appendChild(contenedor);
    padre.appendChild(anadirCard);
    padre.insertBefore(mensajeTrello,padre.childNodes[0]);
    contenedor.insertBefore(lista,contenedor.childNodes[0]);
    contenedor.insertBefore(anadirForm,contenedor.childNodes[1]);
    
    padre.addEventListener("dragover", dragSobre);
    padre.addEventListener("drop", dragSoltar);

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
      
      iconoLista.setAttribute("id", "iconoLista");
      botonAnadir.setAttribute("type","button");
      botonAnadir.setAttribute("disabled", "true");
      botonAnadir.textContent = "Añadir";

      formulario.insertBefore(textArea, formulario.childNodes[0]);
      formulario.insertBefore(botonAnadir, formulario.childNodes[1]);
      formulario.insertBefore(iconoLista, formulario.childNodes[2]);
      this.parentElement.appendChild(formulario);

      textArea.focus();
      textArea.addEventListener("keyup", validarTextArea)
        function validarTextArea(){
          var long = textArea.value.length;
          if(long <= 0){
            botonAnadir.disabled = true;
          }else if(long >= 1){
            botonAnadir.disabled = false;
          }
        }

      botonAnadir.addEventListener("click", tarjetaWhite);
      iconoLista.addEventListener("click", iconoListaHidden);
    }
    function iconoListaHidden(){
      this.parentElement.classList.add("hidden");
      this.parentElement.previousSibling.classList.remove("hidden");
    }
    function tarjetaWhite(){
      var post = document.createElement("div");

      post.classList.add("post");
      anadirCard.classList.remove("hidden");
      this.parentElement.classList.add("hidden");
      
      post.setAttribute("draggable", "true");
      post.setAttribute("id", contador++);
      
      post.innerText = this.previousSibling.value;

      this.parentElement.parentElement.insertBefore(post,this.parentElement);
      this.parentElement.parentElement.appendChild(anadirCard);

      post.addEventListener("dragstart", dragIniciado);
      post.addEventListener("dragleave", dragSalir);
    }
    function dragIniciado(e){
      e.dataTransfer.setData("text", e.target.id);
      this.classList.add("borderPost");
    }
    function dragSobre(e){
      e.preventDefault();
    }
    function dragSalir(e) {
      e.preventDefault();
      this.parentElement.classList.remove("animated", "swing");
      this.classList.remove("borderPost");
    }
    function dragSoltar(e){
      e.preventDefault();
      var idElementoArrastrado = e.dataTransfer.getData("text");
      this.insertBefore(document.getElementById(idElementoArrastrado),e.target);
      // this.insertBefore(document.getElementById(elementoArrastrado), this.lastElementChild);
      this.classList.add("animated", "swing");
    }
  }
  function iconoCruzHidden(e){
    anadirForm.classList.add("hidden");
    lista.classList.remove("hidden");
  }

});