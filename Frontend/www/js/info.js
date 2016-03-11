$(function() 
{

	$(document).ready(function(){
		$("#hide").click(function(){
		 	$("#tabs").hide();
		});
		$("#show").click(function(){
			$("#tabs").show();
		});
	});
	$( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
    $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
});

  $(function() {
    $( "#accordion" ).accordion({
      heightStyle: "content"
    });
  });