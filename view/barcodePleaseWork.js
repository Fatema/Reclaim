// Marking as complete
var barcodeResultModal = '<div id="barcode-modal" class="modal fade" role="dialog">' +
    '<div class="modal-dialog">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
    '</div>' +
    '<div class="modal-body">' +
    '<div class="modal-msg">This item contains' +
    '<div class="content">' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="modal-footer">' +
    '<button type="button" class="btn btn-primary" id="ok">Ok</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

$(function() {
    $('#submit').on('click', function(event) {
        var data = $('#barcodeNum').val();
        $.get('http://localhost:8080/api/barcode',{barcodeID:data},function(res){
            console.log(res);
        })
    });

    $('#scan').on('click', function(event){
        event.preventDefault()
        var formdata = new FormData($('#barcodeForm')[0]);
        formdata.append('file', $('#cameraInput').prop('files')[0]);
        $.ajax({
            url: 'http:/localhost:8888/barcode.php',
            data: formdata,
            cache: false,
            contentType: false,
            processData: false,
            type: 'GET',
            success: function (res) {
                console.log(res);
                console.log('success')
            }
        })
    })
})