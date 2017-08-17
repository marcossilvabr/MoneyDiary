
let result =
{
  "data": [
    {
    "DT_RowId": "599352b249baae3d64ce412e",
    "date": "2017/08/15",
    "amount": "400",
    "category": "Salary",
    "note": "blah"
    },
    {
    "DT_RowId": "59936a9e493c9a47375f7af8",
    "date": "2017/08/15",
    "amount": "-50",
    "category": "Food/Groceries",
    "note": ""
    },
    {
    "DT_RowId": "59936ab3493c9a47375f7af9",
    "date": "2017/08/15",
    "amount": "-30",
    "category": "Food/Groceries",
    "note": ""
    },
    {
    "DT_RowId": "59936abc493c9a47375f7afa",
    "date": "2017/08/15",
    "amount": "-40",
    "category": "Car",
    "note": ""
    },
    {
    "DT_RowId": "599470c49c3c255fb01cabcc",
    "date": "2017/09/01",
    "amount": "500",
    "category": "Interest",
    "note": ""
    },
    {
    "DT_RowId": "599470d79c3c255fb01cabcd",
    "date": "2017/09/02",
    "amount": "-50",
    "category": "Eating Out & Coffee",
    "note": ""
    },
    {
    "DT_RowId": "599470eb9c3c255fb01cabce",
    "date": "2017/09/08",
    "amount": "-20",
    "category": "Medical",
    "note": ""
    },
    {
    "DT_RowId": "599470eb9c3c255fb01cabce",
    "date": "2017/10/08",
    "amount": "100",
    "category": "Bonus",
    "note": ""
    },
    {
    "DT_RowId": "599470eb9c3c255fb01cabce",
    "date": "2017/10/08",
    "amount": "-20",
    "category": "Medical",
    "note": ""
    },
    {
    "DT_RowId": "599352b249baae3d64ce412e",
    "date": "2017/07/15",
    "amount": "400",
    "category": "Salary",
    "note": "new"
    },
    {
    "DT_RowId": "599352b249baae3d64ce412e",
    "date": "2017/11/15",
    "amount": "400",
    "category": "Salary",
    "note": "next new"
    },
  ]
}

// Parsing the JSON
const data = result['data']


// -> Category Total By Month <- //

function categoryTotal(data) {

  let currentMonth = data[0]['date'].split('/', 2).join('/')
  let newData      = []

  data.forEach(( element ) => {

    let month    = element['date'].split('/', 2).join('/')
    let category = element['category']
    let amount   = Number(element['amount'])

    if ( month == currentMonth ) {

      if ( newData.length == 0 ) {

        let entry = { date     : currentMonth,
                      category : element['category'],
                      amount   : element['amount'] }
        newData.push(entry)

      } else {

        newData.forEach(( element ) => {



        })

      }

    }


  })

  console.log(newData);

}

// categoryTotal(data)



// -> Monthly Total Functions <- //s

function getTotalByMonth(data) {

  // Sets the current month to the first month available
  let currentMonth = data[0]['date'].split('/', 2).join('/')
  let runningTotal = 0
  let monthlyTotal = []

  data.forEach(( element, index ) => {

    let month = element['date'].split('/', 2).join('/')

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
console.log(getTotalByMonth(data));


function highestMonth(getTotalByMonth, data) {

  let totalByMonth = getTotalByMonth(data)
  let highest = totalByMonth[0]

  totalByMonth.forEach(( element ) => {
    if (highest['amount'] < element['amount']) {
      highest = element
    }
  })

  return highest

}
// console.log(highestMonth(getTotalByMonth, data))


function lowestMonth(getTotalByMonth, data) {

  let totalByMonth = getTotalByMonth(data)
  let lowest = totalByMonth[0]

  totalByMonth.forEach(( element ) => {
    if (lowest['amount'] > element['amount']) {
      lowest = element
    }
  })

  return lowest

}
// console.log(lowestMonth(getTotalByMonth, data))


function averageOfMonths(getTotalByMonth, data) {

  let totalByMonth = getTotalByMonth(data)
  let sum = 0

  totalByMonth.forEach(( element ) => {
    sum += element['amount']
  })

  let mean = sum/totalByMonth.length

  return mean

}
// console.log(averageOfMonths(getTotalByMonth, data));
