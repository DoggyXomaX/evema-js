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

    const instance = that.Instance;
    if ( instance === null ) {
        console.warn( 'Can\'t rebuild grid, the grid instance is null!' );
        return;
    }

    const width = Evema.GetLocal( that, 'Width' );
    const height = Evema.GetLocal( that, 'Height' );
    const cellWidth = Evema.GetLocal( that, 'CellWidth' );
    const cellHeight = Evema.GetLocal( that, 'CellHeight' );

    instance.width = width * cellWidth;
    instance.height = height * cellHeight;

    that.Redraw();
}

Evema.Core.Grid.Redraw = function() {
    const that = Evema.Core.Grid;

    that.Clear();
    that.Draw();
}

Evema.Core.Grid.Clear = function() {
    const that = Evema.Core.Grid;

    const instance = that.Instance;
    if ( instance === null ) {
        console.warn( 'Can\'t clear grid, the grid instance is null!' );
        return;
    }

    const context = that.Context;
    const backgroundColor = Evema.GetLocal( that, 'BackgroundColor' );
    context.clearRect( 0, 0, instance.width, instance.height );
    document.documentElement.style.setProperty( '--grid-background-color', backgroundColor );
}

Evema.Core.Grid.Draw = function() {
    const that = Evema.Core.Grid;

    const instance = that.Instance;
    if ( instance === null ) {
        console.warn( 'Can\'t draw grid, the grid instance is null!' );
        return;
    }

    const context = that.Context;

    const type = Evema.GetLocal( that, 'Type' );
    const lineColor = Evema.GetLocal( that, 'LineColor' );
    const cw = Evema.GetLocal( that, 'CellWidth' );
    const ch = Evema.GetLocal( that, 'CellHeight' );
    const width = Evema.GetLocal( that, 'Width' );
    const height = Evema.GetLocal( that, 'Height' );
    const ox = Evema.GetLocal( that, 'OffsetX' ) % cw;
    const oy = Evema.GetLocal( that, 'OffsetY' ) % ch;

    context.fillStyle = lineColor;
    if ( type === 'pixel' ) {
        // Draw one pixel on each cell in left-top corner
        for ( let y = 0; y < height; y++ ) {
            for ( let x = 0; x < width; x++ ) {
                context.fillRect( 
                    cw * x + ox, 
                    ch * y + oy, 
                    1, 1 
                );
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
        Type: 'pixel',
        OffsetX: 0,
        OffsetY: 0
    },
    Current: {}
};

Evema.Core.Grid.Actions = {
    'Init'    : Evema.Core.Grid.Init,
    'Rebuild' : Evema.Core.Grid.Rebuild,
    'Redraw'  : Evema.Core.Grid.Redraw,
    'Clear'   : Evema.Core.Grid.Clear,
    'Draw'    : Evema.Core.Grid.Draw
};