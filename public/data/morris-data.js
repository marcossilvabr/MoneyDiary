// $(document).ready(function() {
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
                if ( index != data.length-1 ) {

                  // If the current element has the same month as the last element:
                  if ( month == currentMonth ) {
                    runningTotal += Number(element['amount'])

                  // If the element has a new month from the last one:
                  } else {
                    let monthData = { date   : currentMonth,
                                      amount : runningTotal }

                    monthlyTotal.push(monthData)

                    runningTotal = 0
                    runningTotal += Number(element['amount'])

                    currentMonth = month
                  }

                // If the element is the last one in the array:
                } else {
                  runningTotal += Number(element['amount'])
                  let monthData = { date   : currentMonth,
                                    amount : runningTotal }

                  monthlyTotal.push(monthData)
                }
              })

              month = monthlyTotal
              console.log(month[0].amount)

              new Morris.Bar({
                  element: 'morris-bar-chart',
                  data: [
                     { y: 'Jan', a: month[0].amount},
                     { y: 'Feb', a: month[0].amount},
                     { y: 'Mar', a: month[0].amount},
                     { y: 'Apr', a: month[0].amount},
                     { y: 'May', a: month[0].amount},
                     { y: 'Jun', a: month[0].amount},
                     { y: 'Jul', a: month[0].amount},
                     { y: 'Sep', a: month[0].amount},
                     { y: 'Oct', a: month[0].amount},
                     { y: 'Nov', a: month[0].amount},
                     { y: 'Dez', a: month[0].amount}
                  ],
                  xkey: 'y',
                  ykeys: ['a'],
                  labels: ['Series A']
                  });

            }getTotalByMonth(data)
         }
      })
   }call()
// })

