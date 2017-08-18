// setup shortcut links for add income/expense
$("#trigger-add-income").click(function() {
  $("#adder").show( "slow" );
  $('#trigger-add-income').addClass('active');
  $('#trigger-add-expense').removeClass('active');
  $("#category-income").show();
  $("#category-expenses").hide();
  $("#amount-form").val("")
  $("#amount-form").attr("placeholder", "amount")
  return false;
});
$("#trigger-add-expense").click(function() {
  $("#adder").show( "slow" );
  $("#adder-transfer").hide();
  $('#trigger-add-income').removeClass('active');
  $('#trigger-add-expense').addClass('active');
  $("#category-income").hide();
  $("#category-expenses").show();
  $("#amount-form").val("-")
  return false;
});

$("#adder-close").click(function() {
  $("#adder").hide( "slow" );
  $('#trigger-add-income').removeClass('active');
  $('#trigger-add-expense').removeClass('active');
  return false;
});

$("#pie-collapse").click(function() {
  $("#pie-pannel").toggle( "slow" )
})

$("#bar-collapse").click(function() {
  $("#bar-pannel").toggle( "slow" )
})