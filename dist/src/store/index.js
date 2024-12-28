var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../iares/dist/src/index.js
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var CreateApp = /* @__PURE__ */ __name2(() => {
  let _element;
  const setup = /* @__PURE__ */ __name2((callback) => {
    _element = callback();
    return callback();
  }, "setup");
  const mount = /* @__PURE__ */ __name2((callback) => {
    return callback(_element);
  }, "mount");
  const unmount = /* @__PURE__ */ __name2((callback) => {
    return callback(_element);
  }, "unmount");
  return { setup, mount, unmount };
}, "CreateApp");
var _createUUID = /* @__PURE__ */ __name2(() => Math.random().toString(36).substring(2, 11), "_createUUID");
var createState = /* @__PURE__ */ __name2((initialState) => {
  const _state = JSON.parse(JSON.stringify(initialState));
  const _watchers = /* @__PURE__ */ new Set();
  const _notifyHandlers = /* @__PURE__ */ __name2((payload) => {
    for (const stateWatcher of _watchers) {
      stateWatcher(payload);
    }
  }, "_notifyHandlers");
  const set = /* @__PURE__ */ __name2((payload) => {
    Object.assign(_state, JSON.parse(JSON.stringify(payload)));
    _notifyHandlers(JSON.parse(JSON.stringify(_state)));
  }, "set");
  const get = /* @__PURE__ */ __name2(() => {
    return JSON.parse(JSON.stringify(_state));
  }, "get");
  const watch = /* @__PURE__ */ __name2((callback) => {
    _watchers.add(callback);
  }, "watch");
  return { set, get, watch };
}, "createState");
var createChain = /* @__PURE__ */ __name2(() => {
  const _chain = /* @__PURE__ */ new Set();
  const add = /* @__PURE__ */ __name2((chainLink) => {
    _chain.add(chainLink);
  }, "add");
  const execute = /* @__PURE__ */ __name2(() => {
    for (const { action, validator } of _chain) {
      if (validator()) action();
    }
  }, "execute");
  return { add, execute };
}, "createChain");
var escapeTemplateString = /* @__PURE__ */ __name2((templateString) => {
  if (typeof templateString !== "string") return templateString;
  return templateString.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\//g, "&#x2F;");
}, "escapeTemplateString");
var bindStyleScope = /* @__PURE__ */ __name2((scopeId, strings) => {
  const regex = /(\.(\w+)(\-*|\_*)?)+\w+/gi;
  return strings.replace(regex, (values) => {
    return `.${scopeId}-${values.replace(/\./, "")}`;
  });
}, "bindStyleScope");
var createUUID = /* @__PURE__ */ __name2(() => Math.random().toString(36).slice(2, 6), "createUUID");
var HTMLEvents = [
  // Eventos de Mouse
  "onclick",
  "ondblclick",
  "onmousedown",
  "onmouseup",
  "onmouseover",
  "onmouseout",
  "onmousemove",
  "onmouseenter",
  "onmouseleave",
  "oncontextmenu",
  // Eventos de Teclado
  "onkeydown",
  "onkeyup",
  "onkeypress",
  // Eventos de Foco
  "onfocus",
  "onblur",
  // Eventos de Formulário
  "onsubmit",
  "onchange",
  "oninput",
  "onreset",
  "oninvalid",
  // Eventos de Mídia
  "onplay",
  "onpause",
  "onended",
  "onvolumechange",
  // Eventos de Toque (Touch) - para dispositivos móveis
  "ontouchstart",
  "ontouchmove",
  "ontouchend",
  "ontouchcancel",
  // Eventos de Animação e Transição
  "onanimationstart",
  "onanimationend",
  "onanimationiteration",
  "ontransitionend",
  // Eventos de Outros Interativos
  "onload",
  "onerror",
  "onresize",
  "onscroll"
];
var isObject = /* @__PURE__ */ __name2((payload) => () => {
  return !!payload && !Array.isArray(payload) && typeof payload === "object";
}, "isObject");
var isArray = /* @__PURE__ */ __name2((payload) => () => {
  return !!payload && Array.isArray(payload);
}, "isArray");
var isFunction = /* @__PURE__ */ __name2((payload) => () => {
  return !!payload && typeof payload === "function";
}, "isFunction");
var isString = /* @__PURE__ */ __name2((payload) => () => {
  return typeof payload === "string";
}, "isString");
var isEventName = /* @__PURE__ */ __name2((payload) => () => {
  if (typeof payload !== "string") return false;
  return HTMLEvents.includes(payload.toLowerCase());
}, "isEventName");
var isTemplateData = /* @__PURE__ */ __name2((payload) => () => {
  return typeof payload === "string" || typeof payload === "number";
}, "isTemplateData");
var renderTemplateObject = /* @__PURE__ */ __name2((template, contextElement, state2 = {}) => () => {
  const _chain = createChain();
  _chain.add({
    validator: isString(template.type),
    action: createElementByTagName(template, contextElement, state2)
  });
  _chain.add({
    validator: isFunction(template.type),
    action: createElementByFactoryName(template, contextElement, state2)
  });
  _chain.execute();
}, "renderTemplateObject");
var renderTemplateArray = /* @__PURE__ */ __name2((templateSchema, contextElement, state2 = {}) => () => {
  for (const template of templateSchema) {
    render(template, contextElement, state2);
  }
}, "renderTemplateArray");
var renderChildren = /* @__PURE__ */ __name2((children, parentElement, state2 = {}) => {
  parentElement.innerHTML = "";
  if (!Array.isArray(children) && typeof children === "object") {
    render(children, parentElement, state2);
    return;
  }
  for (const child of children) {
    render(child, parentElement, state2);
  }
}, "renderChildren");
var n = /* @__PURE__ */ __name2(function(t2, s, r, e) {
  var u;
  s[0] = 0;
  for (var h = 1; h < s.length; h++) {
    var p = s[h++], a = s[h] ? (s[0] |= p ? 1 : 2, r[s[h++]]) : s[++h];
    3 === p ? e[0] = a : 4 === p ? e[1] = Object.assign(e[1] || {}, a) : 5 === p ? (e[1] = e[1] || {})[s[++h]] = a : 6 === p ? e[1][s[++h]] += a + "" : p ? (u = t2.apply(a, n(t2, a, r, ["", null])), e.push(u), a[0] ? s[0] |= 2 : (s[h - 2] = 0, s[h] = u)) : e.push(a);
  }
  return e;
}, "n"), t = /* @__PURE__ */ new Map();
function htm_module_default(s) {
  var r = t.get(this);
  return r || (r = /* @__PURE__ */ new Map(), t.set(this, r)), (r = n(this, r.get(s) || (r.set(s, r = function(n2) {
    for (var t2, s2, r2 = 1, e = "", u = "", h = [0], p = function(n3) {
      1 === r2 && (n3 || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h.push(0, n3, e) : 3 === r2 && (n3 || e) ? (h.push(3, n3, e), r2 = 2) : 2 === r2 && "..." === e && n3 ? h.push(4, n3, 0) : 2 === r2 && e && !n3 ? h.push(5, 0, true, e) : r2 >= 5 && ((e || !n3 && 5 === r2) && (h.push(r2, 0, e, s2), r2 = 6), n3 && (h.push(r2, n3, 0, s2), r2 = 6)), e = "";
    }, a = 0; a < n2.length; a++) {
      a && (1 === r2 && p(), p(a));
      for (var l = 0; l < n2[a].length; l++) t2 = n2[a][l], 1 === r2 ? "<" === t2 ? (p(), h = [h], r2 = 3) : e += t2 : 4 === r2 ? "--" === e && ">" === t2 ? (r2 = 1, e = "") : e = t2 + e[0] : u ? t2 === u ? u = "" : e += t2 : '"' === t2 || "'" === t2 ? u = t2 : ">" === t2 ? (p(), r2 = 1) : r2 && ("=" === t2 ? (r2 = 5, s2 = e, e = "") : "/" === t2 && (r2 < 5 || ">" === n2[a][l + 1]) ? (p(), 3 === r2 && (h = h[0]), r2 = h, (h = h[0]).push(2, 0, r2), r2 = 0) : " " === t2 || "	" === t2 || "\n" === t2 || "\r" === t2 ? (p(), r2 = 2) : e += t2), 3 === r2 && "!--" === e && (r2 = 4, h = h[0]);
    }
    return p(), h;
  }(s)), r), arguments, [])).length > 1 ? r : r[0];
}
__name(htm_module_default, "htm_module_default");
__name2(htm_module_default, "default");
var hypertext = /* @__PURE__ */ __name2((type, props, ...children) => {
  return { type, props, children };
}, "hypertext");
var html = htm_module_default.bind(hypertext);
var createHash = /* @__PURE__ */ __name2((text, selector) => {
  let hash = 5381;
  for (let i = 0; i < text.length; i++) {
    hash = hash * 33 ^ text.charCodeAt(i);
  }
  return `${selector}-${(hash >>> 0).toString(36)}`;
}, "createHash");
var styleElementCache = /* @__PURE__ */ new Map();
var createStyleElement = /* @__PURE__ */ __name2((componentId) => {
  const styleElement = styleElementCache.get(componentId);
  if (styleElement !== void 0) {
    return styleElement;
  }
  const style = document.createElement("style");
  style.setAttribute("data-component", componentId);
  document.head.appendChild(style);
  styleElementCache.set(componentId, style);
  return style;
}, "createStyleElement");
var wrapLooseRulesOutsideMediaQuery = /* @__PURE__ */ __name2(({
  style,
  selector
}) => {
  const lines = style.split("\n");
  const ruleRegex = /^\s*([\w-]+)\s*:\s*[^;]+;/;
  const initialState = {
    insideBlock: 0,
    globalRules: "",
    result: ""
  };
  const processGlobalRules = /* @__PURE__ */ __name2((globalRules2, result2, selector2) => ({
    globalRules: "",
    result: `${result2}${selector2} {
${globalRules2}}

`
  }), "processGlobalRules");
  const processRegularLine = /* @__PURE__ */ __name2((line, result2) => ({
    globalRules: "",
    result: `${result2}${line}
`
  }), "processRegularLine");
  const addGlobalRule = /* @__PURE__ */ __name2((line, globalRules2) => ({
    globalRules: `${globalRules2}${line}
`,
    result: ""
  }), "addGlobalRule");
  const countBlocks = /* @__PURE__ */ __name2((line) => {
    const openings = (line.match(/{/g) || []).length;
    const closings = (line.match(/}/g) || []).length;
    return openings - closings;
  }, "countBlocks");
  const processLine = /* @__PURE__ */ __name2((acc, line) => {
    acc.insideBlock += countBlocks(line);
    if (acc.insideBlock === 0 && ruleRegex.test(line)) {
      const { globalRules: globalRules3, result: result3 } = addGlobalRule(line, acc.globalRules);
      return { ...acc, globalRules: globalRules3, result: acc.result + result3 };
    }
    if (acc.globalRules) {
      const { globalRules: globalRules3, result: result3 } = processGlobalRules(
        acc.globalRules,
        acc.result,
        selector
      );
      const processedLine = processRegularLine(line, "");
      return {
        ...acc,
        globalRules: globalRules3,
        result: result3 + processedLine.result
      };
    }
    const { globalRules: globalRules2, result: result2 } = processRegularLine(line, acc.result);
    return { ...acc, globalRules: globalRules2, result: result2 };
  }, "processLine");
  const { result, globalRules } = lines.reduce(processLine, initialState);
  return globalRules ? `${result}${selector} {
${globalRules}}
`.trim() : result.trim();
}, "wrapLooseRulesOutsideMediaQuery");
var wrapLooseRulesInsideMediaQuery = /* @__PURE__ */ __name2(({
  style,
  selector
}) => {
  const regex = /@media\s*([^{]+)\s*\{([\s\S]*?)\}/g;
  const ruleRegex = /^\s*([\w-]+)\s*:\s*[^;]+;/;
  return style.replace(regex, (match, mediaQuery, innerCss) => {
    const rules = innerCss.trim().split("\n").map((line) => line.trim()).filter((line) => line);
    const wrappedRules = rules.filter((rule) => ruleRegex.test(rule)).map((rule) => `${selector} {
${rule.trim()}
}`).join("\n");
    return `@media ${mediaQuery.trim()} {
${wrappedRules}
}`;
  });
}, "wrapLooseRulesInsideMediaQuery");
var applyClassNameScope = /* @__PURE__ */ __name2(({ style, selector }) => {
  const regex = /\.(\w+)/g;
  return style.replace(regex, `.${selector}_$1`);
}, "applyClassNameScope");
var transformStyle = /* @__PURE__ */ __name2((rawStyle, selector) => {
  let style = rawStyle;
  const className = `.${selector}`;
  style = applyClassNameScope({ style, selector });
  style = wrapLooseRulesOutsideMediaQuery({ style, selector: className });
  style = wrapLooseRulesInsideMediaQuery({ style, selector: className });
  return style;
}, "transformStyle");
var cssCache = /* @__PURE__ */ new Map();
var css = /* @__PURE__ */ __name2((selector, handler = () => {
}) => (strings, ...interpolations) => {
  const rawCSS = strings.reduce(
    (accumulator, str, index) => `${accumulator}${str}${interpolations[index] !== void 0 ? interpolations[index] : ""}`,
    ""
  );
  const cachedClassName = cssCache.get(rawCSS);
  if (cachedClassName !== void 0) {
    return cachedClassName;
  }
  const hashId = createHash(rawCSS, selector);
  const scopedStyle = transformStyle(rawCSS, `${hashId}`);
  const styleElement = createStyleElement(`${hashId}`);
  handler({ hashId, scopedStyle, styleElement });
  if (!styleElement.innerHTML.includes(scopedStyle)) {
    styleElement.innerHTML += scopedStyle;
  }
  cssCache.set(rawCSS, hashId);
  return hashId;
}, "css");
var setElementAttributes = /* @__PURE__ */ __name2((element, attributes) => {
  const attributeKeys = attributes ? Object.keys(attributes) : [];
  for (const key of attributeKeys) {
    if (!isEventName(key)()) {
      element.setAttribute(key, attributes[key]);
    } else {
      const eventName = key.replace(/on/, "").toLowerCase();
      const eventHandler = attributes[key];
      element.addEventListener(eventName, eventHandler);
    }
  }
  return element;
}, "setElementAttributes");
var _attributes = {};
var _createTagByFactoryName = /* @__PURE__ */ __name2((factory) => {
  return factory.name.split(/(?=[A-Z])/).join("-").toLowerCase();
}, "_createTagByFactoryName");
var _createUseState = /* @__PURE__ */ __name2((state2) => {
  const currentState = {};
  const useState = /* @__PURE__ */ __name2((initialState) => {
    const latestState = state2.get();
    state2.set({ ...initialState, ...latestState });
    Object.assign(currentState, state2.get());
    return { get: state2.get, set: state2.set, watch: state2.watch };
  }, "useState");
  return { currentState, useState };
}, "_createUseState");
var _createUseStyle = /* @__PURE__ */ __name2(({ props, state: state2, css: css2 }) => {
  const stylesheet = {};
  const useStyle = /* @__PURE__ */ __name2((cssHandlerFactory) => {
    const handlers = cssHandlerFactory();
    const styles = {};
    for (const key in handlers) {
      const handler = handlers[key];
      const style = handler({ props, state: state2, css: css2 });
      styles[key] = style;
    }
    Object.assign(stylesheet, styles);
    return styles;
  }, "useStyle");
  return { styles: stylesheet, useStyle };
}, "_createUseStyle");
var _createUseTemplate = /* @__PURE__ */ __name2((params) => {
  const useTemplate = /* @__PURE__ */ __name2((templateHandler, templateInjections) => {
    return templateHandler(params, templateInjections);
  }, "useTemplate");
  return useTemplate;
}, "_createUseTemplate");
var _createUseAction = /* @__PURE__ */ __name2(({ props, state: state2 }) => {
  const actions2 = {};
  const useAction = /* @__PURE__ */ __name2((actionHandlerFactory) => {
    const handlerActions = actionHandlerFactory({ props, state: state2 });
    Object.assign(actions2, handlerActions);
  }, "useAction");
  return { actions: actions2, useAction };
}, "_createUseAction");
var createElementByFactoryName = /* @__PURE__ */ __name2((template, parentElement, latestState = {}) => {
  return () => {
    const factory = template.type;
    const tagName = _createTagByFactoryName(factory);
    const selector = tagName.toLowerCase();
    const element = document.createElement(tagName);
    const props = template.props;
    const latestDeepState = JSON.parse(JSON.stringify(latestState));
    const stateManager = createState(latestDeepState);
    const { currentState: state2, useState } = _createUseState(stateManager);
    const styled = css(selector, ({ hashId }) => {
      element.classList.add(hashId);
      Object.assign(_attributes, { class: hashId });
    });
    const { styles, useStyle } = _createUseStyle({ props, state: state2, css: styled });
    const { actions: actions2, useAction } = _createUseAction({
      props,
      state: stateManager
    });
    const useTemplate = _createUseTemplate({
      props,
      state: state2,
      html,
      jsx: html,
      tsx: html,
      styles,
      actions: actions2
    });
    const children = factory({
      props,
      useState,
      useStyle,
      useTemplate,
      useAction
    });
    const oldElement = parentElement.querySelector(selector);
    setElementAttributes(element, _attributes);
    oldElement ? oldElement.replaceWith(element) : parentElement.insertAdjacentElement("beforeend", element);
    renderChildren(children, element, state2);
    stateManager.watch((payload) => {
      element.innerHTML = "";
      render(template, parentElement, payload);
    });
  };
}, "createElementByFactoryName");
var createElementByTagName = /* @__PURE__ */ __name2((template, parentElement, state2 = {}) => () => {
  const tagName = template.type;
  const selector = tagName.toLowerCase();
  const element = document.createElement(tagName);
  const hashId = parentElement.getAttribute("class");
  const className = template?.props?.class;
  if (className) {
    if (!className.includes(hashId)) {
      const newClassName = `${hashId}_${className}`;
      setElementAttributes(element, { class: newClassName });
      parentElement.insertAdjacentElement("beforeend", element);
      renderChildren(template.children, element, state2);
      return;
    }
  }
  setElementAttributes(element, template.props);
  parentElement.insertAdjacentElement("beforeend", element);
  renderChildren(template.children, element, state2);
}, "createElementByTagName");
var renderTemplateData = /* @__PURE__ */ __name2((templateData, element, state2 = {}) => () => {
  if (typeof templateData === "string") {
    element.insertAdjacentHTML("beforeend", templateData);
  }
  if (typeof templateData === "number") {
    const data = Number(templateData);
    const value = data.toString();
    element.insertAdjacentHTML("beforeend", value);
  }
}, "renderTemplateData");
var render = /* @__PURE__ */ __name2((template, context = document.body, state2 = {}) => {
  const chain = createChain();
  const componentElement = context || document.querySelector("body");
  chain.add({
    validator: isArray(template),
    action: renderTemplateArray(
      template,
      componentElement,
      state2
    )
  });
  chain.add({
    validator: isObject(template),
    action: renderTemplateObject(
      template,
      componentElement,
      state2
    )
  });
  chain.add({
    validator: isTemplateData(template),
    action: renderTemplateData(template, componentElement, state2)
  });
  chain.execute();
  return componentElement;
}, "render");
var router = /* @__PURE__ */ __name2(({ routes, context }) => {
  const _routes = routes;
  let _routerElement;
  const execute = /* @__PURE__ */ __name2((validator, callback, error) => {
    if (validator()) return callback({ isValid: validator() });
    if (error) {
      const erro = new Error(error().message);
      erro.name = error().name;
      throw erro;
    }
  }, "execute");
  const _bindListeners = /* @__PURE__ */ __name2(() => {
    window.addEventListener("hashchange", () => {
      _mountRouteByHash(null);
    });
  }, "_bindListeners");
  const _setRouterElement = /* @__PURE__ */ __name2(() => {
    const routerElement = context?.querySelector("router-view");
    execute(
      () => !!routerElement,
      () => {
        _routerElement = routerElement;
        return _routerElement;
      },
      () => ({
        name: "Router Error",
        message: "Router element (router-view) is not defined and must be."
      })
    );
  }, "_setRouterElement");
  const _loadMainRoute = /* @__PURE__ */ __name2(() => {
    const mainRoute = _getMainRoute();
    execute(
      () => !!mainRoute?.start,
      () => mainRoute?.start && navigate(mainRoute.start),
      () => ({
        name: "Router Error",
        message: "Start router is not defined and must be."
      })
    );
  }, "_loadMainRoute");
  const _getMainRoute = /* @__PURE__ */ __name2(() => _routes.find((route) => !!route?.start), "_getMainRoute");
  const _getRouteByHash = /* @__PURE__ */ __name2((hash) => {
    return _routes.find((route) => route.regex.test(hash));
  }, "_getRouteByHash");
  const _getRouteDefault = /* @__PURE__ */ __name2(() => _routes.find((route) => route?.default), "_getRouteDefault");
  const _mountRouteByHash = /* @__PURE__ */ __name2(async (hash) => {
    const hashValue = hash || window.location.hash || "";
    const route = _getRouteByHash(hashValue) || _getRouteDefault();
    _routerElement.innerHTML = "";
    route?.mount({ context: _routerElement });
  }, "_mountRouteByHash");
  const _getHash = /* @__PURE__ */ __name2(() => window.location.hash || null, "_getHash");
  const _hasActiveRoute = /* @__PURE__ */ __name2(() => !!_getHash(), "_hasActiveRoute");
  const navigate = /* @__PURE__ */ __name2((path) => {
    window.location.hash = path;
  }, "navigate");
  const init = /* @__PURE__ */ __name2(() => {
    _bindListeners();
    _setRouterElement();
    _hasActiveRoute() ? _mountRouteByHash(_getHash()) : _loadMainRoute();
  }, "init");
  return { init, navigate };
}, "router");

// src/frontend/store/state.ts
var state = createState({
  round: {
    playerName: "",
    score: 0
  },
  record: {
    playerName: "",
    score: 0
  },
  running: false
});

// src/frontend/store/actions.ts
var getState = /* @__PURE__ */ __name(() => state.get(), "getState");
var updateScore = /* @__PURE__ */ __name(() => {
  const { round } = state.get();
  const score = round.score + 1;
  state.set({ ...state.get(), round: { ...round, score } });
}, "updateScore");
var updateRecord = /* @__PURE__ */ __name(() => {
  const { round, record } = state.get();
  if (record.score > round.score) return;
  state.set({ ...state.get(), record: round });
}, "updateRecord");
var toggleStatus = /* @__PURE__ */ __name(() => {
  const { running } = state.get();
  state.set({ ...state.get(), running: !running });
}, "toggleStatus");

// src/frontend/store/index.ts
var actions = {
  getState,
  updateScore,
  updateRecord
};
export {
  actions,
  state
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vaWFyZXMvc3JjL0NyZWF0ZUFwcC9DcmVhdGVBcHAudHMiLCAiLi4vLi4vLi4vLi4vaWFyZXMvc3JjL3N0YXRlL2NyZWF0ZVN0YXRlLnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy9mYWN0b3JpZXMvY3JlYXRlQ2hhaW4vaW5kZXgudHMiLCAiLi4vLi4vLi4vLi4vaWFyZXMvc3JjL3V0aWxzL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy92YWxpZGF0b3JzL3RlbXBsYXRlL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlT2JqZWN0LnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlQXJyYXkudHMiLCAiLi4vLi4vLi4vLi4vaWFyZXMvc3JjL2FjdGlvbnMvdGVtcGxhdGUvcmVuZGVyQ2hpbGRyZW4udHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2h0bUAzLjEuMS9ub2RlX21vZHVsZXMvaHRtL2Rpc3QvaHRtLm1vZHVsZS5qcyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvdGVtcGxhdGUvaHRtbC50cyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvc3R5bGUvY3JlYXRlSGFzaC50cyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvc3R5bGUvY3JlYXRlU3R5bGVFbGVtZW50LnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy9zdHlsZS9jc3NQYXJzZXIudHMiLCAiLi4vLi4vLi4vLi4vaWFyZXMvc3JjL3N0eWxlL2Nzcy50cyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9zZXRFbGVtZW50QXR0cmlidXRlcy50cyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9jcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZS50cyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9jcmVhdGVFbGVtZW50QnlUYWdOYW1lLnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlRGF0YS50cyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvcmVuZGVyL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy9yb3V0ZXIvcm91dGVyLnRzIiwgIi4uLy4uLy4uL3NyYy9mcm9udGVuZC9zdG9yZS9zdGF0ZS50cyIsICIuLi8uLi8uLi9zcmMvZnJvbnRlbmQvc3RvcmUvYWN0aW9ucy50cyIsICIuLi8uLi8uLi9zcmMvZnJvbnRlbmQvc3RvcmUvaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB0eXBlIHtcbiAgQXBwbGljYXRpb24sXG4gIENvbnRleHRFbGVtZW50LFxuICBDb250ZXh0SGFuZGxlcixcbiAgQ2FsbGJhY2tIYW5kbGVyLFxufSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgQ3JlYXRlQXBwID0gKCk6IEFwcGxpY2F0aW9uID0+IHtcbiAgbGV0IF9lbGVtZW50ITogQ29udGV4dEVsZW1lbnQ7XG5cbiAgY29uc3Qgc2V0dXAgPSAoY2FsbGJhY2s6IENvbnRleHRIYW5kbGVyKSA9PiB7XG4gICAgX2VsZW1lbnQgPSBjYWxsYmFjaygpO1xuICAgIHJldHVybiBjYWxsYmFjaygpO1xuICB9O1xuXG4gIGNvbnN0IG1vdW50ID0gKGNhbGxiYWNrOiBDYWxsYmFja0hhbmRsZXIpID0+IHtcbiAgICByZXR1cm4gY2FsbGJhY2soX2VsZW1lbnQpO1xuICB9O1xuXG4gIGNvbnN0IHVubW91bnQgPSAoY2FsbGJhY2s6IENhbGxiYWNrSGFuZGxlcikgPT4ge1xuICAgIHJldHVybiBjYWxsYmFjayhfZWxlbWVudCk7XG4gIH07XG5cbiAgcmV0dXJuIHsgc2V0dXAsIG1vdW50LCB1bm1vdW50IH07XG59O1xuIiwgImltcG9ydCB0eXBlIHsgU3RhdGVXYXRjaGVyLCBTdGF0ZSwgU3RhdGVNYW5hZ2VyIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgX2NyZWF0ZVVVSUQgPSAoKTogc3RyaW5nID0+IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyLCAxMSk7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTdGF0ZSA9IDxTID0gdW5rbm93bj4oXG4gIGluaXRpYWxTdGF0ZTogU3RhdGU8Uz4sXG4pOiBTdGF0ZU1hbmFnZXI8Uz4gPT4ge1xuICBjb25zdCBfc3RhdGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGluaXRpYWxTdGF0ZSkpO1xuICBjb25zdCBfd2F0Y2hlcnMgPSBuZXcgU2V0PFN0YXRlV2F0Y2hlcjxTPj4oKTtcblxuICBjb25zdCBfbm90aWZ5SGFuZGxlcnMgPSAocGF5bG9hZDogU3RhdGU8Uz4pID0+IHtcbiAgICBmb3IgKGNvbnN0IHN0YXRlV2F0Y2hlciBvZiBfd2F0Y2hlcnMpIHtcbiAgICAgIHN0YXRlV2F0Y2hlcihwYXlsb2FkKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2V0ID0gKHBheWxvYWQ6IFN0YXRlPFM+KSA9PiB7XG4gICAgT2JqZWN0LmFzc2lnbihfc3RhdGUsIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpKTtcbiAgICBfbm90aWZ5SGFuZGxlcnMoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShfc3RhdGUpKSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0ID0gKCk6IFN0YXRlPFM+ID0+IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShfc3RhdGUpKTtcbiAgfTtcblxuICBjb25zdCB3YXRjaCA9IChjYWxsYmFjazogU3RhdGVXYXRjaGVyPFM+KSA9PiB7XG4gICAgX3dhdGNoZXJzLmFkZChjYWxsYmFjayk7XG4gIH07XG5cbiAgcmV0dXJuIHsgc2V0LCBnZXQsIHdhdGNoIH07XG59O1xuIiwgImltcG9ydCB0eXBlIHsgQ2hhaW5MaW5rIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNoYWluID0gKCkgPT4ge1xuICBjb25zdCBfY2hhaW4gPSBuZXcgU2V0PENoYWluTGluazx1bmtub3duPj4oKTtcblxuICBjb25zdCBhZGQgPSA8VD4oY2hhaW5MaW5rOiBDaGFpbkxpbms8VD4pID0+IHtcbiAgICBfY2hhaW4uYWRkKGNoYWluTGluayk7XG4gIH07XG5cbiAgY29uc3QgZXhlY3V0ZSA9ICgpID0+IHtcbiAgICBmb3IgKGNvbnN0IHsgYWN0aW9uLCB2YWxpZGF0b3IgfSBvZiBfY2hhaW4pIHtcbiAgICAgIGlmICh2YWxpZGF0b3IoKSkgYWN0aW9uKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGFkZCwgZXhlY3V0ZSB9O1xufTtcbiIsICJleHBvcnQgY29uc3QgZXNjYXBlVGVtcGxhdGVTdHJpbmcgPSAodGVtcGxhdGVTdHJpbmc6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICh0eXBlb2YgdGVtcGxhdGVTdHJpbmcgIT09IFwic3RyaW5nXCIpIHJldHVybiB0ZW1wbGF0ZVN0cmluZztcbiAgcmV0dXJuIHRlbXBsYXRlU3RyaW5nXG4gICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxuICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxuICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxuICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxuICAgIC5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIilcbiAgICAucmVwbGFjZSgvXFwvL2csIFwiJiN4MkY7XCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGJpbmRTdHlsZVNjb3BlID0gKHNjb3BlSWQ6IHN0cmluZywgc3RyaW5nczogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcmVnZXggPSAvKFxcLihcXHcrKShcXC0qfFxcXyopPykrXFx3Ky9naTtcbiAgcmV0dXJuIHN0cmluZ3MucmVwbGFjZShyZWdleCwgKHZhbHVlcykgPT4ge1xuICAgIHJldHVybiBgLiR7c2NvcGVJZH0tJHt2YWx1ZXMucmVwbGFjZSgvXFwuLywgXCJcIil9YDtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlVVVJRCA9ICgpID0+IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsIDYpO1xuXG5leHBvcnQgY29uc3QgSFRNTEV2ZW50cyA9IFtcbiAgLy8gRXZlbnRvcyBkZSBNb3VzZVxuICBcIm9uY2xpY2tcIixcbiAgXCJvbmRibGNsaWNrXCIsXG4gIFwib25tb3VzZWRvd25cIixcbiAgXCJvbm1vdXNldXBcIixcbiAgXCJvbm1vdXNlb3ZlclwiLFxuICBcIm9ubW91c2VvdXRcIixcbiAgXCJvbm1vdXNlbW92ZVwiLFxuICBcIm9ubW91c2VlbnRlclwiLFxuICBcIm9ubW91c2VsZWF2ZVwiLFxuICBcIm9uY29udGV4dG1lbnVcIixcblxuICAvLyBFdmVudG9zIGRlIFRlY2xhZG9cbiAgXCJvbmtleWRvd25cIixcbiAgXCJvbmtleXVwXCIsXG4gIFwib25rZXlwcmVzc1wiLFxuXG4gIC8vIEV2ZW50b3MgZGUgRm9jb1xuICBcIm9uZm9jdXNcIixcbiAgXCJvbmJsdXJcIixcblxuICAvLyBFdmVudG9zIGRlIEZvcm11bFx1MDBFMXJpb1xuICBcIm9uc3VibWl0XCIsXG4gIFwib25jaGFuZ2VcIixcbiAgXCJvbmlucHV0XCIsXG4gIFwib25yZXNldFwiLFxuICBcIm9uaW52YWxpZFwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgTVx1MDBFRGRpYVxuICBcIm9ucGxheVwiLFxuICBcIm9ucGF1c2VcIixcbiAgXCJvbmVuZGVkXCIsXG4gIFwib252b2x1bWVjaGFuZ2VcIixcblxuICAvLyBFdmVudG9zIGRlIFRvcXVlIChUb3VjaCkgLSBwYXJhIGRpc3Bvc2l0aXZvcyBtXHUwMEYzdmVpc1xuICBcIm9udG91Y2hzdGFydFwiLFxuICBcIm9udG91Y2htb3ZlXCIsXG4gIFwib250b3VjaGVuZFwiLFxuICBcIm9udG91Y2hjYW5jZWxcIixcblxuICAvLyBFdmVudG9zIGRlIEFuaW1hXHUwMEU3XHUwMEUzbyBlIFRyYW5zaVx1MDBFN1x1MDBFM29cbiAgXCJvbmFuaW1hdGlvbnN0YXJ0XCIsXG4gIFwib25hbmltYXRpb25lbmRcIixcbiAgXCJvbmFuaW1hdGlvbml0ZXJhdGlvblwiLFxuICBcIm9udHJhbnNpdGlvbmVuZFwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgT3V0cm9zIEludGVyYXRpdm9zXG4gIFwib25sb2FkXCIsXG4gIFwib25lcnJvclwiLFxuICBcIm9ucmVzaXplXCIsXG4gIFwib25zY3JvbGxcIixcbl07XG4iLCAiaW1wb3J0IHsgSFRNTEV2ZW50cyB9IGZyb20gXCJAL3V0aWxzXCI7XG5cbmNvbnN0IGlzT2JqZWN0ID1cbiAgPFQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuICEhcGF5bG9hZCAmJiAhQXJyYXkuaXNBcnJheShwYXlsb2FkKSAmJiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJvYmplY3RcIjtcbiAgICB9O1xuXG5jb25zdCBpc0FycmF5ID1cbiAgPFQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuICEhcGF5bG9hZCAmJiBBcnJheS5pc0FycmF5KHBheWxvYWQpO1xuICAgIH07XG5cbmNvbnN0IGlzRnVuY3Rpb24gPVxuICA8VCA9IHZvaWQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuICEhcGF5bG9hZCAmJiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJmdW5jdGlvblwiO1xuICAgIH07XG5cbmNvbnN0IGlzU3RyaW5nID1cbiAgPFQgPSB2b2lkPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJzdHJpbmdcIjtcbiAgICB9O1xuXG5jb25zdCBpc0V2ZW50TmFtZSA9XG4gIDxUID0gdm9pZD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHBheWxvYWQgIT09IFwic3RyaW5nXCIpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiBIVE1MRXZlbnRzLmluY2x1ZGVzKHBheWxvYWQudG9Mb3dlckNhc2UoKSk7XG4gICAgfTtcblxuY29uc3QgaXNUZW1wbGF0ZURhdGEgPVxuICA8VCA9IHZvaWQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBwYXlsb2FkID09PSBcIm51bWJlclwiO1xuICAgIH07XG5cbmV4cG9ydCB7IGlzT2JqZWN0LCBpc0FycmF5LCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgaXNFdmVudE5hbWUsIGlzVGVtcGxhdGVEYXRhIH07XG4iLCAiaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3R5cGVzXCI7XG5pbXBvcnQgeyBjcmVhdGVDaGFpbiB9IGZyb20gXCJAL2ZhY3Rvcmllc1wiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudEJ5RmFjdG9yeU5hbWUsIGNyZWF0ZUVsZW1lbnRCeVRhZ05hbWUgfSBmcm9tIFwiQC9hY3Rpb25zXCI7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uLCBpc1N0cmluZyB9IGZyb20gXCJAL3ZhbGlkYXRvcnNcIjtcbmltcG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyVGVtcGxhdGVPYmplY3QgPVxuICAodGVtcGxhdGU6IFRlbXBsYXRlU2NoZW1hLCBjb250ZXh0RWxlbWVudDogRWxlbWVudCwgc3RhdGU6IFN0YXRlID0ge30pID0+XG4gICAgKCk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgX2NoYWluID0gY3JlYXRlQ2hhaW4oKTtcblxuICAgICAgX2NoYWluLmFkZCh7XG4gICAgICAgIHZhbGlkYXRvcjogaXNTdHJpbmcodGVtcGxhdGUudHlwZSksXG4gICAgICAgIGFjdGlvbjogY3JlYXRlRWxlbWVudEJ5VGFnTmFtZSh0ZW1wbGF0ZSwgY29udGV4dEVsZW1lbnQsIHN0YXRlKSxcbiAgICAgIH0pO1xuXG4gICAgICBfY2hhaW4uYWRkKHtcbiAgICAgICAgdmFsaWRhdG9yOiBpc0Z1bmN0aW9uKHRlbXBsYXRlLnR5cGUpLFxuICAgICAgICBhY3Rpb246IGNyZWF0ZUVsZW1lbnRCeUZhY3RvcnlOYW1lKHRlbXBsYXRlLCBjb250ZXh0RWxlbWVudCwgc3RhdGUpLFxuICAgICAgfSk7XG5cbiAgICAgIF9jaGFpbi5leGVjdXRlKCk7XG4gICAgfTtcbiIsICJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiQC9yZW5kZXJcIjtcbmltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90eXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJUZW1wbGF0ZUFycmF5ID1cbiAgKFxuICAgIHRlbXBsYXRlU2NoZW1hOiBUZW1wbGF0ZVNjaGVtYVtdLFxuICAgIGNvbnRleHRFbGVtZW50OiBFbGVtZW50LFxuICAgIHN0YXRlOiBTdGF0ZSA9IHt9LFxuICApID0+XG4gICAgKCkgPT4ge1xuICAgICAgZm9yIChjb25zdCB0ZW1wbGF0ZSBvZiB0ZW1wbGF0ZVNjaGVtYSkge1xuICAgICAgICByZW5kZXIodGVtcGxhdGUsIGNvbnRleHRFbGVtZW50LCBzdGF0ZSk7XG4gICAgICB9XG4gICAgfTtcbiIsICJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiQC9yZW5kZXJcIjtcbmltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJDaGlsZHJlbiA9IChcbiAgY2hpbGRyZW46IFRlbXBsYXRlU2NoZW1hW10sXG4gIHBhcmVudEVsZW1lbnQ6IEVsZW1lbnQsXG4gIHN0YXRlOiBTdGF0ZSA9IHt9LFxuKSA9PiB7XG4gIHBhcmVudEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGNoaWxkcmVuKSAmJiB0eXBlb2YgY2hpbGRyZW4gPT09IFwib2JqZWN0XCIpIHtcbiAgICByZW5kZXIoY2hpbGRyZW4sIHBhcmVudEVsZW1lbnQsIHN0YXRlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgcmVuZGVyKGNoaWxkLCBwYXJlbnRFbGVtZW50LCBzdGF0ZSk7XG4gIH1cbn07XG4iLCAidmFyIG49ZnVuY3Rpb24odCxzLHIsZSl7dmFyIHU7c1swXT0wO2Zvcih2YXIgaD0xO2g8cy5sZW5ndGg7aCsrKXt2YXIgcD1zW2grK10sYT1zW2hdPyhzWzBdfD1wPzE6MixyW3NbaCsrXV0pOnNbKytoXTszPT09cD9lWzBdPWE6ND09PXA/ZVsxXT1PYmplY3QuYXNzaWduKGVbMV18fHt9LGEpOjU9PT1wPyhlWzFdPWVbMV18fHt9KVtzWysraF1dPWE6Nj09PXA/ZVsxXVtzWysraF1dKz1hK1wiXCI6cD8odT10LmFwcGx5KGEsbih0LGEscixbXCJcIixudWxsXSkpLGUucHVzaCh1KSxhWzBdP3NbMF18PTI6KHNbaC0yXT0wLHNbaF09dSkpOmUucHVzaChhKX1yZXR1cm4gZX0sdD1uZXcgTWFwO2V4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHMpe3ZhciByPXQuZ2V0KHRoaXMpO3JldHVybiByfHwocj1uZXcgTWFwLHQuc2V0KHRoaXMscikpLChyPW4odGhpcyxyLmdldChzKXx8KHIuc2V0KHMscj1mdW5jdGlvbihuKXtmb3IodmFyIHQscyxyPTEsZT1cIlwiLHU9XCJcIixoPVswXSxwPWZ1bmN0aW9uKG4pezE9PT1yJiYobnx8KGU9ZS5yZXBsYWNlKC9eXFxzKlxcblxccyp8XFxzKlxcblxccyokL2csXCJcIikpKT9oLnB1c2goMCxuLGUpOjM9PT1yJiYobnx8ZSk/KGgucHVzaCgzLG4sZSkscj0yKToyPT09ciYmXCIuLi5cIj09PWUmJm4/aC5wdXNoKDQsbiwwKToyPT09ciYmZSYmIW4/aC5wdXNoKDUsMCwhMCxlKTpyPj01JiYoKGV8fCFuJiY1PT09cikmJihoLnB1c2gociwwLGUscykscj02KSxuJiYoaC5wdXNoKHIsbiwwLHMpLHI9NikpLGU9XCJcIn0sYT0wO2E8bi5sZW5ndGg7YSsrKXthJiYoMT09PXImJnAoKSxwKGEpKTtmb3IodmFyIGw9MDtsPG5bYV0ubGVuZ3RoO2wrKyl0PW5bYV1bbF0sMT09PXI/XCI8XCI9PT10PyhwKCksaD1baF0scj0zKTplKz10OjQ9PT1yP1wiLS1cIj09PWUmJlwiPlwiPT09dD8ocj0xLGU9XCJcIik6ZT10K2VbMF06dT90PT09dT91PVwiXCI6ZSs9dDonXCInPT09dHx8XCInXCI9PT10P3U9dDpcIj5cIj09PXQ/KHAoKSxyPTEpOnImJihcIj1cIj09PXQ/KHI9NSxzPWUsZT1cIlwiKTpcIi9cIj09PXQmJihyPDV8fFwiPlwiPT09blthXVtsKzFdKT8ocCgpLDM9PT1yJiYoaD1oWzBdKSxyPWgsKGg9aFswXSkucHVzaCgyLDAscikscj0wKTpcIiBcIj09PXR8fFwiXFx0XCI9PT10fHxcIlxcblwiPT09dHx8XCJcXHJcIj09PXQ/KHAoKSxyPTIpOmUrPXQpLDM9PT1yJiZcIiEtLVwiPT09ZSYmKHI9NCxoPWhbMF0pfXJldHVybiBwKCksaH0ocykpLHIpLGFyZ3VtZW50cyxbXSkpLmxlbmd0aD4xP3I6clswXX1cbiIsICJpbXBvcnQgaHRtIGZyb20gXCJodG1cIjtcbmltcG9ydCB0eXBlIHsgVGFnZ2VkVGVtcGxhdGUsIFRlbXBsYXRlUHJvcHMsIFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgaHlwZXJ0ZXh0ID0gKFxuICB0eXBlOiB1bmtub3duLFxuICBwcm9wczogVGVtcGxhdGVQcm9wcyxcbiAgLi4uY2hpbGRyZW46IFRlbXBsYXRlU2NoZW1hW11cbikgPT4ge1xuICByZXR1cm4geyB0eXBlLCBwcm9wcywgY2hpbGRyZW4gfTtcbn07XG5cbmNvbnN0IGh0bWwgPSBodG0uYmluZDxUYWdnZWRUZW1wbGF0ZT4oaHlwZXJ0ZXh0KTtcblxuZXhwb3J0IHsgaHRtbCB9O1xuZXhwb3J0IHsgaHRtbCBhcyBqc3ggfTtcbmV4cG9ydCB7IGh0bWwgYXMgdHN4IH07XG4iLCAiLyoqXG4gKiBHZXJhIHVtIGhhc2ggXHUwMEZBbmljbyBiYXNlYWRvIG5vIGFsZ29yaXRtbyBESkIyLlxuICogQHBhcmFtIHN0ciAtIE8gY29udGVcdTAwRkFkbyBhIHBhcnRpciBkbyBxdWFsIG8gaGFzaCBzZXJcdTAwRTEgZ2VyYWRvLlxuICogQHJldHVybnMgTyBoYXNoIGdlcmFkbyBjb21vIHVtYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVIYXNoID0gKHRleHQ6IHN0cmluZywgc2VsZWN0b3I6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGxldCBoYXNoID0gNTM4MTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaGFzaCA9IChoYXNoICogMzMpIF4gdGV4dC5jaGFyQ29kZUF0KGkpO1xuICB9XG4gIHJldHVybiBgJHtzZWxlY3Rvcn0tJHsoaGFzaCA+Pj4gMCkudG9TdHJpbmcoMzYpfWA7XG59O1xuIiwgImNvbnN0IHN0eWxlRWxlbWVudENhY2hlOiBNYXA8c3RyaW5nLCBIVE1MU3R5bGVFbGVtZW50PiA9IG5ldyBNYXAoKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVN0eWxlRWxlbWVudCA9IChjb21wb25lbnRJZDogc3RyaW5nKTogSFRNTFN0eWxlRWxlbWVudCA9PiB7XG4gIGNvbnN0IHN0eWxlRWxlbWVudCA9IHN0eWxlRWxlbWVudENhY2hlLmdldChjb21wb25lbnRJZCk7XG5cbiAgaWYgKHN0eWxlRWxlbWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHN0eWxlRWxlbWVudDtcbiAgfVxuXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBzdHlsZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBvbmVudFwiLCBjb21wb25lbnRJZCk7XG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICBzdHlsZUVsZW1lbnRDYWNoZS5zZXQoY29tcG9uZW50SWQsIHN0eWxlKTtcblxuICByZXR1cm4gc3R5bGU7XG59O1xuIiwgInR5cGUgV3JhcFN0eWxlUGFyYW1zID0ge1xuICBzdHlsZTogc3RyaW5nO1xuICBzZWxlY3Rvcjogc3RyaW5nO1xufTtcblxudHlwZSBBY2N1bXVsYXRvciA9IHtcbiAgaW5zaWRlQmxvY2s6IG51bWJlcjtcbiAgZ2xvYmFsUnVsZXM6IHN0cmluZztcbiAgcmVzdWx0OiBzdHJpbmc7XG59O1xuXG50eXBlIExpbmVQcm9jZXNzaW5nID0ge1xuICBnbG9iYWxSdWxlczogc3RyaW5nO1xuICByZXN1bHQ6IHN0cmluZztcbn07XG5cbmNvbnN0IHdyYXBMb29zZVJ1bGVzT3V0c2lkZU1lZGlhUXVlcnkgPSAoe1xuICBzdHlsZSxcbiAgc2VsZWN0b3IsXG59OiBXcmFwU3R5bGVQYXJhbXMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBsaW5lcyA9IHN0eWxlLnNwbGl0KFwiXFxuXCIpO1xuICBjb25zdCBydWxlUmVnZXggPSAvXlxccyooW1xcdy1dKylcXHMqOlxccypbXjtdKzsvO1xuXG4gIGNvbnN0IGluaXRpYWxTdGF0ZTogQWNjdW11bGF0b3IgPSB7XG4gICAgaW5zaWRlQmxvY2s6IDAsXG4gICAgZ2xvYmFsUnVsZXM6IFwiXCIsXG4gICAgcmVzdWx0OiBcIlwiLFxuICB9O1xuXG4gIGNvbnN0IHByb2Nlc3NHbG9iYWxSdWxlcyA9IChcbiAgICBnbG9iYWxSdWxlczogc3RyaW5nLFxuICAgIHJlc3VsdDogc3RyaW5nLFxuICAgIHNlbGVjdG9yOiBzdHJpbmcsXG4gICk6IExpbmVQcm9jZXNzaW5nID0+ICh7XG4gICAgZ2xvYmFsUnVsZXM6IFwiXCIsXG4gICAgcmVzdWx0OiBgJHtyZXN1bHR9JHtzZWxlY3Rvcn0ge1xcbiR7Z2xvYmFsUnVsZXN9fVxcblxcbmAsXG4gIH0pO1xuXG4gIGNvbnN0IHByb2Nlc3NSZWd1bGFyTGluZSA9IChcbiAgICBsaW5lOiBzdHJpbmcsXG4gICAgcmVzdWx0OiBzdHJpbmcsXG4gICk6IExpbmVQcm9jZXNzaW5nID0+ICh7XG4gICAgZ2xvYmFsUnVsZXM6IFwiXCIsXG4gICAgcmVzdWx0OiBgJHtyZXN1bHR9JHtsaW5lfVxcbmAsXG4gIH0pO1xuXG4gIGNvbnN0IGFkZEdsb2JhbFJ1bGUgPSAoXG4gICAgbGluZTogc3RyaW5nLFxuICAgIGdsb2JhbFJ1bGVzOiBzdHJpbmcsXG4gICk6IExpbmVQcm9jZXNzaW5nID0+ICh7XG4gICAgZ2xvYmFsUnVsZXM6IGAke2dsb2JhbFJ1bGVzfSR7bGluZX1cXG5gLFxuICAgIHJlc3VsdDogXCJcIixcbiAgfSk7XG5cbiAgY29uc3QgY291bnRCbG9ja3MgPSAobGluZTogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBvcGVuaW5ncyA9IChsaW5lLm1hdGNoKC97L2cpIHx8IFtdKS5sZW5ndGg7XG4gICAgY29uc3QgY2xvc2luZ3MgPSAobGluZS5tYXRjaCgvfS9nKSB8fCBbXSkubGVuZ3RoO1xuICAgIHJldHVybiBvcGVuaW5ncyAtIGNsb3NpbmdzO1xuICB9O1xuXG4gIGNvbnN0IHByb2Nlc3NMaW5lID0gKGFjYzogQWNjdW11bGF0b3IsIGxpbmU6IHN0cmluZyk6IEFjY3VtdWxhdG9yID0+IHtcbiAgICBhY2MuaW5zaWRlQmxvY2sgKz0gY291bnRCbG9ja3MobGluZSk7XG5cbiAgICAvLyBDYXNlIDE6IExpbmUgaXMgYSBnbG9iYWwgcnVsZVxuICAgIGlmIChhY2MuaW5zaWRlQmxvY2sgPT09IDAgJiYgcnVsZVJlZ2V4LnRlc3QobGluZSkpIHtcbiAgICAgIGNvbnN0IHsgZ2xvYmFsUnVsZXMsIHJlc3VsdCB9ID0gYWRkR2xvYmFsUnVsZShsaW5lLCBhY2MuZ2xvYmFsUnVsZXMpO1xuICAgICAgcmV0dXJuIHsgLi4uYWNjLCBnbG9iYWxSdWxlcywgcmVzdWx0OiBhY2MucmVzdWx0ICsgcmVzdWx0IH07XG4gICAgfVxuXG4gICAgLy8gQ2FzZSAyOiBUaGVyZSBhcmUgYWNjdW11bGF0ZWQgZ2xvYmFsIHJ1bGVzXG4gICAgaWYgKGFjYy5nbG9iYWxSdWxlcykge1xuICAgICAgY29uc3QgeyBnbG9iYWxSdWxlcywgcmVzdWx0IH0gPSBwcm9jZXNzR2xvYmFsUnVsZXMoXG4gICAgICAgIGFjYy5nbG9iYWxSdWxlcyxcbiAgICAgICAgYWNjLnJlc3VsdCxcbiAgICAgICAgc2VsZWN0b3IsXG4gICAgICApO1xuICAgICAgY29uc3QgcHJvY2Vzc2VkTGluZSA9IHByb2Nlc3NSZWd1bGFyTGluZShsaW5lLCBcIlwiKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmFjYyxcbiAgICAgICAgZ2xvYmFsUnVsZXMsXG4gICAgICAgIHJlc3VsdDogcmVzdWx0ICsgcHJvY2Vzc2VkTGluZS5yZXN1bHQsXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIENhc2UgMzogUmVndWxhciBsaW5lXG4gICAgY29uc3QgeyBnbG9iYWxSdWxlcywgcmVzdWx0IH0gPSBwcm9jZXNzUmVndWxhckxpbmUobGluZSwgYWNjLnJlc3VsdCk7XG4gICAgcmV0dXJuIHsgLi4uYWNjLCBnbG9iYWxSdWxlcywgcmVzdWx0IH07XG4gIH07XG5cbiAgY29uc3QgeyByZXN1bHQsIGdsb2JhbFJ1bGVzIH0gPSBsaW5lcy5yZWR1Y2UocHJvY2Vzc0xpbmUsIGluaXRpYWxTdGF0ZSk7XG5cbiAgcmV0dXJuIGdsb2JhbFJ1bGVzXG4gICAgPyBgJHtyZXN1bHR9JHtzZWxlY3Rvcn0ge1xcbiR7Z2xvYmFsUnVsZXN9fVxcbmAudHJpbSgpXG4gICAgOiByZXN1bHQudHJpbSgpO1xufTtcblxuY29uc3Qgd3JhcExvb3NlUnVsZXNJbnNpZGVNZWRpYVF1ZXJ5ID0gKHtcbiAgc3R5bGUsXG4gIHNlbGVjdG9yLFxufTogV3JhcFN0eWxlUGFyYW1zKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcmVnZXggPSAvQG1lZGlhXFxzKihbXntdKylcXHMqXFx7KFtcXHNcXFNdKj8pXFx9L2c7XG4gIGNvbnN0IHJ1bGVSZWdleCA9IC9eXFxzKihbXFx3LV0rKVxccyo6XFxzKlteO10rOy87XG5cbiAgcmV0dXJuIHN0eWxlLnJlcGxhY2UocmVnZXgsIChtYXRjaCwgbWVkaWFRdWVyeSwgaW5uZXJDc3MpID0+IHtcbiAgICBjb25zdCBydWxlcyA9IGlubmVyQ3NzXG4gICAgICAudHJpbSgpXG4gICAgICAuc3BsaXQoXCJcXG5cIilcbiAgICAgIC5tYXAoKGxpbmU6IHN0cmluZykgPT4gbGluZS50cmltKCkpXG4gICAgICAuZmlsdGVyKChsaW5lOiBzdHJpbmcpID0+IGxpbmUpO1xuXG4gICAgY29uc3Qgd3JhcHBlZFJ1bGVzID0gcnVsZXNcbiAgICAgIC5maWx0ZXIoKHJ1bGU6IHN0cmluZykgPT4gcnVsZVJlZ2V4LnRlc3QocnVsZSkpXG4gICAgICAubWFwKChydWxlOiBzdHJpbmcpID0+IGAke3NlbGVjdG9yfSB7XFxuJHtydWxlLnRyaW0oKX1cXG59YClcbiAgICAgIC5qb2luKFwiXFxuXCIpO1xuXG4gICAgcmV0dXJuIGBAbWVkaWEgJHttZWRpYVF1ZXJ5LnRyaW0oKX0ge1xcbiR7d3JhcHBlZFJ1bGVzfVxcbn1gO1xuICB9KTtcbn07XG5cbmNvbnN0IGFwcGx5Q2xhc3NOYW1lU2NvcGUgPSAoeyBzdHlsZSwgc2VsZWN0b3IgfTogV3JhcFN0eWxlUGFyYW1zKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcmVnZXggPSAvXFwuKFxcdyspL2c7XG4gIHJldHVybiBzdHlsZS5yZXBsYWNlKHJlZ2V4LCBgLiR7c2VsZWN0b3J9XyQxYCk7XG59O1xuXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtU3R5bGUgPSAocmF3U3R5bGU6IHN0cmluZywgc2VsZWN0b3I6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGxldCBzdHlsZSA9IHJhd1N0eWxlO1xuICBjb25zdCBjbGFzc05hbWUgPSBgLiR7c2VsZWN0b3J9YDtcbiAgc3R5bGUgPSBhcHBseUNsYXNzTmFtZVNjb3BlKHsgc3R5bGUsIHNlbGVjdG9yIH0pO1xuICBzdHlsZSA9IHdyYXBMb29zZVJ1bGVzT3V0c2lkZU1lZGlhUXVlcnkoeyBzdHlsZSwgc2VsZWN0b3I6IGNsYXNzTmFtZSB9KTtcbiAgc3R5bGUgPSB3cmFwTG9vc2VSdWxlc0luc2lkZU1lZGlhUXVlcnkoeyBzdHlsZSwgc2VsZWN0b3I6IGNsYXNzTmFtZSB9KTtcblxuICByZXR1cm4gc3R5bGU7XG59O1xuIiwgImltcG9ydCB0eXBlIHsgVGFnZ2VkU3R5bGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgY3JlYXRlSGFzaCB9IGZyb20gXCIuL2NyZWF0ZUhhc2hcIjtcbmltcG9ydCB7IHRyYW5zZm9ybVN0eWxlIH0gZnJvbSBcIi4vY3NzUGFyc2VyXCI7XG5pbXBvcnQgeyBjcmVhdGVTdHlsZUVsZW1lbnQgfSBmcm9tIFwiLi9jcmVhdGVTdHlsZUVsZW1lbnRcIjtcblxudHlwZSBIYW5kbGVyUGFyYW1zID0ge1xuICBoYXNoSWQ6IHN0cmluZztcbiAgc2NvcGVkU3R5bGU6IHN0cmluZztcbiAgc3R5bGVFbGVtZW50OiBFbGVtZW50O1xufTtcbnR5cGUgSGFuZGxlciA9IChwYXlsb2FkOiBIYW5kbGVyUGFyYW1zKSA9PiB2b2lkO1xuXG5jb25zdCBjc3NDYWNoZTogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcblxuZXhwb3J0IGNvbnN0IGNzcyA9XG4gIChzZWxlY3Rvcjogc3RyaW5nLCBoYW5kbGVyOiBIYW5kbGVyID0gKCkgPT4ge30pOiBUYWdnZWRTdHlsZSA9PlxuICAoXG4gICAgc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXksXG4gICAgLi4uaW50ZXJwb2xhdGlvbnM6IChzdHJpbmcgfCBudW1iZXIpW11cbiAgKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCByYXdDU1MgPSBzdHJpbmdzLnJlZHVjZShcbiAgICAgIChhY2N1bXVsYXRvciwgc3RyLCBpbmRleCkgPT5cbiAgICAgICAgYCR7YWNjdW11bGF0b3J9JHtzdHJ9JHtpbnRlcnBvbGF0aW9uc1tpbmRleF0gIT09IHVuZGVmaW5lZCA/IGludGVycG9sYXRpb25zW2luZGV4XSA6IFwiXCJ9YCxcbiAgICAgIFwiXCIsXG4gICAgKTtcblxuICAgIGNvbnN0IGNhY2hlZENsYXNzTmFtZSA9IGNzc0NhY2hlLmdldChyYXdDU1MpO1xuICAgIGlmIChjYWNoZWRDbGFzc05hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGNhY2hlZENsYXNzTmFtZTtcbiAgICB9XG5cbiAgICBjb25zdCBoYXNoSWQgPSBjcmVhdGVIYXNoKHJhd0NTUywgc2VsZWN0b3IpO1xuICAgIGNvbnN0IHNjb3BlZFN0eWxlID0gdHJhbnNmb3JtU3R5bGUocmF3Q1NTLCBgJHtoYXNoSWR9YCk7XG4gICAgY29uc3Qgc3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KGAke2hhc2hJZH1gKTtcblxuICAgIGhhbmRsZXIoeyBoYXNoSWQsIHNjb3BlZFN0eWxlLCBzdHlsZUVsZW1lbnQgfSk7XG5cbiAgICBpZiAoIXN0eWxlRWxlbWVudC5pbm5lckhUTUwuaW5jbHVkZXMoc2NvcGVkU3R5bGUpKSB7XG4gICAgICBzdHlsZUVsZW1lbnQuaW5uZXJIVE1MICs9IHNjb3BlZFN0eWxlO1xuICAgIH1cblxuICAgIGNzc0NhY2hlLnNldChyYXdDU1MsIGhhc2hJZCk7XG5cbiAgICByZXR1cm4gaGFzaElkO1xuICB9O1xuIiwgImltcG9ydCB7IGlzRXZlbnROYW1lIH0gZnJvbSBcIkAvdmFsaWRhdG9yc1wiO1xuXG50eXBlIEF0dHJpYnV0ZSA9IG9iamVjdCAmIHtcbiAgW2tleTogc3ltYm9sIHwgc3RyaW5nXTogdW5rbm93bjtcbn07XG5cbnR5cGUgRXZlbnRIYW5kbGVyID0gPEsgZXh0ZW5kcyBrZXlvZiBIVE1MRWxlbWVudEV2ZW50TWFwPihcbiAgZXZlbnQ6IEhUTUxFbGVtZW50RXZlbnRNYXBbS10sXG4pID0+IHZvaWQ7XG5cbmV4cG9ydCBjb25zdCBzZXRFbGVtZW50QXR0cmlidXRlcyA9IChcbiAgZWxlbWVudDogRWxlbWVudCxcbiAgYXR0cmlidXRlczogQXR0cmlidXRlLFxuKTogRWxlbWVudCA9PiB7XG4gIGNvbnN0IGF0dHJpYnV0ZUtleXMgPSBhdHRyaWJ1dGVzID8gT2JqZWN0LmtleXMoYXR0cmlidXRlcykgOiBbXTtcbiAgZm9yIChjb25zdCBrZXkgb2YgYXR0cmlidXRlS2V5cykge1xuICAgIGlmICghaXNFdmVudE5hbWUoa2V5KSgpKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSBhcyBzdHJpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBldmVudE5hbWUgPSBrZXlcbiAgICAgICAgLnJlcGxhY2UoL29uLywgXCJcIilcbiAgICAgICAgLnRvTG93ZXJDYXNlKCkgYXMga2V5b2YgSFRNTEVsZW1lbnRFdmVudE1hcDtcbiAgICAgIGNvbnN0IGV2ZW50SGFuZGxlciA9IGF0dHJpYnV0ZXNba2V5XSBhcyBFdmVudEhhbmRsZXI7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZWxlbWVudDtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3RlbXBsYXRlXCI7XG5pbXBvcnQgdHlwZSB7IEdlbmVyaWNPYmplY3QsIFN0YXRlLCBTdGF0ZU1hbmFnZXIgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuaW1wb3J0IHsgY3JlYXRlU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIkAvcmVuZGVyXCI7XG5pbXBvcnQgeyBodG1sLCBqc3gsIHRzeCB9IGZyb20gXCJAL3RlbXBsYXRlXCI7XG5pbXBvcnQgeyBjc3MgfSBmcm9tIFwiQC9zdHlsZVwiO1xuaW1wb3J0IHsgcmVuZGVyQ2hpbGRyZW4gfSBmcm9tIFwiLi9yZW5kZXJDaGlsZHJlblwiO1xuaW1wb3J0IHsgc2V0RWxlbWVudEF0dHJpYnV0ZXMgfSBmcm9tIFwiLi9zZXRFbGVtZW50QXR0cmlidXRlc1wiO1xuXG50eXBlIEZhY3RvcnkgPSAocGFyYW1zPzogdW5rbm93bikgPT4gdW5rbm93bjtcblxudHlwZSBTdHlsZVBhcmFtcyA9IHtcbiAgcHJvcHM6IFN0YXRlO1xuICBzdGF0ZTogU3RhdGU7XG4gIGNzczogUmV0dXJuVHlwZTx0eXBlb2YgY3NzPjtcbn07XG5cbnR5cGUgU3R5bGVzID0geyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcbnR5cGUgU3R5bGVzT2JqZWN0ID0gR2VuZXJpY09iamVjdDx7IFtrZXk6IHN0cmluZ106ICgpID0+IHN0cmluZyB9PjtcbnR5cGUgU3R5bGVIYW5kbGVyRmFjdG9yeSA9ICgpID0+IFN0eWxlc09iamVjdDtcbnR5cGUgU3R5bGVIYW5kbGVyID0gKHBhcmFtczogU3R5bGVQYXJhbXMpID0+IHN0cmluZztcblxudHlwZSBUZW1wbGF0ZVBhcmFtcyA9IHtcbiAgcHJvcHM6IFN0YXRlO1xuICBzdGF0ZTogU3RhdGU7XG4gIGh0bWw6IHR5cGVvZiBodG1sO1xuICBqc3g6IHR5cGVvZiBqc3g7XG4gIHRzeDogdHlwZW9mIHRzeDtcbiAgc3R5bGVzOiBTdHlsZXM7XG4gIGFjdGlvbnM6IEFjdGlvbnM7XG59O1xuXG50eXBlIFRlbXBsYXRlSW5qZWN0aW9ucyA9IDxUID0gdW5rbm93bj4oKSA9PiBHZW5lcmljT2JqZWN0PFQ+O1xuXG50eXBlIFRlbXBsYXRlSGFuZGxlciA9IChcbiAgcGFyYW1zOiBUZW1wbGF0ZVBhcmFtcyxcbiAgaW5qZWN0aW9uczogVGVtcGxhdGVJbmplY3Rpb25zLFxuKSA9PiB2b2lkO1xuXG50eXBlIEFjdGlvbnMgPSBHZW5lcmljT2JqZWN0O1xuXG50eXBlIEFjdGlvblBhcmFtcyA9IHtcbiAgcHJvcHM6IFN0YXRlO1xuICBzdGF0ZTogU3RhdGVNYW5hZ2VyO1xufTtcbnR5cGUgQWN0aW9uSGFuZGxlckZhY3RvcnkgPSAocGFyYW1zOiBBY3Rpb25QYXJhbXMpID0+IEdlbmVyaWNPYmplY3Q7XG5cbnR5cGUgQXR0cmlidXRlID0gb2JqZWN0ICYge1xuICBba2V5OiBzeW1ib2wgfCBzdHJpbmddOiB1bmtub3duO1xufTtcblxuY29uc3QgX2F0dHJpYnV0ZXMgPSB7fTtcblxuY29uc3QgX2NyZWF0ZVRhZ0J5RmFjdG9yeU5hbWUgPSAoZmFjdG9yeTogRmFjdG9yeSkgPT4ge1xuICByZXR1cm4gZmFjdG9yeS5uYW1lXG4gICAgLnNwbGl0KC8oPz1bQS1aXSkvKVxuICAgIC5qb2luKFwiLVwiKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufTtcblxuY29uc3QgX2NyZWF0ZVVzZVN0YXRlID0gKHN0YXRlOiBTdGF0ZU1hbmFnZXIpID0+IHtcbiAgY29uc3QgY3VycmVudFN0YXRlID0ge307XG4gIGNvbnN0IHVzZVN0YXRlID0gPFQ+KGluaXRpYWxTdGF0ZTogU3RhdGU8VD4pOiBTdGF0ZU1hbmFnZXIgPT4ge1xuICAgIGNvbnN0IGxhdGVzdFN0YXRlID0gc3RhdGUuZ2V0KCkgYXMgU3RhdGU8VD47XG4gICAgc3RhdGUuc2V0KHsgLi4uaW5pdGlhbFN0YXRlLCAuLi5sYXRlc3RTdGF0ZSB9KTtcblxuICAgIE9iamVjdC5hc3NpZ24oY3VycmVudFN0YXRlLCBzdGF0ZS5nZXQoKSk7XG4gICAgcmV0dXJuIHsgZ2V0OiBzdGF0ZS5nZXQsIHNldDogc3RhdGUuc2V0LCB3YXRjaDogc3RhdGUud2F0Y2ggfTtcbiAgfTtcbiAgcmV0dXJuIHsgY3VycmVudFN0YXRlLCB1c2VTdGF0ZSB9O1xufTtcblxuY29uc3QgX2NyZWF0ZVVzZVN0eWxlID0gKHsgcHJvcHMsIHN0YXRlLCBjc3MgfTogU3R5bGVQYXJhbXMpID0+IHtcbiAgY29uc3Qgc3R5bGVzaGVldCA9IHt9O1xuICBjb25zdCB1c2VTdHlsZSA9IChjc3NIYW5kbGVyRmFjdG9yeTogU3R5bGVIYW5kbGVyRmFjdG9yeSkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZXJzID0gY3NzSGFuZGxlckZhY3RvcnkoKTtcbiAgICBjb25zdCBzdHlsZXM6IFN0eWxlcyA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gaGFuZGxlcnMpIHtcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBoYW5kbGVyc1trZXldIGFzIFN0eWxlSGFuZGxlcjtcbiAgICAgIGNvbnN0IHN0eWxlID0gaGFuZGxlcih7IHByb3BzLCBzdGF0ZSwgY3NzIH0pO1xuICAgICAgc3R5bGVzW2tleV0gPSBzdHlsZTtcbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKHN0eWxlc2hlZXQsIHN0eWxlcyk7XG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfTtcblxuICByZXR1cm4geyBzdHlsZXM6IHN0eWxlc2hlZXQsIHVzZVN0eWxlIH07XG59O1xuXG5jb25zdCBfY3JlYXRlVXNlVGVtcGxhdGUgPSAocGFyYW1zOiBUZW1wbGF0ZVBhcmFtcykgPT4ge1xuICBjb25zdCB1c2VUZW1wbGF0ZSA9IChcbiAgICB0ZW1wbGF0ZUhhbmRsZXI6IFRlbXBsYXRlSGFuZGxlcixcbiAgICB0ZW1wbGF0ZUluamVjdGlvbnM6IFRlbXBsYXRlSW5qZWN0aW9ucyxcbiAgKSA9PiB7XG4gICAgcmV0dXJuIHRlbXBsYXRlSGFuZGxlcihwYXJhbXMsIHRlbXBsYXRlSW5qZWN0aW9ucyk7XG4gIH07XG5cbiAgcmV0dXJuIHVzZVRlbXBsYXRlO1xufTtcblxuY29uc3QgX2NyZWF0ZVVzZUFjdGlvbiA9ICh7IHByb3BzLCBzdGF0ZSB9OiBBY3Rpb25QYXJhbXMpID0+IHtcbiAgY29uc3QgYWN0aW9uczogR2VuZXJpY09iamVjdCA9IHt9O1xuXG4gIGNvbnN0IHVzZUFjdGlvbiA9IChhY3Rpb25IYW5kbGVyRmFjdG9yeTogQWN0aW9uSGFuZGxlckZhY3RvcnkpID0+IHtcbiAgICBjb25zdCBoYW5kbGVyQWN0aW9ucyA9IGFjdGlvbkhhbmRsZXJGYWN0b3J5KHsgcHJvcHMsIHN0YXRlIH0pO1xuICAgIE9iamVjdC5hc3NpZ24oYWN0aW9ucywgaGFuZGxlckFjdGlvbnMpO1xuICB9O1xuXG4gIHJldHVybiB7IGFjdGlvbnMsIHVzZUFjdGlvbiB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW1lbnRCeUZhY3RvcnlOYW1lID0gKFxuICB0ZW1wbGF0ZTogVGVtcGxhdGVTY2hlbWEsXG4gIHBhcmVudEVsZW1lbnQ6IEVsZW1lbnQsXG4gIGxhdGVzdFN0YXRlOiBTdGF0ZSA9IHt9LFxuKSA9PiB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgY29uc3QgZmFjdG9yeSA9IHRlbXBsYXRlLnR5cGUgYXMgRmFjdG9yeTtcbiAgICBjb25zdCB0YWdOYW1lID0gX2NyZWF0ZVRhZ0J5RmFjdG9yeU5hbWUoZmFjdG9yeSk7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSB0YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG5cbiAgICBjb25zdCBwcm9wcyA9IHRlbXBsYXRlLnByb3BzO1xuICAgIGNvbnN0IGxhdGVzdERlZXBTdGF0ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobGF0ZXN0U3RhdGUpKTtcbiAgICBjb25zdCBzdGF0ZU1hbmFnZXIgPSBjcmVhdGVTdGF0ZShsYXRlc3REZWVwU3RhdGUpO1xuICAgIGNvbnN0IHsgY3VycmVudFN0YXRlOiBzdGF0ZSwgdXNlU3RhdGUgfSA9IF9jcmVhdGVVc2VTdGF0ZShzdGF0ZU1hbmFnZXIpO1xuICAgIGNvbnN0IHN0eWxlZCA9IGNzcyhzZWxlY3RvciwgKHsgaGFzaElkIH0pID0+IHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChoYXNoSWQpO1xuICAgICAgT2JqZWN0LmFzc2lnbihfYXR0cmlidXRlcywgeyBjbGFzczogaGFzaElkIH0pO1xuICAgIH0pO1xuICAgIGNvbnN0IHsgc3R5bGVzLCB1c2VTdHlsZSB9ID0gX2NyZWF0ZVVzZVN0eWxlKHsgcHJvcHMsIHN0YXRlLCBjc3M6IHN0eWxlZCB9KTtcbiAgICBjb25zdCB7IGFjdGlvbnMsIHVzZUFjdGlvbiB9ID0gX2NyZWF0ZVVzZUFjdGlvbih7XG4gICAgICBwcm9wcyxcbiAgICAgIHN0YXRlOiBzdGF0ZU1hbmFnZXIsXG4gICAgfSk7XG5cbiAgICBjb25zdCB1c2VUZW1wbGF0ZSA9IF9jcmVhdGVVc2VUZW1wbGF0ZSh7XG4gICAgICBwcm9wcyxcbiAgICAgIHN0YXRlLFxuICAgICAgaHRtbCxcbiAgICAgIGpzeCxcbiAgICAgIHRzeCxcbiAgICAgIHN0eWxlcyxcbiAgICAgIGFjdGlvbnMsXG4gICAgfSk7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IGZhY3Rvcnkoe1xuICAgICAgcHJvcHMsXG4gICAgICB1c2VTdGF0ZSxcbiAgICAgIHVzZVN0eWxlLFxuICAgICAgdXNlVGVtcGxhdGUsXG4gICAgICB1c2VBY3Rpb24sXG4gICAgfSkgYXMgVGVtcGxhdGVTY2hlbWFbXTtcblxuICAgIGNvbnN0IG9sZEVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIGFzIEVsZW1lbnQ7XG4gICAgc2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCwgX2F0dHJpYnV0ZXMpO1xuXG4gICAgb2xkRWxlbWVudFxuICAgICAgPyBvbGRFbGVtZW50LnJlcGxhY2VXaXRoKGVsZW1lbnQpXG4gICAgICA6IHBhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGVsZW1lbnQpO1xuXG4gICAgcmVuZGVyQ2hpbGRyZW4oY2hpbGRyZW4sIGVsZW1lbnQsIHN0YXRlKTtcblxuICAgIHN0YXRlTWFuYWdlci53YXRjaCgocGF5bG9hZCkgPT4ge1xuICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgcmVuZGVyKHRlbXBsYXRlLCBwYXJlbnRFbGVtZW50LCBwYXlsb2FkKTtcbiAgICB9KTtcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5pbXBvcnQgdHlwZSB7IFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIkAvdGVtcGxhdGVcIjtcbmltcG9ydCB7IHNldEVsZW1lbnRBdHRyaWJ1dGVzIH0gZnJvbSBcIi4vc2V0RWxlbWVudEF0dHJpYnV0ZXNcIjtcbmltcG9ydCB7IHJlbmRlckNoaWxkcmVuIH0gZnJvbSBcIi4vcmVuZGVyQ2hpbGRyZW5cIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW1lbnRCeVRhZ05hbWUgPVxuICAodGVtcGxhdGU6IFRlbXBsYXRlU2NoZW1hLCBwYXJlbnRFbGVtZW50OiBFbGVtZW50LCBzdGF0ZTogU3RhdGUgPSB7fSkgPT5cbiAgKCkgPT4ge1xuICAgIGNvbnN0IHRhZ05hbWUgPSB0ZW1wbGF0ZS50eXBlIGFzIHN0cmluZztcbiAgICBjb25zdCBzZWxlY3RvciA9IHRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICBjb25zdCBoYXNoSWQgPSBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIGFzIHN0cmluZztcbiAgICBjb25zdCBjbGFzc05hbWUgPSB0ZW1wbGF0ZT8ucHJvcHM/LmNsYXNzIGFzIHN0cmluZztcbiAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICBpZiAoIWNsYXNzTmFtZS5pbmNsdWRlcyhoYXNoSWQpKSB7XG4gICAgICAgIGNvbnN0IG5ld0NsYXNzTmFtZSA9IGAke2hhc2hJZH1fJHtjbGFzc05hbWV9YDtcbiAgICAgICAgc2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCwgeyBjbGFzczogbmV3Q2xhc3NOYW1lIH0pO1xuICAgICAgICBwYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcbiAgICAgICAgcmVuZGVyQ2hpbGRyZW4odGVtcGxhdGUuY2hpbGRyZW4sIGVsZW1lbnQsIHN0YXRlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBzZXRFbGVtZW50QXR0cmlidXRlcyhlbGVtZW50LCB0ZW1wbGF0ZS5wcm9wcyk7XG4gICAgcGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgZWxlbWVudCk7XG4gICAgcmVuZGVyQ2hpbGRyZW4odGVtcGxhdGUuY2hpbGRyZW4sIGVsZW1lbnQsIHN0YXRlKTtcbiAgfTtcbiIsICJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiQC9yZW5kZXJcIjtcbmltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEsIFRhZ2dlZFRlbXBsYXRlIH0gZnJvbSBcIkAvdHlwZXNcIjtcbmltcG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyVGVtcGxhdGVEYXRhID1cbiAgKHRlbXBsYXRlRGF0YTogVGFnZ2VkVGVtcGxhdGUsIGVsZW1lbnQ6IEVsZW1lbnQsIHN0YXRlOiBTdGF0ZSA9IHt9KSA9PlxuICAgICgpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdGVtcGxhdGVEYXRhID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIHRlbXBsYXRlRGF0YSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdGVtcGxhdGVEYXRhID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBOdW1iZXIodGVtcGxhdGVEYXRhKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBkYXRhLnRvU3RyaW5nKCk7XG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9O1xuIiwgImltcG9ydCB0eXBlIHsgVGFnZ2VkVGVtcGxhdGUsIFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIkAvdGVtcGxhdGVcIjtcbmltcG9ydCB7XG4gIHJlbmRlclRlbXBsYXRlQXJyYXksXG4gIHJlbmRlclRlbXBsYXRlT2JqZWN0LFxuICByZW5kZXJUZW1wbGF0ZURhdGEsXG59IGZyb20gXCJAL2FjdGlvbnNcIjtcbmltcG9ydCB7IGlzQXJyYXksIGlzT2JqZWN0LCBpc1RlbXBsYXRlRGF0YSB9IGZyb20gXCJAL3ZhbGlkYXRvcnNcIjtcblxudHlwZSBDb250ZXh0RWxlbWVudCA9IEVsZW1lbnQ7XG5pbXBvcnQgeyBjcmVhdGVDaGFpbiB9IGZyb20gXCJAL2ZhY3Rvcmllc1wiO1xuaW1wb3J0IHsgY3JlYXRlU3RhdGUsIHR5cGUgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuXG4vL2NvbnN0IGdsb2JhbFN0YXRlID0gY3JlYXRlU3RhdGUoe30pO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyID0gKFxuICB0ZW1wbGF0ZTogVGFnZ2VkVGVtcGxhdGUsXG4gIGNvbnRleHQ6IENvbnRleHRFbGVtZW50ID0gZG9jdW1lbnQuYm9keSxcbiAgc3RhdGU6IFN0YXRlID0ge30sXG4pOiBDb250ZXh0RWxlbWVudCA9PiB7XG4gIGNvbnN0IGNoYWluID0gY3JlYXRlQ2hhaW4oKTtcbiAgY29uc3QgY29tcG9uZW50RWxlbWVudCA9IGNvbnRleHQgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5cbiAgY2hhaW4uYWRkKHtcbiAgICB2YWxpZGF0b3I6IGlzQXJyYXkodGVtcGxhdGUpLFxuICAgIGFjdGlvbjogcmVuZGVyVGVtcGxhdGVBcnJheShcbiAgICAgIHRlbXBsYXRlIGFzIFRlbXBsYXRlU2NoZW1hW10sXG4gICAgICBjb21wb25lbnRFbGVtZW50LFxuICAgICAgc3RhdGUsXG4gICAgKSxcbiAgfSk7XG5cbiAgY2hhaW4uYWRkKHtcbiAgICB2YWxpZGF0b3I6IGlzT2JqZWN0KHRlbXBsYXRlKSxcbiAgICBhY3Rpb246IHJlbmRlclRlbXBsYXRlT2JqZWN0KFxuICAgICAgdGVtcGxhdGUgYXMgVGVtcGxhdGVTY2hlbWEsXG4gICAgICBjb21wb25lbnRFbGVtZW50LFxuICAgICAgc3RhdGUsXG4gICAgKSxcbiAgfSk7XG5cbiAgY2hhaW4uYWRkKHtcbiAgICB2YWxpZGF0b3I6IGlzVGVtcGxhdGVEYXRhKHRlbXBsYXRlKSxcbiAgICBhY3Rpb246IHJlbmRlclRlbXBsYXRlRGF0YSh0ZW1wbGF0ZSwgY29tcG9uZW50RWxlbWVudCwgc3RhdGUpLFxuICB9KTtcblxuICBjaGFpbi5leGVjdXRlKCk7XG4gIHJldHVybiBjb21wb25lbnRFbGVtZW50O1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IFJvdXRlciwgRXhlY3V0ZSB9IGZyb20gXCIuL3R5cGVzXCI7XG4vL2ltcG9ydCB7IGV2ZW50RHJpdmUgfSBmcm9tIFwiLi4vcmVuZGVyXCI7XG5cbmV4cG9ydCBjb25zdCByb3V0ZXI6IFJvdXRlciA9ICh7IHJvdXRlcywgY29udGV4dCB9KSA9PiB7XG4gIGNvbnN0IF9yb3V0ZXMgPSByb3V0ZXM7XG4gIGxldCBfcm91dGVyRWxlbWVudCE6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGUgPSAodmFsaWRhdG9yLCBjYWxsYmFjaywgZXJyb3IpID0+IHtcbiAgICBpZiAodmFsaWRhdG9yKCkpIHJldHVybiBjYWxsYmFjayh7IGlzVmFsaWQ6IHZhbGlkYXRvcigpIH0pO1xuXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBjb25zdCBlcnJvID0gbmV3IEVycm9yKGVycm9yKCkubWVzc2FnZSk7XG4gICAgICBlcnJvLm5hbWUgPSBlcnJvcigpLm5hbWU7XG4gICAgICB0aHJvdyBlcnJvO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBfYmluZExpc3RlbmVycyA9ICgpID0+IHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgLy9jb25zdCBwYXlsb2FkOiBSb3V0ZXJPYmplY3QgPSB7IHN0YXR1czogdHJ1ZSB9O1xuICAgICAgLy9ldmVudERyaXZlLmVtaXQoXCJPTi1ERVNUUk9ZXCIsIHBheWxvYWQpO1xuICAgICAgX21vdW50Um91dGVCeUhhc2gobnVsbCk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgX3NldFJvdXRlckVsZW1lbnQgPSAoKSA9PiB7XG4gICAgY29uc3Qgcm91dGVyRWxlbWVudCA9IGNvbnRleHQ/LnF1ZXJ5U2VsZWN0b3IoXCJyb3V0ZXItdmlld1wiKTtcblxuICAgIGV4ZWN1dGUoXG4gICAgICAoKSA9PiAhIXJvdXRlckVsZW1lbnQsXG4gICAgICAoKSA9PiB7XG4gICAgICAgIF9yb3V0ZXJFbGVtZW50ID0gcm91dGVyRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgcmV0dXJuIF9yb3V0ZXJFbGVtZW50O1xuICAgICAgfSxcbiAgICAgICgpID0+ICh7XG4gICAgICAgIG5hbWU6IFwiUm91dGVyIEVycm9yXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiUm91dGVyIGVsZW1lbnQgKHJvdXRlci12aWV3KSBpcyBub3QgZGVmaW5lZCBhbmQgbXVzdCBiZS5cIixcbiAgICAgIH0pLFxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgX2xvYWRNYWluUm91dGUgPSAoKSA9PiB7XG4gICAgY29uc3QgbWFpblJvdXRlID0gX2dldE1haW5Sb3V0ZSgpO1xuICAgIGV4ZWN1dGUoXG4gICAgICAoKSA9PiAhIW1haW5Sb3V0ZT8uc3RhcnQsXG4gICAgICAoKSA9PiBtYWluUm91dGU/LnN0YXJ0ICYmIG5hdmlnYXRlKG1haW5Sb3V0ZS5zdGFydCksXG4gICAgICAoKSA9PiAoe1xuICAgICAgICBuYW1lOiBcIlJvdXRlciBFcnJvclwiLFxuICAgICAgICBtZXNzYWdlOiBcIlN0YXJ0IHJvdXRlciBpcyBub3QgZGVmaW5lZCBhbmQgbXVzdCBiZS5cIixcbiAgICAgIH0pLFxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgX2dldE1haW5Sb3V0ZSA9ICgpID0+IF9yb3V0ZXMuZmluZCgocm91dGUpID0+ICEhcm91dGU/LnN0YXJ0KTtcblxuICBjb25zdCBfZ2V0Um91dGVCeUhhc2ggPSAoaGFzaDogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIF9yb3V0ZXMuZmluZCgocm91dGUpID0+IHJvdXRlLnJlZ2V4LnRlc3QoaGFzaCkpO1xuICB9O1xuXG4gIGNvbnN0IF9nZXRSb3V0ZURlZmF1bHQgPSAoKSA9PiBfcm91dGVzLmZpbmQoKHJvdXRlKSA9PiByb3V0ZT8uZGVmYXVsdCk7XG5cbiAgY29uc3QgX21vdW50Um91dGVCeUhhc2ggPSBhc3luYyAoaGFzaDogc3RyaW5nIHwgbnVsbCkgPT4ge1xuICAgIGNvbnN0IGhhc2hWYWx1ZSA9IGhhc2ggfHwgd2luZG93LmxvY2F0aW9uLmhhc2ggfHwgXCJcIjtcbiAgICBjb25zdCByb3V0ZSA9IF9nZXRSb3V0ZUJ5SGFzaChoYXNoVmFsdWUpIHx8IF9nZXRSb3V0ZURlZmF1bHQoKTtcbiAgICBfcm91dGVyRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHJvdXRlPy5tb3VudCh7IGNvbnRleHQ6IF9yb3V0ZXJFbGVtZW50IH0pO1xuICB9O1xuXG4gIGNvbnN0IF9nZXRIYXNoID0gKCkgPT4gd2luZG93LmxvY2F0aW9uLmhhc2ggfHwgbnVsbDtcblxuICBjb25zdCBfaGFzQWN0aXZlUm91dGUgPSAoKSA9PiAhIV9nZXRIYXNoKCk7XG5cbiAgY29uc3QgbmF2aWdhdGUgPSAocGF0aDogc3RyaW5nKSA9PiB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBwYXRoO1xuICB9O1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgX2JpbmRMaXN0ZW5lcnMoKTtcbiAgICBfc2V0Um91dGVyRWxlbWVudCgpO1xuICAgIF9oYXNBY3RpdmVSb3V0ZSgpID8gX21vdW50Um91dGVCeUhhc2goX2dldEhhc2goKSkgOiBfbG9hZE1haW5Sb3V0ZSgpO1xuICB9O1xuXG4gIHJldHVybiB7IGluaXQsIG5hdmlnYXRlIH07XG59O1xuIiwgImltcG9ydCB7IGNyZWF0ZVN0YXRlIH0gZnJvbSBcImlhcmVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZGVsIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IHN0YXRlID0gY3JlYXRlU3RhdGU8TW9kZWw+KHtcblx0cm91bmQ6IHtcblx0XHRwbGF5ZXJOYW1lOiBcIlwiLFxuXHRcdHNjb3JlOiAwLFxuXHR9LFxuXHRyZWNvcmQ6IHtcblx0XHRwbGF5ZXJOYW1lOiBcIlwiLFxuXHRcdHNjb3JlOiAwLFxuXHR9LFxuXHRydW5uaW5nOiBmYWxzZSxcbn0pO1xuIiwgImltcG9ydCB7IHN0YXRlIH0gZnJvbSBcIi4vc3RhdGVcIjtcblxuZXhwb3J0IGNvbnN0IGdldFN0YXRlID0gKCkgPT4gc3RhdGUuZ2V0KCk7XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVTY29yZSA9ICgpID0+IHtcblx0Y29uc3QgeyByb3VuZCB9ID0gc3RhdGUuZ2V0KCk7XG5cdGNvbnN0IHNjb3JlID0gcm91bmQuc2NvcmUgKyAxO1xuXHRzdGF0ZS5zZXQoeyAuLi5zdGF0ZS5nZXQoKSwgcm91bmQ6IHsgLi4ucm91bmQsIHNjb3JlIH0gfSk7XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlUmVjb3JkID0gKCkgPT4ge1xuXHRjb25zdCB7IHJvdW5kLCByZWNvcmQgfSA9IHN0YXRlLmdldCgpO1xuXG5cdGlmIChyZWNvcmQuc2NvcmUgPiByb3VuZC5zY29yZSkgcmV0dXJuO1xuXG5cdHN0YXRlLnNldCh7IC4uLnN0YXRlLmdldCgpLCByZWNvcmQ6IHJvdW5kIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZVN0YXR1cyA9ICgpID0+IHtcblx0Y29uc3QgeyBydW5uaW5nIH0gPSBzdGF0ZS5nZXQoKTtcblx0c3RhdGUuc2V0KHsgLi4uc3RhdGUuZ2V0KCksIHJ1bm5pbmc6ICFydW5uaW5nIH0pO1xufTtcbiIsICJleHBvcnQgeyBzdGF0ZSB9IGZyb20gXCIuL3N0YXRlXCI7XG5cbmltcG9ydCB7IGdldFN0YXRlLCB1cGRhdGVSZWNvcmQsIHVwZGF0ZVNjb3JlIH0gZnJvbSBcIi4vYWN0aW9uc1wiO1xuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IHtcblx0Z2V0U3RhdGUsXG5cdHVw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QUFJQSxNQUFHLFVBQVEsS0FBR0YsS0FBRSxFQUFFLEtBQUssR0FBRUEsSUFBRSxDQUFDLElBQUUsTUFBSUUsTUFBRyxLQUFHLENBQUNGLEtBQUUsRUFBRSxLQUFLLEdBQUUsR0FBRSxNQUFHLENBQUMsSUFBRUUsTUFBRyxPQUFLLEtBQUcsQ0FBQ0YsTUFBRyxNQUFJRSxRQUFLLEVBQUUsS0FBS0EsSUFBRSxHQUFFLEdBQUVELEVBQUMsR0FBRUMsS0FBRSxJQUFHRixPQUFJLEVBQUUsS0FBS0UsSUFBRUYsSUFBRSxHQUFFQyxFQUFDLEdBQUVDLEtBQUUsS0FBSSxJQUFFO0lBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRUYsR0FBRSxRQUFPLEtBQUk7QUFBQyxZQUFJLE1BQUlFLE1BQUcsRUFBRSxHQUFFLEVBQUUsQ0FBQztBQUFHLGVBQVEsSUFBRSxHQUFFLElBQUVGLEdBQUUsQ0FBQyxFQUFFLFFBQU8sSUFBSUQsTUFBRUMsR0FBRSxDQUFDLEVBQUUsQ0FBQyxHQUFFLE1BQUlFLEtBQUUsUUFBTUgsTUFBRyxFQUFFLEdBQUUsSUFBRSxDQUFDLENBQUMsR0FBRUcsS0FBRSxLQUFHLEtBQUdILEtBQUUsTUFBSUcsS0FBRSxTQUFPLEtBQUcsUUFBTUgsTUFBR0csS0FBRSxHQUFFLElBQUUsTUFBSSxJQUFFSCxLQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUVBLE9BQUksSUFBRSxJQUFFLEtBQUcsS0FBR0EsS0FBRSxRQUFNQSxNQUFHLFFBQU1BLEtBQUUsSUFBRUEsS0FBRSxRQUFNQSxNQUFHLEVBQUUsR0FBRUcsS0FBRSxLQUFHQSxPQUFJLFFBQU1ILE1BQUdHLEtBQUUsR0FBRUQsS0FBRSxHQUFFLElBQUUsTUFBSSxRQUFNRixPQUFJRyxLQUFFLEtBQUcsUUFBTUYsR0FBRSxDQUFDLEVBQUUsSUFBRSxDQUFDLE1BQUksRUFBRSxHQUFFLE1BQUlFLE9BQUksSUFBRSxFQUFFLENBQUMsSUFBR0EsS0FBRSxJQUFHLElBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFFLEdBQUVBLEVBQUMsR0FBRUEsS0FBRSxLQUFH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SmEsTUFBQTtBQU1iLFNBQU8sRUFBRSxNQUFNLFNBQVM7QUFDMUIsR0FoRjhCLFFBQUE7OztBQ0F2QixJQUFNLFFBQVEsWUFBbUI7QUFBQSxFQUN2QyxPQUFPO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixPQUFPO0FBQUEsRUFDUjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ1AsWUFBWTtBQUFBLElBQ1osT0FBTztBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFDVixDQUFDOzs7QUNYTSxJQUFNLFdBQVcsNkJBQU0sTUFBTSxJQUFJLEdBQWhCO0FBRWpCLElBQU0sY0FBYyw2QkFBTTtBQUNoQyxRQUFNLEVBQUUsTUFBTSxJQUFJLE1BQU0sSUFBSTtBQUM1QixRQUFNLFFBQVEsTUFBTSxRQUFRO0FBQzVCLFFBQU0sSUFBSSxFQUFFLEdBQUcsTUFBTSxJQUFJLEdBQUcsT0FBTyxFQUFFLEdBQUcsT0FBTyxNQUFNLEVBQUUsQ0FBQztBQUN6RCxHQUoyQjtBQU1wQixJQUFNLGVBQWUsNkJBQU07QUFDakMsUUFBTSxFQUFFLE9BQU8sT0FBTyxJQUFJLE1BQU0sSUFBSTtBQUVwQyxNQUFJLE9BQU8sUUFBUSxNQUFNLE1BQU87QUFFaEMsUUFBTSxJQUFJLEVBQUUsR0FBRyxNQUFNLElBQUksR0FBRyxRQUFRLE1BQU0sQ0FBQztBQUM1QyxHQU40QjtBQVFyQixJQUFNLGVBQWUsNkJBQU07QUFDakMsUUFBTSxFQUFFLFFBQVEsSUFBSSxNQUFNLElBQUk7QUFDOUIsUUFBTSxJQUFJLEVBQUUsR0FBRyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO0FBQ2hELEdBSDRCOzs7QUNkckIsSUFBTSxVQUFVO0FBQUEsRUFDdEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNEOyIsCiAgIm5hbWVzIjogWyJfX25hbWUiLCAic3RhdGUiLCAidCIsICJuIiwgInMiLCAiciIsICJnbG9iYWxSdWxlcyIsICJyZXN1bHQiLCAic2VsZWN0b3IiLCAiY3NzIiwgImFjdGlvbnMiXQp9Cg==
