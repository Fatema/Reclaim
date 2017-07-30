// Renew listing
$(document).on('click', '#barcode_manual', function (event) {
    event.preventDefault();
    var listingID = $(this).attr("id");

    var card = $(this).closest('.thumbnail')
    var itemName = card.find('.caption').find('h3').text()

    $('body').append(renewModal);

    $("#renew-modal").modal({backdrop: "static"})

    //fancy datetime picker
    $('#renew-modal #renew-date').bootstrapMaterialDatePicker({format: 'D MMMM, YYYY', weekStart: 0, time: false})

    $("#renew-modal").on("shown.bs.modal", function () {
        $(this).find('.item-name').html(itemName)
    }).modal('show');

    $("#renew-modal .accept-button").on('click', function () {
        var button = $(this);
        var quantity = $('#renew-modal #renew-quantity').val();
        var date = $('#renew-modal #renew-date').val();

        // Send to /items/renew-listing/
        $('#renew-modal').modal('hide');

        var url = baseURL + "/items/renew-listing";
        var data = {listingID: listingID, quantity: quantity, useByDate: date};

        $.post(url, data, function (response) {
            console.log(response);
            if (response >= 1) {
                // Do something
                // Reload the div??
                remove(card);

                if (button.attr("id") == "renewEdit") {
                    var newListingID = parseInt(response);
                    var editPageURL = baseURL + "/item/edit/" + newListingID
                    //location.href = editPageURL
                    // return;
                }
                // Add 1 to the counter for Available listings
                var availableListingsTab = $('#available-listing');
                if (!(availableListingsTab == null)) {
                    var counter = $('a[href="#available-listing"]');
                    changeSubTabCounter(counter, 1);
                }

                // Take 1 off the counter for Out of Stock listings
                var outOfStockTab = $('#out-of-stock-listing');
                if (!(outOfStockTab == null)) {
                    var counter = $('a[href="#out-of-stock-listing"]');
                    changeSubTabCounter(counter, -1);
                }


            } else {
                //displayError("Could not renew listing");
            }
        });
    });
    $('#renew-modal').on('hidden.bs.modal', function () {
        console.log("hidden");
        $('#renew-modal').remove();
        $('.dtp').remove();
    });
});

// Marking as complete
var barcodeResultModal = '<div id="barcode-modal" class="modal fade" role="dialog">' +
    '<div class="modal-dialog">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
    '</div>' +
    '<div class="modal-body">' +
    '<div class="modal-msg">Materials' +
    '<div class="materials">' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="modal-footer">' +
    '<button type="button" class="btn btn-primary" id="ok">Ok</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';
