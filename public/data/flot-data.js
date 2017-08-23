//Flot Line Chart
$(document).ready(function() {
})

// $('.legend').hide();
var totalCar = Number()
var totalClothes = Number()
var totalEating = Number()
var totalEducation = Number()
var totalEntertainment = Number()
var totalFood = Number()
var totalGas = Number()
var totalHoliday = Number()
var totalHome = Number()
var totalInsurance = Number()
var totalKids = Number()
var totalMedical = Number()
var totalMisc = Number()
var totalMortgage = Number()
var totalPhone = Number()
var totalTaxes = Number()

function call() {
    $.ajax({
        type: "GET",
        url: "/cashflowData",
        success: function(result) {
            fooData = result.data
            for (i = 0; i < fooData.length; i++) {
                if (fooData[i].category === "Car") {
                    totalCar += Number(fooData[i].amount)
                } else if (fooData[i].category === "Clothes & Shoes") {
                    totalClothes += Number(fooData[i].amount)
                } else if (fooData[i].category === "Eating Out & Coffee") {
                    totalEating += Number(fooData[i].amount)
                } else if (fooData[i].category === "Education") {
                    totalEducation += Number(fooData[i].amount)
                } else if (fooData[i].category === "Entertainment") {
                    totalEntertainment += Number(fooData[i].amount)
                } else if (fooData[i].category === "Food/Groceries") {
                    totalFood += Number(fooData[i].amount)
                } else if (fooData[i].category === "Gas/Transportation") {
                    totalGas += Number(fooData[i].amount)
                } else if (fooData[i].category === "Holiday") {
                    totalHoliday += Number(fooData[i].amount)
                } else if (fooData[i].category === "Home") {
                    totalHome += Number(fooData[i].amount)
                } else if (fooData[i].category === "Insurance") {
                    totalInsurance += Number(fooData[i].amount)
                } else if (fooData[i].category === "Kids") {
                    totalKids += Number(fooData[i].amount)
                } else if (fooData[i].category === "Medical") {
                    totalMedical += Number(fooData[i].amount)
                } else if (fooData[i].category === "Misc") {
                    totalMisc += Number(fooData[i].amount)
                } else if (fooData[i].category === "Mortgage/Rent") {
                    totalMortgage += Number(fooData[i].amount)
                } else if (fooData[i].category === "Phone/TV/Internet/Utilities") {
                    totalPhone += Number(fooData[i].amount)
                } else if (fooData[i].category === "Taxes") {
                    totalTaxes += Number(fooData[i].amount)
                }
            }
        },
        complete: function() {
            var data = [{
                label: "Car",
                data: totalCar
            }, {
                label: "Clothes & Shoes",
                data: totalClothes
            }, {
                label: "Eating Out & Coffee",
                data: totalEating
            }, {
                label: "Education",
                data: totalEducation
            }, {
                label: "Entertainment",
                data: totalEntertainment
            }, {
                label: "Food/Groceries",
                data: totalFood
            }, {
                label: "Gas/Transportation",
                data: totalGas
            }, {
                label: "Holiday",
                data: totalHoliday
            }, {
                label: "Home",
                data: totalHome
            }, {
                label: "Insurance",
                data: totalInsurance
            }, {
                label: "Kids",
                data: totalKids
            }, {
                label: "Medical",
                data: totalMedical
            }, {
                label: "Misc",
                data: totalMisc
            }, {
                label: "Mortgage/Rent",
                data: totalMortgage
            }, {
                label: "Phone/TV/Internet/Utilities",
                data: totalPhone
            }, {
                label: "Taxes",
                data: totalTaxes
            }];

            var plotObj = $.plot($("#flot-pie-chart"), data, {
                series: {
                    pie: {
                        innerRadius: 0.5,
                        show: true,
                    }
                },
                legend: {
                    show: true
                },


                grid: {
                    hoverable: true
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%p.2% <br>$%y.2 <br>%s", // show percentages, rounding to 2 decimal places
                    shifts: {
                        x: 20,
                        y: 0
                    },
                    defaultTheme: false,
                }
            });
        }
    })
} call()