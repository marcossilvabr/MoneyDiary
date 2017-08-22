$(document).ready(function() {
    var everything = $('#monthly').DataTable({
        ajax: {
            url: '/test.json',
        },
        "dom": 'rtip',
        "order": [[0, "desc"]],
        "iDisplayLength": 50,
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
    });
})