// -----------------------------------------------------------------------------
/* custom.js */
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
		txt += '<li data-icon="false"><a href="#pageCopyright">Häufige Vögel in Gärten und Siedlungen</a></li>';
		txt += '<li data-icon="false"><a href="#pageCopyright">Amphibien und Reptilien</a></li>';
		txt += '<li data-icon="false"><a href="#pageCopyright">Holzige Pflanzen in Deutschland</a></li>';
		txt += '</ul>';

		$( '#pageHomeContent').html( txt);
		$( '#pageHomeContent').trigger( 'create');
		$( '#pageHomeContent').trigger( 'updatelayout');
});

// -----------------------------------------------------------------------------
