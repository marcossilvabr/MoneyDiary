// setup shortcut links for add income/expense
$("#trigger-add-income").click(function() {
  $("#adder").show( "slow" );
  $("#negative-submit").hide()
  $("#positive-submit").show()
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
  $("#negative-submit").show()
  $("#positive-submit").hide()
  $("#adder-transfer").hide();
  $('#trigger-add-income').removeClass('active');
  $('#trigger-add-expense').addClass('active');
  $("#category-income").hide();
  $("#category-expenses").show();
  $("#amount-form").val("")
  return false;
});

$("#negative-submit").click(function(e) {
  e.preventDefault()
  var amount = $("#amount-form").val()
  amount *= -1
  $("#amount-form").val(amount)
  $("#transaction").submit()
})

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

$("#filter-year").change(function() {
  var value = $(this).val()
  $(this).find('option[selected="selected"]').attr("selected", false)
  $(this).find('option[value="' + value + '"]').attr("selected", "selected")
})

$("#filter-month").change(function() {
  var value = $(this).val()
  $(this).find('option[selected="selected"]').attr("selected", false)
  $(this).find('option[value="' + value + '"]').attr("selected", "selected")
})

// Prevent negative numbers in the amount input
function isNumberKey(e){
  if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 45 && e.keyCode < 58)
      || e.keyCode == 8)) {
        return false;
    }
}