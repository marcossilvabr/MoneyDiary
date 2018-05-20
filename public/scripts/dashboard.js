$(document).ready(() => {

  $(() => {
    $.ajax({
      method: 'GET',
      url   : '/cashflowData'
    }).done((result) => {

      const data = result['data']


      // -> Data Functions <-//

      function getTotalByMonth(data) {
        console.log(data)

        let currentMonth = data[0]['date'].split('/', 2).join('/')
        let runningTotal = 0
        let monthlyTotal = []
        let monthObject    = {}
        let newMonthlyTotal = []

        data.forEach(( element, index ) => {
          let month = element['date'].split('/', 2).join('/')

            if ( month == currentMonth ) {
              runningTotal += Number(element['amount'])

              if ( index == data.length-1 ) {
                let monthData = { date   : currentMonth,
                                  amount : runningTotal }

                monthlyTotal.push(monthData)
              }
            } else {
              let monthData = { date   : currentMonth,
                                amount : runningTotal }

              monthlyTotal.push(monthData)

              runningTotal = 0
              runningTotal += Number(element['amount'])
              currentMonth = month

              if ( index == data.length-1 ) {
                let finalData = { date   : currentMonth,
                                  amount : runningTotal }

                monthlyTotal.push(finalData)
              }
            }
        })
        monthlyTotal.forEach(( element ) => {
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
        return newMonthlyTotal
      }


      function currentMonth(getTotalByMonth, data) {

        const totalByMonth = getTotalByMonth(data)
        const date         = new Date()
        const currentDate  = Date.parse(`${date.getFullYear()}/${date.getMonth()+1}`)
        let currentTotal   = 0

        totalByMonth.forEach(( element ) => {
          let elementDate = Date.parse( element['date'] )

          if ( elementDate === currentDate ) {
            currentTotal = element['amount']

          }
        })
        return currentTotal
      }


      function runningTotal(getTotalByMonth, data) {

        const totalByMonth = getTotalByMonth(data)
        let total          = 0

        totalByMonth.forEach(( element ) => {
          total += element['amount']
        })

        return total
      }


      function highestMonth(getTotalByMonth, data) {

        const totalByMonth = getTotalByMonth(data)
        let newTotal       = []
        let highest

        totalByMonth.forEach(( element ) => {
          const date         = new Date()
          const currentDate  = Date.parse(`${date.getFullYear()}/${date.getMonth()+1}`)
          let month = element['date'].split('/', 2).join('/')

          if ( Date.parse(month) != currentDate ) {
            newTotal.push(element)
          }

        })

        highest = newTotal[0]

        newTotal.forEach(( element ) => {
          if (highest['amount'] < element['amount']) {
            highest = element
          }
        })
        return highest
      }


      function lowestMonth(getTotalByMonth, data) {

        const totalByMonth = getTotalByMonth(data)
        let newTotal       = []
        let lowest

        totalByMonth.forEach(( element ) => {
          const date         = new Date()
          const currentDate  = Date.parse(`${date.getFullYear()}/${date.getMonth()+1}`)
          let month = element['date'].split('/', 2).join('/')

          if ( Date.parse(month) != currentDate ) {
            newTotal.push(element)
          }

        })

        lowest = newTotal[0]

        newTotal.forEach(( element ) => {
          if (lowest['amount'] > element['amount']) {
            lowest = element
          }
        })
        return lowest
      }


      function averageOfMonths(getTotalByMonth, data) {

        const totalByMonth = getTotalByMonth(data)
        let newTotal       = []
        let sum            = 0
        let mean           = 0

        totalByMonth.forEach(( element ) => {
          const date         = new Date()
          const currentDate  = Date.parse(`${date.getFullYear()}/${date.getMonth()+1}`)
          let month = element['date'].split('/', 2).join('/')

          if ( Date.parse(month) != currentDate ) {
            newTotal.push(element)
          }

        })

        newTotal.forEach(( element ) => {
          sum += element['amount']
        })

        mean = sum/totalByMonth.length

        return mean
      }


      // -> DOM Manipulation <- //

      const monthTotal          = currentMonth(getTotalByMonth, data)
      const overallCashflow     = runningTotal(getTotalByMonth, data)
      const highestCashflow     = highestMonth(getTotalByMonth, data)
      const averageMonth        = Math.round(averageOfMonths(getTotalByMonth, data))
      const lowestCashflow      = lowestMonth(getTotalByMonth, data)
      console.log('monthtotal', monthTotal)
      console.log('overallCashflow', overallCashflow)
      console.log('highestCashflow', highestCashflow)
      console.log('averageMonth', averageMonth)
      console.log('lowestCashflow', lowestCashflow)


      let monthTotalNumber      = $(`<p>$${monthTotal.toFixed(2)}</p>`)
      let overallCashflowNumber = $(`<h4>Total available: $${overallCashflow.toFixed(2)}</h4>`)
      let highestCashflowNumber = $(`<p>$${highestCashflow.amount.toFixed(2)}</p>`)
      let averageMonthNumber    = $(`<p>$${averageMonth.toFixed(2)}</p>`)
      let lowestCashflowNumber  = $(`<p>$${lowestCashflow.amount.toFixed(2)}</p>`)

      $('#current-month-panel').append(monthTotalNumber)
      $('#total-cashflow').append(overallCashflowNumber)
      $('#highest-cashflow-panel').append(highestCashflowNumber)
      $('#average-cashflow-panel').append(averageMonthNumber)
      $('#lowest-cashflow-panel').append(lowestCashflowNumber)

    })
  })

})
