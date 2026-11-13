/* Filtro dell'elenco articoli: mostra le schede il cui testo contiene tutte
   le parole scritte. Senza JavaScript il campo resta nascosto e l'elenco
   si vede intero. */
(function(){
  var box = document.querySelector('.find');
  var cards = [].slice.call(document.querySelectorAll('.shelf > li'));
  if (!box || !cards.length) return;
  var input = box.querySelector('input');
  var none = box.querySelector('.find-none');
  var texts = cards.map(function(li){ return li.textContent.toLowerCase(); });
  box.hidden = false;
  input.addEventListener('input', function(){
    var words = input.value.toLowerCase().split(/\s+/).filter(Boolean);
    var shown = 0;
    cards.forEach(function(li, i){
      var ok = words.every(function(w){ return texts[i].indexOf(w) >= 0; });
      li.hidden = !ok;
      if (ok) shown++;
    });
    none.hidden = shown > 0;
  });
})();
