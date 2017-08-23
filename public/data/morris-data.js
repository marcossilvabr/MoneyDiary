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

               function reorderList(monthlyTotal) {

                  const totalByMonth = monthlyTotal
                  let monthObject    = {}
                  let newMonthlyTotal = []

                  totalByMonth.forEach(( element ) => {

                     if ( !monthObject[element['date']] ) {
                        monthObject[element['date']] = element['amount']
                     } else {
                        monthObject[element['date']] += element['amount']
                     }

                  })

                  for ( month in monthObject ) {

                  let monthlyData = { date   : month,
                                      amount : monthObject[month] }

                  newMonthlyTotal.push(monthlyData)

                  }


                  $(function () {
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

                     month = newMonthlyTotal
                    //  console.log(newMonthlyTotal)

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

                     window.m = Morris.Bar({
                        element: 'morris-bar-chart',
                        resize: true,
                        data: [
                           { y: 'Jan', a: Jan.toFixed(2)},
                           { y: 'Feb', a: Feb.toFixed(2)},
                           { y: 'Mar', a: Mar.toFixed(2)},
                           { y: 'Apr', a: Apr.toFixed(2)},
                           { y: 'May', a: May.toFixed(2)},
                           { y: 'Jun', a: Jun.toFixed(2)},
                           { y: 'Jul', a: Jul.toFixed(2)},
                           { y: 'Aug', a: Aug.toFixed(2)},
                           { y: 'Sep', a: Sep.toFixed(2)},
                           { y: 'Oct', a: Oct.toFixed(2)},
                           { y: 'Nov', a: Nov.toFixed(2)},
                           { y: 'Dec', a: Dec.toFixed(2)}
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
                  })
               }reorderList(monthlyTotal)
            }getTotalByMonth(data)
         }
      })
   }call()
})

$(window).on("resize", function(){
      m.redraw();
   });