// -----------------------------------------------------------------------------
/* custom.js */
// -----------------------------------------------------------------------------

$( document).bind( 'pagebeforechange', function( e, data)
{
	if( typeof data.toPage === "string") {
		var url = $.mobile.path.parseUrl( data.toPage);
		var vars = [];
		var hash;
		var q = url.hash.split( '?')[ 1];

		if( q != undefined) {
			q = q.split( '&');
			for( var i = 0; i < q.length; ++i) {
				hash = q[ i].split( '=');
				vars.push( hash[ 1]);
				vars[ hash[ 0]] = hash[ 1];
			}
		}

		var re = /^#loadJSON/;
		if( url.hash.search(re) !== -1) {
			$( '#pageLoadJSON').data( 'data-query', vars);
			$.mobile.changePage( '#pageLoadJSON', data.options);
			e.preventDefault();
		}
	}
});

// -----------------------------------------------------------------------------

$( document).on( "pagecreate", "#pageHome", function()
{
});

// -----------------------------------------------------------------------------

$( document).on( "pageshow", "#pageHome", function()
{
		var txt = '';
		txt += '<div>Wähle:</div>';

		txt += '<ul data-role="listview" data-theme="a" data-inset="true">';
//		txt += '<li data-role="list-divider">Bestimmungsschlüssel</li>';
		txt += '<li data-icon="false"><a href="#loadJSON?key=voegel">Häufige Vögel in Gärten und Siedlungen</a></li>';
		txt += '<li data-icon="false"><a href="#loadJSON?key=amphibien">Amphibien und Reptilien</a></li>';
		txt += '<li data-icon="false"><a href="#loadJSON?key=pflanzen">Holzige Pflanzen in Deutschland</a></li>';
		txt += '</ul>';

		$( '#pageHomeContent').html( txt);
		$( '#pageHomeContent').trigger( 'create');
		$( '#pageHomeContent').trigger( 'updatelayout');
});

// -----------------------------------------------------------------------------

$( document).on( "pageshow", "#pageLoadJSON", function()
{
	var data = $( '#pageLoadJSON').data( 'data-query');
	var txt = '';

	txt += 'Lade ' + data + '...';

	$( '#pageLoadJSONContent').html( txt);
	$( '#pageLoadJSONContent').trigger( 'create');
	$( '#pageLoadJSONContent').trigger( 'updatelayout');
});

// -----------------------------------------------------------------------------

$( document).on( "pagehide", "#pageLoadJSON", function()
{
	$( '#pageLoadJSONContent').html( '');
	$( '#pageLoadJSONContent').trigger( 'create');
	$( '#pageLoadJSONContent').trigger( 'updatelayout');
});

// -----------------------------------------------------------------------------
