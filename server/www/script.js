$(function() {
  // Fetch the trends from the server
  $.get('api/trends')
    .done(function(data) {
      data.forEach(addTrendToTable);

      if (data.length === 0) {
        populateSampleData();
      }
    })
    .fail(errorHandler);

  // Wire-up the "start a new trend" form
  $('#new-trend').on('submit', function(event) {
    event.preventDefault();
    createTrend({
      name: $('#name').val(),
      from: parseInt($('#from').val()),
      to: parseInt($('#to').val()),
    });
  });

  // Wire-up the "delete" buttons
  $('#trends').on('click', '.btn-danger', function() {
    deleteTrend($(this).data('trend'));
  });

  // Populate the API with sample trends
  function populateSampleData() {
    $.get('api/sample-data.json')
      .done(function(data) {
        data.forEach(createTrend);
      })
      .fail(errorHandler);
  }

  // Call the API to create a new trend
  function createTrend(trend) {
    $.post('api/trends', trend)
      .done(function() {
        setTimeout(function() {
          location.reload();
        }, 500);
      })
      .fail(errorHandler)
  }

  // Call the API to delete a trend
  function deleteTrend(trend) {
    $.ajax({ type: "DELETE", url: 'api/trends/' + encodeURIComponent(trend.name) })
      .done(function() {
        location.reload();
      })
      .fail(errorHandler)
  }

  // Add the given trend to the <table>
  function addTrendToTable(trend) {
    $('#loading').remove();
    $('#trends').append($('<tr>')
      .append($('<td></td>').text(trend.name))
      .append($('<td></td>').text(trend.from))
      .append($('<td></td>').text(trend.to))
      .append($('<td align="right"></td>')
        .append($('<button type="button" class="btn btn-danger btn-sm">Delete</button>')
          .data('trend', trend)
        )
      )
    );
  }

  // HTTP error handler
  function errorHandler(req) {
    console.log(req);
    var err = req.responseJSON || {error: req.status, message: req.responseText || req.statusText};
    alert('HTTP ' + err.error + ' Error ' + req.statusText + ':\n\n' + err.message);
  }
});
