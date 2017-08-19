$(document).ready(function() {
  function call() {
    $.ajax({
    type: "GET",
    url: "/cashflowData",
       success: function(event) {
          result = event;

          const data = result['data']

          function getTotalByMonth(data) {
            // Sets the current month to the first month available
            let currentMonth = data[0]['date'].split('/', 2)[1]
            let runningTotal = 0
            let monthlyTotal = []

            data.forEach(( element, index ) => {

              let month = element['date'].split('/', 2)[1]

              // If the element is not the last one in the array:

                // If the current element has the same month as the last element:
                if ( month == currentMonth ) {
                  runningTotal += Number(element['amount'])

                  // If the element is the last one in the data array
                  if ( index == data.length-1 ) {
                    let monthData = { date   : currentMonth,
                                      amount : runningTotal }

                    monthlyTotal.push(monthData)
                  }

                // If the element has a new month from the last one:
                } else {
                  let monthData = { date   : currentMonth,
                                    amount : runningTotal }

                  monthlyTotal.push(monthData)

                  runningTotal = 0
                  runningTotal += Number(element['amount'])
                  currentMonth = month

                  // If the element is the last one in the data array
                  if ( index == data.length-1 ) {
                    let finalData = { date   : currentMonth,
                                      amount : runningTotal }

                    monthlyTotal.push(finalData)
                  }

                }

            })

            return monthlyTotal

          }

          var Jan = Number()
          var Feb = Number()
          var Mar = Number()
          var Apr = Number()
          var May = Number()
          var Jun = Number()
          var Jul = Number()
          var Aug = Number()
          var Sep = Number()
          var Oct = Number()
          var Nov = Number()
          var Dec = Number()

          let month = getTotalByMonth(data)

          for (var i = 0; i <= 12; i++) {
            if (month[i] === undefined) {
              i++
            } else if (month[i].date == 01) {
              Jan = month[i].amount
            } else if (month[i].date == 02) {
              Feb = month[i].amount
            } else if (month[i].date == 03) {
              Mar = month[i].amount
            } else if (month[i].date == 04) {
              Apr = month[i].amount
            } else if (month[i].date == 05) {
              May = month[i].amount
            } else if (month[i].date == 06) {
              Jun = month[i].amount
            } else if (month[i].date == 07) {
              Jul = month[i].amount
            } else if (month[i].date == 08) {
              Aug = month[i].amount
            } else if (month[i].date == 09) {
              Sep = month[i].amount
            } else if (month[i].date == 10) {
              Oct = month[i].amount
            } else if (month[i].date == 11) {
              Nov = month[i].amount
            } else if (month[i].date == 12) {
              Dec = month[i].amount
            }
          }

          new Morris.Bar({
              element: 'morris-bar-chart',
              data: [
                 { y: 'Jan', a: Jan},
                 { y: 'Feb', a: Feb},
                 { y: 'Mar', a: Mar},
                 { y: 'Apr', a: Apr},
                 { y: 'May', a: May},
                 { y: 'Jun', a: Jun},
                 { y: 'Jul', a: Jul},
                 { y: 'Aug', a: Aug},
                 { y: 'Sep', a: Sep},
                 { y: 'Oct', a: Oct},
                 { y: 'Nov', a: Nov},
                 { y: 'Dec', a: Dec}
              ],
              xkey: 'y',
              ykeys: ['a'],
              labels: ['Monthly Total'],
              barColors: function(row, series, type) {
                if (series.key == 'a') {
                  if (row.y < 0) {
                    return "#f12d58";
                  } else {
                    return "#008F70";
                  }
                }
              }
          })
       }
    })
  }call()
})
