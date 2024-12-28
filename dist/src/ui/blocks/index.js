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
var renderTemplateObject = /* @__PURE__ */ __name2((template, contextElement, state = {}) => () => {
  const _chain = createChain();
  _chain.add({
    validator: isString(template.type),
    action: createElementByTagName(template, contextElement, state)
  });
  _chain.add({
    validator: isFunction(template.type),
    action: createElementByFactoryName(template, contextElement, state)
  });
  _chain.execute();
}, "renderTemplateObject");
var renderTemplateArray = /* @__PURE__ */ __name2((templateSchema, contextElement, state = {}) => () => {
  for (const template of templateSchema) {
    render(template, contextElement, state);
  }
}, "renderTemplateArray");
var renderChildren = /* @__PURE__ */ __name2((children, parentElement, state = {}) => {
  parentElement.innerHTML = "";
  if (!Array.isArray(children) && typeof children === "object") {
    render(children, parentElement, state);
    return;
  }
  for (const child of children) {
    render(child, parentElement, state);
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
var _createUseState = /* @__PURE__ */ __name2((state) => {
  const currentState = {};
  const useState = /* @__PURE__ */ __name2((initialState) => {
    const latestState = state.get();
    state.set({ ...initialState, ...latestState });
    Object.assign(currentState, state.get());
    return { get: state.get, set: state.set, watch: state.watch };
  }, "useState");
  return { currentState, useState };
}, "_createUseState");
var _createUseStyle = /* @__PURE__ */ __name2(({ props, state, css: css2 }) => {
  const stylesheet = {};
  const useStyle = /* @__PURE__ */ __name2((cssHandlerFactory) => {
    const handlers = cssHandlerFactory();
    const styles = {};
    for (const key in handlers) {
      const handler = handlers[key];
      const style = handler({ props, state, css: css2 });
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
var _createUseAction = /* @__PURE__ */ __name2(({ props, state }) => {
  const actions = {};
  const useAction = /* @__PURE__ */ __name2((actionHandlerFactory) => {
    const handlerActions = actionHandlerFactory({ props, state });
    Object.assign(actions, handlerActions);
  }, "useAction");
  return { actions, useAction };
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
    const { currentState: state, useState } = _createUseState(stateManager);
    const styled = css(selector, ({ hashId }) => {
      element.classList.add(hashId);
      Object.assign(_attributes, { class: hashId });
    });
    const { styles, useStyle } = _createUseStyle({ props, state, css: styled });
    const { actions, useAction } = _createUseAction({
      props,
      state: stateManager
    });
    const useTemplate = _createUseTemplate({
      props,
      state,
      html,
      jsx: html,
      tsx: html,
      styles,
      actions
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
    renderChildren(children, element, state);
    stateManager.watch((payload) => {
      element.innerHTML = "";
      render(template, parentElement, payload);
    });
  };
}, "createElementByFactoryName");
var createElementByTagName = /* @__PURE__ */ __name2((template, parentElement, state = {}) => () => {
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
      renderChildren(template.children, element, state);
      return;
    }
  }
  setElementAttributes(element, template.props);
  parentElement.insertAdjacentElement("beforeend", element);
  renderChildren(template.children, element, state);
}, "createElementByTagName");
var renderTemplateData = /* @__PURE__ */ __name2((templateData, element, state = {}) => () => {
  if (typeof templateData === "string") {
    element.insertAdjacentHTML("beforeend", templateData);
  }
  if (typeof templateData === "number") {
    const data = Number(templateData);
    const value = data.toString();
    element.insertAdjacentHTML("beforeend", value);
  }
}, "renderTemplateData");
var render = /* @__PURE__ */ __name2((template, context = document.body, state = {}) => {
  const chain = createChain();
  const componentElement = context || document.querySelector("body");
  chain.add({
    validator: isArray(template),
    action: renderTemplateArray(
      template,
      componentElement,
      state
    )
  });
  chain.add({
    validator: isObject(template),
    action: renderTemplateObject(
      template,
      componentElement,
      state
    )
  });
  chain.add({
    validator: isTemplateData(template),
    action: renderTemplateData(template, componentElement, state)
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

// src/frontend/ui/blocks/MainApp/index.ts
var MainApp = /* @__PURE__ */ __name(({ useStyle }) => {
  useStyle(createStyles);
  return html`
    <div class="wrap">
      <router-view></router-view>
    </div>   
`;
}, "MainApp");
var createStyles = /* @__PURE__ */ __name(() => ({
  MainApp: /* @__PURE__ */ __name(({ css: css2 }) => css2`
    display:flex;
    width:100%;
    padding:1em;

  .wrap,
  router-view {
    display:flex;
    width:100%;
  }
`, "MainApp")
}), "createStyles");
export {
  MainApp
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vaWFyZXMvc3JjL0NyZWF0ZUFwcC9DcmVhdGVBcHAudHMiLCAiLi4vLi4vLi4vLi4vLi4vaWFyZXMvc3JjL3N0YXRlL2NyZWF0ZVN0YXRlLnRzIiwgIi4uLy4uLy4uLy4uLy4uL2lhcmVzL3NyYy9mYWN0b3JpZXMvY3JlYXRlQ2hhaW4vaW5kZXgudHMiLCAiLi4vLi4vLi4vLi4vLi4vaWFyZXMvc3JjL3V0aWxzL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uLy4uL2lhcmVzL3NyYy92YWxpZGF0b3JzL3RlbXBsYXRlL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uLy4uL2lhcmVzL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlT2JqZWN0LnRzIiwgIi4uLy4uLy4uLy4uLy4uL2lhcmVzL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlQXJyYXkudHMiLCAiLi4vLi4vLi4vLi4vLi4vaWFyZXMvc3JjL2FjdGlvbnMvdGVtcGxhdGUvcmVuZGVyQ2hpbGRyZW4udHMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2h0bUAzLjEuMS9ub2RlX21vZHVsZXMvaHRtL2Rpc3QvaHRtLm1vZHVsZS5qcyIsICIuLi8uLi8uLi8uLi8uLi9pYXJlcy9zcmMvdGVtcGxhdGUvaHRtbC50cyIsICIuLi8uLi8uLi8uLi8uLi9pYXJlcy9zcmMvc3R5bGUvY3JlYXRlSGFzaC50cyIsICIuLi8uLi8uLi8uLi8uLi9pYXJlcy9zcmMvc3R5bGUvY3JlYXRlU3R5bGVFbGVtZW50LnRzIiwgIi4uLy4uLy4uLy4uLy4uL2lhcmVzL3NyYy9zdHlsZS9jc3NQYXJzZXIudHMiLCAiLi4vLi4vLi4vLi4vLi4vaWFyZXMvc3JjL3N0eWxlL2Nzcy50cyIsICIuLi8uLi8uLi8uLi8uLi9pYXJlcy9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9zZXRFbGVtZW50QXR0cmlidXRlcy50cyIsICIuLi8uLi8uLi8uLi8uLi9pYXJlcy9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9jcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZS50cyIsICIuLi8uLi8uLi8uLi8uLi9pYXJlcy9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9jcmVhdGVFbGVtZW50QnlUYWdOYW1lLnRzIiwgIi4uLy4uLy4uLy4uLy4uL2lhcmVzL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlRGF0YS50cyIsICIuLi8uLi8uLi8uLi8uLi9pYXJlcy9zcmMvcmVuZGVyL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uLy4uL2lhcmVzL3NyYy9yb3V0ZXIvcm91dGVyLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9mcm9udGVuZC91aS9ibG9ja3MvTWFpbkFwcC9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHR5cGUge1xuICBBcHBsaWNhdGlvbixcbiAgQ29udGV4dEVsZW1lbnQsXG4gIENvbnRleHRIYW5kbGVyLFxuICBDYWxsYmFja0hhbmRsZXIsXG59IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBDcmVhdGVBcHAgPSAoKTogQXBwbGljYXRpb24gPT4ge1xuICBsZXQgX2VsZW1lbnQhOiBDb250ZXh0RWxlbWVudDtcblxuICBjb25zdCBzZXR1cCA9IChjYWxsYmFjazogQ29udGV4dEhhbmRsZXIpID0+IHtcbiAgICBfZWxlbWVudCA9IGNhbGxiYWNrKCk7XG4gICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gIH07XG5cbiAgY29uc3QgbW91bnQgPSAoY2FsbGJhY2s6IENhbGxiYWNrSGFuZGxlcikgPT4ge1xuICAgIHJldHVybiBjYWxsYmFjayhfZWxlbWVudCk7XG4gIH07XG5cbiAgY29uc3QgdW5tb3VudCA9IChjYWxsYmFjazogQ2FsbGJhY2tIYW5kbGVyKSA9PiB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKF9lbGVtZW50KTtcbiAgfTtcblxuICByZXR1cm4geyBzZXR1cCwgbW91bnQsIHVubW91bnQgfTtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBTdGF0ZVdhdGNoZXIsIFN0YXRlLCBTdGF0ZU1hbmFnZXIgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCBfY3JlYXRlVVVJRCA9ICgpOiBzdHJpbmcgPT4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIsIDExKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVN0YXRlID0gPFMgPSB1bmtub3duPihcbiAgaW5pdGlhbFN0YXRlOiBTdGF0ZTxTPixcbik6IFN0YXRlTWFuYWdlcjxTPiA9PiB7XG4gIGNvbnN0IF9zdGF0ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaW5pdGlhbFN0YXRlKSk7XG4gIGNvbnN0IF93YXRjaGVycyA9IG5ldyBTZXQ8U3RhdGVXYXRjaGVyPFM+PigpO1xuXG4gIGNvbnN0IF9ub3RpZnlIYW5kbGVycyA9IChwYXlsb2FkOiBTdGF0ZTxTPikgPT4ge1xuICAgIGZvciAoY29uc3Qgc3RhdGVXYXRjaGVyIG9mIF93YXRjaGVycykge1xuICAgICAgc3RhdGVXYXRjaGVyKHBheWxvYWQpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZXQgPSAocGF5bG9hZDogU3RhdGU8Uz4pID0+IHtcbiAgICBPYmplY3QuYXNzaWduKF9zdGF0ZSwgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwYXlsb2FkKSkpO1xuICAgIF9ub3RpZnlIYW5kbGVycyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KF9zdGF0ZSkpKTtcbiAgfTtcblxuICBjb25zdCBnZXQgPSAoKTogU3RhdGU8Uz4gPT4ge1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KF9zdGF0ZSkpO1xuICB9O1xuXG4gIGNvbnN0IHdhdGNoID0gKGNhbGxiYWNrOiBTdGF0ZVdhdGNoZXI8Uz4pID0+IHtcbiAgICBfd2F0Y2hlcnMuYWRkKGNhbGxiYWNrKTtcbiAgfTtcblxuICByZXR1cm4geyBzZXQsIGdldCwgd2F0Y2ggfTtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBDaGFpbkxpbmsgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2hhaW4gPSAoKSA9PiB7XG4gIGNvbnN0IF9jaGFpbiA9IG5ldyBTZXQ8Q2hhaW5MaW5rPHVua25vd24+PigpO1xuXG4gIGNvbnN0IGFkZCA9IDxUPihjaGFpbkxpbms6IENoYWluTGluazxUPikgPT4ge1xuICAgIF9jaGFpbi5hZGQoY2hhaW5MaW5rKTtcbiAgfTtcblxuICBjb25zdCBleGVjdXRlID0gKCkgPT4ge1xuICAgIGZvciAoY29uc3QgeyBhY3Rpb24sIHZhbGlkYXRvciB9IG9mIF9jaGFpbikge1xuICAgICAgaWYgKHZhbGlkYXRvcigpKSBhY3Rpb24oKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgYWRkLCBleGVjdXRlIH07XG59O1xuIiwgImV4cG9ydCBjb25zdCBlc2NhcGVUZW1wbGF0ZVN0cmluZyA9ICh0ZW1wbGF0ZVN0cmluZzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgaWYgKHR5cGVvZiB0ZW1wbGF0ZVN0cmluZyAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIHRlbXBsYXRlU3RyaW5nO1xuICByZXR1cm4gdGVtcGxhdGVTdHJpbmdcbiAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXG4gICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXG4gICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXG4gICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXG4gICAgLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKVxuICAgIC5yZXBsYWNlKC9cXC8vZywgXCImI3gyRjtcIik7XG59O1xuXG5leHBvcnQgY29uc3QgYmluZFN0eWxlU2NvcGUgPSAoc2NvcGVJZDogc3RyaW5nLCBzdHJpbmdzOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCByZWdleCA9IC8oXFwuKFxcdyspKFxcLSp8XFxfKik/KStcXHcrL2dpO1xuICByZXR1cm4gc3RyaW5ncy5yZXBsYWNlKHJlZ2V4LCAodmFsdWVzKSA9PiB7XG4gICAgcmV0dXJuIGAuJHtzY29wZUlkfS0ke3ZhbHVlcy5yZXBsYWNlKC9cXC4vLCBcIlwiKX1gO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVVVUlEID0gKCkgPT4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMiwgNik7XG5cbmV4cG9ydCBjb25zdCBIVE1MRXZlbnRzID0gW1xuICAvLyBFdmVudG9zIGRlIE1vdXNlXG4gIFwib25jbGlja1wiLFxuICBcIm9uZGJsY2xpY2tcIixcbiAgXCJvbm1vdXNlZG93blwiLFxuICBcIm9ubW91c2V1cFwiLFxuICBcIm9ubW91c2VvdmVyXCIsXG4gIFwib25tb3VzZW91dFwiLFxuICBcIm9ubW91c2Vtb3ZlXCIsXG4gIFwib25tb3VzZWVudGVyXCIsXG4gIFwib25tb3VzZWxlYXZlXCIsXG4gIFwib25jb250ZXh0bWVudVwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgVGVjbGFkb1xuICBcIm9ua2V5ZG93blwiLFxuICBcIm9ua2V5dXBcIixcbiAgXCJvbmtleXByZXNzXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBGb2NvXG4gIFwib25mb2N1c1wiLFxuICBcIm9uYmx1clwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgRm9ybXVsXHUwMEUxcmlvXG4gIFwib25zdWJtaXRcIixcbiAgXCJvbmNoYW5nZVwiLFxuICBcIm9uaW5wdXRcIixcbiAgXCJvbnJlc2V0XCIsXG4gIFwib25pbnZhbGlkXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBNXHUwMEVEZGlhXG4gIFwib25wbGF5XCIsXG4gIFwib25wYXVzZVwiLFxuICBcIm9uZW5kZWRcIixcbiAgXCJvbnZvbHVtZWNoYW5nZVwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgVG9xdWUgKFRvdWNoKSAtIHBhcmEgZGlzcG9zaXRpdm9zIG1cdTAwRjN2ZWlzXG4gIFwib250b3VjaHN0YXJ0XCIsXG4gIFwib250b3VjaG1vdmVcIixcbiAgXCJvbnRvdWNoZW5kXCIsXG4gIFwib250b3VjaGNhbmNlbFwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgQW5pbWFcdTAwRTdcdTAwRTNvIGUgVHJhbnNpXHUwMEU3XHUwMEUzb1xuICBcIm9uYW5pbWF0aW9uc3RhcnRcIixcbiAgXCJvbmFuaW1hdGlvbmVuZFwiLFxuICBcIm9uYW5pbWF0aW9uaXRlcmF0aW9uXCIsXG4gIFwib250cmFuc2l0aW9uZW5kXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBPdXRyb3MgSW50ZXJhdGl2b3NcbiAgXCJvbmxvYWRcIixcbiAgXCJvbmVycm9yXCIsXG4gIFwib25yZXNpemVcIixcbiAgXCJvbnNjcm9sbFwiLFxuXTtcbiIsICJpbXBvcnQgeyBIVE1MRXZlbnRzIH0gZnJvbSBcIkAvdXRpbHNcIjtcblxuY29uc3QgaXNPYmplY3QgPVxuICA8VD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICByZXR1cm4gISFwYXlsb2FkICYmICFBcnJheS5pc0FycmF5KHBheWxvYWQpICYmIHR5cGVvZiBwYXlsb2FkID09PSBcIm9iamVjdFwiO1xuICAgIH07XG5cbmNvbnN0IGlzQXJyYXkgPVxuICA8VD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICByZXR1cm4gISFwYXlsb2FkICYmIEFycmF5LmlzQXJyYXkocGF5bG9hZCk7XG4gICAgfTtcblxuY29uc3QgaXNGdW5jdGlvbiA9XG4gIDxUID0gdm9pZD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICByZXR1cm4gISFwYXlsb2FkICYmIHR5cGVvZiBwYXlsb2FkID09PSBcImZ1bmN0aW9uXCI7XG4gICAgfTtcblxuY29uc3QgaXNTdHJpbmcgPVxuICA8VCA9IHZvaWQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkID09PSBcInN0cmluZ1wiO1xuICAgIH07XG5cbmNvbnN0IGlzRXZlbnROYW1lID1cbiAgPFQgPSB2b2lkPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgcGF5bG9hZCAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIEhUTUxFdmVudHMuaW5jbHVkZXMocGF5bG9hZC50b0xvd2VyQ2FzZSgpKTtcbiAgICB9O1xuXG5jb25zdCBpc1RlbXBsYXRlRGF0YSA9XG4gIDxUID0gdm9pZD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICByZXR1cm4gdHlwZW9mIHBheWxvYWQgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHBheWxvYWQgPT09IFwibnVtYmVyXCI7XG4gICAgfTtcblxuZXhwb3J0IHsgaXNPYmplY3QsIGlzQXJyYXksIGlzRnVuY3Rpb24sIGlzU3RyaW5nLCBpc0V2ZW50TmFtZSwgaXNUZW1wbGF0ZURhdGEgfTtcbiIsICJpbXBvcnQgdHlwZSB7IFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIkAvdHlwZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUNoYWluIH0gZnJvbSBcIkAvZmFjdG9yaWVzXCI7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZSwgY3JlYXRlRWxlbWVudEJ5VGFnTmFtZSB9IGZyb20gXCJAL2FjdGlvbnNcIjtcbmltcG9ydCB7IGlzRnVuY3Rpb24sIGlzU3RyaW5nIH0gZnJvbSBcIkAvdmFsaWRhdG9yc1wiO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJUZW1wbGF0ZU9iamVjdCA9XG4gICh0ZW1wbGF0ZTogVGVtcGxhdGVTY2hlbWEsIGNvbnRleHRFbGVtZW50OiBFbGVtZW50LCBzdGF0ZTogU3RhdGUgPSB7fSkgPT5cbiAgICAoKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBfY2hhaW4gPSBjcmVhdGVDaGFpbigpO1xuXG4gICAgICBfY2hhaW4uYWRkKHtcbiAgICAgICAgdmFsaWRhdG9yOiBpc1N0cmluZyh0ZW1wbGF0ZS50eXBlKSxcbiAgICAgICAgYWN0aW9uOiBjcmVhdGVFbGVtZW50QnlUYWdOYW1lKHRlbXBsYXRlLCBjb250ZXh0RWxlbWVudCwgc3RhdGUpLFxuICAgICAgfSk7XG5cbiAgICAgIF9jaGFpbi5hZGQoe1xuICAgICAgICB2YWxpZGF0b3I6IGlzRnVuY3Rpb24odGVtcGxhdGUudHlwZSksXG4gICAgICAgIGFjdGlvbjogY3JlYXRlRWxlbWVudEJ5RmFjdG9yeU5hbWUodGVtcGxhdGUsIGNvbnRleHRFbGVtZW50LCBzdGF0ZSksXG4gICAgICB9KTtcblxuICAgICAgX2NoYWluLmV4ZWN1dGUoKTtcbiAgICB9O1xuIiwgImltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJAL3JlbmRlclwiO1xuaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3R5cGVzXCI7XG5pbXBvcnQgdHlwZSB7IFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcblxuZXhwb3J0IGNvbnN0IHJlbmRlclRlbXBsYXRlQXJyYXkgPVxuICAoXG4gICAgdGVtcGxhdGVTY2hlbWE6IFRlbXBsYXRlU2NoZW1hW10sXG4gICAgY29udGV4dEVsZW1lbnQ6IEVsZW1lbnQsXG4gICAgc3RhdGU6IFN0YXRlID0ge30sXG4gICkgPT5cbiAgICAoKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IHRlbXBsYXRlIG9mIHRlbXBsYXRlU2NoZW1hKSB7XG4gICAgICAgIHJlbmRlcih0ZW1wbGF0ZSwgY29udGV4dEVsZW1lbnQsIHN0YXRlKTtcbiAgICAgIH1cbiAgICB9O1xuIiwgImltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJAL3JlbmRlclwiO1xuaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3RlbXBsYXRlXCI7XG5pbXBvcnQgdHlwZSB7IFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcblxuZXhwb3J0IGNvbnN0IHJlbmRlckNoaWxkcmVuID0gKFxuICBjaGlsZHJlbjogVGVtcGxhdGVTY2hlbWFbXSxcbiAgcGFyZW50RWxlbWVudDogRWxlbWVudCxcbiAgc3RhdGU6IFN0YXRlID0ge30sXG4pID0+IHtcbiAgcGFyZW50RWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICBpZiAoIUFycmF5LmlzQXJyYXkoY2hpbGRyZW4pICYmIHR5cGVvZiBjaGlsZHJlbiA9PT0gXCJvYmplY3RcIikge1xuICAgIHJlbmRlcihjaGlsZHJlbiwgcGFyZW50RWxlbWVudCwgc3RhdGUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICByZW5kZXIoY2hpbGQsIHBhcmVudEVsZW1lbnQsIHN0YXRlKTtcbiAgfVxufTtcbiIsICJ2YXIgbj1mdW5jdGlvbih0LHMscixlKXt2YXIgdTtzWzBdPTA7Zm9yKHZhciBoPTE7aDxzLmxlbmd0aDtoKyspe3ZhciBwPXNbaCsrXSxhPXNbaF0/KHNbMF18PXA/MToyLHJbc1toKytdXSk6c1srK2hdOzM9PT1wP2VbMF09YTo0PT09cD9lWzFdPU9iamVjdC5hc3NpZ24oZVsxXXx8e30sYSk6NT09PXA/KGVbMV09ZVsxXXx8e30pW3NbKytoXV09YTo2PT09cD9lWzFdW3NbKytoXV0rPWErXCJcIjpwPyh1PXQuYXBwbHkoYSxuKHQsYSxyLFtcIlwiLG51bGxdKSksZS5wdXNoKHUpLGFbMF0/c1swXXw9Mjooc1toLTJdPTAsc1toXT11KSk6ZS5wdXNoKGEpfXJldHVybiBlfSx0PW5ldyBNYXA7ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocyl7dmFyIHI9dC5nZXQodGhpcyk7cmV0dXJuIHJ8fChyPW5ldyBNYXAsdC5zZXQodGhpcyxyKSksKHI9bih0aGlzLHIuZ2V0KHMpfHwoci5zZXQocyxyPWZ1bmN0aW9uKG4pe2Zvcih2YXIgdCxzLHI9MSxlPVwiXCIsdT1cIlwiLGg9WzBdLHA9ZnVuY3Rpb24obil7MT09PXImJihufHwoZT1lLnJlcGxhY2UoL15cXHMqXFxuXFxzKnxcXHMqXFxuXFxzKiQvZyxcIlwiKSkpP2gucHVzaCgwLG4sZSk6Mz09PXImJihufHxlKT8oaC5wdXNoKDMsbixlKSxyPTIpOjI9PT1yJiZcIi4uLlwiPT09ZSYmbj9oLnB1c2goNCxuLDApOjI9PT1yJiZlJiYhbj9oLnB1c2goNSwwLCEwLGUpOnI+PTUmJigoZXx8IW4mJjU9PT1yKSYmKGgucHVzaChyLDAsZSxzKSxyPTYpLG4mJihoLnB1c2gocixuLDAscykscj02KSksZT1cIlwifSxhPTA7YTxuLmxlbmd0aDthKyspe2EmJigxPT09ciYmcCgpLHAoYSkpO2Zvcih2YXIgbD0wO2w8blthXS5sZW5ndGg7bCsrKXQ9blthXVtsXSwxPT09cj9cIjxcIj09PXQ/KHAoKSxoPVtoXSxyPTMpOmUrPXQ6ND09PXI/XCItLVwiPT09ZSYmXCI+XCI9PT10PyhyPTEsZT1cIlwiKTplPXQrZVswXTp1P3Q9PT11P3U9XCJcIjplKz10OidcIic9PT10fHxcIidcIj09PXQ/dT10OlwiPlwiPT09dD8ocCgpLHI9MSk6ciYmKFwiPVwiPT09dD8ocj01LHM9ZSxlPVwiXCIpOlwiL1wiPT09dCYmKHI8NXx8XCI+XCI9PT1uW2FdW2wrMV0pPyhwKCksMz09PXImJihoPWhbMF0pLHI9aCwoaD1oWzBdKS5wdXNoKDIsMCxyKSxyPTApOlwiIFwiPT09dHx8XCJcXHRcIj09PXR8fFwiXFxuXCI9PT10fHxcIlxcclwiPT09dD8ocCgpLHI9Mik6ZSs9dCksMz09PXImJlwiIS0tXCI9PT1lJiYocj00LGg9aFswXSl9cmV0dXJuIHAoKSxofShzKSksciksYXJndW1lbnRzLFtdKSkubGVuZ3RoPjE/cjpyWzBdfVxuIiwgImltcG9ydCBodG0gZnJvbSBcImh0bVwiO1xuaW1wb3J0IHR5cGUgeyBUYWdnZWRUZW1wbGF0ZSwgVGVtcGxhdGVQcm9wcywgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCBoeXBlcnRleHQgPSAoXG4gIHR5cGU6IHVua25vd24sXG4gIHByb3BzOiBUZW1wbGF0ZVByb3BzLFxuICAuLi5jaGlsZHJlbjogVGVtcGxhdGVTY2hlbWFbXVxuKSA9PiB7XG4gIHJldHVybiB7IHR5cGUsIHByb3BzLCBjaGlsZHJlbiB9O1xufTtcblxuY29uc3QgaHRtbCA9IGh0bS5iaW5kPFRhZ2dlZFRlbXBsYXRlPihoeXBlcnRleHQpO1xuXG5leHBvcnQgeyBodG1sIH07XG5leHBvcnQgeyBodG1sIGFzIGpzeCB9O1xuZXhwb3J0IHsgaHRtbCBhcyB0c3ggfTtcbiIsICIvKipcbiAqIEdlcmEgdW0gaGFzaCBcdTAwRkFuaWNvIGJhc2VhZG8gbm8gYWxnb3JpdG1vIERKQjIuXG4gKiBAcGFyYW0gc3RyIC0gTyBjb250ZVx1MDBGQWRvIGEgcGFydGlyIGRvIHF1YWwgbyBoYXNoIHNlclx1MDBFMSBnZXJhZG8uXG4gKiBAcmV0dXJucyBPIGhhc2ggZ2VyYWRvIGNvbW8gdW1hIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUhhc2ggPSAodGV4dDogc3RyaW5nLCBzZWxlY3Rvcjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgbGV0IGhhc2ggPSA1MzgxO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcbiAgICBoYXNoID0gKGhhc2ggKiAzMykgXiB0ZXh0LmNoYXJDb2RlQXQoaSk7XG4gIH1cbiAgcmV0dXJuIGAke3NlbGVjdG9yfS0keyhoYXNoID4+PiAwKS50b1N0cmluZygzNil9YDtcbn07XG4iLCAiY29uc3Qgc3R5bGVFbGVtZW50Q2FjaGU6IE1hcDxzdHJpbmcsIEhUTUxTdHlsZUVsZW1lbnQ+ID0gbmV3IE1hcCgpO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU3R5bGVFbGVtZW50ID0gKGNvbXBvbmVudElkOiBzdHJpbmcpOiBIVE1MU3R5bGVFbGVtZW50ID0+IHtcbiAgY29uc3Qgc3R5bGVFbGVtZW50ID0gc3R5bGVFbGVtZW50Q2FjaGUuZ2V0KGNvbXBvbmVudElkKTtcblxuICBpZiAoc3R5bGVFbGVtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gc3R5bGVFbGVtZW50O1xuICB9XG5cbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIHN0eWxlLnNldEF0dHJpYnV0ZShcImRhdGEtY29tcG9uZW50XCIsIGNvbXBvbmVudElkKTtcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIHN0eWxlRWxlbWVudENhY2hlLnNldChjb21wb25lbnRJZCwgc3R5bGUpO1xuXG4gIHJldHVybiBzdHlsZTtcbn07XG4iLCAidHlwZSBXcmFwU3R5bGVQYXJhbXMgPSB7XG4gIHN0eWxlOiBzdHJpbmc7XG4gIHNlbGVjdG9yOiBzdHJpbmc7XG59O1xuXG50eXBlIEFjY3VtdWxhdG9yID0ge1xuICBpbnNpZGVCbG9jazogbnVtYmVyO1xuICBnbG9iYWxSdWxlczogc3RyaW5nO1xuICByZXN1bHQ6IHN0cmluZztcbn07XG5cbnR5cGUgTGluZVByb2Nlc3NpbmcgPSB7XG4gIGdsb2JhbFJ1bGVzOiBzdHJpbmc7XG4gIHJlc3VsdDogc3RyaW5nO1xufTtcblxuY29uc3Qgd3JhcExvb3NlUnVsZXNPdXRzaWRlTWVkaWFRdWVyeSA9ICh7XG4gIHN0eWxlLFxuICBzZWxlY3Rvcixcbn06IFdyYXBTdHlsZVBhcmFtcyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGxpbmVzID0gc3R5bGUuc3BsaXQoXCJcXG5cIik7XG4gIGNvbnN0IHJ1bGVSZWdleCA9IC9eXFxzKihbXFx3LV0rKVxccyo6XFxzKlteO10rOy87XG5cbiAgY29uc3QgaW5pdGlhbFN0YXRlOiBBY2N1bXVsYXRvciA9IHtcbiAgICBpbnNpZGVCbG9jazogMCxcbiAgICBnbG9iYWxSdWxlczogXCJcIixcbiAgICByZXN1bHQ6IFwiXCIsXG4gIH07XG5cbiAgY29uc3QgcHJvY2Vzc0dsb2JhbFJ1bGVzID0gKFxuICAgIGdsb2JhbFJ1bGVzOiBzdHJpbmcsXG4gICAgcmVzdWx0OiBzdHJpbmcsXG4gICAgc2VsZWN0b3I6IHN0cmluZyxcbiAgKTogTGluZVByb2Nlc3NpbmcgPT4gKHtcbiAgICBnbG9iYWxSdWxlczogXCJcIixcbiAgICByZXN1bHQ6IGAke3Jlc3VsdH0ke3NlbGVjdG9yfSB7XFxuJHtnbG9iYWxSdWxlc319XFxuXFxuYCxcbiAgfSk7XG5cbiAgY29uc3QgcHJvY2Vzc1JlZ3VsYXJMaW5lID0gKFxuICAgIGxpbmU6IHN0cmluZyxcbiAgICByZXN1bHQ6IHN0cmluZyxcbiAgKTogTGluZVByb2Nlc3NpbmcgPT4gKHtcbiAgICBnbG9iYWxSdWxlczogXCJcIixcbiAgICByZXN1bHQ6IGAke3Jlc3VsdH0ke2xpbmV9XFxuYCxcbiAgfSk7XG5cbiAgY29uc3QgYWRkR2xvYmFsUnVsZSA9IChcbiAgICBsaW5lOiBzdHJpbmcsXG4gICAgZ2xvYmFsUnVsZXM6IHN0cmluZyxcbiAgKTogTGluZVByb2Nlc3NpbmcgPT4gKHtcbiAgICBnbG9iYWxSdWxlczogYCR7Z2xvYmFsUnVsZXN9JHtsaW5lfVxcbmAsXG4gICAgcmVzdWx0OiBcIlwiLFxuICB9KTtcblxuICBjb25zdCBjb3VudEJsb2NrcyA9IChsaW5lOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IG9wZW5pbmdzID0gKGxpbmUubWF0Y2goL3svZykgfHwgW10pLmxlbmd0aDtcbiAgICBjb25zdCBjbG9zaW5ncyA9IChsaW5lLm1hdGNoKC99L2cpIHx8IFtdKS5sZW5ndGg7XG4gICAgcmV0dXJuIG9wZW5pbmdzIC0gY2xvc2luZ3M7XG4gIH07XG5cbiAgY29uc3QgcHJvY2Vzc0xpbmUgPSAoYWNjOiBBY2N1bXVsYXRvciwgbGluZTogc3RyaW5nKTogQWNjdW11bGF0b3IgPT4ge1xuICAgIGFjYy5pbnNpZGVCbG9jayArPSBjb3VudEJsb2NrcyhsaW5lKTtcblxuICAgIC8vIENhc2UgMTogTGluZSBpcyBhIGdsb2JhbCBydWxlXG4gICAgaWYgKGFjYy5pbnNpZGVCbG9jayA9PT0gMCAmJiBydWxlUmVnZXgudGVzdChsaW5lKSkge1xuICAgICAgY29uc3QgeyBnbG9iYWxSdWxlcywgcmVzdWx0IH0gPSBhZGRHbG9iYWxSdWxlKGxpbmUsIGFjYy5nbG9iYWxSdWxlcyk7XG4gICAgICByZXR1cm4geyAuLi5hY2MsIGdsb2JhbFJ1bGVzLCByZXN1bHQ6IGFjYy5yZXN1bHQgKyByZXN1bHQgfTtcbiAgICB9XG5cbiAgICAvLyBDYXNlIDI6IFRoZXJlIGFyZSBhY2N1bXVsYXRlZCBnbG9iYWwgcnVsZXNcbiAgICBpZiAoYWNjLmdsb2JhbFJ1bGVzKSB7XG4gICAgICBjb25zdCB7IGdsb2JhbFJ1bGVzLCByZXN1bHQgfSA9IHByb2Nlc3NHbG9iYWxSdWxlcyhcbiAgICAgICAgYWNjLmdsb2JhbFJ1bGVzLFxuICAgICAgICBhY2MucmVzdWx0LFxuICAgICAgICBzZWxlY3RvcixcbiAgICAgICk7XG4gICAgICBjb25zdCBwcm9jZXNzZWRMaW5lID0gcHJvY2Vzc1JlZ3VsYXJMaW5lKGxpbmUsIFwiXCIpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYWNjLFxuICAgICAgICBnbG9iYWxSdWxlcyxcbiAgICAgICAgcmVzdWx0OiByZXN1bHQgKyBwcm9jZXNzZWRMaW5lLnJlc3VsdCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gQ2FzZSAzOiBSZWd1bGFyIGxpbmVcbiAgICBjb25zdCB7IGdsb2JhbFJ1bGVzLCByZXN1bHQgfSA9IHByb2Nlc3NSZWd1bGFyTGluZShsaW5lLCBhY2MucmVzdWx0KTtcbiAgICByZXR1cm4geyAuLi5hY2MsIGdsb2JhbFJ1bGVzLCByZXN1bHQgfTtcbiAgfTtcblxuICBjb25zdCB7IHJlc3VsdCwgZ2xvYmFsUnVsZXMgfSA9IGxpbmVzLnJlZHVjZShwcm9jZXNzTGluZSwgaW5pdGlhbFN0YXRlKTtcblxuICByZXR1cm4gZ2xvYmFsUnVsZXNcbiAgICA/IGAke3Jlc3VsdH0ke3NlbGVjdG9yfSB7XFxuJHtnbG9iYWxSdWxlc319XFxuYC50cmltKClcbiAgICA6IHJlc3VsdC50cmltKCk7XG59O1xuXG5jb25zdCB3cmFwTG9vc2VSdWxlc0luc2lkZU1lZGlhUXVlcnkgPSAoe1xuICBzdHlsZSxcbiAgc2VsZWN0b3IsXG59OiBXcmFwU3R5bGVQYXJhbXMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCByZWdleCA9IC9AbWVkaWFcXHMqKFtee10rKVxccypcXHsoW1xcc1xcU10qPylcXH0vZztcbiAgY29uc3QgcnVsZVJlZ2V4ID0gL15cXHMqKFtcXHctXSspXFxzKjpcXHMqW147XSs7LztcblxuICByZXR1cm4gc3R5bGUucmVwbGFjZShyZWdleCwgKG1hdGNoLCBtZWRpYVF1ZXJ5LCBpbm5lckNzcykgPT4ge1xuICAgIGNvbnN0IHJ1bGVzID0gaW5uZXJDc3NcbiAgICAgIC50cmltKClcbiAgICAgIC5zcGxpdChcIlxcblwiKVxuICAgICAgLm1hcCgobGluZTogc3RyaW5nKSA9PiBsaW5lLnRyaW0oKSlcbiAgICAgIC5maWx0ZXIoKGxpbmU6IHN0cmluZykgPT4gbGluZSk7XG5cbiAgICBjb25zdCB3cmFwcGVkUnVsZXMgPSBydWxlc1xuICAgICAgLmZpbHRlcigocnVsZTogc3RyaW5nKSA9PiBydWxlUmVnZXgudGVzdChydWxlKSlcbiAgICAgIC5tYXAoKHJ1bGU6IHN0cmluZykgPT4gYCR7c2VsZWN0b3J9IHtcXG4ke3J1bGUudHJpbSgpfVxcbn1gKVxuICAgICAgLmpvaW4oXCJcXG5cIik7XG5cbiAgICByZXR1cm4gYEBtZWRpYSAke21lZGlhUXVlcnkudHJpbSgpfSB7XFxuJHt3cmFwcGVkUnVsZXN9XFxufWA7XG4gIH0pO1xufTtcblxuY29uc3QgYXBwbHlDbGFzc05hbWVTY29wZSA9ICh7IHN0eWxlLCBzZWxlY3RvciB9OiBXcmFwU3R5bGVQYXJhbXMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCByZWdleCA9IC9cXC4oXFx3KykvZztcbiAgcmV0dXJuIHN0eWxlLnJlcGxhY2UocmVnZXgsIGAuJHtzZWxlY3Rvcn1fJDFgKTtcbn07XG5cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1TdHlsZSA9IChyYXdTdHlsZTogc3RyaW5nLCBzZWxlY3Rvcjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgbGV0IHN0eWxlID0gcmF3U3R5bGU7XG4gIGNvbnN0IGNsYXNzTmFtZSA9IGAuJHtzZWxlY3Rvcn1gO1xuICBzdHlsZSA9IGFwcGx5Q2xhc3NOYW1lU2NvcGUoeyBzdHlsZSwgc2VsZWN0b3IgfSk7XG4gIHN0eWxlID0gd3JhcExvb3NlUnVsZXNPdXRzaWRlTWVkaWFRdWVyeSh7IHN0eWxlLCBzZWxlY3RvcjogY2xhc3NOYW1lIH0pO1xuICBzdHlsZSA9IHdyYXBMb29zZVJ1bGVzSW5zaWRlTWVkaWFRdWVyeSh7IHN0eWxlLCBzZWxlY3RvcjogY2xhc3NOYW1lIH0pO1xuXG4gIHJldHVybiBzdHlsZTtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBUYWdnZWRTdHlsZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBjcmVhdGVIYXNoIH0gZnJvbSBcIi4vY3JlYXRlSGFzaFwiO1xuaW1wb3J0IHsgdHJhbnNmb3JtU3R5bGUgfSBmcm9tIFwiLi9jc3NQYXJzZXJcIjtcbmltcG9ydCB7IGNyZWF0ZVN0eWxlRWxlbWVudCB9IGZyb20gXCIuL2NyZWF0ZVN0eWxlRWxlbWVudFwiO1xuXG50eXBlIEhhbmRsZXJQYXJhbXMgPSB7XG4gIGhhc2hJZDogc3RyaW5nO1xuICBzY29wZWRTdHlsZTogc3RyaW5nO1xuICBzdHlsZUVsZW1lbnQ6IEVsZW1lbnQ7XG59O1xudHlwZSBIYW5kbGVyID0gKHBheWxvYWQ6IEhhbmRsZXJQYXJhbXMpID0+IHZvaWQ7XG5cbmNvbnN0IGNzc0NhY2hlOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xuXG5leHBvcnQgY29uc3QgY3NzID1cbiAgKHNlbGVjdG9yOiBzdHJpbmcsIGhhbmRsZXI6IEhhbmRsZXIgPSAoKSA9PiB7fSk6IFRhZ2dlZFN0eWxlID0+XG4gIChcbiAgICBzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSxcbiAgICAuLi5pbnRlcnBvbGF0aW9uczogKHN0cmluZyB8IG51bWJlcilbXVxuICApOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IHJhd0NTUyA9IHN0cmluZ3MucmVkdWNlKFxuICAgICAgKGFjY3VtdWxhdG9yLCBzdHIsIGluZGV4KSA9PlxuICAgICAgICBgJHthY2N1bXVsYXRvcn0ke3N0cn0ke2ludGVycG9sYXRpb25zW2luZGV4XSAhPT0gdW5kZWZpbmVkID8gaW50ZXJwb2xhdGlvbnNbaW5kZXhdIDogXCJcIn1gLFxuICAgICAgXCJcIixcbiAgICApO1xuXG4gICAgY29uc3QgY2FjaGVkQ2xhc3NOYW1lID0gY3NzQ2FjaGUuZ2V0KHJhd0NTUyk7XG4gICAgaWYgKGNhY2hlZENsYXNzTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gY2FjaGVkQ2xhc3NOYW1lO1xuICAgIH1cblxuICAgIGNvbnN0IGhhc2hJZCA9IGNyZWF0ZUhhc2gocmF3Q1NTLCBzZWxlY3Rvcik7XG4gICAgY29uc3Qgc2NvcGVkU3R5bGUgPSB0cmFuc2Zvcm1TdHlsZShyYXdDU1MsIGAke2hhc2hJZH1gKTtcbiAgICBjb25zdCBzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoYCR7aGFzaElkfWApO1xuXG4gICAgaGFuZGxlcih7IGhhc2hJZCwgc2NvcGVkU3R5bGUsIHN0eWxlRWxlbWVudCB9KTtcblxuICAgIGlmICghc3R5bGVFbGVtZW50LmlubmVySFRNTC5pbmNsdWRlcyhzY29wZWRTdHlsZSkpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5pbm5lckhUTUwgKz0gc2NvcGVkU3R5bGU7XG4gICAgfVxuXG4gICAgY3NzQ2FjaGUuc2V0KHJhd0NTUywgaGFzaElkKTtcblxuICAgIHJldHVybiBoYXNoSWQ7XG4gIH07XG4iLCAiaW1wb3J0IHsgaXNFdmVudE5hbWUgfSBmcm9tIFwiQC92YWxpZGF0b3JzXCI7XG5cbnR5cGUgQXR0cmlidXRlID0gb2JqZWN0ICYge1xuICBba2V5OiBzeW1ib2wgfCBzdHJpbmddOiB1bmtub3duO1xufTtcblxudHlwZSBFdmVudEhhbmRsZXIgPSA8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50RXZlbnRNYXA+KFxuICBldmVudDogSFRNTEVsZW1lbnRFdmVudE1hcFtLXSxcbikgPT4gdm9pZDtcblxuZXhwb3J0IGNvbnN0IHNldEVsZW1lbnRBdHRyaWJ1dGVzID0gKFxuICBlbGVtZW50OiBFbGVtZW50LFxuICBhdHRyaWJ1dGVzOiBBdHRyaWJ1dGUsXG4pOiBFbGVtZW50ID0+IHtcbiAgY29uc3QgYXR0cmlidXRlS2V5cyA9IGF0dHJpYnV0ZXMgPyBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKSA6IFtdO1xuICBmb3IgKGNvbnN0IGtleSBvZiBhdHRyaWJ1dGVLZXlzKSB7XG4gICAgaWYgKCFpc0V2ZW50TmFtZShrZXkpKCkpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldIGFzIHN0cmluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGtleVxuICAgICAgICAucmVwbGFjZSgvb24vLCBcIlwiKVxuICAgICAgICAudG9Mb3dlckNhc2UoKSBhcyBrZXlvZiBIVE1MRWxlbWVudEV2ZW50TWFwO1xuICAgICAgY29uc3QgZXZlbnRIYW5kbGVyID0gYXR0cmlidXRlc1trZXldIGFzIEV2ZW50SGFuZGxlcjtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50SGFuZGxlcik7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbGVtZW50O1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIkAvdGVtcGxhdGVcIjtcbmltcG9ydCB0eXBlIHsgR2VuZXJpY09iamVjdCwgU3RhdGUsIFN0YXRlTWFuYWdlciB9IGZyb20gXCJAL3N0YXRlXCI7XG5pbXBvcnQgeyBjcmVhdGVTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiQC9yZW5kZXJcIjtcbmltcG9ydCB7IGh0bWwsIGpzeCwgdHN4IH0gZnJvbSBcIkAvdGVtcGxhdGVcIjtcbmltcG9ydCB7IGNzcyB9IGZyb20gXCJAL3N0eWxlXCI7XG5pbXBvcnQgeyByZW5kZXJDaGlsZHJlbiB9IGZyb20gXCIuL3JlbmRlckNoaWxkcmVuXCI7XG5pbXBvcnQgeyBzZXRFbGVtZW50QXR0cmlidXRlcyB9IGZyb20gXCIuL3NldEVsZW1lbnRBdHRyaWJ1dGVzXCI7XG5cbnR5cGUgRmFjdG9yeSA9IChwYXJhbXM/OiB1bmtub3duKSA9PiB1bmtub3duO1xuXG50eXBlIFN0eWxlUGFyYW1zID0ge1xuICBwcm9wczogU3RhdGU7XG4gIHN0YXRlOiBTdGF0ZTtcbiAgY3NzOiBSZXR1cm5UeXBlPHR5cGVvZiBjc3M+O1xufTtcblxudHlwZSBTdHlsZXMgPSB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xudHlwZSBTdHlsZXNPYmplY3QgPSBHZW5lcmljT2JqZWN0PHsgW2tleTogc3RyaW5nXTogKCkgPT4gc3RyaW5nIH0+O1xudHlwZSBTdHlsZUhhbmRsZXJGYWN0b3J5ID0gKCkgPT4gU3R5bGVzT2JqZWN0O1xudHlwZSBTdHlsZUhhbmRsZXIgPSAocGFyYW1zOiBTdHlsZVBhcmFtcykgPT4gc3RyaW5nO1xuXG50eXBlIFRlbXBsYXRlUGFyYW1zID0ge1xuICBwcm9wczogU3RhdGU7XG4gIHN0YXRlOiBTdGF0ZTtcbiAgaHRtbDogdHlwZW9mIGh0bWw7XG4gIGpzeDogdHlwZW9mIGpzeDtcbiAgdHN4OiB0eXBlb2YgdHN4O1xuICBzdHlsZXM6IFN0eWxlcztcbiAgYWN0aW9uczogQWN0aW9ucztcbn07XG5cbnR5cGUgVGVtcGxhdGVJbmplY3Rpb25zID0gPFQgPSB1bmtub3duPigpID0+IEdlbmVyaWNPYmplY3Q8VD47XG5cbnR5cGUgVGVtcGxhdGVIYW5kbGVyID0gKFxuICBwYXJhbXM6IFRlbXBsYXRlUGFyYW1zLFxuICBpbmplY3Rpb25zOiBUZW1wbGF0ZUluamVjdGlvbnMsXG4pID0+IHZvaWQ7XG5cbnR5cGUgQWN0aW9ucyA9IEdlbmVyaWNPYmplY3Q7XG5cbnR5cGUgQWN0aW9uUGFyYW1zID0ge1xuICBwcm9wczogU3RhdGU7XG4gIHN0YXRlOiBTdGF0ZU1hbmFnZXI7XG59O1xudHlwZSBBY3Rpb25IYW5kbGVyRmFjdG9yeSA9IChwYXJhbXM6IEFjdGlvblBhcmFtcykgPT4gR2VuZXJpY09iamVjdDtcblxudHlwZSBBdHRyaWJ1dGUgPSBvYmplY3QgJiB7XG4gIFtrZXk6IHN5bWJvbCB8IHN0cmluZ106IHVua25vd247XG59O1xuXG5jb25zdCBfYXR0cmlidXRlcyA9IHt9O1xuXG5jb25zdCBfY3JlYXRlVGFnQnlGYWN0b3J5TmFtZSA9IChmYWN0b3J5OiBGYWN0b3J5KSA9PiB7XG4gIHJldHVybiBmYWN0b3J5Lm5hbWVcbiAgICAuc3BsaXQoLyg/PVtBLVpdKS8pXG4gICAgLmpvaW4oXCItXCIpXG4gICAgLnRvTG93ZXJDYXNlKCk7XG59O1xuXG5jb25zdCBfY3JlYXRlVXNlU3RhdGUgPSAoc3RhdGU6IFN0YXRlTWFuYWdlcikgPT4ge1xuICBjb25zdCBjdXJyZW50U3RhdGUgPSB7fTtcbiAgY29uc3QgdXNlU3RhdGUgPSA8VD4oaW5pdGlhbFN0YXRlOiBTdGF0ZTxUPik6IFN0YXRlTWFuYWdlciA9PiB7XG4gICAgY29uc3QgbGF0ZXN0U3RhdGUgPSBzdGF0ZS5nZXQoKSBhcyBTdGF0ZTxUPjtcbiAgICBzdGF0ZS5zZXQoeyAuLi5pbml0aWFsU3RhdGUsIC4uLmxhdGVzdFN0YXRlIH0pO1xuXG4gICAgT2JqZWN0LmFzc2lnbihjdXJyZW50U3RhdGUsIHN0YXRlLmdldCgpKTtcbiAgICByZXR1cm4geyBnZXQ6IHN0YXRlLmdldCwgc2V0OiBzdGF0ZS5zZXQsIHdhdGNoOiBzdGF0ZS53YXRjaCB9O1xuICB9O1xuICByZXR1cm4geyBjdXJyZW50U3RhdGUsIHVzZVN0YXRlIH07XG59O1xuXG5jb25zdCBfY3JlYXRlVXNlU3R5bGUgPSAoeyBwcm9wcywgc3RhdGUsIGNzcyB9OiBTdHlsZVBhcmFtcykgPT4ge1xuICBjb25zdCBzdHlsZXNoZWV0ID0ge307XG4gIGNvbnN0IHVzZVN0eWxlID0gKGNzc0hhbmRsZXJGYWN0b3J5OiBTdHlsZUhhbmRsZXJGYWN0b3J5KSA9PiB7XG4gICAgY29uc3QgaGFuZGxlcnMgPSBjc3NIYW5kbGVyRmFjdG9yeSgpO1xuICAgIGNvbnN0IHN0eWxlczogU3R5bGVzID0ge307XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBoYW5kbGVycykge1xuICAgICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzW2tleV0gYXMgU3R5bGVIYW5kbGVyO1xuICAgICAgY29uc3Qgc3R5bGUgPSBoYW5kbGVyKHsgcHJvcHMsIHN0YXRlLCBjc3MgfSk7XG4gICAgICBzdHlsZXNba2V5XSA9IHN0eWxlO1xuICAgIH1cblxuICAgIE9iamVjdC5hc3NpZ24oc3R5bGVzaGVldCwgc3R5bGVzKTtcbiAgICByZXR1cm4gc3R5bGVzO1xuICB9O1xuXG4gIHJldHVybiB7IHN0eWxlczogc3R5bGVzaGVldCwgdXNlU3R5bGUgfTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VUZW1wbGF0ZSA9IChwYXJhbXM6IFRlbXBsYXRlUGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVzZVRlbXBsYXRlID0gKFxuICAgIHRlbXBsYXRlSGFuZGxlcjogVGVtcGxhdGVIYW5kbGVyLFxuICAgIHRlbXBsYXRlSW5qZWN0aW9uczogVGVtcGxhdGVJbmplY3Rpb25zLFxuICApID0+IHtcbiAgICByZXR1cm4gdGVtcGxhdGVIYW5kbGVyKHBhcmFtcywgdGVtcGxhdGVJbmplY3Rpb25zKTtcbiAgfTtcblxuICByZXR1cm4gdXNlVGVtcGxhdGU7XG59O1xuXG5jb25zdCBfY3JlYXRlVXNlQWN0aW9uID0gKHsgcHJvcHMsIHN0YXRlIH06IEFjdGlvblBhcmFtcykgPT4ge1xuICBjb25zdCBhY3Rpb25zOiBHZW5lcmljT2JqZWN0ID0ge307XG5cbiAgY29uc3QgdXNlQWN0aW9uID0gKGFjdGlvbkhhbmRsZXJGYWN0b3J5OiBBY3Rpb25IYW5kbGVyRmFjdG9yeSkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZXJBY3Rpb25zID0gYWN0aW9uSGFuZGxlckZhY3RvcnkoeyBwcm9wcywgc3RhdGUgfSk7XG4gICAgT2JqZWN0LmFzc2lnbihhY3Rpb25zLCBoYW5kbGVyQWN0aW9ucyk7XG4gIH07XG5cbiAgcmV0dXJuIHsgYWN0aW9ucywgdXNlQWN0aW9uIH07XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRWxlbWVudEJ5RmFjdG9yeU5hbWUgPSAoXG4gIHRlbXBsYXRlOiBUZW1wbGF0ZVNjaGVtYSxcbiAgcGFyZW50RWxlbWVudDogRWxlbWVudCxcbiAgbGF0ZXN0U3RhdGU6IFN0YXRlID0ge30sXG4pID0+IHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBjb25zdCBmYWN0b3J5ID0gdGVtcGxhdGUudHlwZSBhcyBGYWN0b3J5O1xuICAgIGNvbnN0IHRhZ05hbWUgPSBfY3JlYXRlVGFnQnlGYWN0b3J5TmFtZShmYWN0b3J5KTtcbiAgICBjb25zdCBzZWxlY3RvciA9IHRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcblxuICAgIGNvbnN0IHByb3BzID0gdGVtcGxhdGUucHJvcHM7XG4gICAgY29uc3QgbGF0ZXN0RGVlcFN0YXRlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShsYXRlc3RTdGF0ZSkpO1xuICAgIGNvbnN0IHN0YXRlTWFuYWdlciA9IGNyZWF0ZVN0YXRlKGxhdGVzdERlZXBTdGF0ZSk7XG4gICAgY29uc3QgeyBjdXJyZW50U3RhdGU6IHN0YXRlLCB1c2VTdGF0ZSB9ID0gX2NyZWF0ZVVzZVN0YXRlKHN0YXRlTWFuYWdlcik7XG4gICAgY29uc3Qgc3R5bGVkID0gY3NzKHNlbGVjdG9yLCAoeyBoYXNoSWQgfSkgPT4ge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGhhc2hJZCk7XG4gICAgICBPYmplY3QuYXNzaWduKF9hdHRyaWJ1dGVzLCB7IGNsYXNzOiBoYXNoSWQgfSk7XG4gICAgfSk7XG4gICAgY29uc3QgeyBzdHlsZXMsIHVzZVN0eWxlIH0gPSBfY3JlYXRlVXNlU3R5bGUoeyBwcm9wcywgc3RhdGUsIGNzczogc3R5bGVkIH0pO1xuICAgIGNvbnN0IHsgYWN0aW9ucywgdXNlQWN0aW9uIH0gPSBfY3JlYXRlVXNlQWN0aW9uKHtcbiAgICAgIHByb3BzLFxuICAgICAgc3RhdGU6IHN0YXRlTWFuYWdlcixcbiAgICB9KTtcblxuICAgIGNvbnN0IHVzZVRlbXBsYXRlID0gX2NyZWF0ZVVzZVRlbXBsYXRlKHtcbiAgICAgIHByb3BzLFxuICAgICAgc3RhdGUsXG4gICAgICBodG1sLFxuICAgICAganN4LFxuICAgICAgdHN4LFxuICAgICAgc3R5bGVzLFxuICAgICAgYWN0aW9ucyxcbiAgICB9KTtcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gZmFjdG9yeSh7XG4gICAgICBwcm9wcyxcbiAgICAgIHVzZVN0YXRlLFxuICAgICAgdXNlU3R5bGUsXG4gICAgICB1c2VUZW1wbGF0ZSxcbiAgICAgIHVzZUFjdGlvbixcbiAgICB9KSBhcyBUZW1wbGF0ZVNjaGVtYVtdO1xuXG4gICAgY29uc3Qgb2xkRWxlbWVudCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgYXMgRWxlbWVudDtcbiAgICBzZXRFbGVtZW50QXR0cmlidXRlcyhlbGVtZW50LCBfYXR0cmlidXRlcyk7XG5cbiAgICBvbGRFbGVtZW50XG4gICAgICA/IG9sZEVsZW1lbnQucmVwbGFjZVdpdGgoZWxlbWVudClcbiAgICAgIDogcGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgZWxlbWVudCk7XG5cbiAgICByZW5kZXJDaGlsZHJlbihjaGlsZHJlbiwgZWxlbWVudCwgc3RhdGUpO1xuXG4gICAgc3RhdGVNYW5hZ2VyLndhdGNoKChwYXlsb2FkKSA9PiB7XG4gICAgICBlbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICByZW5kZXIodGVtcGxhdGUsIHBhcmVudEVsZW1lbnQsIHBheWxvYWQpO1xuICAgIH0pO1xuICB9O1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcbmltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHsgc2V0RWxlbWVudEF0dHJpYnV0ZXMgfSBmcm9tIFwiLi9zZXRFbGVtZW50QXR0cmlidXRlc1wiO1xuaW1wb3J0IHsgcmVuZGVyQ2hpbGRyZW4gfSBmcm9tIFwiLi9yZW5kZXJDaGlsZHJlblwiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRWxlbWVudEJ5VGFnTmFtZSA9XG4gICh0ZW1wbGF0ZTogVGVtcGxhdGVTY2hlbWEsIHBhcmVudEVsZW1lbnQ6IEVsZW1lbnQsIHN0YXRlOiBTdGF0ZSA9IHt9KSA9PlxuICAoKSA9PiB7XG4gICAgY29uc3QgdGFnTmFtZSA9IHRlbXBsYXRlLnR5cGUgYXMgc3RyaW5nO1xuICAgIGNvbnN0IHNlbGVjdG9yID0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgIGNvbnN0IGhhc2hJZCA9IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgYXMgc3RyaW5nO1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRlbXBsYXRlPy5wcm9wcz8uY2xhc3MgYXMgc3RyaW5nO1xuICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgIGlmICghY2xhc3NOYW1lLmluY2x1ZGVzKGhhc2hJZCkpIHtcbiAgICAgICAgY29uc3QgbmV3Q2xhc3NOYW1lID0gYCR7aGFzaElkfV8ke2NsYXNzTmFtZX1gO1xuICAgICAgICBzZXRFbGVtZW50QXR0cmlidXRlcyhlbGVtZW50LCB7IGNsYXNzOiBuZXdDbGFzc05hbWUgfSk7XG4gICAgICAgIHBhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGVsZW1lbnQpO1xuICAgICAgICByZW5kZXJDaGlsZHJlbih0ZW1wbGF0ZS5jaGlsZHJlbiwgZWxlbWVudCwgc3RhdGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHNldEVsZW1lbnRBdHRyaWJ1dGVzKGVsZW1lbnQsIHRlbXBsYXRlLnByb3BzKTtcbiAgICBwYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcbiAgICByZW5kZXJDaGlsZHJlbih0ZW1wbGF0ZS5jaGlsZHJlbiwgZWxlbWVudCwgc3RhdGUpO1xuICB9O1xuIiwgImltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJAL3JlbmRlclwiO1xuaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZVNjaGVtYSwgVGFnZ2VkVGVtcGxhdGUgfSBmcm9tIFwiQC90eXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJUZW1wbGF0ZURhdGEgPVxuICAodGVtcGxhdGVEYXRhOiBUYWdnZWRUZW1wbGF0ZSwgZWxlbWVudDogRWxlbWVudCwgc3RhdGU6IFN0YXRlID0ge30pID0+XG4gICAgKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZURhdGEgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgdGVtcGxhdGVEYXRhKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZURhdGEgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IE51bWJlcih0ZW1wbGF0ZURhdGEpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGRhdGEudG9TdHJpbmcoKTtcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgdmFsdWUpO1xuICAgICAgfVxuICAgIH07XG4iLCAiaW1wb3J0IHR5cGUgeyBUYWdnZWRUZW1wbGF0ZSwgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHtcbiAgcmVuZGVyVGVtcGxhdGVBcnJheSxcbiAgcmVuZGVyVGVtcGxhdGVPYmplY3QsXG4gIHJlbmRlclRlbXBsYXRlRGF0YSxcbn0gZnJvbSBcIkAvYWN0aW9uc1wiO1xuaW1wb3J0IHsgaXNBcnJheSwgaXNPYmplY3QsIGlzVGVtcGxhdGVEYXRhIH0gZnJvbSBcIkAvdmFsaWRhdG9yc1wiO1xuXG50eXBlIENvbnRleHRFbGVtZW50ID0gRWxlbWVudDtcbmltcG9ydCB7IGNyZWF0ZUNoYWluIH0gZnJvbSBcIkAvZmFjdG9yaWVzXCI7XG5pbXBvcnQgeyBjcmVhdGVTdGF0ZSwgdHlwZSBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5cbi8vY29uc3QgZ2xvYmFsU3RhdGUgPSBjcmVhdGVTdGF0ZSh7fSk7XG5cbmV4cG9ydCBjb25zdCByZW5kZXIgPSAoXG4gIHRlbXBsYXRlOiBUYWdnZWRUZW1wbGF0ZSxcbiAgY29udGV4dDogQ29udGV4dEVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LFxuICBzdGF0ZTogU3RhdGUgPSB7fSxcbik6IENvbnRleHRFbGVtZW50ID0+IHtcbiAgY29uc3QgY2hhaW4gPSBjcmVhdGVDaGFpbigpO1xuICBjb25zdCBjb21wb25lbnRFbGVtZW50ID0gY29udGV4dCB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcblxuICBjaGFpbi5hZGQoe1xuICAgIHZhbGlkYXRvcjogaXNBcnJheSh0ZW1wbGF0ZSksXG4gICAgYWN0aW9uOiByZW5kZXJUZW1wbGF0ZUFycmF5KFxuICAgICAgdGVtcGxhdGUgYXMgVGVtcGxhdGVTY2hlbWFbXSxcbiAgICAgIGNvbXBvbmVudEVsZW1lbnQsXG4gICAgICBzdGF0ZSxcbiAgICApLFxuICB9KTtcblxuICBjaGFpbi5hZGQoe1xuICAgIHZhbGlkYXRvcjogaXNPYmplY3QodGVtcGxhdGUpLFxuICAgIGFjdGlvbjogcmVuZGVyVGVtcGxhdGVPYmplY3QoXG4gICAgICB0ZW1wbGF0ZSBhcyBUZW1wbGF0ZVNjaGVtYSxcbiAgICAgIGNvbXBvbmVudEVsZW1lbnQsXG4gICAgICBzdGF0ZSxcbiAgICApLFxuICB9KTtcblxuICBjaGFpbi5hZGQoe1xuICAgIHZhbGlkYXRvcjogaXNUZW1wbGF0ZURhdGEodGVtcGxhdGUpLFxuICAgIGFjdGlvbjogcmVuZGVyVGVtcGxhdGVEYXRhKHRlbXBsYXRlLCBjb21wb25lbnRFbGVtZW50LCBzdGF0ZSksXG4gIH0pO1xuXG4gIGNoYWluLmV4ZWN1dGUoKTtcbiAgcmV0dXJuIGNvbXBvbmVudEVsZW1lbnQ7XG59O1xuIiwgImltcG9ydCB0eXBlIHsgUm91dGVyLCBFeGVjdXRlIH0gZnJvbSBcIi4vdHlwZXNcIjtcbi8vaW1wb3J0IHsgZXZlbnREcml2ZSB9IGZyb20gXCIuLi9yZW5kZXJcIjtcblxuZXhwb3J0IGNvbnN0IHJvdXRlcjogUm91dGVyID0gKHsgcm91dGVzLCBjb250ZXh0IH0pID0+IHtcbiAgY29uc3QgX3JvdXRlcyA9IHJvdXRlcztcbiAgbGV0IF9yb3V0ZXJFbGVtZW50ITogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZSA9ICh2YWxpZGF0b3IsIGNhbGxiYWNrLCBlcnJvcikgPT4ge1xuICAgIGlmICh2YWxpZGF0b3IoKSkgcmV0dXJuIGNhbGxiYWNrKHsgaXNWYWxpZDogdmFsaWRhdG9yKCkgfSk7XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGVycm8gPSBuZXcgRXJyb3IoZXJyb3IoKS5tZXNzYWdlKTtcbiAgICAgIGVycm8ubmFtZSA9IGVycm9yKCkubmFtZTtcbiAgICAgIHRocm93IGVycm87XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IF9iaW5kTGlzdGVuZXJzID0gKCkgPT4ge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICAvL2NvbnN0IHBheWxvYWQ6IFJvdXRlck9iamVjdCA9IHsgc3RhdHVzOiB0cnVlIH07XG4gICAgICAvL2V2ZW50RHJpdmUuZW1pdChcIk9OLURFU1RST1lcIiwgcGF5bG9hZCk7XG4gICAgICBfbW91bnRSb3V0ZUJ5SGFzaChudWxsKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBfc2V0Um91dGVyRWxlbWVudCA9ICgpID0+IHtcbiAgICBjb25zdCByb3V0ZXJFbGVtZW50ID0gY29udGV4dD8ucXVlcnlTZWxlY3RvcihcInJvdXRlci12aWV3XCIpO1xuXG4gICAgZXhlY3V0ZShcbiAgICAgICgpID0+ICEhcm91dGVyRWxlbWVudCxcbiAgICAgICgpID0+IHtcbiAgICAgICAgX3JvdXRlckVsZW1lbnQgPSByb3V0ZXJFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICByZXR1cm4gX3JvdXRlckVsZW1lbnQ7XG4gICAgICB9LFxuICAgICAgKCkgPT4gKHtcbiAgICAgICAgbmFtZTogXCJSb3V0ZXIgRXJyb3JcIixcbiAgICAgICAgbWVzc2FnZTogXCJSb3V0ZXIgZWxlbWVudCAocm91dGVyLXZpZXcpIGlzIG5vdCBkZWZpbmVkIGFuZCBtdXN0IGJlLlwiLFxuICAgICAgfSksXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBfbG9hZE1haW5Sb3V0ZSA9ICgpID0+IHtcbiAgICBjb25zdCBtYWluUm91dGUgPSBfZ2V0TWFpblJvdXRlKCk7XG4gICAgZXhlY3V0ZShcbiAgICAgICgpID0+ICEhbWFpblJvdXRlPy5zdGFydCxcbiAgICAgICgpID0+IG1haW5Sb3V0ZT8uc3RhcnQgJiYgbmF2aWdhdGUobWFpblJvdXRlLnN0YXJ0KSxcbiAgICAgICgpID0+ICh7XG4gICAgICAgIG5hbWU6IFwiUm91dGVyIEVycm9yXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiU3RhcnQgcm91dGVyIGlzIG5vdCBkZWZpbmVkIGFuZCBtdXN0IGJlLlwiLFxuICAgICAgfSksXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBfZ2V0TWFpblJvdXRlID0gKCkgPT4gX3JvdXRlcy5maW5kKChyb3V0ZSkgPT4gISFyb3V0ZT8uc3RhcnQpO1xuXG4gIGNvbnN0IF9nZXRSb3V0ZUJ5SGFzaCA9IChoYXNoOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gX3JvdXRlcy5maW5kKChyb3V0ZSkgPT4gcm91dGUucmVnZXgudGVzdChoYXNoKSk7XG4gIH07XG5cbiAgY29uc3QgX2dldFJvdXRlRGVmYXVsdCA9ICgpID0+IF9yb3V0ZXMuZmluZCgocm91dGUpID0+IHJvdXRlPy5kZWZhdWx0KTtcblxuICBjb25zdCBfbW91bnRSb3V0ZUJ5SGFzaCA9IGFzeW5jIChoYXNoOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgY29uc3QgaGFzaFZhbHVlID0gaGFzaCB8fCB3aW5kb3cubG9jYXRpb24uaGFzaCB8fCBcIlwiO1xuICAgIGNvbnN0IHJvdXRlID0gX2dldFJvdXRlQnlIYXNoKGhhc2hWYWx1ZSkgfHwgX2dldFJvdXRlRGVmYXVsdCgpO1xuICAgIF9yb3V0ZXJFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgcm91dGU/Lm1vdW50KHsgY29udGV4dDogX3JvdXRlckVsZW1lbnQgfSk7XG4gIH07XG5cbiAgY29uc3QgX2dldEhhc2ggPSAoKSA9PiB3aW5kb3cubG9jYXRpb24uaGFzaCB8fCBudWxsO1xuXG4gIGNvbnN0IF9oYXNBY3RpdmVSb3V0ZSA9ICgpID0+ICEhX2dldEhhc2goKTtcblxuICBjb25zdCBuYXZpZ2F0ZSA9IChwYXRoOiBzdHJpbmcpID0+IHtcbiAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHBhdGg7XG4gIH07XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBfYmluZExpc3RlbmVycygpO1xuICAgIF9zZXRSb3V0ZXJFbGVtZW50KCk7XG4gICAgX2hhc0FjdGl2ZVJvdXRlKCkgPyBfbW91bnRSb3V0ZUJ5SGFzaChfZ2V0SGFzaCgpKSA6IF9sb2FkTWFpblJvdXRlKCk7XG4gIH07XG5cbiAgcmV0dXJuIHsgaW5pdCwgbmF2aWdhdGUgfTtcbn07XG4iLCAiaW1wb3J0IHtcblx0dHlwZSBHZW5lcmljT2JqZWN0LFxuXHR0eXBlIEhUTVgsXG5cdHR5cGUgU3RhdGUsXG5cdHR5cGUgU3RhdGVNYW5hZ2VyLFxuXHR0eXBlIFRhZ2dlZFN0eWxlLFxuXHR0eXBlIFRhZ2dlZFRlbXBsYXRlLFxuXHR0c3gsXG59IGZyb20gXCJpYXJlc1wiO1xuXG50eXBlIFN0eWxlUGFyYW1zID0ge1xuXHRjc3M6IFRhZ2dlZFN0eWxlO1xufTtcblxudHlwZSBTdHlsZUhhbmRsZXIgPSAoKSA9PiBHZW5lcmljT2JqZWN0O1xuXG50eXBlIFVzZVN0eWxlID0gKHN0eWxlSGFuZGxlcjogU3R5bGVIYW5kbGVyKSA9PiBTdHlsZXM7XG5cbnR5cGUgUGFyYW1zID0ge1xuXHR1c2VTdHlsZTogVXNlU3R5bGU7XG59O1xuXG50eXBlIFN0eWxlcyA9IHtcblx0TWFpbkFwcDogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNvbnN0IE1haW5BcHAgPSAoeyB1c2VTdHlsZSB9OiBQYXJhbXMpID0+IHtcblx0dXNlU3R5bGUoY3JlYXRlU3R5bGVzKTtcblxuXHRyZXR1cm4gdHN4YFxuICAgIDxkaXYgY2xhc3M9XCJ3cmFwXCI+XG4gICAgICA8cm91dGVyLXZpZXc+PC9yb3V0ZXItdmlldz5cbiAgICA8L2Rpdj4gICBcbmA7XG59O1xuXG5jb25zdCBjcmVhdGVTdHlsZXMgPSAoKSA9PiAoe1xuXHRNYWluQXBwOiAoeyBjc3MgfTogU3R5bGVQYXJhbXMpID0+IGNzc2BcbiAgICBkaXNwbGF5OmZsZXg7XG4gICAgd2lkdGg6MTAwJTtcbiAgICBwYWRkaW5nOjFlbTtcblxuICAud3JhcCxcbiAgcm91dGVyLXZpZXcge1xuICAgIGRpc3BsYXk6ZmxleDtcbiAgICB3aWR0aDoxMDAlO1xuICB9XG5gLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7QUFPTyxJQUFNLFlBQVksZ0JBQUFBLFFBQUEsTUFBbUI7QUFDMUMsTUFBSTtBQUVKLFFBQU0sUUFBUSxnQkFBQUEsUUFBQSxDQUFDLGFBQTZCO0FBQzFDLGVBQVcsU0FBUztBQUNwQixXQUFPLFNBQVM7RUFDbEIsR0FIYyxPQUFBO0FBS2QsUUFBTSxRQUFRLGdCQUFBQSxRQUFBLENBQUMsYUFBOEI7QUFDM0MsV0FBTyxTQUFTLFFBQVE7RUFDMUIsR0FGYyxPQUFBO0FBSWQsUUFBTSxVQUFVLGdCQUFBQSxRQUFBLENBQUMsYUFBOEI7QUFDN0MsV0FBTyxTQUFTLFFBQVE7RUFDMUIsR0FGZ0IsU0FBQTtBQUloQixTQUFPLEVBQUUsT0FBTyxPQUFPLFFBQVE7QUFDakMsR0FqQnlCLFdBQUE7QUNMekIsSUFBTSxjQUFjLGdCQUFBQSxRQUFBLE1BQWMsS0FBSyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBeEQsYUFBQTtBQUViLElBQU0sY0FBYyxnQkFBQUEsUUFBQSxDQUN6QixpQkFDb0I7QUFDcEIsUUFBTSxTQUFTLEtBQUssTUFBTSxLQUFLLFVBQVUsWUFBWSxDQUFDO0FBQ3RELFFBQU0sWUFBWSxvQkFBSSxJQUFxQjtBQUUzQyxRQUFNLGtCQUFrQixnQkFBQUEsUUFBQSxDQUFDLFlBQXNCO0FBQzdDLGVBQVcsZ0JBQWdCLFdBQVc7QUFDcEMsbUJBQWEsT0FBTztJQUN0QjtFQUNGLEdBSndCLGlCQUFBO0FBTXhCLFFBQU0sTUFBTSxnQkFBQUEsUUFBQSxDQUFDLFlBQXNCO0FBQ2pDLFdBQU8sT0FBTyxRQUFRLEtBQUssTUFBTSxLQUFLLFVBQVUsT0FBTyxDQUFDLENBQUM7QUFDekQsb0JBQWdCLEtBQUssTUFBTSxLQUFLLFVBQVUsTUFBTSxDQUFDLENBQUM7RUFDcEQsR0FIWSxLQUFBO0FBS1osUUFBTSxNQUFNLGdCQUFBQSxRQUFBLE1BQWdCO0FBQzFCLFdBQU8sS0FBSyxNQUFNLEtBQUssVUFBVSxNQUFNLENBQUM7RUFDMUMsR0FGWSxLQUFBO0FBSVosUUFBTSxRQUFRLGdCQUFBQSxRQUFBLENBQUMsYUFBOEI7QUFDM0MsY0FBVSxJQUFJLFFBQVE7RUFDeEIsR0FGYyxPQUFBO0FBSWQsU0FBTyxFQUFFLEtBQUssS0FBSyxNQUFNO0FBQzNCLEdBMUIyQixhQUFBO0FDRnBCLElBQU0sY0FBYyxnQkFBQUEsUUFBQSxNQUFNO0FBQy9CLFFBQU0sU0FBUyxvQkFBSSxJQUF3QjtBQUUzQyxRQUFNLE1BQU0sZ0JBQUFBLFFBQUEsQ0FBSSxjQUE0QjtBQUMxQyxXQUFPLElBQUksU0FBUztFQUN0QixHQUZZLEtBQUE7QUFJWixRQUFNLFVBQVUsZ0JBQUFBLFFBQUEsTUFBTTtBQUNwQixlQUFXLEVBQUUsUUFBUSxVQUFVLEtBQUssUUFBUTtBQUMxQyxVQUFJLFVBQVUsRUFBRyxRQUFPO0lBQzFCO0VBQ0YsR0FKZ0IsU0FBQTtBQU1oQixTQUFPLEVBQUUsS0FBSyxRQUFRO0FBQ3hCLEdBZDJCLGFBQUE7QUNGcEIsSUFBTSx1QkFBdUIsZ0JBQUFBLFFBQUEsQ0FBQyxtQkFBbUM7QUFDdEUsTUFBSSxPQUFPLG1CQUFtQixTQUFVLFFBQU87QUFDL0MsU0FBTyxlQUNKLFFBQVEsTUFBTSxPQUFPLEVBQ3JCLFFBQVEsTUFBTSxNQUFNLEVBQ3BCLFFBQVEsTUFBTSxNQUFNLEVBQ3BCLFFBQVEsTUFBTSxRQUFRLEVBQ3RCLFFBQVEsTUFBTSxPQUFPLEVBQ3JCLFFBQVEsT0FBTyxRQUFRO0FBQzVCLEdBVG9DLHNCQUFBO0FBVzdCLElBQU0saUJBQWlCLGdCQUFBQSxRQUFBLENBQUMsU0FBaUIsWUFBNEI7QUFDMUUsUUFBTSxRQUFRO0FBQ2QsU0FBTyxRQUFRLFFBQVEsT0FBTyxDQUFDLFdBQVc7QUFDeEMsV0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPLFFBQVEsTUFBTSxFQUFFLENBQUM7RUFDaEQsQ0FBQztBQUNILEdBTDhCLGdCQUFBO0FBT3ZCLElBQU0sYUFBYSxnQkFBQUEsUUFBQSxNQUFNLEtBQUssT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQTNDLFlBQUE7QUFFbkIsSUFBTSxhQUFhOztFQUV4QjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFHQTtFQUNBO0VBQ0E7O0VBR0E7RUFDQTs7RUFHQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUdBO0VBQ0E7RUFDQTtFQUNBOztFQUdBO0VBQ0E7RUFDQTtFQUNBOztFQUdBO0VBQ0E7RUFDQTtFQUNBOztFQUdBO0VBQ0E7RUFDQTtFQUNBO0FBQ0Y7QUN0RUEsSUFBTSxXQUNKLGdCQUFBQSxRQUFBLENBQUksWUFDRixNQUFNO0FBQ0osU0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sUUFBUSxPQUFPLEtBQUssT0FBTyxZQUFZO0FBQ3BFLEdBSEYsVUFBQTtBQUtGLElBQU0sVUFDSixnQkFBQUEsUUFBQSxDQUFJLFlBQ0YsTUFBTTtBQUNKLFNBQU8sQ0FBQyxDQUFDLFdBQVcsTUFBTSxRQUFRLE9BQU87QUFDM0MsR0FIRixTQUFBO0FBS0YsSUFBTSxhQUNKLGdCQUFBQSxRQUFBLENBQVcsWUFDVCxNQUFNO0FBQ0osU0FBTyxDQUFDLENBQUMsV0FBVyxPQUFPLFlBQVk7QUFDekMsR0FIRixZQUFBO0FBS0YsSUFBTSxXQUNKLGdCQUFBQSxRQUFBLENBQVcsWUFDVCxNQUFNO0FBQ0osU0FBTyxPQUFPLFlBQVk7QUFDNUIsR0FIRixVQUFBO0FBS0YsSUFBTSxjQUNKLGdCQUFBQSxRQUFBLENBQVcsWUFDVCxNQUFNO0FBQ0osTUFBSSxPQUFPLFlBQVksU0FBVSxRQUFPO0FBQ3hDLFNBQU8sV0FBVyxTQUFTLFFBQVEsWUFBWSxDQUFDO0FBQ2xELEdBSkYsYUFBQTtBQU1GLElBQU0saUJBQ0osZ0JBQUFBLFFBQUEsQ0FBVyxZQUNULE1BQU07QUFDSixTQUFPLE9BQU8sWUFBWSxZQUFZLE9BQU8sWUFBWTtBQUMzRCxHQUhGLGdCQUFBO0FDNUJLLElBQU0sdUJBQ1gsZ0JBQUFBLFFBQUEsQ0FBQyxVQUEwQixnQkFBeUIsUUFBZSxDQUFDLE1BQ2xFLE1BQVk7QUFDVixRQUFNLFNBQVMsWUFBWTtBQUUzQixTQUFPLElBQUk7SUFDVCxXQUFXLFNBQVMsU0FBUyxJQUFJO0lBQ2pDLFFBQVEsdUJBQXVCLFVBQVUsZ0JBQWdCLEtBQUs7RUFDaEUsQ0FBQztBQUVELFNBQU8sSUFBSTtJQUNULFdBQVcsV0FBVyxTQUFTLElBQUk7SUFDbkMsUUFBUSwyQkFBMkIsVUFBVSxnQkFBZ0IsS0FBSztFQUNwRSxDQUFDO0FBRUQsU0FBTyxRQUFRO0FBQ2pCLEdBZkYsc0JBQUE7QUNISyxJQUFNLHNCQUNYLGdCQUFBQSxRQUFBLENBQ0UsZ0JBQ0EsZ0JBQ0EsUUFBZSxDQUFDLE1BRWhCLE1BQU07QUFDSixhQUFXLFlBQVksZ0JBQWdCO0FBQ3JDLFdBQU8sVUFBVSxnQkFBZ0IsS0FBSztFQUN4QztBQUNGLEdBVEYscUJBQUE7QUNESyxJQUFNLGlCQUFpQixnQkFBQUEsUUFBQSxDQUM1QixVQUNBLGVBQ0EsUUFBZSxDQUFDLE1BQ2I7QUFDSCxnQkFBYyxZQUFZO0FBQzFCLE1BQUksQ0FBQyxNQUFNLFFBQVEsUUFBUSxLQUFLLE9BQU8sYUFBYSxVQUFVO0FBQzVELFdBQU8sVUFBVSxlQUFlLEtBQUs7QUFDckM7RUFDRjtBQUVBLGFBQVcsU0FBUyxVQUFVO0FBQzVCLFdBQU8sT0FBTyxlQUFlLEtBQUs7RUFDcEM7QUFDRixHQWQ4QixnQkFBQTtBQ0o5QixJQUFJLElBQUUsZ0JBQUFBLFFBQUEsU0FBU0MsSUFBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLE1BQUk7QUFBRSxJQUFFLENBQUMsSUFBRTtBQUFFLFdBQVEsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUk7QUFBQyxRQUFJLElBQUUsRUFBRSxHQUFHLEdBQUUsSUFBRSxFQUFFLENBQUMsS0FBRyxFQUFFLENBQUMsS0FBRyxJQUFFLElBQUUsR0FBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEtBQUcsRUFBRSxFQUFFLENBQUM7QUFBRSxVQUFJLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxNQUFJLElBQUUsRUFBRSxDQUFDLElBQUUsT0FBTyxPQUFPLEVBQUUsQ0FBQyxLQUFHLENBQUMsR0FBRSxDQUFDLElBQUUsTUFBSSxLQUFHLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxLQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUUsSUFBRSxNQUFJLElBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFHLElBQUUsS0FBRyxLQUFHLElBQUVBLEdBQUUsTUFBTSxHQUFFLEVBQUVBLElBQUUsR0FBRSxHQUFFLENBQUMsSUFBRyxJQUFJLENBQUMsQ0FBQyxHQUFFLEVBQUUsS0FBSyxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEtBQUcsS0FBRyxFQUFFLElBQUUsQ0FBQyxJQUFFLEdBQUUsRUFBRSxDQUFDLElBQUUsTUFBSSxFQUFFLEtBQUssQ0FBQztFQUFDO0FBQUMsU0FBTztBQUFDLEdBQXhULEdBQUEsR0FBMFQsSUFBRSxvQkFBSSxJQUFBO0FBQW1CLFNBQVIsbUJBQWlCLEdBQUU7QUFBQyxNQUFJLElBQUUsRUFBRSxJQUFJLElBQUk7QUFBRSxTQUFPLE1BQUksSUFBRSxvQkFBSSxJQUFBLEdBQUksRUFBRSxJQUFJLE1BQUssQ0FBQyxLQUFJLElBQUUsRUFBRSxNQUFLLEVBQUUsSUFBSSxDQUFDLE1BQUksRUFBRSxJQUFJLEdBQUUsSUFBRSxTQUFTQyxJQUFFO0FBQUMsYUFBUUQsSUFBRUUsSUFBRUMsS0FBRSxHQUFFLElBQUUsSUFBRyxJQUFFLElBQUcsSUFBRSxDQUFDLENBQUMsR0FBRSxJQUFFLFNBQVNGLElBQUU7QUFBQyxZQUFJRSxPQUFJRixPQUFJLElBQUUsRUFBRSxRQUFRLHdCQUF1QixFQUFFLE1BQUksRUFBRSxLQUFLLEdBQUVBLElBQUUsQ0FBQyxJQUFFLE1BQUlFLE9BQUlGLE1BQUcsTUFBSSxFQUFFLEtBQUssR0FBRUEsSUFBRSxDQUFDLEdBQUVFLEtBQUUsS0FBRyxNQUFJQSxNQUFHLFVBQVEsS0FBR0YsS0FBRSxFQUFFLEtBQUssR0FBRUEsSUFBRSxDQUFDLElBQUUsTUFBSUUsTUFBRyxLQUFHLENBQUNGLEtBQUUsRUFBRSxLQUFLLEdBQUUsR0FBRSxNQUFHLENBQUMsSUFBRUUsTUFBRyxPQUFLLEtBQUcsQ0FBQ0YsTUFBRyxNQUFJRSxRQUFLLEVBQUUsS0FBS0EsSUFBRSxHQUFFLEdBQUVELEVBQUMsR0FBRUMsS0FBRSxJQUFHRixPQUFJLEVBQUUsS0FBS0UsSUFBRUYsSUFBRSxHQUFFQyxFQUFDLEdBQUVDLEtBQUUsS0FBSSxJQUFFO0lBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRUYsR0FBRSxRQUFPLEtBQUk7QUFBQyxZQUFJLE1BQUlFLE1BQUcsRUFBRSxHQUFFLEVBQUUsQ0FBQztBQUFHLGVBQVEsSUFBRSxHQUFFLElBQUVGLEdBQUUsQ0FBQyxFQUFFLFFBQU8sSUFBSUQsTUFBRUMsR0FBRSxDQUFDLEVBQUUsQ0FBQyxHQUFFLE1BQUlFLEtBQUUsUUFBTUgsTUFBRyxFQUFFLEdBQUUsSUFBRSxDQUFDLENBQUMsR0FBRUcsS0FBRSxLQUFHLEtBQUdILEtBQUUsTUFBSUcsS0FBRSxTQUFPLEtBQUcsUUFBTUgsTUFBR0csS0FBRSxHQUFFLElBQUUsTUFBSSxJQUFFSCxLQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUVBLE9BQUksSUFBRSxJQUFFLEtBQUcsS0FBR0EsS0FBRSxRQUFNQSxNQUFHLFFBQU1BLEtBQUUsSUFBRUEsS0FBRSxRQUFNQSxNQUFHLEVBQUUsR0FBRUcsS0FBRSxLQUFHQSxPQUFJLFFBQU1ILE1BQUdHLEtBQUUsR0FBRUQsS0FBRSxHQUFFLElBQUUsTUFBSSxRQUFNRixPQUFJRyxLQUFFLEtBQUcsUUFBTUYsR0FBRSxDQUFDLEVBQUUsSUFBRSxDQUFDLE1BQUksRUFBRSxHQUFFLE1BQUlFLE9BQUksSUFBRSxFQUFFLENBQUMsSUFBR0EsS0FBRSxJQUFHLElBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFFLEdBQUVBLEVBQUMsR0FBRUEsS0FBRSxLQUFHLFFBQU1ILE1BQUcsUUFBT0EsTUFBRyxTQUFPQSxNQUFHLFNBQU9BLE1BQUcsRUFBRSxHQUFFRyxLQUFFLEtBQUcsS0FBR0gsS0FBRyxNQUFJRyxNQUFHLFVBQVEsTUFBSUEsS0FBRSxHQUFFLElBQUUsRUFBRSxDQUFDO0lBQUU7QUFBQyxXQUFPLEVBQUUsR0FBRTtFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUUsSUFBRyxXQUFVLENBQUMsQ0FBQyxHQUFHLFNBQU8sSUFBRSxJQUFFLEVBQUUsQ0FBQztBQUFDO0FBQXAyQjtBQUFBSixRQUFBLG9CQUFBLFNBQUE7QUNHalYsSUFBTSxZQUFZLGdCQUFBQSxRQUFBLENBQ2hCLE1BQ0EsVUFDRyxhQUNBO0FBQ0gsU0FBTyxFQUFFLE1BQU0sT0FBTyxTQUFTO0FBQ2pDLEdBTmtCLFdBQUE7QUFRbEIsSUFBTSxPQUFPLG1CQUFJLEtBQXFCLFNBQVM7QUNOeEMsSUFBTSxhQUFhLGdCQUFBQSxRQUFBLENBQUMsTUFBYyxhQUE2QjtBQUNwRSxNQUFJLE9BQU87QUFDWCxXQUFTLElBQUksR0FBRyxJQUFJLEtBQUssUUFBUSxLQUFLO0FBQ3BDLFdBQVEsT0FBTyxLQUFNLEtBQUssV0FBVyxDQUFDO0VBQ3hDO0FBQ0EsU0FBTyxHQUFHLFFBQVEsS0FBSyxTQUFTLEdBQUcsU0FBUyxFQUFFLENBQUM7QUFDakQsR0FOMEIsWUFBQTtBQ0wxQixJQUFNLG9CQUFtRCxvQkFBSSxJQUFJO0FBRTFELElBQU0scUJBQXFCLGdCQUFBQSxRQUFBLENBQUMsZ0JBQTBDO0FBQzNFLFFBQU0sZUFBZSxrQkFBa0IsSUFBSSxXQUFXO0FBRXRELE1BQUksaUJBQWlCLFFBQVc7QUFDOUIsV0FBTztFQUNUO0FBRUEsUUFBTSxRQUFRLFNBQVMsY0FBYyxPQUFPO0FBQzVDLFFBQU0sYUFBYSxrQkFBa0IsV0FBVztBQUNoRCxXQUFTLEtBQUssWUFBWSxLQUFLO0FBQy9CLG9CQUFrQixJQUFJLGFBQWEsS0FBSztBQUV4QyxTQUFPO0FBQ1QsR0Fia0Msb0JBQUE7QUNjbEMsSUFBTSxrQ0FBa0MsZ0JBQUFBLFFBQUEsQ0FBQztFQUN2QztFQUNBO0FBQ0YsTUFBK0I7QUFDN0IsUUFBTSxRQUFRLE1BQU0sTUFBTSxJQUFJO0FBQzlCLFFBQU0sWUFBWTtBQUVsQixRQUFNLGVBQTRCO0lBQ2hDLGFBQWE7SUFDYixhQUFhO0lBQ2IsUUFBUTtFQUNWO0FBRUEsUUFBTSxxQkFBcUIsZ0JBQUFBLFFBQUEsQ0FDekJLLGNBQ0FDLFNBQ0FDLGVBQ29CO0lBQ3BCLGFBQWE7SUFDYixRQUFRLEdBQUdELE9BQU0sR0FBR0MsU0FBUTtFQUFPRixZQUFXOzs7RUFDaEQsSUFQMkIsb0JBQUE7QUFTM0IsUUFBTSxxQkFBcUIsZ0JBQUFMLFFBQUEsQ0FDekIsTUFDQU0sYUFDb0I7SUFDcEIsYUFBYTtJQUNiLFFBQVEsR0FBR0EsT0FBTSxHQUFHLElBQUk7O0VBQzFCLElBTjJCLG9CQUFBO0FBUTNCLFFBQU0sZ0JBQWdCLGdCQUFBTixRQUFBLENBQ3BCLE1BQ0FLLGtCQUNvQjtJQUNwQixhQUFhLEdBQUdBLFlBQVcsR0FBRyxJQUFJOztJQUNsQyxRQUFRO0VBQ1YsSUFOc0IsZUFBQTtBQVF0QixRQUFNLGNBQWMsZ0JBQUFMLFFBQUEsQ0FBQyxTQUF5QjtBQUM1QyxVQUFNLFlBQVksS0FBSyxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUc7QUFDMUMsVUFBTSxZQUFZLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHO0FBQzFDLFdBQU8sV0FBVztFQUNwQixHQUpvQixhQUFBO0FBTXBCLFFBQU0sY0FBYyxnQkFBQUEsUUFBQSxDQUFDLEtBQWtCLFNBQThCO0FBQ25FLFFBQUksZUFBZSxZQUFZLElBQUk7QUFHbkMsUUFBSSxJQUFJLGdCQUFnQixLQUFLLFVBQVUsS0FBSyxJQUFJLEdBQUc7QUFDakQsWUFBTSxFQUFFLGFBQUFLLGNBQWEsUUFBQUMsUUFBTyxJQUFJLGNBQWMsTUFBTSxJQUFJLFdBQVc7QUFDbkUsYUFBTyxFQUFFLEdBQUcsS0FBSyxhQUFBRCxjQUFhLFFBQVEsSUFBSSxTQUFTQyxRQUFPO0lBQzVEO0FBR0EsUUFBSSxJQUFJLGFBQWE7QUFDbkIsWUFBTSxFQUFFLGFBQUFELGNBQWEsUUFBQUMsUUFBTyxJQUFJO1FBQzlCLElBQUk7UUFDSixJQUFJO1FBQ0o7TUFDRjtBQUNBLFlBQU0sZ0JBQWdCLG1CQUFtQixNQUFNLEVBQUU7QUFDakQsYUFBTztRQUNMLEdBQUc7UUFDSCxhQUFBRDtRQUNBLFFBQVFDLFVBQVMsY0FBYztNQUNqQztJQUNGO0FBR0EsVUFBTSxFQUFFLGFBQUFELGNBQWEsUUFBQUMsUUFBTyxJQUFJLG1CQUFtQixNQUFNLElBQUksTUFBTTtBQUNuRSxXQUFPLEVBQUUsR0FBRyxLQUFLLGFBQUFELGNBQWEsUUFBQUMsUUFBTztFQUN2QyxHQTNCb0IsYUFBQTtBQTZCcEIsUUFBTSxFQUFFLFFBQVEsWUFBWSxJQUFJLE1BQU0sT0FBTyxhQUFhLFlBQVk7QUFFdEUsU0FBTyxjQUNILEdBQUcsTUFBTSxHQUFHLFFBQVE7RUFBTyxXQUFXO0VBQU0sS0FBSyxJQUNqRCxPQUFPLEtBQUs7QUFDbEIsR0E5RXdDLGlDQUFBO0FBZ0Z4QyxJQUFNLGlDQUFpQyxnQkFBQU4sUUFBQSxDQUFDO0VBQ3RDO0VBQ0E7QUFDRixNQUErQjtBQUM3QixRQUFNLFFBQVE7QUFDZCxRQUFNLFlBQVk7QUFFbEIsU0FBTyxNQUFNLFFBQVEsT0FBTyxDQUFDLE9BQU8sWUFBWSxhQUFhO0FBQzNELFVBQU0sUUFBUSxTQUNYLEtBQUssRUFDTCxNQUFNLElBQUksRUFDVixJQUFJLENBQUMsU0FBaUIsS0FBSyxLQUFLLENBQUMsRUFDakMsT0FBTyxDQUFDLFNBQWlCLElBQUk7QUFFaEMsVUFBTSxlQUFlLE1BQ2xCLE9BQU8sQ0FBQyxTQUFpQixVQUFVLEtBQUssSUFBSSxDQUFDLEVBQzdDLElBQUksQ0FBQyxTQUFpQixHQUFHLFFBQVE7RUFBTyxLQUFLLEtBQUssQ0FBQztFQUFLLEVBQ3hELEtBQUssSUFBSTtBQUVaLFdBQU8sVUFBVSxXQUFXLEtBQUssQ0FBQztFQUFPLFlBQVk7O0VBQ3ZELENBQUM7QUFDSCxHQXJCdUMsZ0NBQUE7QUF1QnZDLElBQU0sc0JBQXNCLGdCQUFBQSxRQUFBLENBQUMsRUFBRSxPQUFPLFNBQVMsTUFBK0I7QUFDNUUsUUFBTSxRQUFRO0FBQ2QsU0FBTyxNQUFNLFFBQVEsT0FBTyxJQUFJLFFBQVEsS0FBSztBQUMvQyxHQUg0QixxQkFBQTtBQUtyQixJQUFNLGlCQUFpQixnQkFBQUEsUUFBQSxDQUFDLFVBQWtCLGFBQTZCO0FBQzVFLE1BQUksUUFBUTtBQUNaLFFBQU0sWUFBWSxJQUFJLFFBQVE7QUFDOUIsVUFBUSxvQkFBb0IsRUFBRSxPQUFPLFNBQVMsQ0FBQztBQUMvQyxVQUFRLGdDQUFnQyxFQUFFLE9BQU8sVUFBVSxVQUFVLENBQUM7QUFDdEUsVUFBUSwrQkFBK0IsRUFBRSxPQUFPLFVBQVUsVUFBVSxDQUFDO0FBRXJFLFNBQU87QUFDVCxHQVI4QixnQkFBQTtBQ2hIOUIsSUFBTSxXQUFnQyxvQkFBSSxJQUFJO0FBRXZDLElBQU0sTUFDWCxnQkFBQUEsUUFBQSxDQUFDLFVBQWtCLFVBQW1CLE1BQU07QUFBQyxNQUM3QyxDQUNFLFlBQ0csbUJBQ1E7QUFDWCxRQUFNLFNBQVMsUUFBUTtJQUNyQixDQUFDLGFBQWEsS0FBSyxVQUNqQixHQUFHLFdBQVcsR0FBRyxHQUFHLEdBQUcsZUFBZSxLQUFLLE1BQU0sU0FBWSxlQUFlLEtBQUssSUFBSSxFQUFFO0lBQ3pGO0VBQ0Y7QUFFQSxRQUFNLGtCQUFrQixTQUFTLElBQUksTUFBTTtBQUMzQyxNQUFJLG9CQUFvQixRQUFXO0FBQ2pDLFdBQU87RUFDVDtBQUVBLFFBQU0sU0FBUyxXQUFXLFFBQVEsUUFBUTtBQUMxQyxRQUFNLGNBQWMsZUFBZSxRQUFRLEdBQUcsTUFBTSxFQUFFO0FBQ3RELFFBQU0sZUFBZSxtQkFBbUIsR0FBRyxNQUFNLEVBQUU7QUFFbkQsVUFBUSxFQUFFLFFBQVEsYUFBYSxhQUFhLENBQUM7QUFFN0MsTUFBSSxDQUFDLGFBQWEsVUFBVSxTQUFTLFdBQVcsR0FBRztBQUNqRCxpQkFBYSxhQUFhO0VBQzVCO0FBRUEsV0FBUyxJQUFJLFFBQVEsTUFBTTtBQUUzQixTQUFPO0FBQ1QsR0E3QkEsS0FBQTtBQ0xLLElBQU0sdUJBQXVCLGdCQUFBQSxRQUFBLENBQ2xDLFNBQ0EsZUFDWTtBQUNaLFFBQU0sZ0JBQWdCLGFBQWEsT0FBTyxLQUFLLFVBQVUsSUFBSSxDQUFDO0FBQzlELGFBQVcsT0FBTyxlQUFlO0FBQy9CLFFBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxHQUFHO0FBQ3ZCLGNBQVEsYUFBYSxLQUFLLFdBQVcsR0FBRyxDQUFXO0lBQ3JELE9BQU87QUFDTCxZQUFNLFlBQVksSUFDZixRQUFRLE1BQU0sRUFBRSxFQUNoQixZQUFZO0FBQ2YsWUFBTSxlQUFlLFdBQVcsR0FBRztBQUNuQyxjQUFRLGlCQUFpQixXQUFXLFlBQVk7SUFDbEQ7RUFDRjtBQUNBLFNBQU87QUFDVCxHQWpCb0Msc0JBQUE7QUN5Q3BDLElBQU0sY0FBYyxDQUFDO0FBRXJCLElBQU0sMEJBQTBCLGdCQUFBQSxRQUFBLENBQUMsWUFBcUI7QUFDcEQsU0FBTyxRQUFRLEtBQ1osTUFBTSxXQUFXLEVBQ2pCLEtBQUssR0FBRyxFQUNSLFlBQVk7QUFDakIsR0FMZ0MseUJBQUE7QUFPaEMsSUFBTSxrQkFBa0IsZ0JBQUFBLFFBQUEsQ0FBQyxVQUF3QjtBQUMvQyxRQUFNLGVBQWUsQ0FBQztBQUN0QixRQUFNLFdBQVcsZ0JBQUFBLFFBQUEsQ0FBSSxpQkFBeUM7QUFDNUQsVUFBTSxjQUFjLE1BQU0sSUFBSTtBQUM5QixVQUFNLElBQUksRUFBRSxHQUFHLGNBQWMsR0FBRyxZQUFZLENBQUM7QUFFN0MsV0FBTyxPQUFPLGNBQWMsTUFBTSxJQUFJLENBQUM7QUFDdkMsV0FBTyxFQUFFLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLE9BQU8sTUFBTSxNQUFNO0VBQzlELEdBTmlCLFVBQUE7QUFPakIsU0FBTyxFQUFFLGNBQWMsU0FBUztBQUNsQyxHQVZ3QixpQkFBQTtBQVl4QixJQUFNLGtCQUFrQixnQkFBQUEsUUFBQSxDQUFDLEVBQUUsT0FBTyxPQUFPLEtBQUFRLEtBQUksTUFBbUI7QUFDOUQsUUFBTSxhQUFhLENBQUM7QUFDcEIsUUFBTSxXQUFXLGdCQUFBUixRQUFBLENBQUMsc0JBQTJDO0FBQzNELFVBQU0sV0FBVyxrQkFBa0I7QUFDbkMsVUFBTSxTQUFpQixDQUFDO0FBRXhCLGVBQVcsT0FBTyxVQUFVO0FBQzFCLFlBQU0sVUFBVSxTQUFTLEdBQUc7QUFDNUIsWUFBTSxRQUFRLFFBQVEsRUFBRSxPQUFPLE9BQU8sS0FBQVEsS0FBSSxDQUFDO0FBQzNDLGFBQU8sR0FBRyxJQUFJO0lBQ2hCO0FBRUEsV0FBTyxPQUFPLFlBQVksTUFBTTtBQUNoQyxXQUFPO0VBQ1QsR0FaaUIsVUFBQTtBQWNqQixTQUFPLEVBQUUsUUFBUSxZQUFZLFNBQVM7QUFDeEMsR0FqQndCLGlCQUFBO0FBbUJ4QixJQUFNLHFCQUFxQixnQkFBQVIsUUFBQSxDQUFDLFdBQTJCO0FBQ3JELFFBQU0sY0FBYyxnQkFBQUEsUUFBQSxDQUNsQixpQkFDQSx1QkFDRztBQUNILFdBQU8sZ0JBQWdCLFFBQVEsa0JBQWtCO0VBQ25ELEdBTG9CLGFBQUE7QUFPcEIsU0FBTztBQUNULEdBVDJCLG9CQUFBO0FBVzNCLElBQU0sbUJBQW1CLGdCQUFBQSxRQUFBLENBQUMsRUFBRSxPQUFPLE1BQU0sTUFBb0I7QUFDM0QsUUFBTSxVQUF5QixDQUFDO0FBRWhDLFFBQU0sWUFBWSxnQkFBQUEsUUFBQSxDQUFDLHlCQUErQztBQUNoRSxVQUFNLGlCQUFpQixxQkFBcUIsRUFBRSxPQUFPLE1BQU0sQ0FBQztBQUM1RCxXQUFPLE9BQU8sU0FBUyxjQUFjO0VBQ3ZDLEdBSGtCLFdBQUE7QUFLbEIsU0FBTyxFQUFFLFNBQVMsVUFBVTtBQUM5QixHQVR5QixrQkFBQTtBQVdsQixJQUFNLDZCQUE2QixnQkFBQUEsUUFBQSxDQUN4QyxVQUNBLGVBQ0EsY0FBcUIsQ0FBQyxNQUNuQjtBQUNILFNBQU8sTUFBTTtBQUNYLFVBQU0sVUFBVSxTQUFTO0FBQ3pCLFVBQU0sVUFBVSx3QkFBd0IsT0FBTztBQUMvQyxVQUFNLFdBQVcsUUFBUSxZQUFZO0FBQ3JDLFVBQU0sVUFBVSxTQUFTLGNBQWMsT0FBTztBQUU5QyxVQUFNLFFBQVEsU0FBUztBQUN2QixVQUFNLGtCQUFrQixLQUFLLE1BQU0sS0FBSyxVQUFVLFdBQVcsQ0FBQztBQUM5RCxVQUFNLGVBQWUsWUFBWSxlQUFlO0FBQ2hELFVBQU0sRUFBRSxjQUFjLE9BQU8sU0FBUyxJQUFJLGdCQUFnQixZQUFZO0FBQ3RFLFVBQU0sU0FBUyxJQUFJLFVBQVUsQ0FBQyxFQUFFLE9BQU8sTUFBTTtBQUMzQyxjQUFRLFVBQVUsSUFBSSxNQUFNO0FBQzVCLGFBQU8sT0FBTyxhQUFhLEVBQUUsT0FBTyxPQUFPLENBQUM7SUFDOUMsQ0FBQztBQUNELFVBQU0sRUFBRSxRQUFRLFNBQVMsSUFBSSxnQkFBZ0IsRUFBRSxPQUFPLE9BQU8sS0FBSyxPQUFPLENBQUM7QUFDMUUsVUFBTSxFQUFFLFNBQVMsVUFBVSxJQUFJLGlCQUFpQjtNQUM5QztNQUNBLE9BQU87SUFDVCxDQUFDO0FBRUQsVUFBTSxjQUFjLG1CQUFtQjtNQUNyQztNQUNBO01BQ0E7TUFDQSxLQUFBO01BQ0EsS0FBQTtNQUNBO01BQ0E7SUFDRixDQUFDO0FBRUQsVUFBTSxXQUFXLFFBQVE7TUFDdkI7TUFDQTtNQUNBO01BQ0E7TUFDQTtJQUNGLENBQUM7QUFFRCxVQUFNLGFBQWEsY0FBYyxjQUFjLFFBQVE7QUFDdkQseUJBQXFCLFNBQVMsV0FBVztBQUV6QyxpQkFDSSxXQUFXLFlBQVksT0FBTyxJQUM5QixjQUFjLHNCQUFzQixhQUFhLE9BQU87QUFFNUQsbUJBQWUsVUFBVSxTQUFTLEtBQUs7QUFFdkMsaUJBQWEsTUFBTSxDQUFDLFlBQVk7QUFDOUIsY0FBUSxZQUFZO0FBQ3BCLGFBQU8sVUFBVSxlQUFlLE9BQU87SUFDekMsQ0FBQztFQUNIO0FBQ0YsR0F6RDBDLDRCQUFBO0FDNUduQyxJQUFNLHlCQUNYLGdCQUFBQSxRQUFBLENBQUMsVUFBMEIsZUFBd0IsUUFBZSxDQUFDLE1BQ25FLE1BQU07QUFDSixRQUFNLFVBQVUsU0FBUztBQUN6QixRQUFNLFdBQVcsUUFBUSxZQUFZO0FBQ3JDLFFBQU0sVUFBVSxTQUFTLGNBQWMsT0FBTztBQUM5QyxRQUFNLFNBQVMsY0FBYyxhQUFhLE9BQU87QUFDakQsUUFBTSxZQUFZLFVBQVUsT0FBTztBQUNuQyxNQUFJLFdBQVc7QUFDYixRQUFJLENBQUMsVUFBVSxTQUFTLE1BQU0sR0FBRztBQUMvQixZQUFNLGVBQWUsR0FBRyxNQUFNLElBQUksU0FBUztBQUMzQywyQkFBcUIsU0FBUyxFQUFFLE9BQU8sYUFBYSxDQUFDO0FBQ3JELG9CQUFjLHNCQUFzQixhQUFhLE9BQU87QUFDeEQscUJBQWUsU0FBUyxVQUFVLFNBQVMsS0FBSztBQUNoRDtJQUNGO0VBQ0Y7QUFDQSx1QkFBcUIsU0FBUyxTQUFTLEtBQUs7QUFDNUMsZ0JBQWMsc0JBQXNCLGFBQWEsT0FBTztBQUN4RCxpQkFBZSxTQUFTLFVBQVUsU0FBUyxLQUFLO0FBQ2xELEdBbkJBLHdCQUFBO0FDRkssSUFBTSxxQkFDWCxnQkFBQUEsUUFBQSxDQUFDLGNBQThCLFNBQWtCLFFBQWUsQ0FBQyxNQUMvRCxNQUFNO0FBQ0osTUFBSSxPQUFPLGlCQUFpQixVQUFVO0FBQ3BDLFlBQVEsbUJBQW1CLGFBQWEsWUFBWTtFQUN0RDtBQUVBLE1BQUksT0FBTyxpQkFBaUIsVUFBVTtBQUNwQyxVQUFNLE9BQU8sT0FBTyxZQUFZO0FBQ2hDLFVBQU0sUUFBUSxLQUFLLFNBQVM7QUFDNUIsWUFBUSxtQkFBbUIsYUFBYSxLQUFLO0VBQy9DO0FBQ0YsR0FYRixvQkFBQTtBQ1NLLElBQU0sU0FBUyxnQkFBQUEsUUFBQSxDQUNwQixVQUNBLFVBQTBCLFNBQVMsTUFDbkMsUUFBZSxDQUFDLE1BQ0c7QUFDbkIsUUFBTSxRQUFRLFlBQVk7QUFDMUIsUUFBTSxtQkFBbUIsV0FBVyxTQUFTLGNBQWMsTUFBTTtBQUVqRSxRQUFNLElBQUk7SUFDUixXQUFXLFFBQVEsUUFBUTtJQUMzQixRQUFRO01BQ047TUFDQTtNQUNBO0lBQ0Y7RUFDRixDQUFDO0FBRUQsUUFBTSxJQUFJO0lBQ1IsV0FBVyxTQUFTLFFBQVE7SUFDNUIsUUFBUTtNQUNOO01BQ0E7TUFDQTtJQUNGO0VBQ0YsQ0FBQztBQUVELFFBQU0sSUFBSTtJQUNSLFdBQVcsZUFBZSxRQUFRO0lBQ2xDLFFBQVEsbUJBQW1CLFVBQVUsa0JBQWtCLEtBQUs7RUFDOUQsQ0FBQztBQUVELFFBQU0sUUFBUTtBQUNkLFNBQU87QUFDVCxHQWpDc0IsUUFBQTtBQ1hmLElBQU0sU0FBaUIsZ0JBQUFBLFFBQUEsQ0FBQyxFQUFFLFFBQVEsUUFBUSxNQUFNO0FBQ3JELFFBQU0sVUFBVTtBQUNoQixNQUFJO0FBRUosUUFBTSxVQUFtQixnQkFBQUEsUUFBQSxDQUFDLFdBQVcsVUFBVSxVQUFVO0FBQ3ZELFFBQUksVUFBVSxFQUFHLFFBQU8sU0FBUyxFQUFFLFNBQVMsVUFBVSxFQUFFLENBQUM7QUFFekQsUUFBSSxPQUFPO0FBQ1QsWUFBTSxPQUFPLElBQUksTUFBTSxNQUFNLEVBQUUsT0FBTztBQUN0QyxXQUFLLE9BQU8sTUFBTSxFQUFFO0FBQ3BCLFlBQU07SUFDUjtFQUNGLEdBUnlCLFNBQUE7QUFVekIsUUFBTSxpQkFBaUIsZ0JBQUFBLFFBQUEsTUFBTTtBQUMzQixXQUFPLGlCQUFpQixjQUFjLE1BQU07QUFHMUMsd0JBQWtCLElBQUk7SUFDeEIsQ0FBQztFQUNILEdBTnVCLGdCQUFBO0FBUXZCLFFBQU0sb0JBQW9CLGdCQUFBQSxRQUFBLE1BQU07QUFDOUIsVUFBTSxnQkFBZ0IsU0FBUyxjQUFjLGFBQWE7QUFFMUQ7TUFDRSxNQUFNLENBQUMsQ0FBQztNQUNSLE1BQU07QUFDSix5QkFBaUI7QUFDakIsZUFBTztNQUNUO01BQ0EsT0FBTztRQUNMLE1BQU07UUFDTixTQUFTO01BQ1g7SUFDRjtFQUNGLEdBZDBCLG1CQUFBO0FBZ0IxQixRQUFNLGlCQUFpQixnQkFBQUEsUUFBQSxNQUFNO0FBQzNCLFVBQU0sWUFBWSxjQUFjO0FBQ2hDO01BQ0UsTUFBTSxDQUFDLENBQUMsV0FBVztNQUNuQixNQUFNLFdBQVcsU0FBUyxTQUFTLFVBQVUsS0FBSztNQUNsRCxPQUFPO1FBQ0wsTUFBTTtRQUNOLFNBQVM7TUFDWDtJQUNGO0VBQ0YsR0FWdUIsZ0JBQUE7QUFZdkIsUUFBTSxnQkFBZ0IsZ0JBQUFBLFFBQUEsTUFBTSxRQUFRLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLEtBQUssR0FBNUMsZUFBQTtBQUV0QixRQUFNLGtCQUFrQixnQkFBQUEsUUFBQSxDQUFDLFNBQWlCO0FBQ3hDLFdBQU8sUUFBUSxLQUFLLENBQUMsVUFBVSxNQUFNLE1BQU0sS0FBSyxJQUFJLENBQUM7RUFDdkQsR0FGd0IsaUJBQUE7QUFJeEIsUUFBTSxtQkFBbUIsZ0JBQUFBLFFBQUEsTUFBTSxRQUFRLEtBQUssQ0FBQyxVQUFVLE9BQU8sT0FBTyxHQUE1QyxrQkFBQTtBQUV6QixRQUFNLG9CQUFvQixnQkFBQUEsUUFBQSxPQUFPLFNBQXdCO0FBQ3ZELFVBQU0sWUFBWSxRQUFRLE9BQU8sU0FBUyxRQUFRO0FBQ2xELFVBQU0sUUFBUSxnQkFBZ0IsU0FBUyxLQUFLLGlCQUFpQjtBQUM3RCxtQkFBZSxZQUFZO0FBQzNCLFdBQU8sTUFBTSxFQUFFLFNBQVMsZUFBZSxDQUFDO0VBQzFDLEdBTDBCLG1CQUFBO0FBTzFCLFFBQU0sV0FBVyxnQkFBQUEsUUFBQSxNQUFNLE9BQU8sU0FBUyxRQUFRLE1BQTlCLFVBQUE7QUFFakIsUUFBTSxrQkFBa0IsZ0JBQUFBLFFBQUEsTUFBTSxDQUFDLENBQUMsU0FBUyxHQUFqQixpQkFBQTtBQUV4QixRQUFNLFdBQVcsZ0JBQUFBLFFBQUEsQ0FBQyxTQUFpQjtBQUNqQyxXQUFPLFNBQVMsT0FBTztFQUN6QixHQUZpQixVQUFBO0FBSWpCLFFBQU0sT0FBTyxnQkFBQUEsUUFBQSxNQUFNO0FBQ2pCLG1CQUFlO0FBQ2Ysc0JBQWtCO0FBQ2xCLG9CQUFnQixJQUFJLGtCQUFrQixTQUFTLENBQUMsSUFBSSxlQUFlO0VBQ3JFLEdBSmEsTUFBQTtBQU1iLFNBQU8sRUFBRSxNQUFNLFNBQVM7QUFDMUIsR0FoRjhCLFFBQUE7OztBQ3VCdkIsSUFBTSxVQUFVLHdCQUFDLEVBQUUsU0FBUyxNQUFjO0FBQ2hELFdBQVMsWUFBWTtBQUVyQixTQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLUixHQVJ1QjtBQVV2QixJQUFNLGVBQWUsOEJBQU87QUFBQSxFQUMzQixTQUFTLHdCQUFDLEVBQUUsS0FBQVMsS0FBSSxNQUFtQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUExQjtBQVdWLElBWnFCOyIsCiAgIm5hbWVzIjogWyJfX25hbWUiLCAidCIsICJuIiwgInMiLCAiciIsICJnbG9iYWxSdWxlcyIsICJyZXN1bHQiLCAic2VsZWN0b3IiLCAiY3NzIiwgImNzcyJdCn0K
