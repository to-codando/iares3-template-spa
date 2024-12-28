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
var renderTemplateObject = /* @__PURE__ */ __name2((template2, contextElement, state = {}) => () => {
  const _chain = createChain();
  _chain.add({
    validator: isString(template2.type),
    action: createElementByTagName(template2, contextElement, state)
  });
  _chain.add({
    validator: isFunction(template2.type),
    action: createElementByFactoryName(template2, contextElement, state)
  });
  _chain.execute();
}, "renderTemplateObject");
var renderTemplateArray = /* @__PURE__ */ __name2((templateSchema, contextElement, state = {}) => () => {
  for (const template2 of templateSchema) {
    render(template2, contextElement, state);
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
var createElementByFactoryName = /* @__PURE__ */ __name2((template2, parentElement, latestState = {}) => {
  return () => {
    const factory = template2.type;
    const tagName = _createTagByFactoryName(factory);
    const selector = tagName.toLowerCase();
    const element = document.createElement(tagName);
    const props = template2.props;
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
      render(template2, parentElement, payload);
    });
  };
}, "createElementByFactoryName");
var createElementByTagName = /* @__PURE__ */ __name2((template2, parentElement, state = {}) => () => {
  const tagName = template2.type;
  const selector = tagName.toLowerCase();
  const element = document.createElement(tagName);
  const hashId = parentElement.getAttribute("class");
  const className = template2?.props?.class;
  if (className) {
    if (!className.includes(hashId)) {
      const newClassName = `${hashId}_${className}`;
      setElementAttributes(element, { class: newClassName });
      parentElement.insertAdjacentElement("beforeend", element);
      renderChildren(template2.children, element, state);
      return;
    }
  }
  setElementAttributes(element, template2.props);
  parentElement.insertAdjacentElement("beforeend", element);
  renderChildren(template2.children, element, state);
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
var render = /* @__PURE__ */ __name2((template2, context = document.body, state = {}) => {
  const chain = createChain();
  const componentElement = context || document.querySelector("body");
  chain.add({
    validator: isArray(template2),
    action: renderTemplateArray(
      template2,
      componentElement,
      state
    )
  });
  chain.add({
    validator: isObject(template2),
    action: renderTemplateObject(
      template2,
      componentElement,
      state
    )
  });
  chain.add({
    validator: isTemplateData(template2),
    action: renderTemplateData(template2, componentElement, state)
  });
  chain.execute();
  return componentElement;
}, "render");
var router = /* @__PURE__ */ __name2(({ routes: routes2, context }) => {
  const _routes = routes2;
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

// src/frontend/ui/pages/DefaultApp/index.ts
var DefaultApp = /* @__PURE__ */ __name(({ useStyle }) => {
  useStyle(createStyles);
  return html`
  <div class="wrap">
    <h1>404</h1>
    <span>Página não encontrada</span>
    <a href="#/">Voltar</a>
  </div>
`;
}, "DefaultApp");
var createStyles = /* @__PURE__ */ __name(() => ({
  DefaultApp: /* @__PURE__ */ __name(({ css: css2 }) => css2`
    display:flex;
    width:100%;
    padding:1em;

  .wrap,
  .wrap h1,
  .wrap span {
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
  }

  .wrap h1 {
      font-size: 2em;
  }

  .wrap h1,
  .wrap span {
    margin-bottom: 1em;
  }

  .wrap a {
      padding:1em; 
      color:#ebebeb;
      background: #603a98;
      border-radius:8px
    }

    .wrap a:hover {
      text-decoration:underline
    }

  .wrap {
    flex-wrap:wrap;
    flex-direction: column;

    padding:1em;
    border: 1px solid red;
    border-radius:8px;

    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: wave 15s ease infinite;     
  }

  @keyframes wave {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
  }

  @media all and (max-width:2560px){
    .wrap {
      padding:15px;
    }
  }
`, "DefaultApp")
}), "createStyles");

// src/frontend/ui/elements/TimerApp/index.ts
var template = /* @__PURE__ */ __name((params) => {
  const { state, styles, html: html2 } = params;
  const timeLeft = Number(state.timeLeft);
  return html2`

    <div class="timer"> 
      <span>A simple counter</span>
      <span>${timeLeft <= 9 && "0"}${timeLeft || "0"}s</span>
    </div>
    `;
}, "template");
var createStateHandler = /* @__PURE__ */ __name((params) => {
  const { state, seconds } = params;
  return () => {
    const { timeLeft } = state.get();
    if (!timeLeft) return;
    state.set({ timeLeft: timeLeft - seconds });
  };
}, "createStateHandler");
var createStateWatcher = /* @__PURE__ */ __name(({ oneSecond, timer }) => ({ timeLeft }) => {
  if (timeLeft < oneSecond) {
    clearTimeout(timer);
  }
}, "createStateWatcher");
var TimerApp2 = /* @__PURE__ */ __name(({ useState, useStyle, useTemplate }) => {
  const state = useState({ timeLeft: 120 });
  useStyle(createStyles2);
  const oneSecond = 1;
  const cycleTime = 1e3;
  const stateHandler = createStateHandler({ state, seconds: oneSecond });
  const timer = setTimeout(stateHandler, cycleTime);
  const stateWatcher = createStateWatcher({ oneSecond, timer });
  state.watch(stateWatcher);
  return useTemplate(template);
}, "TimerApp");
var createStyles2 = /* @__PURE__ */ __name(() => ({
  TimerApp: /* @__PURE__ */ __name(({ css: css2 }) => css2`
      display:flex;
      width:100%;
      justify-content:center;

    .timer {
      background:#b9c5ec;
      padding:15px;
      border-radius:8px;
    }

    .timer span { 
      color: #2072ba; 
      font-size: 1em; 
    }

    .timer span + span {
        font-weight:bold;
        font-size: 2em
      }

    .timer span:first-of-type {
        margin-bottom:1em
      }
   
`, "TimerApp")
}), "createStyles");

// src/frontend/ui/pages/HomeApp/index.ts
var HomeApp = /* @__PURE__ */ __name(({ useStyle }) => {
  useStyle(createStyles3);
  return html`
  <div class="wrap">
    <h1>Home Page</h1>
    <span>A simple <b>IARES</b> page template app.</span>
    <${TimerApp2} />
  </div>
`;
}, "HomeApp");
var createStyles3 = /* @__PURE__ */ __name(() => ({
  HomeApp: /* @__PURE__ */ __name(({ css: css2 }) => css2`
    display:flex;
    width:100%;
    padding:1em;

  .wrap,
  .wrap h1,
  .wrap span {
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
  }

  .wrap > h1 {
      font-size: 2em;
      margin-bottom:1em;
  }

  .wrap > span {
    margin-bottom: 2em;
  }

  .wrap b {padding:0 6px;}

  .wrap {
    flex-wrap:wrap;
    flex-direction: column;

    padding:1em;
    border: 1px solid red;
    border-radius:8px;

    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: wave 15s ease infinite;     
  }

  @keyframes wave {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
  }

  @media all and (max-width:2560px){
    .wrap {
      padding:15px;
    }
  }
`, "HomeApp")
}), "createStyles");

// src/frontend/routes/index.ts
var routes = [
  {
    regex: /^\/404$/,
    default: "#/404",
    mount: /* @__PURE__ */ __name(({ context }) => {
      render(html`<${DefaultApp} />`, context);
    }, "mount")
  },
  {
    regex: /^#\/$/,
    start: "#/",
    mount: /* @__PURE__ */ __name(({ context }) => {
      render(html`<${HomeApp}/>`, context);
    }, "mount")
  }
];
export {
  routes
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vaWFyZXMvc3JjL0NyZWF0ZUFwcC9DcmVhdGVBcHAudHMiLCAiLi4vLi4vLi4vLi4vaWFyZXMvc3JjL3N0YXRlL2NyZWF0ZVN0YXRlLnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy9mYWN0b3JpZXMvY3JlYXRlQ2hhaW4vaW5kZXgudHMiLCAiLi4vLi4vLi4vLi4vaWFyZXMvc3JjL3V0aWxzL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy92YWxpZGF0b3JzL3RlbXBsYXRlL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlT2JqZWN0LnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlQXJyYXkudHMiLCAiLi4vLi4vLi4vLi4vaWFyZXMvc3JjL2FjdGlvbnMvdGVtcGxhdGUvcmVuZGVyQ2hpbGRyZW4udHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2h0bUAzLjEuMS9ub2RlX21vZHVsZXMvaHRtL2Rpc3QvaHRtLm1vZHVsZS5qcyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvdGVtcGxhdGUvaHRtbC50cyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvc3R5bGUvY3JlYXRlSGFzaC50cyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvc3R5bGUvY3JlYXRlU3R5bGVFbGVtZW50LnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy9zdHlsZS9jc3NQYXJzZXIudHMiLCAiLi4vLi4vLi4vLi4vaWFyZXMvc3JjL3N0eWxlL2Nzcy50cyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9zZXRFbGVtZW50QXR0cmlidXRlcy50cyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9jcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZS50cyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9jcmVhdGVFbGVtZW50QnlUYWdOYW1lLnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlRGF0YS50cyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvcmVuZGVyL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy9yb3V0ZXIvcm91dGVyLnRzIiwgIi4uLy4uLy4uL3NyYy9mcm9udGVuZC91aS9wYWdlcy9EZWZhdWx0QXBwL2luZGV4LnRzIiwgIi4uLy4uLy4uL3NyYy9mcm9udGVuZC91aS9lbGVtZW50cy9UaW1lckFwcC9pbmRleC50cyIsICIuLi8uLi8uLi9zcmMvZnJvbnRlbmQvdWkvcGFnZXMvSG9tZUFwcC9pbmRleC50cyIsICIuLi8uLi8uLi9zcmMvZnJvbnRlbmQvcm91dGVzL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7XG4gIEFwcGxpY2F0aW9uLFxuICBDb250ZXh0RWxlbWVudCxcbiAgQ29udGV4dEhhbmRsZXIsXG4gIENhbGxiYWNrSGFuZGxlcixcbn0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IENyZWF0ZUFwcCA9ICgpOiBBcHBsaWNhdGlvbiA9PiB7XG4gIGxldCBfZWxlbWVudCE6IENvbnRleHRFbGVtZW50O1xuXG4gIGNvbnN0IHNldHVwID0gKGNhbGxiYWNrOiBDb250ZXh0SGFuZGxlcikgPT4ge1xuICAgIF9lbGVtZW50ID0gY2FsbGJhY2soKTtcbiAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgfTtcblxuICBjb25zdCBtb3VudCA9IChjYWxsYmFjazogQ2FsbGJhY2tIYW5kbGVyKSA9PiB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKF9lbGVtZW50KTtcbiAgfTtcblxuICBjb25zdCB1bm1vdW50ID0gKGNhbGxiYWNrOiBDYWxsYmFja0hhbmRsZXIpID0+IHtcbiAgICByZXR1cm4gY2FsbGJhY2soX2VsZW1lbnQpO1xuICB9O1xuXG4gIHJldHVybiB7IHNldHVwLCBtb3VudCwgdW5tb3VudCB9O1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IFN0YXRlV2F0Y2hlciwgU3RhdGUsIFN0YXRlTWFuYWdlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IF9jcmVhdGVVVUlEID0gKCk6IHN0cmluZyA9PiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgMTEpO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU3RhdGUgPSA8UyA9IHVua25vd24+KFxuICBpbml0aWFsU3RhdGU6IFN0YXRlPFM+LFxuKTogU3RhdGVNYW5hZ2VyPFM+ID0+IHtcbiAgY29uc3QgX3N0YXRlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpbml0aWFsU3RhdGUpKTtcbiAgY29uc3QgX3dhdGNoZXJzID0gbmV3IFNldDxTdGF0ZVdhdGNoZXI8Uz4+KCk7XG5cbiAgY29uc3QgX25vdGlmeUhhbmRsZXJzID0gKHBheWxvYWQ6IFN0YXRlPFM+KSA9PiB7XG4gICAgZm9yIChjb25zdCBzdGF0ZVdhdGNoZXIgb2YgX3dhdGNoZXJzKSB7XG4gICAgICBzdGF0ZVdhdGNoZXIocGF5bG9hZCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNldCA9IChwYXlsb2FkOiBTdGF0ZTxTPikgPT4ge1xuICAgIE9iamVjdC5hc3NpZ24oX3N0YXRlLCBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKSk7XG4gICAgX25vdGlmeUhhbmRsZXJzKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX3N0YXRlKSkpO1xuICB9O1xuXG4gIGNvbnN0IGdldCA9ICgpOiBTdGF0ZTxTPiA9PiB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX3N0YXRlKSk7XG4gIH07XG5cbiAgY29uc3Qgd2F0Y2ggPSAoY2FsbGJhY2s6IFN0YXRlV2F0Y2hlcjxTPikgPT4ge1xuICAgIF93YXRjaGVycy5hZGQoY2FsbGJhY2spO1xuICB9O1xuXG4gIHJldHVybiB7IHNldCwgZ2V0LCB3YXRjaCB9O1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IENoYWluTGluayB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDaGFpbiA9ICgpID0+IHtcbiAgY29uc3QgX2NoYWluID0gbmV3IFNldDxDaGFpbkxpbms8dW5rbm93bj4+KCk7XG5cbiAgY29uc3QgYWRkID0gPFQ+KGNoYWluTGluazogQ2hhaW5MaW5rPFQ+KSA9PiB7XG4gICAgX2NoYWluLmFkZChjaGFpbkxpbmspO1xuICB9O1xuXG4gIGNvbnN0IGV4ZWN1dGUgPSAoKSA9PiB7XG4gICAgZm9yIChjb25zdCB7IGFjdGlvbiwgdmFsaWRhdG9yIH0gb2YgX2NoYWluKSB7XG4gICAgICBpZiAodmFsaWRhdG9yKCkpIGFjdGlvbigpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBhZGQsIGV4ZWN1dGUgfTtcbn07XG4iLCAiZXhwb3J0IGNvbnN0IGVzY2FwZVRlbXBsYXRlU3RyaW5nID0gKHRlbXBsYXRlU3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAodHlwZW9mIHRlbXBsYXRlU3RyaW5nICE9PSBcInN0cmluZ1wiKSByZXR1cm4gdGVtcGxhdGVTdHJpbmc7XG4gIHJldHVybiB0ZW1wbGF0ZVN0cmluZ1xuICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcbiAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcbiAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcbiAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcbiAgICAucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpXG4gICAgLnJlcGxhY2UoL1xcLy9nLCBcIiYjeDJGO1wiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBiaW5kU3R5bGVTY29wZSA9IChzY29wZUlkOiBzdHJpbmcsIHN0cmluZ3M6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHJlZ2V4ID0gLyhcXC4oXFx3KykoXFwtKnxcXF8qKT8pK1xcdysvZ2k7XG4gIHJldHVybiBzdHJpbmdzLnJlcGxhY2UocmVnZXgsICh2YWx1ZXMpID0+IHtcbiAgICByZXR1cm4gYC4ke3Njb3BlSWR9LSR7dmFsdWVzLnJlcGxhY2UoL1xcLi8sIFwiXCIpfWA7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVVVSUQgPSAoKSA9PiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyLCA2KTtcblxuZXhwb3J0IGNvbnN0IEhUTUxFdmVudHMgPSBbXG4gIC8vIEV2ZW50b3MgZGUgTW91c2VcbiAgXCJvbmNsaWNrXCIsXG4gIFwib25kYmxjbGlja1wiLFxuICBcIm9ubW91c2Vkb3duXCIsXG4gIFwib25tb3VzZXVwXCIsXG4gIFwib25tb3VzZW92ZXJcIixcbiAgXCJvbm1vdXNlb3V0XCIsXG4gIFwib25tb3VzZW1vdmVcIixcbiAgXCJvbm1vdXNlZW50ZXJcIixcbiAgXCJvbm1vdXNlbGVhdmVcIixcbiAgXCJvbmNvbnRleHRtZW51XCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBUZWNsYWRvXG4gIFwib25rZXlkb3duXCIsXG4gIFwib25rZXl1cFwiLFxuICBcIm9ua2V5cHJlc3NcIixcblxuICAvLyBFdmVudG9zIGRlIEZvY29cbiAgXCJvbmZvY3VzXCIsXG4gIFwib25ibHVyXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBGb3JtdWxcdTAwRTFyaW9cbiAgXCJvbnN1Ym1pdFwiLFxuICBcIm9uY2hhbmdlXCIsXG4gIFwib25pbnB1dFwiLFxuICBcIm9ucmVzZXRcIixcbiAgXCJvbmludmFsaWRcIixcblxuICAvLyBFdmVudG9zIGRlIE1cdTAwRURkaWFcbiAgXCJvbnBsYXlcIixcbiAgXCJvbnBhdXNlXCIsXG4gIFwib25lbmRlZFwiLFxuICBcIm9udm9sdW1lY2hhbmdlXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBUb3F1ZSAoVG91Y2gpIC0gcGFyYSBkaXNwb3NpdGl2b3MgbVx1MDBGM3ZlaXNcbiAgXCJvbnRvdWNoc3RhcnRcIixcbiAgXCJvbnRvdWNobW92ZVwiLFxuICBcIm9udG91Y2hlbmRcIixcbiAgXCJvbnRvdWNoY2FuY2VsXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBBbmltYVx1MDBFN1x1MDBFM28gZSBUcmFuc2lcdTAwRTdcdTAwRTNvXG4gIFwib25hbmltYXRpb25zdGFydFwiLFxuICBcIm9uYW5pbWF0aW9uZW5kXCIsXG4gIFwib25hbmltYXRpb25pdGVyYXRpb25cIixcbiAgXCJvbnRyYW5zaXRpb25lbmRcIixcblxuICAvLyBFdmVudG9zIGRlIE91dHJvcyBJbnRlcmF0aXZvc1xuICBcIm9ubG9hZFwiLFxuICBcIm9uZXJyb3JcIixcbiAgXCJvbnJlc2l6ZVwiLFxuICBcIm9uc2Nyb2xsXCIsXG5dO1xuIiwgImltcG9ydCB7IEhUTUxFdmVudHMgfSBmcm9tIFwiQC91dGlsc1wiO1xuXG5jb25zdCBpc09iamVjdCA9XG4gIDxUPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiAhIXBheWxvYWQgJiYgIUFycmF5LmlzQXJyYXkocGF5bG9hZCkgJiYgdHlwZW9mIHBheWxvYWQgPT09IFwib2JqZWN0XCI7XG4gICAgfTtcblxuY29uc3QgaXNBcnJheSA9XG4gIDxUPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiAhIXBheWxvYWQgJiYgQXJyYXkuaXNBcnJheShwYXlsb2FkKTtcbiAgICB9O1xuXG5jb25zdCBpc0Z1bmN0aW9uID1cbiAgPFQgPSB2b2lkPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiAhIXBheWxvYWQgJiYgdHlwZW9mIHBheWxvYWQgPT09IFwiZnVuY3Rpb25cIjtcbiAgICB9O1xuXG5jb25zdCBpc1N0cmluZyA9XG4gIDxUID0gdm9pZD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICByZXR1cm4gdHlwZW9mIHBheWxvYWQgPT09IFwic3RyaW5nXCI7XG4gICAgfTtcblxuY29uc3QgaXNFdmVudE5hbWUgPVxuICA8VCA9IHZvaWQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBwYXlsb2FkICE9PSBcInN0cmluZ1wiKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gSFRNTEV2ZW50cy5pbmNsdWRlcyhwYXlsb2FkLnRvTG93ZXJDYXNlKCkpO1xuICAgIH07XG5cbmNvbnN0IGlzVGVtcGxhdGVEYXRhID1cbiAgPFQgPSB2b2lkPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgcGF5bG9hZCA9PT0gXCJudW1iZXJcIjtcbiAgICB9O1xuXG5leHBvcnQgeyBpc09iamVjdCwgaXNBcnJheSwgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIGlzRXZlbnROYW1lLCBpc1RlbXBsYXRlRGF0YSB9O1xuIiwgImltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90eXBlc1wiO1xuaW1wb3J0IHsgY3JlYXRlQ2hhaW4gfSBmcm9tIFwiQC9mYWN0b3JpZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnRCeUZhY3RvcnlOYW1lLCBjcmVhdGVFbGVtZW50QnlUYWdOYW1lIH0gZnJvbSBcIkAvYWN0aW9uc1wiO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiwgaXNTdHJpbmcgfSBmcm9tIFwiQC92YWxpZGF0b3JzXCI7XG5pbXBvcnQgdHlwZSB7IFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcblxuZXhwb3J0IGNvbnN0IHJlbmRlclRlbXBsYXRlT2JqZWN0ID1cbiAgKHRlbXBsYXRlOiBUZW1wbGF0ZVNjaGVtYSwgY29udGV4dEVsZW1lbnQ6IEVsZW1lbnQsIHN0YXRlOiBTdGF0ZSA9IHt9KSA9PlxuICAgICgpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IF9jaGFpbiA9IGNyZWF0ZUNoYWluKCk7XG5cbiAgICAgIF9jaGFpbi5hZGQoe1xuICAgICAgICB2YWxpZGF0b3I6IGlzU3RyaW5nKHRlbXBsYXRlLnR5cGUpLFxuICAgICAgICBhY3Rpb246IGNyZWF0ZUVsZW1lbnRCeVRhZ05hbWUodGVtcGxhdGUsIGNvbnRleHRFbGVtZW50LCBzdGF0ZSksXG4gICAgICB9KTtcblxuICAgICAgX2NoYWluLmFkZCh7XG4gICAgICAgIHZhbGlkYXRvcjogaXNGdW5jdGlvbih0ZW1wbGF0ZS50eXBlKSxcbiAgICAgICAgYWN0aW9uOiBjcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZSh0ZW1wbGF0ZSwgY29udGV4dEVsZW1lbnQsIHN0YXRlKSxcbiAgICAgIH0pO1xuXG4gICAgICBfY2hhaW4uZXhlY3V0ZSgpO1xuICAgIH07XG4iLCAiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIkAvcmVuZGVyXCI7XG5pbXBvcnQgdHlwZSB7IFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIkAvdHlwZXNcIjtcbmltcG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyVGVtcGxhdGVBcnJheSA9XG4gIChcbiAgICB0ZW1wbGF0ZVNjaGVtYTogVGVtcGxhdGVTY2hlbWFbXSxcbiAgICBjb250ZXh0RWxlbWVudDogRWxlbWVudCxcbiAgICBzdGF0ZTogU3RhdGUgPSB7fSxcbiAgKSA9PlxuICAgICgpID0+IHtcbiAgICAgIGZvciAoY29uc3QgdGVtcGxhdGUgb2YgdGVtcGxhdGVTY2hlbWEpIHtcbiAgICAgICAgcmVuZGVyKHRlbXBsYXRlLCBjb250ZXh0RWxlbWVudCwgc3RhdGUpO1xuICAgICAgfVxuICAgIH07XG4iLCAiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIkAvcmVuZGVyXCI7XG5pbXBvcnQgdHlwZSB7IFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIkAvdGVtcGxhdGVcIjtcbmltcG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyQ2hpbGRyZW4gPSAoXG4gIGNoaWxkcmVuOiBUZW1wbGF0ZVNjaGVtYVtdLFxuICBwYXJlbnRFbGVtZW50OiBFbGVtZW50LFxuICBzdGF0ZTogU3RhdGUgPSB7fSxcbikgPT4ge1xuICBwYXJlbnRFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG4gIGlmICghQXJyYXkuaXNBcnJheShjaGlsZHJlbikgJiYgdHlwZW9mIGNoaWxkcmVuID09PSBcIm9iamVjdFwiKSB7XG4gICAgcmVuZGVyKGNoaWxkcmVuLCBwYXJlbnRFbGVtZW50LCBzdGF0ZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgIHJlbmRlcihjaGlsZCwgcGFyZW50RWxlbWVudCwgc3RhdGUpO1xuICB9XG59O1xuIiwgInZhciBuPWZ1bmN0aW9uKHQscyxyLGUpe3ZhciB1O3NbMF09MDtmb3IodmFyIGg9MTtoPHMubGVuZ3RoO2grKyl7dmFyIHA9c1toKytdLGE9c1toXT8oc1swXXw9cD8xOjIscltzW2grK11dKTpzWysraF07Mz09PXA/ZVswXT1hOjQ9PT1wP2VbMV09T2JqZWN0LmFzc2lnbihlWzFdfHx7fSxhKTo1PT09cD8oZVsxXT1lWzFdfHx7fSlbc1srK2hdXT1hOjY9PT1wP2VbMV1bc1srK2hdXSs9YStcIlwiOnA/KHU9dC5hcHBseShhLG4odCxhLHIsW1wiXCIsbnVsbF0pKSxlLnB1c2godSksYVswXT9zWzBdfD0yOihzW2gtMl09MCxzW2hdPXUpKTplLnB1c2goYSl9cmV0dXJuIGV9LHQ9bmV3IE1hcDtleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzKXt2YXIgcj10LmdldCh0aGlzKTtyZXR1cm4gcnx8KHI9bmV3IE1hcCx0LnNldCh0aGlzLHIpKSwocj1uKHRoaXMsci5nZXQocyl8fChyLnNldChzLHI9ZnVuY3Rpb24obil7Zm9yKHZhciB0LHMscj0xLGU9XCJcIix1PVwiXCIsaD1bMF0scD1mdW5jdGlvbihuKXsxPT09ciYmKG58fChlPWUucmVwbGFjZSgvXlxccypcXG5cXHMqfFxccypcXG5cXHMqJC9nLFwiXCIpKSk/aC5wdXNoKDAsbixlKTozPT09ciYmKG58fGUpPyhoLnB1c2goMyxuLGUpLHI9Mik6Mj09PXImJlwiLi4uXCI9PT1lJiZuP2gucHVzaCg0LG4sMCk6Mj09PXImJmUmJiFuP2gucHVzaCg1LDAsITAsZSk6cj49NSYmKChlfHwhbiYmNT09PXIpJiYoaC5wdXNoKHIsMCxlLHMpLHI9NiksbiYmKGgucHVzaChyLG4sMCxzKSxyPTYpKSxlPVwiXCJ9LGE9MDthPG4ubGVuZ3RoO2ErKyl7YSYmKDE9PT1yJiZwKCkscChhKSk7Zm9yKHZhciBsPTA7bDxuW2FdLmxlbmd0aDtsKyspdD1uW2FdW2xdLDE9PT1yP1wiPFwiPT09dD8ocCgpLGg9W2hdLHI9Myk6ZSs9dDo0PT09cj9cIi0tXCI9PT1lJiZcIj5cIj09PXQ/KHI9MSxlPVwiXCIpOmU9dCtlWzBdOnU/dD09PXU/dT1cIlwiOmUrPXQ6J1wiJz09PXR8fFwiJ1wiPT09dD91PXQ6XCI+XCI9PT10PyhwKCkscj0xKTpyJiYoXCI9XCI9PT10PyhyPTUscz1lLGU9XCJcIik6XCIvXCI9PT10JiYocjw1fHxcIj5cIj09PW5bYV1bbCsxXSk/KHAoKSwzPT09ciYmKGg9aFswXSkscj1oLChoPWhbMF0pLnB1c2goMiwwLHIpLHI9MCk6XCIgXCI9PT10fHxcIlxcdFwiPT09dHx8XCJcXG5cIj09PXR8fFwiXFxyXCI9PT10PyhwKCkscj0yKTplKz10KSwzPT09ciYmXCIhLS1cIj09PWUmJihyPTQsaD1oWzBdKX1yZXR1cm4gcCgpLGh9KHMpKSxyKSxhcmd1bWVudHMsW10pKS5sZW5ndGg+MT9yOnJbMF19XG4iLCAiaW1wb3J0IGh0bSBmcm9tIFwiaHRtXCI7XG5pbXBvcnQgdHlwZSB7IFRhZ2dlZFRlbXBsYXRlLCBUZW1wbGF0ZVByb3BzLCBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IGh5cGVydGV4dCA9IChcbiAgdHlwZTogdW5rbm93bixcbiAgcHJvcHM6IFRlbXBsYXRlUHJvcHMsXG4gIC4uLmNoaWxkcmVuOiBUZW1wbGF0ZVNjaGVtYVtdXG4pID0+IHtcbiAgcmV0dXJuIHsgdHlwZSwgcHJvcHMsIGNoaWxkcmVuIH07XG59O1xuXG5jb25zdCBodG1sID0gaHRtLmJpbmQ8VGFnZ2VkVGVtcGxhdGU+KGh5cGVydGV4dCk7XG5cbmV4cG9ydCB7IGh0bWwgfTtcbmV4cG9ydCB7IGh0bWwgYXMganN4IH07XG5leHBvcnQgeyBodG1sIGFzIHRzeCB9O1xuIiwgIi8qKlxuICogR2VyYSB1bSBoYXNoIFx1MDBGQW5pY28gYmFzZWFkbyBubyBhbGdvcml0bW8gREpCMi5cbiAqIEBwYXJhbSBzdHIgLSBPIGNvbnRlXHUwMEZBZG8gYSBwYXJ0aXIgZG8gcXVhbCBvIGhhc2ggc2VyXHUwMEUxIGdlcmFkby5cbiAqIEByZXR1cm5zIE8gaGFzaCBnZXJhZG8gY29tbyB1bWEgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlSGFzaCA9ICh0ZXh0OiBzdHJpbmcsIHNlbGVjdG9yOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBsZXQgaGFzaCA9IDUzODE7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xuICAgIGhhc2ggPSAoaGFzaCAqIDMzKSBeIHRleHQuY2hhckNvZGVBdChpKTtcbiAgfVxuICByZXR1cm4gYCR7c2VsZWN0b3J9LSR7KGhhc2ggPj4+IDApLnRvU3RyaW5nKDM2KX1gO1xufTtcbiIsICJjb25zdCBzdHlsZUVsZW1lbnRDYWNoZTogTWFwPHN0cmluZywgSFRNTFN0eWxlRWxlbWVudD4gPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTdHlsZUVsZW1lbnQgPSAoY29tcG9uZW50SWQ6IHN0cmluZyk6IEhUTUxTdHlsZUVsZW1lbnQgPT4ge1xuICBjb25zdCBzdHlsZUVsZW1lbnQgPSBzdHlsZUVsZW1lbnRDYWNoZS5nZXQoY29tcG9uZW50SWQpO1xuXG4gIGlmIChzdHlsZUVsZW1lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBzdHlsZUVsZW1lbnQ7XG4gIH1cblxuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgc3R5bGUuc2V0QXR0cmlidXRlKFwiZGF0YS1jb21wb25lbnRcIiwgY29tcG9uZW50SWQpO1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgc3R5bGVFbGVtZW50Q2FjaGUuc2V0KGNvbXBvbmVudElkLCBzdHlsZSk7XG5cbiAgcmV0dXJuIHN0eWxlO1xufTtcbiIsICJ0eXBlIFdyYXBTdHlsZVBhcmFtcyA9IHtcbiAgc3R5bGU6IHN0cmluZztcbiAgc2VsZWN0b3I6IHN0cmluZztcbn07XG5cbnR5cGUgQWNjdW11bGF0b3IgPSB7XG4gIGluc2lkZUJsb2NrOiBudW1iZXI7XG4gIGdsb2JhbFJ1bGVzOiBzdHJpbmc7XG4gIHJlc3VsdDogc3RyaW5nO1xufTtcblxudHlwZSBMaW5lUHJvY2Vzc2luZyA9IHtcbiAgZ2xvYmFsUnVsZXM6IHN0cmluZztcbiAgcmVzdWx0OiBzdHJpbmc7XG59O1xuXG5jb25zdCB3cmFwTG9vc2VSdWxlc091dHNpZGVNZWRpYVF1ZXJ5ID0gKHtcbiAgc3R5bGUsXG4gIHNlbGVjdG9yLFxufTogV3JhcFN0eWxlUGFyYW1zKTogc3RyaW5nID0+IHtcbiAgY29uc3QgbGluZXMgPSBzdHlsZS5zcGxpdChcIlxcblwiKTtcbiAgY29uc3QgcnVsZVJlZ2V4ID0gL15cXHMqKFtcXHctXSspXFxzKjpcXHMqW147XSs7LztcblxuICBjb25zdCBpbml0aWFsU3RhdGU6IEFjY3VtdWxhdG9yID0ge1xuICAgIGluc2lkZUJsb2NrOiAwLFxuICAgIGdsb2JhbFJ1bGVzOiBcIlwiLFxuICAgIHJlc3VsdDogXCJcIixcbiAgfTtcblxuICBjb25zdCBwcm9jZXNzR2xvYmFsUnVsZXMgPSAoXG4gICAgZ2xvYmFsUnVsZXM6IHN0cmluZyxcbiAgICByZXN1bHQ6IHN0cmluZyxcbiAgICBzZWxlY3Rvcjogc3RyaW5nLFxuICApOiBMaW5lUHJvY2Vzc2luZyA9PiAoe1xuICAgIGdsb2JhbFJ1bGVzOiBcIlwiLFxuICAgIHJlc3VsdDogYCR7cmVzdWx0fSR7c2VsZWN0b3J9IHtcXG4ke2dsb2JhbFJ1bGVzfX1cXG5cXG5gLFxuICB9KTtcblxuICBjb25zdCBwcm9jZXNzUmVndWxhckxpbmUgPSAoXG4gICAgbGluZTogc3RyaW5nLFxuICAgIHJlc3VsdDogc3RyaW5nLFxuICApOiBMaW5lUHJvY2Vzc2luZyA9PiAoe1xuICAgIGdsb2JhbFJ1bGVzOiBcIlwiLFxuICAgIHJlc3VsdDogYCR7cmVzdWx0fSR7bGluZX1cXG5gLFxuICB9KTtcblxuICBjb25zdCBhZGRHbG9iYWxSdWxlID0gKFxuICAgIGxpbmU6IHN0cmluZyxcbiAgICBnbG9iYWxSdWxlczogc3RyaW5nLFxuICApOiBMaW5lUHJvY2Vzc2luZyA9PiAoe1xuICAgIGdsb2JhbFJ1bGVzOiBgJHtnbG9iYWxSdWxlc30ke2xpbmV9XFxuYCxcbiAgICByZXN1bHQ6IFwiXCIsXG4gIH0pO1xuXG4gIGNvbnN0IGNvdW50QmxvY2tzID0gKGxpbmU6IHN0cmluZyk6IG51bWJlciA9PiB7XG4gICAgY29uc3Qgb3BlbmluZ3MgPSAobGluZS5tYXRjaCgvey9nKSB8fCBbXSkubGVuZ3RoO1xuICAgIGNvbnN0IGNsb3NpbmdzID0gKGxpbmUubWF0Y2goL30vZykgfHwgW10pLmxlbmd0aDtcbiAgICByZXR1cm4gb3BlbmluZ3MgLSBjbG9zaW5ncztcbiAgfTtcblxuICBjb25zdCBwcm9jZXNzTGluZSA9IChhY2M6IEFjY3VtdWxhdG9yLCBsaW5lOiBzdHJpbmcpOiBBY2N1bXVsYXRvciA9PiB7XG4gICAgYWNjLmluc2lkZUJsb2NrICs9IGNvdW50QmxvY2tzKGxpbmUpO1xuXG4gICAgLy8gQ2FzZSAxOiBMaW5lIGlzIGEgZ2xvYmFsIHJ1bGVcbiAgICBpZiAoYWNjLmluc2lkZUJsb2NrID09PSAwICYmIHJ1bGVSZWdleC50ZXN0KGxpbmUpKSB7XG4gICAgICBjb25zdCB7IGdsb2JhbFJ1bGVzLCByZXN1bHQgfSA9IGFkZEdsb2JhbFJ1bGUobGluZSwgYWNjLmdsb2JhbFJ1bGVzKTtcbiAgICAgIHJldHVybiB7IC4uLmFjYywgZ2xvYmFsUnVsZXMsIHJlc3VsdDogYWNjLnJlc3VsdCArIHJlc3VsdCB9O1xuICAgIH1cblxuICAgIC8vIENhc2UgMjogVGhlcmUgYXJlIGFjY3VtdWxhdGVkIGdsb2JhbCBydWxlc1xuICAgIGlmIChhY2MuZ2xvYmFsUnVsZXMpIHtcbiAgICAgIGNvbnN0IHsgZ2xvYmFsUnVsZXMsIHJlc3VsdCB9ID0gcHJvY2Vzc0dsb2JhbFJ1bGVzKFxuICAgICAgICBhY2MuZ2xvYmFsUnVsZXMsXG4gICAgICAgIGFjYy5yZXN1bHQsXG4gICAgICAgIHNlbGVjdG9yLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHByb2Nlc3NlZExpbmUgPSBwcm9jZXNzUmVndWxhckxpbmUobGluZSwgXCJcIik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5hY2MsXG4gICAgICAgIGdsb2JhbFJ1bGVzLFxuICAgICAgICByZXN1bHQ6IHJlc3VsdCArIHByb2Nlc3NlZExpbmUucmVzdWx0LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBDYXNlIDM6IFJlZ3VsYXIgbGluZVxuICAgIGNvbnN0IHsgZ2xvYmFsUnVsZXMsIHJlc3VsdCB9ID0gcHJvY2Vzc1JlZ3VsYXJMaW5lKGxpbmUsIGFjYy5yZXN1bHQpO1xuICAgIHJldHVybiB7IC4uLmFjYywgZ2xvYmFsUnVsZXMsIHJlc3VsdCB9O1xuICB9O1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBnbG9iYWxSdWxlcyB9ID0gbGluZXMucmVkdWNlKHByb2Nlc3NMaW5lLCBpbml0aWFsU3RhdGUpO1xuXG4gIHJldHVybiBnbG9iYWxSdWxlc1xuICAgID8gYCR7cmVzdWx0fSR7c2VsZWN0b3J9IHtcXG4ke2dsb2JhbFJ1bGVzfX1cXG5gLnRyaW0oKVxuICAgIDogcmVzdWx0LnRyaW0oKTtcbn07XG5cbmNvbnN0IHdyYXBMb29zZVJ1bGVzSW5zaWRlTWVkaWFRdWVyeSA9ICh7XG4gIHN0eWxlLFxuICBzZWxlY3Rvcixcbn06IFdyYXBTdHlsZVBhcmFtcyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHJlZ2V4ID0gL0BtZWRpYVxccyooW157XSspXFxzKlxceyhbXFxzXFxTXSo/KVxcfS9nO1xuICBjb25zdCBydWxlUmVnZXggPSAvXlxccyooW1xcdy1dKylcXHMqOlxccypbXjtdKzsvO1xuXG4gIHJldHVybiBzdHlsZS5yZXBsYWNlKHJlZ2V4LCAobWF0Y2gsIG1lZGlhUXVlcnksIGlubmVyQ3NzKSA9PiB7XG4gICAgY29uc3QgcnVsZXMgPSBpbm5lckNzc1xuICAgICAgLnRyaW0oKVxuICAgICAgLnNwbGl0KFwiXFxuXCIpXG4gICAgICAubWFwKChsaW5lOiBzdHJpbmcpID0+IGxpbmUudHJpbSgpKVxuICAgICAgLmZpbHRlcigobGluZTogc3RyaW5nKSA9PiBsaW5lKTtcblxuICAgIGNvbnN0IHdyYXBwZWRSdWxlcyA9IHJ1bGVzXG4gICAgICAuZmlsdGVyKChydWxlOiBzdHJpbmcpID0+IHJ1bGVSZWdleC50ZXN0KHJ1bGUpKVxuICAgICAgLm1hcCgocnVsZTogc3RyaW5nKSA9PiBgJHtzZWxlY3Rvcn0ge1xcbiR7cnVsZS50cmltKCl9XFxufWApXG4gICAgICAuam9pbihcIlxcblwiKTtcblxuICAgIHJldHVybiBgQG1lZGlhICR7bWVkaWFRdWVyeS50cmltKCl9IHtcXG4ke3dyYXBwZWRSdWxlc31cXG59YDtcbiAgfSk7XG59O1xuXG5jb25zdCBhcHBseUNsYXNzTmFtZVNjb3BlID0gKHsgc3R5bGUsIHNlbGVjdG9yIH06IFdyYXBTdHlsZVBhcmFtcyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHJlZ2V4ID0gL1xcLihcXHcrKS9nO1xuICByZXR1cm4gc3R5bGUucmVwbGFjZShyZWdleCwgYC4ke3NlbGVjdG9yfV8kMWApO1xufTtcblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybVN0eWxlID0gKHJhd1N0eWxlOiBzdHJpbmcsIHNlbGVjdG9yOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBsZXQgc3R5bGUgPSByYXdTdHlsZTtcbiAgY29uc3QgY2xhc3NOYW1lID0gYC4ke3NlbGVjdG9yfWA7XG4gIHN0eWxlID0gYXBwbHlDbGFzc05hbWVTY29wZSh7IHN0eWxlLCBzZWxlY3RvciB9KTtcbiAgc3R5bGUgPSB3cmFwTG9vc2VSdWxlc091dHNpZGVNZWRpYVF1ZXJ5KHsgc3R5bGUsIHNlbGVjdG9yOiBjbGFzc05hbWUgfSk7XG4gIHN0eWxlID0gd3JhcExvb3NlUnVsZXNJbnNpZGVNZWRpYVF1ZXJ5KHsgc3R5bGUsIHNlbGVjdG9yOiBjbGFzc05hbWUgfSk7XG5cbiAgcmV0dXJuIHN0eWxlO1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IFRhZ2dlZFN0eWxlIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUhhc2ggfSBmcm9tIFwiLi9jcmVhdGVIYXNoXCI7XG5pbXBvcnQgeyB0cmFuc2Zvcm1TdHlsZSB9IGZyb20gXCIuL2Nzc1BhcnNlclwiO1xuaW1wb3J0IHsgY3JlYXRlU3R5bGVFbGVtZW50IH0gZnJvbSBcIi4vY3JlYXRlU3R5bGVFbGVtZW50XCI7XG5cbnR5cGUgSGFuZGxlclBhcmFtcyA9IHtcbiAgaGFzaElkOiBzdHJpbmc7XG4gIHNjb3BlZFN0eWxlOiBzdHJpbmc7XG4gIHN0eWxlRWxlbWVudDogRWxlbWVudDtcbn07XG50eXBlIEhhbmRsZXIgPSAocGF5bG9hZDogSGFuZGxlclBhcmFtcykgPT4gdm9pZDtcblxuY29uc3QgY3NzQ2FjaGU6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBjb25zdCBjc3MgPVxuICAoc2VsZWN0b3I6IHN0cmluZywgaGFuZGxlcjogSGFuZGxlciA9ICgpID0+IHt9KTogVGFnZ2VkU3R5bGUgPT5cbiAgKFxuICAgIHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5LFxuICAgIC4uLmludGVycG9sYXRpb25zOiAoc3RyaW5nIHwgbnVtYmVyKVtdXG4gICk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgcmF3Q1NTID0gc3RyaW5ncy5yZWR1Y2UoXG4gICAgICAoYWNjdW11bGF0b3IsIHN0ciwgaW5kZXgpID0+XG4gICAgICAgIGAke2FjY3VtdWxhdG9yfSR7c3RyfSR7aW50ZXJwb2xhdGlvbnNbaW5kZXhdICE9PSB1bmRlZmluZWQgPyBpbnRlcnBvbGF0aW9uc1tpbmRleF0gOiBcIlwifWAsXG4gICAgICBcIlwiLFxuICAgICk7XG5cbiAgICBjb25zdCBjYWNoZWRDbGFzc05hbWUgPSBjc3NDYWNoZS5nZXQocmF3Q1NTKTtcbiAgICBpZiAoY2FjaGVkQ2xhc3NOYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBjYWNoZWRDbGFzc05hbWU7XG4gICAgfVxuXG4gICAgY29uc3QgaGFzaElkID0gY3JlYXRlSGFzaChyYXdDU1MsIHNlbGVjdG9yKTtcbiAgICBjb25zdCBzY29wZWRTdHlsZSA9IHRyYW5zZm9ybVN0eWxlKHJhd0NTUywgYCR7aGFzaElkfWApO1xuICAgIGNvbnN0IHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChgJHtoYXNoSWR9YCk7XG5cbiAgICBoYW5kbGVyKHsgaGFzaElkLCBzY29wZWRTdHlsZSwgc3R5bGVFbGVtZW50IH0pO1xuXG4gICAgaWYgKCFzdHlsZUVsZW1lbnQuaW5uZXJIVE1MLmluY2x1ZGVzKHNjb3BlZFN0eWxlKSkge1xuICAgICAgc3R5bGVFbGVtZW50LmlubmVySFRNTCArPSBzY29wZWRTdHlsZTtcbiAgICB9XG5cbiAgICBjc3NDYWNoZS5zZXQocmF3Q1NTLCBoYXNoSWQpO1xuXG4gICAgcmV0dXJuIGhhc2hJZDtcbiAgfTtcbiIsICJpbXBvcnQgeyBpc0V2ZW50TmFtZSB9IGZyb20gXCJAL3ZhbGlkYXRvcnNcIjtcblxudHlwZSBBdHRyaWJ1dGUgPSBvYmplY3QgJiB7XG4gIFtrZXk6IHN5bWJvbCB8IHN0cmluZ106IHVua25vd247XG59O1xuXG50eXBlIEV2ZW50SGFuZGxlciA9IDxLIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRFdmVudE1hcD4oXG4gIGV2ZW50OiBIVE1MRWxlbWVudEV2ZW50TWFwW0tdLFxuKSA9PiB2b2lkO1xuXG5leHBvcnQgY29uc3Qgc2V0RWxlbWVudEF0dHJpYnV0ZXMgPSAoXG4gIGVsZW1lbnQ6IEVsZW1lbnQsXG4gIGF0dHJpYnV0ZXM6IEF0dHJpYnV0ZSxcbik6IEVsZW1lbnQgPT4ge1xuICBjb25zdCBhdHRyaWJ1dGVLZXlzID0gYXR0cmlidXRlcyA/IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpIDogW107XG4gIGZvciAoY29uc3Qga2V5IG9mIGF0dHJpYnV0ZUtleXMpIHtcbiAgICBpZiAoIWlzRXZlbnROYW1lKGtleSkoKSkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0gYXMgc3RyaW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXZlbnROYW1lID0ga2V5XG4gICAgICAgIC5yZXBsYWNlKC9vbi8sIFwiXCIpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpIGFzIGtleW9mIEhUTUxFbGVtZW50RXZlbnRNYXA7XG4gICAgICBjb25zdCBldmVudEhhbmRsZXIgPSBhdHRyaWJ1dGVzW2tleV0gYXMgRXZlbnRIYW5kbGVyO1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuIiwgImltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHR5cGUgeyBHZW5lcmljT2JqZWN0LCBTdGF0ZSwgU3RhdGVNYW5hZ2VyIH0gZnJvbSBcIkAvc3RhdGVcIjtcbmltcG9ydCB7IGNyZWF0ZVN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJAL3JlbmRlclwiO1xuaW1wb3J0IHsgaHRtbCwganN4LCB0c3ggfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkAvc3R5bGVcIjtcbmltcG9ydCB7IHJlbmRlckNoaWxkcmVuIH0gZnJvbSBcIi4vcmVuZGVyQ2hpbGRyZW5cIjtcbmltcG9ydCB7IHNldEVsZW1lbnRBdHRyaWJ1dGVzIH0gZnJvbSBcIi4vc2V0RWxlbWVudEF0dHJpYnV0ZXNcIjtcblxudHlwZSBGYWN0b3J5ID0gKHBhcmFtcz86IHVua25vd24pID0+IHVua25vd247XG5cbnR5cGUgU3R5bGVQYXJhbXMgPSB7XG4gIHByb3BzOiBTdGF0ZTtcbiAgc3RhdGU6IFN0YXRlO1xuICBjc3M6IFJldHVyblR5cGU8dHlwZW9mIGNzcz47XG59O1xuXG50eXBlIFN0eWxlcyA9IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG50eXBlIFN0eWxlc09iamVjdCA9IEdlbmVyaWNPYmplY3Q8eyBba2V5OiBzdHJpbmddOiAoKSA9PiBzdHJpbmcgfT47XG50eXBlIFN0eWxlSGFuZGxlckZhY3RvcnkgPSAoKSA9PiBTdHlsZXNPYmplY3Q7XG50eXBlIFN0eWxlSGFuZGxlciA9IChwYXJhbXM6IFN0eWxlUGFyYW1zKSA9PiBzdHJpbmc7XG5cbnR5cGUgVGVtcGxhdGVQYXJhbXMgPSB7XG4gIHByb3BzOiBTdGF0ZTtcbiAgc3RhdGU6IFN0YXRlO1xuICBodG1sOiB0eXBlb2YgaHRtbDtcbiAganN4OiB0eXBlb2YganN4O1xuICB0c3g6IHR5cGVvZiB0c3g7XG4gIHN0eWxlczogU3R5bGVzO1xuICBhY3Rpb25zOiBBY3Rpb25zO1xufTtcblxudHlwZSBUZW1wbGF0ZUluamVjdGlvbnMgPSA8VCA9IHVua25vd24+KCkgPT4gR2VuZXJpY09iamVjdDxUPjtcblxudHlwZSBUZW1wbGF0ZUhhbmRsZXIgPSAoXG4gIHBhcmFtczogVGVtcGxhdGVQYXJhbXMsXG4gIGluamVjdGlvbnM6IFRlbXBsYXRlSW5qZWN0aW9ucyxcbikgPT4gdm9pZDtcblxudHlwZSBBY3Rpb25zID0gR2VuZXJpY09iamVjdDtcblxudHlwZSBBY3Rpb25QYXJhbXMgPSB7XG4gIHByb3BzOiBTdGF0ZTtcbiAgc3RhdGU6IFN0YXRlTWFuYWdlcjtcbn07XG50eXBlIEFjdGlvbkhhbmRsZXJGYWN0b3J5ID0gKHBhcmFtczogQWN0aW9uUGFyYW1zKSA9PiBHZW5lcmljT2JqZWN0O1xuXG50eXBlIEF0dHJpYnV0ZSA9IG9iamVjdCAmIHtcbiAgW2tleTogc3ltYm9sIHwgc3RyaW5nXTogdW5rbm93bjtcbn07XG5cbmNvbnN0IF9hdHRyaWJ1dGVzID0ge307XG5cbmNvbnN0IF9jcmVhdGVUYWdCeUZhY3RvcnlOYW1lID0gKGZhY3Rvcnk6IEZhY3RvcnkpID0+IHtcbiAgcmV0dXJuIGZhY3RvcnkubmFtZVxuICAgIC5zcGxpdCgvKD89W0EtWl0pLylcbiAgICAuam9pbihcIi1cIilcbiAgICAudG9Mb3dlckNhc2UoKTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VTdGF0ZSA9IChzdGF0ZTogU3RhdGVNYW5hZ2VyKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHt9O1xuICBjb25zdCB1c2VTdGF0ZSA9IDxUPihpbml0aWFsU3RhdGU6IFN0YXRlPFQ+KTogU3RhdGVNYW5hZ2VyID0+IHtcbiAgICBjb25zdCBsYXRlc3RTdGF0ZSA9IHN0YXRlLmdldCgpIGFzIFN0YXRlPFQ+O1xuICAgIHN0YXRlLnNldCh7IC4uLmluaXRpYWxTdGF0ZSwgLi4ubGF0ZXN0U3RhdGUgfSk7XG5cbiAgICBPYmplY3QuYXNzaWduKGN1cnJlbnRTdGF0ZSwgc3RhdGUuZ2V0KCkpO1xuICAgIHJldHVybiB7IGdldDogc3RhdGUuZ2V0LCBzZXQ6IHN0YXRlLnNldCwgd2F0Y2g6IHN0YXRlLndhdGNoIH07XG4gIH07XG4gIHJldHVybiB7IGN1cnJlbnRTdGF0ZSwgdXNlU3RhdGUgfTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VTdHlsZSA9ICh7IHByb3BzLCBzdGF0ZSwgY3NzIH06IFN0eWxlUGFyYW1zKSA9PiB7XG4gIGNvbnN0IHN0eWxlc2hlZXQgPSB7fTtcbiAgY29uc3QgdXNlU3R5bGUgPSAoY3NzSGFuZGxlckZhY3Rvcnk6IFN0eWxlSGFuZGxlckZhY3RvcnkpID0+IHtcbiAgICBjb25zdCBoYW5kbGVycyA9IGNzc0hhbmRsZXJGYWN0b3J5KCk7XG4gICAgY29uc3Qgc3R5bGVzOiBTdHlsZXMgPSB7fTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGhhbmRsZXJzKSB7XG4gICAgICBjb25zdCBoYW5kbGVyID0gaGFuZGxlcnNba2V5XSBhcyBTdHlsZUhhbmRsZXI7XG4gICAgICBjb25zdCBzdHlsZSA9IGhhbmRsZXIoeyBwcm9wcywgc3RhdGUsIGNzcyB9KTtcbiAgICAgIHN0eWxlc1trZXldID0gc3R5bGU7XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihzdHlsZXNoZWV0LCBzdHlsZXMpO1xuICAgIHJldHVybiBzdHlsZXM7XG4gIH07XG5cbiAgcmV0dXJuIHsgc3R5bGVzOiBzdHlsZXNoZWV0LCB1c2VTdHlsZSB9O1xufTtcblxuY29uc3QgX2NyZWF0ZVVzZVRlbXBsYXRlID0gKHBhcmFtczogVGVtcGxhdGVQYXJhbXMpID0+IHtcbiAgY29uc3QgdXNlVGVtcGxhdGUgPSAoXG4gICAgdGVtcGxhdGVIYW5kbGVyOiBUZW1wbGF0ZUhhbmRsZXIsXG4gICAgdGVtcGxhdGVJbmplY3Rpb25zOiBUZW1wbGF0ZUluamVjdGlvbnMsXG4gICkgPT4ge1xuICAgIHJldHVybiB0ZW1wbGF0ZUhhbmRsZXIocGFyYW1zLCB0ZW1wbGF0ZUluamVjdGlvbnMpO1xuICB9O1xuXG4gIHJldHVybiB1c2VUZW1wbGF0ZTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VBY3Rpb24gPSAoeyBwcm9wcywgc3RhdGUgfTogQWN0aW9uUGFyYW1zKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnM6IEdlbmVyaWNPYmplY3QgPSB7fTtcblxuICBjb25zdCB1c2VBY3Rpb24gPSAoYWN0aW9uSGFuZGxlckZhY3Rvcnk6IEFjdGlvbkhhbmRsZXJGYWN0b3J5KSA9PiB7XG4gICAgY29uc3QgaGFuZGxlckFjdGlvbnMgPSBhY3Rpb25IYW5kbGVyRmFjdG9yeSh7IHByb3BzLCBzdGF0ZSB9KTtcbiAgICBPYmplY3QuYXNzaWduKGFjdGlvbnMsIGhhbmRsZXJBY3Rpb25zKTtcbiAgfTtcblxuICByZXR1cm4geyBhY3Rpb25zLCB1c2VBY3Rpb24gfTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZSA9IChcbiAgdGVtcGxhdGU6IFRlbXBsYXRlU2NoZW1hLFxuICBwYXJlbnRFbGVtZW50OiBFbGVtZW50LFxuICBsYXRlc3RTdGF0ZTogU3RhdGUgPSB7fSxcbikgPT4ge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IGZhY3RvcnkgPSB0ZW1wbGF0ZS50eXBlIGFzIEZhY3Rvcnk7XG4gICAgY29uc3QgdGFnTmFtZSA9IF9jcmVhdGVUYWdCeUZhY3RvcnlOYW1lKGZhY3RvcnkpO1xuICAgIGNvbnN0IHNlbGVjdG9yID0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuXG4gICAgY29uc3QgcHJvcHMgPSB0ZW1wbGF0ZS5wcm9wcztcbiAgICBjb25zdCBsYXRlc3REZWVwU3RhdGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxhdGVzdFN0YXRlKSk7XG4gICAgY29uc3Qgc3RhdGVNYW5hZ2VyID0gY3JlYXRlU3RhdGUobGF0ZXN0RGVlcFN0YXRlKTtcbiAgICBjb25zdCB7IGN1cnJlbnRTdGF0ZTogc3RhdGUsIHVzZVN0YXRlIH0gPSBfY3JlYXRlVXNlU3RhdGUoc3RhdGVNYW5hZ2VyKTtcbiAgICBjb25zdCBzdHlsZWQgPSBjc3Moc2VsZWN0b3IsICh7IGhhc2hJZCB9KSA9PiB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoaGFzaElkKTtcbiAgICAgIE9iamVjdC5hc3NpZ24oX2F0dHJpYnV0ZXMsIHsgY2xhc3M6IGhhc2hJZCB9KTtcbiAgICB9KTtcbiAgICBjb25zdCB7IHN0eWxlcywgdXNlU3R5bGUgfSA9IF9jcmVhdGVVc2VTdHlsZSh7IHByb3BzLCBzdGF0ZSwgY3NzOiBzdHlsZWQgfSk7XG4gICAgY29uc3QgeyBhY3Rpb25zLCB1c2VBY3Rpb24gfSA9IF9jcmVhdGVVc2VBY3Rpb24oe1xuICAgICAgcHJvcHMsXG4gICAgICBzdGF0ZTogc3RhdGVNYW5hZ2VyLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdXNlVGVtcGxhdGUgPSBfY3JlYXRlVXNlVGVtcGxhdGUoe1xuICAgICAgcHJvcHMsXG4gICAgICBzdGF0ZSxcbiAgICAgIGh0bWwsXG4gICAgICBqc3gsXG4gICAgICB0c3gsXG4gICAgICBzdHlsZXMsXG4gICAgICBhY3Rpb25zLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBmYWN0b3J5KHtcbiAgICAgIHByb3BzLFxuICAgICAgdXNlU3RhdGUsXG4gICAgICB1c2VTdHlsZSxcbiAgICAgIHVzZVRlbXBsYXRlLFxuICAgICAgdXNlQWN0aW9uLFxuICAgIH0pIGFzIFRlbXBsYXRlU2NoZW1hW107XG5cbiAgICBjb25zdCBvbGRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSBhcyBFbGVtZW50O1xuICAgIHNldEVsZW1lbnRBdHRyaWJ1dGVzKGVsZW1lbnQsIF9hdHRyaWJ1dGVzKTtcblxuICAgIG9sZEVsZW1lbnRcbiAgICAgID8gb2xkRWxlbWVudC5yZXBsYWNlV2l0aChlbGVtZW50KVxuICAgICAgOiBwYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcblxuICAgIHJlbmRlckNoaWxkcmVuKGNoaWxkcmVuLCBlbGVtZW50LCBzdGF0ZSk7XG5cbiAgICBzdGF0ZU1hbmFnZXIud2F0Y2goKHBheWxvYWQpID0+IHtcbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIHJlbmRlcih0ZW1wbGF0ZSwgcGFyZW50RWxlbWVudCwgcGF5bG9hZCk7XG4gICAgfSk7XG4gIH07XG59O1xuIiwgImltcG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3RlbXBsYXRlXCI7XG5pbXBvcnQgeyBzZXRFbGVtZW50QXR0cmlidXRlcyB9IGZyb20gXCIuL3NldEVsZW1lbnRBdHRyaWJ1dGVzXCI7XG5pbXBvcnQgeyByZW5kZXJDaGlsZHJlbiB9IGZyb20gXCIuL3JlbmRlckNoaWxkcmVuXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtZW50QnlUYWdOYW1lID1cbiAgKHRlbXBsYXRlOiBUZW1wbGF0ZVNjaGVtYSwgcGFyZW50RWxlbWVudDogRWxlbWVudCwgc3RhdGU6IFN0YXRlID0ge30pID0+XG4gICgpID0+IHtcbiAgICBjb25zdCB0YWdOYW1lID0gdGVtcGxhdGUudHlwZSBhcyBzdHJpbmc7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSB0YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgY29uc3QgaGFzaElkID0gcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSBhcyBzdHJpbmc7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gdGVtcGxhdGU/LnByb3BzPy5jbGFzcyBhcyBzdHJpbmc7XG4gICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgaWYgKCFjbGFzc05hbWUuaW5jbHVkZXMoaGFzaElkKSkge1xuICAgICAgICBjb25zdCBuZXdDbGFzc05hbWUgPSBgJHtoYXNoSWR9XyR7Y2xhc3NOYW1lfWA7XG4gICAgICAgIHNldEVsZW1lbnRBdHRyaWJ1dGVzKGVsZW1lbnQsIHsgY2xhc3M6IG5ld0NsYXNzTmFtZSB9KTtcbiAgICAgICAgcGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgZWxlbWVudCk7XG4gICAgICAgIHJlbmRlckNoaWxkcmVuKHRlbXBsYXRlLmNoaWxkcmVuLCBlbGVtZW50LCBzdGF0ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgc2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCwgdGVtcGxhdGUucHJvcHMpO1xuICAgIHBhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGVsZW1lbnQpO1xuICAgIHJlbmRlckNoaWxkcmVuKHRlbXBsYXRlLmNoaWxkcmVuLCBlbGVtZW50LCBzdGF0ZSk7XG4gIH07XG4iLCAiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIkAvcmVuZGVyXCI7XG5pbXBvcnQgdHlwZSB7IFRlbXBsYXRlU2NoZW1hLCBUYWdnZWRUZW1wbGF0ZSB9IGZyb20gXCJAL3R5cGVzXCI7XG5pbXBvcnQgdHlwZSB7IFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcblxuZXhwb3J0IGNvbnN0IHJlbmRlclRlbXBsYXRlRGF0YSA9XG4gICh0ZW1wbGF0ZURhdGE6IFRhZ2dlZFRlbXBsYXRlLCBlbGVtZW50OiBFbGVtZW50LCBzdGF0ZTogU3RhdGUgPSB7fSkgPT5cbiAgICAoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHRlbXBsYXRlRGF0YSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCB0ZW1wbGF0ZURhdGEpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRlbXBsYXRlRGF0YSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICBjb25zdCBkYXRhID0gTnVtYmVyKHRlbXBsYXRlRGF0YSk7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZGF0YS50b1N0cmluZygpO1xuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfTtcbiIsICJpbXBvcnQgdHlwZSB7IFRhZ2dlZFRlbXBsYXRlLCBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3RlbXBsYXRlXCI7XG5pbXBvcnQge1xuICByZW5kZXJUZW1wbGF0ZUFycmF5LFxuICByZW5kZXJUZW1wbGF0ZU9iamVjdCxcbiAgcmVuZGVyVGVtcGxhdGVEYXRhLFxufSBmcm9tIFwiQC9hY3Rpb25zXCI7XG5pbXBvcnQgeyBpc0FycmF5LCBpc09iamVjdCwgaXNUZW1wbGF0ZURhdGEgfSBmcm9tIFwiQC92YWxpZGF0b3JzXCI7XG5cbnR5cGUgQ29udGV4dEVsZW1lbnQgPSBFbGVtZW50O1xuaW1wb3J0IHsgY3JlYXRlQ2hhaW4gfSBmcm9tIFwiQC9mYWN0b3JpZXNcIjtcbmltcG9ydCB7IGNyZWF0ZVN0YXRlLCB0eXBlIFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcblxuLy9jb25zdCBnbG9iYWxTdGF0ZSA9IGNyZWF0ZVN0YXRlKHt9KTtcblxuZXhwb3J0IGNvbnN0IHJlbmRlciA9IChcbiAgdGVtcGxhdGU6IFRhZ2dlZFRlbXBsYXRlLFxuICBjb250ZXh0OiBDb250ZXh0RWxlbWVudCA9IGRvY3VtZW50LmJvZHksXG4gIHN0YXRlOiBTdGF0ZSA9IHt9LFxuKTogQ29udGV4dEVsZW1lbnQgPT4ge1xuICBjb25zdCBjaGFpbiA9IGNyZWF0ZUNoYWluKCk7XG4gIGNvbnN0IGNvbXBvbmVudEVsZW1lbnQgPSBjb250ZXh0IHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuXG4gIGNoYWluLmFkZCh7XG4gICAgdmFsaWRhdG9yOiBpc0FycmF5KHRlbXBsYXRlKSxcbiAgICBhY3Rpb246IHJlbmRlclRlbXBsYXRlQXJyYXkoXG4gICAgICB0ZW1wbGF0ZSBhcyBUZW1wbGF0ZVNjaGVtYVtdLFxuICAgICAgY29tcG9uZW50RWxlbWVudCxcbiAgICAgIHN0YXRlLFxuICAgICksXG4gIH0pO1xuXG4gIGNoYWluLmFkZCh7XG4gICAgdmFsaWRhdG9yOiBpc09iamVjdCh0ZW1wbGF0ZSksXG4gICAgYWN0aW9uOiByZW5kZXJUZW1wbGF0ZU9iamVjdChcbiAgICAgIHRlbXBsYXRlIGFzIFRlbXBsYXRlU2NoZW1hLFxuICAgICAgY29tcG9uZW50RWxlbWVudCxcbiAgICAgIHN0YXRlLFxuICAgICksXG4gIH0pO1xuXG4gIGNoYWluLmFkZCh7XG4gICAgdmFsaWRhdG9yOiBpc1RlbXBsYXRlRGF0YSh0ZW1wbGF0ZSksXG4gICAgYWN0aW9uOiByZW5kZXJUZW1wbGF0ZURhdGEodGVtcGxhdGUsIGNvbXBvbmVudEVsZW1lbnQsIHN0YXRlKSxcbiAgfSk7XG5cbiAgY2hhaW4uZXhlY3V0ZSgpO1xuICByZXR1cm4gY29tcG9uZW50RWxlbWVudDtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBSb3V0ZXIsIEV4ZWN1dGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuLy9pbXBvcnQgeyBldmVudERyaXZlIH0gZnJvbSBcIi4uL3JlbmRlclwiO1xuXG5leHBvcnQgY29uc3Qgcm91dGVyOiBSb3V0ZXIgPSAoeyByb3V0ZXMsIGNvbnRleHQgfSkgPT4ge1xuICBjb25zdCBfcm91dGVzID0gcm91dGVzO1xuICBsZXQgX3JvdXRlckVsZW1lbnQhOiBIVE1MRWxlbWVudDtcblxuICBjb25zdCBleGVjdXRlOiBFeGVjdXRlID0gKHZhbGlkYXRvciwgY2FsbGJhY2ssIGVycm9yKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRvcigpKSByZXR1cm4gY2FsbGJhY2soeyBpc1ZhbGlkOiB2YWxpZGF0b3IoKSB9KTtcblxuICAgIGlmIChlcnJvcikge1xuICAgICAgY29uc3QgZXJybyA9IG5ldyBFcnJvcihlcnJvcigpLm1lc3NhZ2UpO1xuICAgICAgZXJyby5uYW1lID0gZXJyb3IoKS5uYW1lO1xuICAgICAgdGhyb3cgZXJybztcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgX2JpbmRMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsICgpID0+IHtcbiAgICAgIC8vY29uc3QgcGF5bG9hZDogUm91dGVyT2JqZWN0ID0geyBzdGF0dXM6IHRydWUgfTtcbiAgICAgIC8vZXZlbnREcml2ZS5lbWl0KFwiT04tREVTVFJPWVwiLCBwYXlsb2FkKTtcbiAgICAgIF9tb3VudFJvdXRlQnlIYXNoKG51bGwpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IF9zZXRSb3V0ZXJFbGVtZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHJvdXRlckVsZW1lbnQgPSBjb250ZXh0Py5xdWVyeVNlbGVjdG9yKFwicm91dGVyLXZpZXdcIik7XG5cbiAgICBleGVjdXRlKFxuICAgICAgKCkgPT4gISFyb3V0ZXJFbGVtZW50LFxuICAgICAgKCkgPT4ge1xuICAgICAgICBfcm91dGVyRWxlbWVudCA9IHJvdXRlckVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIHJldHVybiBfcm91dGVyRWxlbWVudDtcbiAgICAgIH0sXG4gICAgICAoKSA9PiAoe1xuICAgICAgICBuYW1lOiBcIlJvdXRlciBFcnJvclwiLFxuICAgICAgICBtZXNzYWdlOiBcIlJvdXRlciBlbGVtZW50IChyb3V0ZXItdmlldykgaXMgbm90IGRlZmluZWQgYW5kIG11c3QgYmUuXCIsXG4gICAgICB9KSxcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IF9sb2FkTWFpblJvdXRlID0gKCkgPT4ge1xuICAgIGNvbnN0IG1haW5Sb3V0ZSA9IF9nZXRNYWluUm91dGUoKTtcbiAgICBleGVjdXRlKFxuICAgICAgKCkgPT4gISFtYWluUm91dGU/LnN0YXJ0LFxuICAgICAgKCkgPT4gbWFpblJvdXRlPy5zdGFydCAmJiBuYXZpZ2F0ZShtYWluUm91dGUuc3RhcnQpLFxuICAgICAgKCkgPT4gKHtcbiAgICAgICAgbmFtZTogXCJSb3V0ZXIgRXJyb3JcIixcbiAgICAgICAgbWVzc2FnZTogXCJTdGFydCByb3V0ZXIgaXMgbm90IGRlZmluZWQgYW5kIG11c3QgYmUuXCIsXG4gICAgICB9KSxcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IF9nZXRNYWluUm91dGUgPSAoKSA9PiBfcm91dGVzLmZpbmQoKHJvdXRlKSA9PiAhIXJvdXRlPy5zdGFydCk7XG5cbiAgY29uc3QgX2dldFJvdXRlQnlIYXNoID0gKGhhc2g6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBfcm91dGVzLmZpbmQoKHJvdXRlKSA9PiByb3V0ZS5yZWdleC50ZXN0KGhhc2gpKTtcbiAgfTtcblxuICBjb25zdCBfZ2V0Um91dGVEZWZhdWx0ID0gKCkgPT4gX3JvdXRlcy5maW5kKChyb3V0ZSkgPT4gcm91dGU/LmRlZmF1bHQpO1xuXG4gIGNvbnN0IF9tb3VudFJvdXRlQnlIYXNoID0gYXN5bmMgKGhhc2g6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICBjb25zdCBoYXNoVmFsdWUgPSBoYXNoIHx8IHdpbmRvdy5sb2NhdGlvbi5oYXNoIHx8IFwiXCI7XG4gICAgY29uc3Qgcm91dGUgPSBfZ2V0Um91dGVCeUhhc2goaGFzaFZhbHVlKSB8fCBfZ2V0Um91dGVEZWZhdWx0KCk7XG4gICAgX3JvdXRlckVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICByb3V0ZT8ubW91bnQoeyBjb250ZXh0OiBfcm91dGVyRWxlbWVudCB9KTtcbiAgfTtcblxuICBjb25zdCBfZ2V0SGFzaCA9ICgpID0+IHdpbmRvdy5sb2NhdGlvbi5oYXNoIHx8IG51bGw7XG5cbiAgY29uc3QgX2hhc0FjdGl2ZVJvdXRlID0gKCkgPT4gISFfZ2V0SGFzaCgpO1xuXG4gIGNvbnN0IG5hdmlnYXRlID0gKHBhdGg6IHN0cmluZykgPT4ge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gcGF0aDtcbiAgfTtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIF9iaW5kTGlzdGVuZXJzKCk7XG4gICAgX3NldFJvdXRlckVsZW1lbnQoKTtcbiAgICBfaGFzQWN0aXZlUm91dGUoKSA/IF9tb3VudFJvdXRlQnlIYXNoKF9nZXRIYXNoKCkpIDogX2xvYWRNYWluUm91dGUoKTtcbiAgfTtcblxuICByZXR1cm4geyBpbml0LCBuYXZpZ2F0ZSB9O1xufTtcbiIsICJpbXBvcnQgeyBUaW1lckFwcCB9IGZyb20gXCJAL3VpL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyB0c3ggfSBmcm9tIFwiaWFyZXNcIjtcbmltcG9ydCB0eXBlIHsgR2VuZXJpY09iamVjdCwgVGFnZ2VkU3R5bGUgfSBmcm9tIFwiaWFyZXNcIjtcblxudHlwZSBTdHlsZXMgPSB7IERlZmF1bHRBcHA6IHN0cmluZyB9O1xudHlwZSBTdHlsZVBhcmFtcyA9IHsgY3NzOiBUYWdnZWRTdHlsZSB9O1xuXG50eXBlIFN0eWxlSGFuZGxlciA9ICgpID0+IEdlbmVyaWNPYmplY3Q7XG50eXBlIFVzZVN0eWxlID0gKHN0eWxlSGFuZGxlcjogU3R5bGVIYW5kbGVyKSA9PiBTdHlsZXM7XG50eXBlIFBhcmFtcyA9IHtcbiAgdXNlU3R5bGU6IFVzZVN0eWxlO1xufTtcblxuZXhwb3J0IGNvbnN0IERlZmF1bHRBcHAgPSAoeyB1c2VTdHlsZSB9OiBQYXJhbXMpID0+IHtcbiAgdXNlU3R5bGUoY3JlYXRlU3R5bGVzKTtcblxuICByZXR1cm4gdHN4YFxuICA8ZGl2IGNsYXNzPVwid3JhcFwiPlxuICAgIDxoMT40MDQ8L2gxPlxuICAgIDxzcGFuPlBcdTAwRTFnaW5hIG5cdTAwRTNvIGVuY29udHJhZGE8L3NwYW4+XG4gICAgPGEgaHJlZj1cIiMvXCI+Vm9sdGFyPC9hPlxuICA8L2Rpdj5cbmA7XG59O1xuXG5jb25zdCBjcmVhdGVTdHlsZXMgPSAoKSA9PiAoe1xuICBEZWZhdWx0QXBwOiAoeyBjc3MgfTogU3R5bGVQYXJhbXMpID0+IGNzc2BcbiAgICBkaXNwbGF5OmZsZXg7XG4gICAgd2lkdGg6MTAwJTtcbiAgICBwYWRkaW5nOjFlbTtcblxuICAud3JhcCxcbiAgLndyYXAgaDEsXG4gIC53cmFwIHNwYW4ge1xuICAgIGRpc3BsYXk6ZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcbiAgICB3aWR0aDoxMDAlO1xuICB9XG5cbiAgLndyYXAgaDEge1xuICAgICAgZm9udC1zaXplOiAyZW07XG4gIH1cblxuICAud3JhcCBoMSxcbiAgLndyYXAgc3BhbiB7XG4gICAgbWFyZ2luLWJvdHRvbTogMWVtO1xuICB9XG5cbiAgLndyYXAgYSB7XG4gICAgICBwYWRkaW5nOjFlbTsgXG4gICAgICBjb2xvcjojZWJlYmViO1xuICAgICAgYmFja2dyb3VuZDogIzYwM2E5ODtcbiAgICAgIGJvcmRlci1yYWRpdXM6OHB4XG4gICAgfVxuXG4gICAgLndyYXAgYTpob3ZlciB7XG4gICAgICB0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lXG4gICAgfVxuXG4gIC53cmFwIHtcbiAgICBmbGV4LXdyYXA6d3JhcDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXG4gICAgcGFkZGluZzoxZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xuICAgIGJvcmRlci1yYWRpdXM6OHB4O1xuXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KC00NWRlZywgI2VlNzc1MiwgI2U3M2M3ZSwgIzIzYTZkNSwgIzIzZDVhYik7XG4gICAgYmFja2dyb3VuZC1zaXplOiA0MDAlIDQwMCU7XG4gICAgYW5pbWF0aW9uOiB3YXZlIDE1cyBlYXNlIGluZmluaXRlOyAgICAgXG4gIH1cblxuICBAa2V5ZnJhbWVzIHdhdmUge1xuICAgIDAlIHtcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCUgNTAlO1xuICAgIH1cbiAgICA1MCUge1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAxMDAlIDUwJTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAlIDUwJTtcbiAgICB9XG4gIH1cblxuICBAbWVkaWEgYWxsIGFuZCAobWF4LXdpZHRoOjI1NjBweCl7XG4gICAgLndyYXAge1xuICAgICAgcGFkZGluZzoxNXB4O1xuICAgIH1cbiAgfVxuYCxcbn0pO1xuIiwgImltcG9ydCB0eXBlIHtcbiAgR2VuZXJpY09iamVjdCxcbiAgSFRNWCxcbiAgU3RhdGUsXG4gIFN0YXRlTWFuYWdlcixcbiAgVGFnZ2VkU3R5bGUsXG4gIFRhZ2dlZFRlbXBsYXRlLFxufSBmcm9tIFwiaWFyZXNcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgaGFuZGxlcjogPFQgPSB1bmtub3duPihwYXJhbXM6IFQpID0+IHZvaWQ7XG59O1xuXG50eXBlIFN0eWxlcyA9IHsgVGltZXJBcHA6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9O1xuXG50eXBlIFN0eWxlSGFuZGxlciA9ICgpID0+IEdlbmVyaWNPYmplY3Q7XG5cbnR5cGUgQWN0aW9ucyA9IHtcbiAgaW5jcmVtZW50OiAoKSA9PiB2b2lkO1xufTtcblxudHlwZSBJbmplY3Rpb25zID0gR2VuZXJpY09iamVjdDx7XG4gIGFjdGlvbnM6IEFjdGlvbnM7XG4gIHN0eWxlczogU3R5bGVzO1xufT47XG5cbnR5cGUgVGVtcGxhdGVJbmplY3Rpb25zID0gKCkgPT4gSW5qZWN0aW9ucztcblxudHlwZSBUZW1wbGF0ZUhhbmRsZXIgPSAoXG4gIHBhcmFtczogVGVtcGxhdGVQYXJhbXMsXG4gIGluamVjdGlvbnM6IFRlbXBsYXRlSW5qZWN0aW9ucyxcbikgPT4gVGFnZ2VkVGVtcGxhdGU7XG5cbnR5cGUgTW9kZWwgPSBHZW5lcmljT2JqZWN0PHtcbiAgdGltZUxlZnQ6IG51bWJlcjtcbn0+O1xuXG50eXBlIFVzZVN0YXRlID0gPFQgPSBNb2RlbD4oaW5pdGlhbFN0YXRlOiBUKSA9PiBTdGF0ZU1hbmFnZXI8VD47XG5cbnR5cGUgVXNlU3R5bGUgPSAoc3R5bGVIYW5kbGVyOiBTdHlsZUhhbmRsZXIpID0+IHN0cmluZztcblxudHlwZSBVc2VUZW1wbGF0ZSA9IChcbiAgdGVtcGxhdGVIYW5kbGVyOiBUZW1wbGF0ZUhhbmRsZXIsXG4gIHRlbXBsYXRlaW5qZWN0aW9ucz86IFRlbXBsYXRlSW5qZWN0aW9ucyxcbikgPT4gVGFnZ2VkVGVtcGxhdGU7XG5cbnR5cGUgVGVtcGxhdGVQYXJhbXMgPSB7XG4gIHN0YXRlOiBTdGF0ZTxNb2RlbD47XG4gIHN0eWxlczogU3R5bGVzO1xuICBodG1sOiBIVE1YO1xufTtcblxudHlwZSBTdHlsZVBhcmFtcyA9IHtcbiAgY3NzOiBUYWdnZWRTdHlsZTtcbn07XG5cbnR5cGUgUGFyYW1zID0ge1xuICBwcm9wczogUHJvcHM7XG4gIHVzZVN0YXRlOiBVc2VTdGF0ZTtcbiAgdXNlU3R5bGU6IFVzZVN0eWxlO1xuICB1c2VUZW1wbGF0ZTogVXNlVGVtcGxhdGU7XG59O1xuXG50eXBlIFRpbWVyID0gUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD47XG5cbnR5cGUgVGltZXJIYW5kbGVyUGFyYW1zID0ge1xuICBzdGF0ZTogU3RhdGVNYW5hZ2VyPE1vZGVsPjtcbiAgc2Vjb25kczogbnVtYmVyO1xufTtcblxudHlwZSBTdGF0ZVdhdGNoZXJIYW5kbGVyUGFyYW1zID0ge1xuICBvbmVTZWNvbmQ6IG51bWJlcjtcbiAgdGltZXI6IFRpbWVyO1xufTtcblxuY29uc3QgdGVtcGxhdGUgPSAocGFyYW1zOiBUZW1wbGF0ZVBhcmFtcyk6IFRhZ2dlZFRlbXBsYXRlID0+IHtcbiAgY29uc3QgeyBzdGF0ZSwgc3R5bGVzLCBodG1sIH0gPSBwYXJhbXM7XG4gIGNvbnN0IHRpbWVMZWZ0ID0gTnVtYmVyKHN0YXRlLnRpbWVMZWZ0KTtcblxuICByZXR1cm4gaHRtbGBcblxuICAgIDxkaXYgY2xhc3M9XCJ0aW1lclwiPiBcbiAgICAgIDxzcGFuPkEgc2ltcGxlIGNvdW50ZXI8L3NwYW4+XG4gICAgICA8c3Bhbj4ke3RpbWVMZWZ0IDw9IDkgJiYgXCIwXCJ9JHt0aW1lTGVmdCB8fCBcIjBcIn1zPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIGAgYXMgVGFnZ2VkVGVtcGxhdGU7XG59O1xuXG5jb25zdCBjcmVhdGVTdGF0ZUhhbmRsZXIgPSAocGFyYW1zOiBUaW1lckhhbmRsZXJQYXJhbXMpID0+IHtcbiAgY29uc3QgeyBzdGF0ZSwgc2Vjb25kcyB9ID0gcGFyYW1zO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IHsgdGltZUxlZnQgfSA9IHN0YXRlLmdldCgpO1xuICAgIGlmICghdGltZUxlZnQpIHJldHVybjtcbiAgICBzdGF0ZS5zZXQoeyB0aW1lTGVmdDogdGltZUxlZnQgLSBzZWNvbmRzIH0pO1xuICB9O1xufTtcblxuY29uc3QgY3JlYXRlU3RhdGVXYXRjaGVyID1cbiAgKHsgb25lU2Vjb25kLCB0aW1lciB9OiBTdGF0ZVdhdGNoZXJIYW5kbGVyUGFyYW1zKSA9PlxuICAgICh7IHRpbWVMZWZ0IH06IE1vZGVsKSA9PiB7XG4gICAgICBpZiAodGltZUxlZnQgPCBvbmVTZWNvbmQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIH1cbiAgICB9O1xuXG5leHBvcnQgY29uc3QgVGltZXJBcHAgPSAoeyB1c2VTdGF0ZSwgdXNlU3R5bGUsIHVzZVRlbXBsYXRlIH06IFBhcmFtcykgPT4ge1xuICBjb25zdCBzdGF0ZSA9IHVzZVN0YXRlPE1vZGVsPih7IHRpbWVMZWZ0OiAxMjAgfSk7XG4gIHVzZVN0eWxlKGNyZWF0ZVN0eWxlcyk7XG5cbiAgY29uc3Qgb25lU2Vjb25kID0gMTtcbiAgY29uc3QgY3ljbGVUaW1lID0gMTAwMDtcblxuICBjb25zdCBzdGF0ZUhhbmRsZXIgPSBjcmVhdGVTdGF0ZUhhbmRsZXIoeyBzdGF0ZSwgc2Vjb25kczogb25lU2Vjb25kIH0pO1xuICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoc3RhdGVIYW5kbGVyLCBjeWNsZVRpbWUpO1xuXG4gIGNvbnN0IHN0YXRlV2F0Y2hlciA9IGNyZWF0ZVN0YXRlV2F0Y2hlcih7IG9uZVNlY29uZCwgdGltZXIgfSk7XG4gIHN0YXRlLndhdGNoKHN0YXRlV2F0Y2hlcik7XG5cbiAgcmV0dXJuIHVzZVRlbXBsYXRlKHRlbXBsYXRlKTtcbn07XG5cbmNvbnN0IGNyZWF0ZVN0eWxlcyA9ICgpID0+ICh7XG4gIFRpbWVyQXBwOiAoeyBjc3MgfTogU3R5bGVQYXJhbXMpID0+IGNzc2BcbiAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICAgIHdpZHRoOjEwMCU7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuXG4gICAgLnRpbWVyIHtcbiAgICAgIGJhY2tncm91bmQ6I2I5YzVlYztcbiAgICAgIHBhZGRpbmc6MTVweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6OHB4O1xuICAgIH1cblxuICAgIC50aW1lciBzcGFuIHsgXG4gICAgICBjb2xvcjogIzIwNzJiYTsgXG4gICAgICBmb250LXNpemU6IDFlbTsgXG4gICAgfVxuXG4gICAgLnRpbWVyIHNwYW4gKyBzcGFuIHtcbiAgICAgICAgZm9udC13ZWlnaHQ6Ym9sZDtcbiAgICAgICAgZm9udC1zaXplOiAyZW1cbiAgICAgIH1cblxuICAgIC50aW1lciBzcGFuOmZpcnN0LW9mLXR5cGUge1xuICAgICAgICBtYXJnaW4tYm90dG9tOjFlbVxuICAgICAgfVxuICAgXG5gLFxufSk7XG4iLCAiaW1wb3J0IHsgVGltZXJBcHAgfSBmcm9tIFwiQC91aS9lbGVtZW50c1wiO1xuaW1wb3J0IHsgdHN4IH0gZnJvbSBcImlhcmVzXCI7XG5pbXBvcnQgdHlwZSB7IEdlbmVyaWNPYmplY3QsIFRhZ2dlZFN0eWxlIH0gZnJvbSBcImlhcmVzXCI7XG5cbnR5cGUgU3R5bGVzID0geyBIb21lQXBwOiBzdHJpbmcgfTtcbnR5cGUgU3R5bGVQYXJhbXMgPSB7IGNzczogVGFnZ2VkU3R5bGUgfTtcblxudHlwZSBTdHlsZUhhbmRsZXIgPSAoKSA9PiBHZW5lcmljT2JqZWN0O1xudHlwZSBVc2VTdHlsZSA9IChzdHlsZUhhbmRsZXI6IFN0eWxlSGFuZGxlcikgPT4gU3R5bGVzO1xudHlwZSBQYXJhbXMgPSB7XG4gIHVzZVN0eWxlOiBVc2VTdHlsZTtcbn07XG5cbmV4cG9ydCBjb25zdCBIb21lQXBwID0gKHsgdXNlU3R5bGUgfTogUGFyYW1zKSA9PiB7XG4gIHVzZVN0eWxlKGNyZWF0ZVN0eWxlcyk7XG5cbiAgcmV0dXJuIHRzeGBcbiAgPGRpdiBjbGFzcz1cIndyYXBcIj5cbiAgICA8aDE+SG9tZSBQYWdlPC9oMT5cbiAgICA8c3Bhbj5BIHNpbXBsZSA8Yj5JQVJFUzwvYj4gcGFnZSB0ZW1wbGF0ZSBhcHAuPC9zcGFuPlxuICAgIDwke1RpbWVyQXBwfSAvPlxuICA8L2Rpdj5cbmA7XG59O1xuXG5jb25zdCBjcmVhdGVTdHlsZXMgPSAoKSA9PiAoe1xuICBIb21lQXBwOiAoeyBjc3MgfTogU3R5bGVQYXJhbXMpID0+IGNzc2BcbiAgICBkaXNwbGF5OmZsZXg7XG4gICAgd2lkdGg6MTAwJTtcbiAgICBwYWRkaW5nOjFlbTtcblxuICAud3JhcCxcbiAgLndyYXAgaDEsXG4gIC53cmFwIHNwYW4ge1xuICAgIGRpc3BsYXk6ZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcbiAgICB3aWR0aDoxMDAlO1xuICB9XG5cbiAgLndyYXAgPiBoMSB7XG4gICAgICBmb250LXNpemU6IDJlbTtcbiAgICAgIG1hcmdpbi1ib3R0b206MWVtO1xuICB9XG5cbiAgLndyYXAgPiBzcGFuIHtcbiAgICBtYXJnaW4tYm90dG9tOiAyZW07XG4gIH1cblxuICAud3JhcCBiIHtwYWRkaW5nOjAgNnB4O31cblxuICAud3JhcCB7XG4gICAgZmxleC13cmFwOndyYXA7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblxuICAgIHBhZGRpbmc6MWVtO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcbiAgICBib3JkZXItcmFkaXVzOjhweDtcblxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgtNDVkZWcsICNlZTc3NTIsICNlNzNjN2UsICMyM2E2ZDUsICMyM2Q1YWIpO1xuICAgIGJhY2tncm91bmQtc2l6ZTogNDAwJSA0MDAlO1xuICAgIGFuaW1hdGlvbjogd2F2ZSAxNXMgZWFzZSBpbmZpbml0ZTsgICAgIFxuICB9XG5cbiAgQGtleWZyYW1lcyB3YXZlIHtcbiAgICAwJSB7XG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAlIDUwJTtcbiAgICB9XG4gICAgNTAlIHtcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMTAwJSA1MCU7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwJSA1MCU7XG4gICAgfVxuICB9XG5cbiAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDoyNTYwcHgpe1xuICAgIC53cmFwIHtcbiAgICAgIHBhZGRpbmc6MTVweDtcbiAgICB9XG4gIH1cbmAsXG59KTtcbiIsICJpbXBvcnQgeyBEZWZhdWx0QXBwLCBIb21lQXBwIH0gZnJvbSBcIkAvdWkvcGFnZXNcIjtcbmltcG9ydCB7IHR5cGUgUm91dGUsIGh0bWwsIHJlbmRlciB9IGZyb20gXCJpYXJlc1wiO1xuXG5leHBvcnQgY29uc3Qgcm91dGVzOiBSb3V0ZVtdID0gW1xuXHR7XG5cdFx0cmVnZXg6IC9eXFwvNDA0JC8sXG5cdFx0ZGVmYXVsdDogXCIjLzQwNFwiLFxuXHRcdG1vdW50OiAoeyBjb250ZXh0IH0pID0+IHtcblx0XHRcdHJlbmRlcihodG1sYDwke0RlZmF1bHRBcHB9IC8+YCwgY29udGV4dCk7XG5cdFx0fSxcblx0fSxcblx0e1xuXHRcdHJlZ2V4OiAvXiNcXC8kLyxcblx0XHRzdGFydDogXCIjL1wiLFxuXHRcdG1vdW50OiAoeyBjb250ZXh0IH0pID0+IHtcblx0XHRcdHJlbmRlcihodG1sYDwke0hvbWVBcHB9Lz5gLCBjb250ZXh0KTtcblx0XHR9LFxuXHR9LFxuXTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7OztBQU9PLElBQU0sWUFBWSxnQkFBQUEsUUFBQSxNQUFtQjtBQUMxQyxNQUFJO0FBRUosUUFBTSxRQUFRLGdCQUFBQSxRQUFBLENBQUMsYUFBNkI7QUFDMUMsZUFBVyxTQUFTO0FBQ3BCLFdBQU8sU0FBUztFQUNsQixHQUhjLE9BQUE7QUFLZCxRQUFNLFFBQVEsZ0JBQUFBLFFBQUEsQ0FBQyxhQUE4QjtBQUMzQyxXQUFPLFNBQVMsUUFBUTtFQUMxQixHQUZjLE9BQUE7QUFJZCxRQUFNLFVBQVUsZ0JBQUFBLFFBQUEsQ0FBQyxhQUE4QjtBQUM3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O0FBQ3JFLFFBQU0sUUFBUSxXQUFXLGNBQWMsU0FBUztBQUVoRCxRQUFNLGVBQWUsbUJBQW1CLEVBQUUsV0FBVyxNQUFNLENBQUM7QUFDNUQsUUFBTSxNQUFNLFlBQVk7QUFFeEIsU0FBTyxZQUFZLFFBQVE7QUFDN0IsR0Fkd0I7QUFnQnhCLElBQU1BLGdCQUFlLDhCQUFPO0FBQUEsRUFDMUIsVUFBVSx3QkFBQyxFQUFFLEtBQUFDLEtBQUksTUFBbUJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBMUI7QUEwQlosSUEzQnFCOzs7QUM1R2QsSUFBTSxVQUFVLHdCQUFDLEVBQUUsU0FBUyxNQUFjO0FBQy9DLFdBQVNDLGFBQVk7QUFFckIsU0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BSUZDLFNBQVE7QUFBQTtBQUFBO0FBR2YsR0FWdUI7QUFZdkIsSUFBTUQsZ0JBQWUsOEJBQU87QUFBQSxFQUMxQixTQUFTLHdCQUFDLEVBQUUsS0FBQUUsS0FBSSxNQUFtQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUExQjtBQXdEWCxJQXpEcUI7OztBQ3RCZCxJQUFNLFNBQWtCO0FBQUEsRUFDOUI7QUFBQSxJQUNDLE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxJQUNULE9BQU8sd0JBQUMsRUFBRSxRQUFRLE1BQU07QUFDdkIsYUFBTyxRQUFRLFVBQVUsT0FBTyxPQUFPO0FBQUEsSUFDeEMsR0FGTztBQUFBLEVBR1I7QUFBQSxFQUNBO0FBQUEsSUFDQyxPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsSUFDUCxPQUFPLHdCQUFDLEVBQUUsUUFBUSxNQUFNO0FBQ3ZCLGFBQU8sUUFBUSxPQUFPLE1BQU0sT0FBTztBQUFBLElBQ3BDLEdBRk87QUFBQSxFQUdSO0FBQ0Q7IiwKICAibmFtZXMiOiBbIl9fbmFtZSIsICJ0ZW1wbGF0ZSIsICJ0IiwgIm4iLCAicyIsICJyIiwgImdsb2JhbFJ1bGVzIiwgInJlc3VsdCIsICJzZWxlY3RvciIsICJjc3MiLCAicm91dGVzIiwgImNzcyIsICJodG1sIiwgIlRpbWVyQXBwIiwgImNyZWF0ZVN0eWxlcyIsICJjc3MiLCAiY3JlYXRlU3R5bGVzIiwgIlRpbWVyQXBwIiwgImNzcyJdCn0K
