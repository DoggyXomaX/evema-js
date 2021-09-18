Evema.Grid = {};

Evema.Grid.Instance = null;
Evema.Grid.Context = null;

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
    Evema.Grid.Context = instance.getContext( '2d' );

    Evema.Grid.Rebuild();
};

Evema.Grid.Rebuild = function() {
    let instance = Evema.Grid.Instance;
    if ( instance === null ) {
        console.warn( 'Can\'t rebuild grid, the grid instance is null!' );
        return;
    }

    let options = Evema.Grid.Options;
    instance.width = options.Width * options.CellWidth;
    instance.height = options.Height * options.CellHeight;

    Evema.Grid.Redraw();
}

Evema.Grid.Redraw = function() {
    let grid = Evema.Grid;
    grid.Clear();
    grid.Draw();
}

Evema.Grid.Clear = function() {
    let instance = Evema.Grid.Instance;
    if ( instance === null ) {
        console.warn( 'Can\'t clear grid, the grid instance is null!' );
        return;
    }

    let context = Evema.Grid.Context;
    let options = Evema.Grid.Options;
    context.fillStyle = options.BackgroundColor;
    context.fillRect( 0, 0, instance.width, instance.height );
}

Evema.Grid.Draw = function() {
    let instance = Evema.Grid.Instance;
    if ( instance === null ) {
        console.warn( 'Can\'t draw grid, the grid instance is null!' );
        return;
    }

    let context = Evema.Grid.Context;
    let options = Evema.Grid.Options;
    context.fillStyle = options.LineColor;
    let cw = options.CellWidth;
    let ch = options.CellHeight;

    if ( options.Type === 'pixel' ) {
        // Draw one pixel on each cell in left-top corner
        for ( let y = 0, h = options.Height; y < h; y++ ) {
            for ( let x = 0, w = options.Width; x < w; x++ ) {
                context.fillRect( cw * x, ch * y, 1, 1 );
            }
        }
    } else {
        console.warn( `Unknown draw type "${options.Type}"` );
    }
}