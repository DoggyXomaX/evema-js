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
