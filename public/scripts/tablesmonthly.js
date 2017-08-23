$(document).ready(function() {
    var everything = $('#monthly').DataTable({
        ajax: {
            url: '/cashflowData/categories',
        },
        "scrollX": true,
        "scrollY": "400px",
        "paging": false,
        "scrollCollapse": true,
        "fixedColumns": true,
        "dom": 'rtip',
        "order": [[0, "desc"]],
        "iDisplayLength": 50,
        "columnDefs": [{
            "targets": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            "createdCell": function (td, cellData, rowData, row, col) {
                if (cellData < 0) {
                    $(td).addClass('negative-number')
                }
            }
        }],
        "columns": [
            { "data": "category" },
            { "data": "amount.0"},
            { "data": "amount.1" },
            { "data": "amount.2" },
            { "data": "amount.3" },
            { "data": "amount.4" },
            { "data": "amount.5" },
            { "data": "amount.6" },
            { "data": "amount.7" },
            { "data": "amount.8" },
            { "data": "amount.9" },
            { "data": "amount.10" },
            { "data": "amount.11" },
        ],

        "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;

            // Remove the formatting to get integer data for summation
            var intVal = function ( i ) {
                return typeof i === 'string' ?
                i.replace(/[\$,]/g, '')*1 :
                typeof i === 'number' ?
                i : 0;
            };

            // Total over all pages
            for (var i = 1; i <= 12; i++) {
                total = api
                    .column( i )
                    .data()
                    .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );


                // Total over this page
                pageTotal = api
                    .column( i, { page: 'current'} )
                    .data()
                    .reduce( function (a, b) {
                        return intVal(a) + intVal(b);
                }, 0 );

                // Update footer
                $( api.column( i ).footer() ).html(
                    '$'+ total.toFixed(2)
                );
            }

            $( api.column( 0 ).footer() ).html(
                'Total'
            );

        }



    });

    $('#monthly tbody')
        .on( 'mouseenter', 'td', function () {
            var colIdx = everything.cell(this).index().column;

            $( everything.cells().nodes() ).removeClass( 'highlight' );
            $( everything.rows().nodes() ).removeClass( 'odd' );
            $( everything.column( colIdx ).nodes() ).addClass( 'highlight' );
    })

})