const Evema = {
  Core: {},
  Modules: {},
};

const PREDEFINED_MODULES = ["Tools", "Generator", "Power", "Grid", "ContextMenu", "Schema"];

Evema.OnIndexLoad = function() {
  Evema.Init();
};

Evema.Init = function() {
  console.log('Initializing modules');
  const queue = PREDEFINED_MODULES;
  const queueLength = queue.length;
  for (let i = 0; i < queueLength; i++) {
    console.log(`Initializing "${queue[ i ]}"...`);
    this.Eval(`${queue[ i ]}:Init`);
  }
  console.log('Initializing complete');
};

Evema.Has = function(module_name) {
  return Evema.Modules[module_name] !== undefined;
};

Evema.Eval = function(action_query, params) {
  const path = action_query.split(':');
  if (path.length !== 2) {
    console.warn(`Unknown action type "${action_query}"`);
    return;
  }

  const module_name = path[0];
  const module = module_name === '@' ? this : this.Modules[module_name];
  if (module === undefined) {
    console.warn(`Module "${module_name}" not found`);
    return;
  }

  const actions = module.Actions;
  if (actions === undefined) {
    console.warn(`Module "${module_name}" has no actions`);
    return;
  }

  const action_name = path[1];
  if (actions[action_name] === undefined) {
    console.warn(`Unknown "${module_name}" action "${action_name}"`);
    return;
  }

  module.Actions[action_name](params);
};

Evema.Set = function(option_query, value) {
  const path = option_query.split(':');
  if (path.length !== 2) {
    console.warn(`Unknown option type "${option_query}"`);
    return;
  }

  const module_name = path[0];
  const module = module_name === '@' ? this : this.Modules[module_name];
  if (module === undefined) {
    console.warn(`Module "${module_name}" not found`);
    return;
  }

  const options = module.Options;
  if (options === undefined) {
    console.warn(`Module "${module_name}" has no options`);
    return;
  }

  const option_name = path[1];
  if (options.Setters && options.Setters[option_name] !== undefined) {
    options.Setters[option_name](module, value);
  } else {
    options.Current[option_name] = value;
  }
};

Evema.Get = function(option_query) {
  const path = option_query.split(':');
  if (path.length !== 2) {
    console.warn(`Unknown option type "${option_query}"`);
    return;
  }
  
  const module_name = path[0];
  const module = module_name === '@' ? this : this.Modules[module_name];

  if (module === undefined) {
    console.warn(`Module "${module_name}" not found`);
    return;
  }

  const options = module.Options;
  if (options === undefined) {
    console.warn(`Module "${module_name}" has no options`);
    return;
  }

  const option_name = path[1];
  if (options.Getters && options.Getters[option_name] !== undefined) {
    return options.Getters[option_name](module);
  }

  const value = options.Current[option_name];
  return value !== undefined ? value : options.Standard[option_name];
};

Evema.EvalLocal = function(module, name, params) {
  if (module && module.Actions && module.Actions[name] !== undefined) module.Actions[name](params);
};

Evema.SetLocal = function(module, name, value) {
  if (!module || !module.Options) return;
  const options = module.Options;
  if (options.Setters && options.Setters[name] !== undefined) {
    options.Setters[name](module, value);
  } else {
    options.Current[name] = value;
  }
};

Evema.GetLocal = function(module, name) {
  if (!module || !module.Options) return;
  const options = module.Options;
  if (options.Getters && options.Getters[name] !== undefined) {
    return options.Getters[name](module);
  }
  const value = options.Current[name];
  return value !== undefined ? value : options.Standard[name];
};

Evema.Actions = {};

Evema.Options = {
  Standard: {},
  Current: {}
};

window.onload = Evema.OnIndexLoad;

Evema.Modules[ "Tools" ] = ( function() {

const Tools = {
  List: [
    { class: 'file-tool',      func: "Evema.Eval('Tools:File')"      },
    { class: 'element-tool',   func: "Evema.Eval('Tools:Element')"   },
    { class: 'power-tool',     func: "Evema.Eval('Tools:Power')"     },
    { class: 'generator-tool', func: "Evema.Eval('Tools:Generator')" },
    { class: 'about-tool',     func: "Evema.Eval('Tools:About')"     },
    { class: 'options-tool',   func: "Evema.Eval('Tools:Options')"   },
    { class: 'exit-tool',      func: "Evema.Eval('Tools:Exit')"      }
  ]
};

Tools.Init = function() {
  console.log('Tools.Init', this);
  const that = Tools;

  const panel = $( '.tools' )[ 0 ];
  Evema.SetLocal( that, 'Panel', panel );

  const listLength = that.List.length;
  const buttons = {
    'tools__show': $( '.tools__show' ).attr( 'onclick', 
      "Evema.Eval('Tools:ShowPanel')" 
    )[ 0 ],
    'tools__hide': $( '.tools__hide' ).attr( 'onclick', 
      "Evema.Eval('Tools:HidePanel')" 
    )[ 0 ]
  };

  for ( let i = 0; i < listLength; i++ ) {
    panel.appendChild( document.createElement( 'HR' ) );

    const button = document.createElement( 'BUTTON' );
    $( button )
      .addClass( 'tools__button' )
      .addClass( that.List[ i ].class )
      .attr( 'onclick', that.List[ i ].func );

    buttons[ that.List[ i ].class ] = button;
    panel.appendChild( button );
  }

  Evema.SetLocal( that, 'Buttons', buttons );
};

Tools.HidePanel = function() {
  const that = Tools;

  const panel = Evema.GetLocal( that, 'Panel' );
  const showButton = Evema.GetLocal( that, 'Buttons' )[ 'tools__show' ];
  $( panel ).addClass( 'hidden' );
  $( showButton ).addClass( 'active' );
};

Tools.ShowPanel = function() {
  const that = Tools;

  const panel = Evema.GetLocal( that, 'Panel' );
  const showButton = Evema.GetLocal( that, 'Buttons' )[ 'tools__show' ];
  $( panel ).removeClass( 'hidden' );
  $( showButton ).removeClass( 'active' );
};

Tools.File = function() {
  console.log( "Tools.File not implemented" );
};

Tools.Element = function() {
  console.log( "Tools.Element not implemented" );
};

Tools.Power = function() {
  Evema.Eval( 'Power:Toggle' );
};

Tools.Generator = function() {
  Evema.Eval( 'Generator:Toggle' );
};

Tools.OptionsFunc = function() {
  console.log( "Tools.OptionsFunc not implemented" );
};

Tools.About = function() {
  console.log( "Tools.About not implemented" );
};

Tools.Exit = function() {
  window.close();
};

Tools.Options = {
  Standard: {
    Buttons: {},
    Panel: {}
  },
  Current: {
    
  }
};

Tools.Actions = {
  'Init'      : Tools.Init,
  'HidePanel' : Tools.HidePanel,
  'ShowPanel' : Tools.ShowPanel,
  'File'      : Tools.File,
  'Element'   : Tools.Element,
  'Power'     : Tools.Power,
  'Generator' : Tools.Generator,
  'Options'   : Tools.OptionsFunc,
  'About'     : Tools.About,
  'Exit'      : Tools.Exit
};

return Tools; } )();

Evema.Modules[ "Generator" ] = ( function() {
const Generator = {};

Generator.Button = null;

Generator.Init = function() {
  const that = Generator;

  const btn_name = 'generator-tool';
  that.Button = Evema.Get( 'Tools:Buttons' )[ btn_name ];
  if ( that.Button === undefined ) {
    console.warn( `"${btn_name}" button was not found in document` );
  }
}

Generator.Toggle = function() {
  const that = Generator;

  const value = Evema.GetLocal( that, 'Enabled' );
  Evema.SetLocal( that, 'Enabled', !value );
}

Generator.Options = {
  Standard: {
    enabled: false
  },
  Current: {},
  Setters: {
    Enabled: function( source, value ) {
      if ( value && !Evema.Get( 'Power:Enabled' ) ) return;
      Evema.SetLocal( source, 'enabled', value );
      if ( value ) {
        $( source.Button ).addClass( 'enabled' );
      } else {
        $( source.Button ).removeClass( 'enabled' );
      }
    }
  },
  Getters: {
    Enabled: function( source ) {
      return Evema.GetLocal( source, 'enabled' );
    }
  }
};

Generator.Actions = {
  'Init'   : Generator.Init,
  'Toggle' : Generator.Toggle
};

return Generator; } )();

Evema.Modules[ "Power" ] = ( function() {
const Power = {};

Power.Button = null;

Power.Init = function() {
  const that = Power;

  const btn_name = 'power-tool';
  that.Button = Evema.Get( 'Tools:Buttons' )[ btn_name ];
  if ( that.Button === undefined ) {
    console.warn( `"${btn_name}" button was not found in document` );
  }
}

Power.Toggle = function() {
  const that = Power;

  const enabled = Evema.GetLocal( that, 'Enabled' );
  Evema.SetLocal( that, 'Enabled', !enabled );
}

Power.Options = {
  Standard: {
    enabled: false
  },
  Current: {},
  Setters: {
    Enabled: function( source, value ) {
      Evema.SetLocal( source, 'enabled', value );
      if ( value ) {
        $( source.Button ).addClass( 'enabled' );
      } else {
        $( source.Button ).removeClass( 'enabled' );
        Evema.Set( 'Generator:Enabled', false );
      }
    }
  },
  Getters: {
    Enabled: function( source ) {
      return Evema.GetLocal( source, 'enabled' );
    }
  }
};

Power.Actions = {
  'Init'   : Power.Init,
  'Toggle' : Power.Toggle
};

return Power; } )();

Evema.Modules[ "Grid" ] = ( function() {
const Grid = {
  'Instance': null,
  'Context': null
};

Grid.Init = function() {
  const that = Grid;

  const instance = document.getElementById( 'e-grid' );

  if ( instance === null ) {
    console.error( 'Evema.Core.Grid.Init error' );
    console.error( 'Can\'t find element "e-grid" in document' );
    return;
  }

  that.Instance = instance;
  that.Context = instance.getContext( '2d' );

  Evema.SetLocal( that, 'Instance', that.Instance );
  Evema.SetLocal( that, 'Context', that.Context );

  that.Rebuild();
};

Grid.Rebuild = function() {
  const that = Grid;

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

Grid.Redraw = function() {
  const that = Grid;

  that.Clear();
  that.Draw();
}

Grid.Clear = function() {
  const that = Grid;

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

Grid.Draw = function() {
  const that = Grid;

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

Grid.Options = {
  Standard: {
    Instance: null,
    Context: null,
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

Grid.Actions = {
  'Init'    : Grid.Init,
  'Rebuild' : Grid.Rebuild,
  'Redraw'  : Grid.Redraw,
  'Clear'   : Grid.Clear,
  'Draw'    : Grid.Draw
};

return Grid; } )();

Evema.Modules[ "ContextMenu" ] = ( function() {
const ContextMenu = {};

ContextMenu.Instance = null;

ContextMenu.Init = function() {
  const that = ContextMenu;

  const gridInstance = Evema.Get( 'Grid:Instance' );
  if ( gridInstance === undefined ) {
    console.warn( 'No grid instance' );
    return;
  }

  window.addEventListener( 'contextmenu', function( e ) { 
    e.preventDefault();
  }, false );

  window.addEventListener( 'click', function( e ) {
    Evema.SetLocal( that, 'Visible', false );
  }, false );

  gridInstance.oncontextmenu = function( e ) {
    e.stopPropagation();
    e.preventDefault();

    // console.log( e );
    Evema.SetLocal( that, 'Position', { x: e.x, y: e.y } );
    Evema.SetLocal( that, 'Visible', true );
  }

  that.Instance = $( '.context-menu' )[ 0 ];
  that.Instance.addEventListener( 'click', function( e ) {
    e.stopPropagation();

    // console.log( 'Context menu click' );
  } );
  Evema.SetLocal( that, 'Instance', that.Instance );
}

ContextMenu.Show = function() {
  const that = ContextMenu;

  Evema.SetLocal( that, "Visible", true );
}

ContextMenu.Hide = function() {
  const that = ContextMenu;

  Evema.SetLocal( that, "Visible", false );
}

ContextMenu.OnVisible = function( source, value ) {
  if ( value ) {
    const position = Evema.GetLocal( source, 'Position' );
    source.Instance.style.left = `${position.x}px`;
    source.Instance.style.top = `${position.y}px`;
    $( source.Instance ).removeClass( 'hidden' );
  } else {
    $( source.Instance ).addClass( 'hidden' );
  }
}

ContextMenu.Actions = {
  'Init' : ContextMenu.Init,
  'Show' : ContextMenu.Show,
  'Hide' : ContextMenu.Hide
};

ContextMenu.Options = {
  Standard: {
    Instance: null,
    Visible: false,
    Position: { x: 0, y: 0 }
  },
  Current: {},
  Setters: {
    Visible: ContextMenu.OnVisible
  }
}

return ContextMenu; } )();

Evema.Modules[ "Schema" ] = ( function() {
const Schema = {}

Schema.Init = function() {

};

Schema.Actions = {
  'Init' : Schema.Init
};

Schema.Options = {
  Standard: {
    
  },
  Current: {}
};

return Schema; } )();
