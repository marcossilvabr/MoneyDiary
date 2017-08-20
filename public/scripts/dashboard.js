$(document).ready(() => {

  $(() => {
    $.ajax({
      method: 'GET',
      url   : '/cashflowData'
    }).done((data) => {

      

      $('.dashboard').append('<p>Hello</p>')

    })
  })

})
