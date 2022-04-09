$(document).ready(function() {
    var showtimesData = []

    $(function() {
        $('#date-picker').datepicker();
    });

    $('#search-btn').click(function() {
        displayMovieList($('#location-picker').val(), $('#date-picker').val(), showtimesData);
    });

    fetch("http://localhost:8000/data/showtimes.json")
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
    $('#showtimes-list').empty();

    var formated_date = $.datepicker.formatDate("yy/mm/dd", new Date(date));

    data.forEach(function(item) {
        if (item.location === location && item.date === formated_date) {
            var title = $('<div class="title">' + item.title + '</div>');

            var showtimes = $('<div class="showtimes"></div>');
            item.times.forEach(function(time) {
                var time = $('<div class="showtime">' + time + '</div>')
                showtimes.append(time);
            });

            var movieShowtimes = $('<div class="movie"></div>');
            movieShowtimes.append(title, showtimes);

            $('#showtimes-list').append(movieShowtimes);
        }
    });

    $('.title').click(function() {
        var movie = data.find(movie => movie.title === $(this).text());
        displayMovie(movie.id);
    });
}

function displayMovie(id) {
    $('#section-right').empty();

    fetch(`https://www.omdbapi.com/?i=${id}&apikey=a63dabdc`)
        .then(res => res.json())
        .then(data => {
            $('#section-right').append('<img id="poster" src=' + data.Poster + '>');

            var headers = ['Title', 'Year', 'Genre', 'Runtime', 'Director', 'Writer', 'Actors'];

            var movie = $('<div id="movie"></div>');
            headers.forEach(function(header) {
                var info = $('<div class="info"></div>');

                info.append('<label class="label">' + header + ':</label>');
                info.append('<label class="content">' + data[header] + '</label>');

                movie.append(info);
            });
            
            $('#section-right').append(movie);
        });
}