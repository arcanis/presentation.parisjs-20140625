/*global define*/

define( [

    'virtjs'

], function ( Virtjs ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( pokelib ) {

            this._pokelib = pokelib;

        },

        /**
         * Calling this function will enable or disable collision detection.
         *
         * Please note that it may crash the game if the player goes beyond the borders of the map.
         */

        enableCollisions : function ( status ) {

            // Sets a NOP instead of a SCF inside CheckTilePassable
            this._pokelib.memoryHook( 0x00, 0x0C28, ! status ? 0x00 : null );

        }

    } );

} );
