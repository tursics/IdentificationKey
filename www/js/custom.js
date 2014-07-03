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
			$( '#pageLoadJSON').data( 'data-id', 1);
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

	$.mobile.loading( 'show', {
		text: 'Bin gleich fertig',
		textVisible: true,
		theme: 'b',
		textonly: false,
		html: ''});

	// http://offene-naturfuehrer.de/web/Attribut:Exchange_4_URI
	// var url = 'https://b-content.com/projects/davinci/compress_Haeufige_Voegel_in_Gaerten_und_Siedlungen.json';
	// var url = 'http://offene-naturfuehrer.de/w/media/MobileKey/Haeufige_Voegel_in_Gaerten_und_Siedlungen/Haeufige_Voegel_in_Gaerten_und_Siedlungen.json';
	// var url = 'http://offene-naturfuehrer.de/w/media/MobileKey/Amphibien_und_Reptilien/Amphibien_und_Reptilien.json';
	// var url = 'http://offene-naturfuehrer.de/w/media/MobileKey/Bestimmungshilfe_fuer_holzige_Pflanzen_in_Deutschland_(KeyToNature)/Bestimmungshilfe_fuer_holzige_Pflanzen_in_Deutschland_(KeyToNature).json';
	// var url = 'http://offene-naturfuehrer.de/w/media/MobileKey/Testschluessel/Testschluessel.json';
	var url = 'data/compress_Haeufige_Voegel_in_Gaerten_und_Siedlungen.json';

	$.getJSON( url, function( data) {
		$.mobile.loading( 'hide');
		try {
			txt = '';

			var id = $( '#pageLoadJSON').data( 'data-id');
			var decision = $( '#pageLoadJSON').data( 'data-decision');

			if( typeof id === 'undefined') {
				id = 1;
			}

			txt += '<header>';
			txt += '<h1>Vögel in Gärten und Siedlungen <small id="log">';
//			txt += '<a href="?x" id="start">start</a>';
//			txt += '<a id="next" style="float:right;margin-right:30px" href="?id=<? ';
//			txt += 'if(isset($_GET['id'])) echo nextId($_GET['id']);
//			txt += 'else echo nextId(getFirst ()) ?>">next</a>';
			txt += '</small></h1>';
			txt += '</header>';

			txt += '<div id="wrapper">';
			txt += '<div id="main">';
			if( typeof id === 'undefined') {
				txt += showall( getFirst());
			} else {
				txt += showall( id);
			}
			txt += '</div>';
			txt += '</div>';

			txt += '<footer>';
			txt += '<a href="?x" id="startbottom">start</a> ';
			txt += '<a id="nextbottom" href="?id=';
			if( typeof id === 'undefined') {
				txt += nextId( getFirst());
			} else {
				txt += nextId( id);
			}
			txt += '">(zum Testen. next) </a>';
			txt += '<small>';
			if( typeof decision === 'undefined') {
			} else {
				txt += decision;
			}
			txt += '</small>';
			txt += '</footer>';

			txt += JSON.stringify( data);

			$( '#pageLoadJSONContent').html( txt);
			$( '#pageLoadJSONContent').trigger( 'create');
			$( '#pageLoadJSONContent').trigger( 'updatelayout');
		} catch( e) {
			alert( e);
		}
	}, function() {
		$.mobile.loading( 'hide');

		txt = 'Oh Mist. Es ist ein Fehler aufgetreten.';

		$( '#pageLoadJSONContent').html( txt);
		$( '#pageLoadJSONContent').trigger( 'create');
		$( '#pageLoadJSONContent').trigger( 'updatelayout');
	});
});

// -----------------------------------------------------------------------------

$( document).on( "pagehide", "#pageLoadJSON", function()
{
	$( '#pageLoadJSONContent').html( '');
	$( '#pageLoadJSONContent').trigger( 'create');
	$( '#pageLoadJSONContent').trigger( 'updatelayout');
});

// -----------------------------------------------------------------------------
