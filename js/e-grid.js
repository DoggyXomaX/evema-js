Evema.Grid = {};

Evema.Grid.Instance = null;

Evema.Grid.Options = {
    BackgroundColor: '#FFFFFF',
    LineColor: '#000000',
    CellWidth: 8,
    CellHeight: 8,
    Width: 100,
    Height: 60,
    Type: 'pixel'
}

Evema.Grid.Init = function() {
    let instance = document.getElementById( 'e-grid' );

    if ( instance === null ) {
        console.error( 'Evema.Grid.Init error' );
        console.error( 'Can\'t find element "e-grid" in document' );
        return;
    }

    Evema.Grid.Instance = instance;
};