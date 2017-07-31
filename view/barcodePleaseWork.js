// Marking as complete
var barcodeResultModal = '<div id="barcode-modal" class="modal fade" role="dialog">' +
    '<div class="modal-dialog">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
    '</div>' +
    '<div class="modal-body">' +
    '<div class="center"><div class="recycle-logo"></div></div>'+
    '<div class="modal-msg">This item contains' +
    '<div class="content">' +
    '<table class="table table-striped table-hover ">\n' +
    '        <thead>\n' +
    '        <tr>\n' +
    '            <th>#</th>\n' +
    '            <th>Component</th>\n' +
    '            <th>Material</th>\n' +
    '<th>Recycable</th>\n'+
    '        </tr>\n' +
    '        </thead>\n' +
    '        <tbody>\n' +
    '        <tr>\n' +
    '            <td>1</td>\n' +
    '            <td>Plate</td>\n' +
    '            <td>Plastic</td>\n' +
    '            <td>Yes</td>\n' +
    '        </tr>' +
    '<tr>\n' +
    '            <td>2</td>\n' +
    '            <td>Wrapper</td>\n' +
    '            <td>Plastic</td>\n' +
    '            <td>No</td>\n' +
    '        </tr>'+
    '</table>'+
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="modal-footer">' +
    '<button type="button" class="btn btn-primary" id="ok">Ok</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

var barcodeNoResultModal = '<div id="no-barcode-modal" class="modal fade" role="dialog">' +
    '<div class="modal-dialog">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
    '</div>' +
    '<div class="modal-body">' +
    '<div class="modal-msg">' +
    '<div class="content">' +
    'No results found' +
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
        if (data === '0123456789012') {
            $('body').append(barcodeResultModal);

            $("#barcode-modal").modal({backdrop: "static"})
            $("#barcode-modal #ok").on('click', function () {
                $('#barcode-modal').modal('hide');
            });
            $('#barcode-modal').on('hidden.bs.modal', function () {
                console.log("hidden");
                $('#barcode-modal').remove();
            });
        } else {
            $('body').append(barcodeNoResultModal);

            $("#no-barcode-modal").modal({backdrop: "static"});
            $("#no-barcode-modal #ok").on('click', function () {
                $('#no-barcode-modal').modal('hide');
            });
            $('#no-barcode-modal').on('hidden.bs.modal', function () {
                console.log("hidden");
                $('#no-barcode-modal').remove();
            });
        }
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