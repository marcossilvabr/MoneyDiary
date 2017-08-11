$(document).ready(function() {
    var everything = $('#example').DataTable({
        ajax: {
            url: '/cashflowData'
        },
        "dom": 'rtip',
        "order": [[0, "desc"]],
        "iDisplayLength": 50,
        "columns": [
            { "data": "date" },
            { "data": "amount" },
            { "data": "category" },
            { "data": "note" },
            ],


        initComplete: function () {
            this.api().columns(0).every( function () {
                var column = this;
                var select = $("#filter-year").on( 'change', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val());
                    var valMonth = $.fn.dataTable.util.escapeRegex(
                            $("#filter-month").val());
                    var valCat = $.fn.dataTable.util.escapeRegex(
                            $("#filter-category").val());
                    $('#example').DataTable().search( val + "/" +valMonth+ "/ " + valCat ).draw();
                })
            })
            this.api().columns(0).every( function () {
                var column = this;
                var select = $("#filter-month").on( 'change', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val());
                    var valYear = $.fn.dataTable.util.escapeRegex(
                            $("#filter-year").val());
                    var valCat = $.fn.dataTable.util.escapeRegex(
                            $("#filter-category").val());
                    $('#example').DataTable().search( valYear + "/" +val+ "/ " + valCat ).draw();
                })
            })
            this.api().columns(2).every( function () {
                var column = this;
                var select = $("#filter-category").on( 'change', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val());
                    var valYear = $.fn.dataTable.util.escapeRegex(
                            $("#filter-year").val());
                    var valMonth = $.fn.dataTable.util.escapeRegex(
                            $("#filter-month").val());
                    $('#example').DataTable().search( valYear + "/" +valMonth+ "/ " + val ).draw();
                })
            })
        },

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
            total = api
                .column( 1 )
                .data()
                .reduce( function (a, b) {
                return intVal(a) + intVal(b);
            }, 0 );

            // Total over this page
            pageTotal = api
                .column( 1, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
            }, 0 );

            // Update footer
            $( api.column( 1 ).footer() ).html(
                '$'+pageTotal +' ( $'+ total +' total)'
            );

            $("#wallet-balance .append").html( '$' + pageTotal );
        }

    }).search($("#filter-year").val() + "/" + $("#filter-month").val() + "/");

    $('#example tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
        console.log(this)
    }
    else {
        everything.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        console.log(this)
        }
    } );

    // $('#button-delete').on( 'click', function () {

    // } );

})





    // $('#example tbody').on( 'click', 'tr', function () {
    //     if ( $(this).hasClass('selected') ) {
    //         $(this).removeClass('selected');
    //     }
    //     else {
    //         table.$('tr.selected').removeClass('selected');
    //         $(this).addClass('selected');
    //     }
    // } );

    // $('#button').click( function () {
    //     table.row('.selected').remove().draw( false );
    // } );
