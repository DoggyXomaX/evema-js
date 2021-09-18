Evema.Grid = {};

Evema.Grid.Instance = null;
Evema.Grid.Context = null;

// TODO: Move grid-options to global options
Evema.Grid.Options = {
    Standard: {
        BackgroundColor: '#D3D1BB',
        LineColor: '#000000',
        CellWidth: 8,
        CellHeight: 8,
        Width: 100,
        Height: 60,
        Type: 'pixel'
    },
    Current: {}
};

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
    let width = ( options.Current.Width ? options.Current.Width : options.Standard.Width );
    let height = ( options.Current.Height ? options.Current.Height : options.Standard.Height );
    let cellWidth = ( options.Current.CellWidth ? options.Current.CellWidth : options.Standard.CellWidth );
    let cellHeight = ( options.Current.CellHeight ? options.Current.CellHeight : options.Standard.CellHeight );
    instance.width = width * cellWidth;
    instance.height = height * cellHeight;

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
    let backgroundColor = ( options.Current.BackgroundColor ? options.Current.BackgroundColor : options.Standard.BackgroundColor );
    context.fillStyle = backgroundColor;
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
    let lineColor = ( options.Current.LineColor ? options.Current.LineColor : options.Standard.LineColor );
    context.fillStyle = lineColor;

    let cw = ( options.Current.CellWidth ? options.Current.CellWidth : options.Standard.CellWidth );
    let ch = ( options.Current.CellHeight ? options.Current.CellHeight : options.Standard.CellHeight );
    let width = ( options.Current.Width ? options.Current.Width : options.Standard.Width );
    let height = ( options.Current.Height ? options.Current.Height : options.Standard.Height );
    let type = ( options.Current.Type ? options.Current.Type : options.Standard.Type );

    if ( type === 'pixel' ) {
        // Draw one pixel on each cell in left-top corner
        for ( let y = 0; y < height; y++ ) {
            for ( let x = 0; x < width; x++ ) {
                context.fillRect( cw * x, ch * y, 1, 1 );
            }
        }
    } else {
        console.warn( `Unknown draw type "${type}"` );
    }
}