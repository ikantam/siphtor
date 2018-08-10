$( ".right-content .toggler" ).on( "click", function(event) {
  var parent = $(event.target).parent().parent().parent().children('.collapse');
  if(!$(parent).hasClass('show')){
    $(event.target).hide();
    $(event.target).parent().children('.fa-angle-up').show();
  }
  else {
    $(event.target).hide();
    $(event.target).parent().children('.fa-angle-down').show();
  }
});