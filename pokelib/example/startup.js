/*global define, Virtjs, require, angular*/

define( 'virtjs', function ( ) {

    return Virtjs;

} );

require( [

    'pokelib',
    'virtjs',

    'sources/save'

], function ( Pokelib, Virtjs, save ) {

    window.Pokelib = Pokelib;

    if ( window.localStorage.getItem( 'main.cartridge.format' ) === null ) {
        // These lines define a default save file for every session. It's not the best way, but it works.
        window.localStorage.setItem( 'main.cartridge.data.ram', save );
        window.localStorage.setItem( 'main.cartridge.format', 'J{"ram":null}' );
    }

    angular.element( document ).ready( function ( ) {
        angular.bootstrap( document, [ 'application' ] );
    } );

    window.rngPlaysPokemon = ( function ( delay, distribution ) {

        if ( window.rngPlaysPokemon )
            window.clearInterval( window.rngPlaysPokemon );

        var input = null;

        var randomValue;
        var randomBuffer = new Uint32Array( 1 );

        var makeRandom = function ( ) {
            window.crypto.getRandomValues( randomBuffer );
            randomValue = randomBuffer[ 0 ] / 0xFFFFFFFF;
        };

        var checkRandom = function ( step ) {

            if ( randomValue === null )
                return false;

            randomValue -= step;

            if ( randomValue > 0 )
                return false;

            randomValue = null;
            return true;

        };

        return window.setInterval( function ( ) {

            if ( ! window.engine )
                return ;

            var keyboard = window.engine.devices.input;

            if ( input !== null )
                keyboard.emit( 'keyup', input );

            makeRandom( );

            distribution.forEach( function ( definition ) {
                if ( checkRandom( definition[ 0 ] ) )
                    input = definition[ 1 ]; } );

            keyboard.emit( 'keydown', input );

        }, delay );

    } )( 400, [

        [ 0.10, Virtjs.engine.GameBoy.A ],
        [ 0.13, Virtjs.engine.GameBoy.B ],
        [ 0.13, Virtjs.engine.GameBoy.START ],
        [ 0.13, Virtjs.engine.GameBoy.UP ],
        [ 0.16, Virtjs.engine.GameBoy.DOWN ],
        [ 0.16, Virtjs.engine.GameBoy.LEFT ],
        [ 0.16, Virtjs.engine.GameBoy.RIGHT ]

    ] );

} );
