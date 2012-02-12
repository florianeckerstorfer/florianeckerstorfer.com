$(document).ready(function() {
	$.getJSON('/instagram.php', function(data) {
		$('#instagram').popover({
			placement: 'top',
			title: 'Latest Photo',
			content: function() {
				var date = new Date(data.data[0].created_time*1000);
				return '<img src="' + data.data[0].images.low_resolution.url + '" width="306px" height="306px"></p><p>'
					+ data.data[0].caption.text
					+ ' <small><em>' + prettyDate(date.toString("yyyy-MM-ddTHH:mm:ssZ")) + '</em></small>';
			},
			delay: { show: 0, hide: 0 }
		});
	});

	$.getJSON('/miso.php', function(data) {
		$('#miso').popover({
			placement: 'top',
			title: 'Latest Episode Watched',
			content: function() {
				var episode = data[0].checkin;
				return '<img src="' + episode.episode_poster_url + '" style="text-align:center;width:100%"></p><p><strong>'
					+ episode.media_title + '</strong> '
					+ episode.episode_label + ' <em>' + episode.episode_title + '</em>'
					+ ' <small><em>' + prettyDate(episode.created_at) + '</em></small>';
			}
		});
	});

	$.getJSON('/twitter.php', function(data) {
		$('#twitter').popover({
			placement: 'top',
			title: 'Latest Tweet',
			content: function () {
				var date = Date.parse(data[0].created_at);
				return data[0].text + ' <small><em>' + prettyDate(date.toString('yyyy-MM-ddTHH:mm:ssZ')) + '</em></small>';
			}
		});
	});

	$.getJSON('/lastfm.php', function(data) {
		$('#lastfm').popover({
			placement: 'top',
			title: 'Latest Song',
			content: function() {
				var track = data.recenttracks.track[0];
				if (track['@attr'] && track['@attr'].nowplaying === 'true') {
					var date = Date.parse('now');
				}
				else {
					var date = Date.parse(track.date['#text']);
				}

				var image = '';
				if (track.image && track.image[1] && track.image[1]['#text']) {
					image = '<img src="' + track.image[1]['#text'] + '" style="float:left;margin:0 8px 8px 0;">';
				}
				return '<span style="clear:left;">' + image + '<strong>' + track.artist['#text'] + '</strong> - ' + track.name
					+ '<br><small><em>' + prettyDate(date.toString('yyyy-MM-ddTHH:mm:ssZ')) + '</em></small></span>';
			}
		});
	});

});