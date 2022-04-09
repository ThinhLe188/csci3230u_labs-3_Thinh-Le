$(document).ready(function() {
    var showtimesData = []

    $(function() {
        $("#date-picker").datepicker();
    });

    $('#search-btn').click(function() {
        displayMovieList($('#location-picker').val(), $('#date-picker').val(), showtimesData);
    });

    fetch("http://localhost:8080/data/showtimes.json")
        .then(res => res.json())
        .then(data => {
            showtimesData = data;

            var locations = [];
            for (var i = 0; i < data.length; i++) {
                locations.push(data[i].location);
            }
            locations = [...new Set(locations)];

            locations.forEach(function(item) {
                var option = $('<option>' + item + '</option>');
                $('#location-list').append(option);
            });
        });
});

function displayMovieList(location, date, data) {
    
}