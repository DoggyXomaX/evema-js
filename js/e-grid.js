Evema.Core.Grid = {};

Evema.Core.Grid.Instance = null;
Evema.Core.Grid.Context = null;

Evema.Core.Grid.Init = function() {
    const that = Evema.Core.Grid;

    const instance = document.getElementById( 'e-grid' );

    if ( instance === null ) {
        console.error( 'Evema.Core.Grid.Init error' );
        console.error( 'Can\'t find element "e-grid" in document' );
        return;
    }

    that.Instance = instance;
    that.Context = instance.getContext( '2d' );

    that.Rebuild();
};

Evema.Core.Grid.Rebuild = function() {
    const that = Evema.Core.Grid;

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

Evema.Core.Grid.Redraw = function() {
    let that = Evema.Core.Grid;

    that.Clear();
    that.Draw();
}

Evema.Core.Grid.Clear = function() {
    let that = Evema.Core.Grid;

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

Evema.Core.Grid.Draw = function() {
    let that = Evema.Core.Grid;

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

// TODO: Move grid-options to global options
Evema.Core.Grid.Options = {
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

Evema.Core.Grid.Actions = [
    { name: 'Init', func: Evema.Core.Grid.Init },
    { name: 'Rebuild', func: Evema.Core.Grid.Rebuild },
    { name: 'Redraw', func: Evema.Core.Grid.Redraw },
    { name: 'Clear', func: Evema.Core.Grid.Clear },
    { name: 'Draw', func: Evema.Core.Grid.Draw }
];