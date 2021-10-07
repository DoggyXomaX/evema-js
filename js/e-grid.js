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
    let that = Evema.Grid;

    let instance = document.getElementById( 'e-grid' );

    if ( instance === null ) {
        console.error( 'Evema.Grid.Init error' );
        console.error( 'Can\'t find element "e-grid" in document' );
        return;
    }

    that.Instance = instance;
    that.Context = instance.getContext( '2d' );

    that.Rebuild();
};

Evema.Grid.Rebuild = function() {
    let that = Evema.Grid;

    let instance = that.Instance;
    if ( instance === null ) {
        console.warn( 'Can\'t rebuild grid, the grid instance is null!' );
        return;
    }

    let options = that.Options;
    let width = ( options.Current.Width ? options.Current.Width : options.Standard.Width );
    let height = ( options.Current.Height ? options.Current.Height : options.Standard.Height );
    let cellWidth = ( options.Current.CellWidth ? options.Current.CellWidth : options.Standard.CellWidth );
    let cellHeight = ( options.Current.CellHeight ? options.Current.CellHeight : options.Standard.CellHeight );
    instance.width = width * cellWidth;
    instance.height = height * cellHeight;

    that.Redraw();
}

Evema.Grid.Redraw = function() {
    let that = Evema.Grid;

    that.Clear();
    that.Draw();
}

Evema.Grid.Clear = function() {
    let that = Evema.Grid;

    let instance = that.Instance;
    if ( instance === null ) {
        console.warn( 'Can\'t clear grid, the grid instance is null!' );
        return;
    }

    let context = that.Context;
    let options = that.Options;
    let backgroundColor = ( options.Current.BackgroundColor ? options.Current.BackgroundColor : options.Standard.BackgroundColor );
    context.clearRect( 0, 0, instance.width, instance.height );
    document.documentElement.style.setProperty( '--grid-background-color', backgroundColor );
}

Evema.Grid.Draw = function() {
    let that = Evema.Grid;

    let instance = that.Instance;
    if ( instance === null ) {
        console.warn( 'Can\'t draw grid, the grid instance is null!' );
        return;
    }

    let context = that.Context;
    let options = that.Options;
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

Evema.Grid.Actions = [
    { name: 'Init', func: Evema.Grid.Init },
    { name: 'Rebuild', func: Evema.Grid.Rebuild },
    { name: 'Redraw', func: Evema.Grid.Redraw },
    { name: 'Clear', func: Evema.Grid.Clear },
    { name: 'Draw', func: Evema.Grid.Draw }
]