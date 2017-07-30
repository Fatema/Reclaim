$(function() {
    $('#submit').on('click', function(event) {
        var data = $('#barcodeNum').val();
        $.get('people.bath.ac.uk/jp960/api/user/',data,function(res,err){
            console(res);
        })
    });
})