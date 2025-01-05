var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

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
var TimerApp = /* @__PURE__ */ __name(({ useState, useStyle, useTemplate }) => {
  const state = useState({ timeLeft: 120 });
  useStyle(createStyles);
  const oneSecond = 1;
  const cycleTime = 1e3;
  const stateHandler = createStateHandler({ state, seconds: oneSecond });
  const timer = setTimeout(stateHandler, cycleTime);
  const stateWatcher = createStateWatcher({ oneSecond, timer });
  state.watch(stateWatcher);
  return useTemplate(template);
}, "TimerApp");
var createStyles = /* @__PURE__ */ __name(() => ({
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
var renderTemplateObject = /* @__PURE__ */ __name2((template3, contextElement, state = {}) => () => {
  const _chain = createChain();
  _chain.add({
    validator: isString(template3.type),
    action: createElementByTagName(template3, contextElement, state)
  });
  _chain.add({
    validator: isFunction(template3.type),
    action: createElementByFactoryName(template3, contextElement, state)
  });
  _chain.execute();
}, "renderTemplateObject");
var renderTemplateArray = /* @__PURE__ */ __name2((templateSchema, contextElement, state = {}) => () => {
  for (const template3 of templateSchema) {
    render(template3, contextElement, state);
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
  const regex = /\.(?<![\d])(?![\d])([\w-]+)/g;
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
    const existingStyle = document.head.querySelector(
      `[data-component="${cachedClassName}"]`
    );
    if (!existingStyle) {
      const scopedStyle2 = transformStyle(rawCSS, cachedClassName);
      const styleElement2 = createStyleElement(cachedClassName);
      styleElement2.innerHTML += scopedStyle2;
      handler({ hashId: cachedClassName, scopedStyle: scopedStyle2, styleElement: styleElement2 });
    }
    return cachedClassName;
  }
  const hashId = createHash(rawCSS, selector);
  const scopedStyle = transformStyle(rawCSS, hashId);
  const styleElement = createStyleElement(hashId);
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
var createElementByFactoryName = /* @__PURE__ */ __name2((template3, parentElement, latestState = {}) => {
  return () => {
    const factory = template3.type;
    const tagName = _createTagByFactoryName(factory);
    const selector = tagName.toLowerCase();
    const element = document.createElement(tagName);
    const props = template3.props;
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
      render(template3, parentElement, payload);
    });
  };
}, "createElementByFactoryName");
var _extractHashId = /* @__PURE__ */ __name2((text) => {
  const regex = /(_.*)+/gi;
  if (!text) return text;
  return text.replace(regex, "");
}, "_extractHashId");
var createElementByTagName = /* @__PURE__ */ __name2((template3, parentElement, state = {}) => () => {
  const tagName = template3.type;
  const selector = tagName.toLowerCase();
  const element = document.createElement(tagName);
  const parentElementClass = parentElement.getAttribute("class");
  const hashId = _extractHashId(parentElementClass);
  const className = template3?.props?.class;
  if (className) {
    if (!className.includes(hashId)) {
      const newClassName = `${hashId}_${className}`;
      setElementAttributes(element, { class: newClassName });
      parentElement.insertAdjacentElement("beforeend", element);
      renderChildren(template3.children, element, state);
      return;
    }
  }
  setElementAttributes(element, template3.props);
  parentElement.insertAdjacentElement("beforeend", element);
  renderChildren(template3.children, element, state);
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
var render = /* @__PURE__ */ __name2((template3, context = document.body, state = {}) => {
  const chain = createChain();
  const componentElement = context || document.querySelector("body");
  chain.add({
    validator: isArray(template3),
    action: renderTemplateArray(
      template3,
      componentElement,
      state
    )
  });
  chain.add({
    validator: isObject(template3),
    action: renderTemplateObject(
      template3,
      componentElement,
      state
    )
  });
  chain.add({
    validator: isTemplateData(template3),
    action: renderTemplateData(template3, componentElement, state)
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
  const cleanupStyles = /* @__PURE__ */ __name2(async (selector) => {
    if (!selector) return;
    const styleElement = document.head.querySelector(
      `[data-component=${selector}]`
    );
    if (styleElement) {
      styleElement.remove();
    }
  }, "cleanupStyles");
  const cleanupDOM = /* @__PURE__ */ __name2(async () => {
    _routerElement.replaceChildren();
  }, "cleanupDOM");
  const getChildSelector = /* @__PURE__ */ __name2(() => {
    const child = _routerElement.firstElementChild;
    const selector = child ? Object.values(child.classList).shift() : "";
    return selector;
  }, "getChildSelector");
  const cleanupCurrentRoute = /* @__PURE__ */ __name2(async () => {
    try {
      const selector = getChildSelector();
      await cleanupStyles(selector);
      await cleanupDOM();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }, "cleanupCurrentRoute");
  const _bindListeners = /* @__PURE__ */ __name2(() => {
    window.addEventListener("hashchange", async () => {
      try {
        await cleanupCurrentRoute();
        await _mountRouteByHash(null);
      } catch (error) {
        console.error("Error during route change:", error);
      }
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

// src/frontend/ui/pages/HomeApp/index.ts
var template2 = /* @__PURE__ */ __name(({ state }) => html`
  <div class="wrap">
    <h1 class="title">${state.title}</h1>
    <span>A simple <b>IARES</b> page template app.</span>
    <${TimerApp} />
  </div>
`, "template");
var HomeApp = /* @__PURE__ */ __name(({ useStyle, useTemplate, useState }) => {
  useState({ title: "Titulo incial da home" });
  useStyle(createStyles2);
  return useTemplate(template2);
}, "HomeApp");
var createStyles2 = /* @__PURE__ */ __name(() => ({
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
export {
  HomeApp
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vc3JjL2Zyb250ZW5kL3VpL2VsZW1lbnRzL1RpbWVyQXBwL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uLy4uLy4uL2lhcmVzL3NyYy9DcmVhdGVBcHAvQ3JlYXRlQXBwLnRzIiwgIi4uLy4uLy4uLy4uLy4uLy4uL2lhcmVzL3NyYy9zdGF0ZS9jcmVhdGVTdGF0ZS50cyIsICIuLi8uLi8uLi8uLi8uLi8uLi9pYXJlcy9zcmMvZmFjdG9yaWVzL2NyZWF0ZUNoYWluL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uLy4uLy4uL2lhcmVzL3NyYy91dGlscy9pbmRleC50cyIsICIuLi8uLi8uLi8uLi8uLi8uLi9pYXJlcy9zcmMvdmFsaWRhdG9ycy90ZW1wbGF0ZS9pbmRleC50cyIsICIuLi8uLi8uLi8uLi8uLi8uLi9pYXJlcy9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9yZW5kZXJUZW1wbGF0ZU9iamVjdC50cyIsICIuLi8uLi8uLi8uLi8uLi8uLi9pYXJlcy9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9yZW5kZXJUZW1wbGF0ZUFycmF5LnRzIiwgIi4uLy4uLy4uLy4uLy4uLy4uL2lhcmVzL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlckNoaWxkcmVuLnRzIiwgIi4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9odG1AMy4xLjEvbm9kZV9tb2R1bGVzL2h0bS9kaXN0L2h0bS5tb2R1bGUuanMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vaWFyZXMvc3JjL3RlbXBsYXRlL2h0bWwudHMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vaWFyZXMvc3JjL3N0eWxlL2NyZWF0ZUhhc2gudHMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vaWFyZXMvc3JjL3N0eWxlL2NyZWF0ZVN0eWxlRWxlbWVudC50cyIsICIuLi8uLi8uLi8uLi8uLi8uLi9pYXJlcy9zcmMvc3R5bGUvY3NzUGFyc2VyLnRzIiwgIi4uLy4uLy4uLy4uLy4uLy4uL2lhcmVzL3NyYy9zdHlsZS9jc3MudHMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vaWFyZXMvc3JjL2FjdGlvbnMvdGVtcGxhdGUvc2V0RWxlbWVudEF0dHJpYnV0ZXMudHMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vaWFyZXMvc3JjL2FjdGlvbnMvdGVtcGxhdGUvY3JlYXRlRWxlbWVudEJ5RmFjdG9yeU5hbWUudHMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vaWFyZXMvc3JjL2FjdGlvbnMvdGVtcGxhdGUvY3JlYXRlRWxlbWVudEJ5VGFnTmFtZS50cyIsICIuLi8uLi8uLi8uLi8uLi8uLi9pYXJlcy9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9yZW5kZXJUZW1wbGF0ZURhdGEudHMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vaWFyZXMvc3JjL3JlbmRlci9pbmRleC50cyIsICIuLi8uLi8uLi8uLi8uLi8uLi9pYXJlcy9zcmMvcm91dGVyL3JvdXRlci50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvZnJvbnRlbmQvdWkvcGFnZXMvSG9tZUFwcC9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHR5cGUge1xuXHRHZW5lcmljT2JqZWN0LFxuXHRIVE1YLFxuXHRTdGF0ZSxcblx0U3RhdGVNYW5hZ2VyLFxuXHRUYWdnZWRTdHlsZSxcblx0VGFnZ2VkVGVtcGxhdGUsXG59IGZyb20gXCJpYXJlc1wiO1xuXG50eXBlIFByb3BzID0ge1xuXHRoYW5kbGVyOiA8VCA9IHVua25vd24+KHBhcmFtczogVCkgPT4gdm9pZDtcbn07XG5cbnR5cGUgU3R5bGVzID0geyBUaW1lckFwcDogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH07XG5cbnR5cGUgU3R5bGVIYW5kbGVyID0gKCkgPT4gR2VuZXJpY09iamVjdDtcblxudHlwZSBBY3Rpb25zID0ge1xuXHRpbmNyZW1lbnQ6ICgpID0+IHZvaWQ7XG59O1xuXG50eXBlIEluamVjdGlvbnMgPSBHZW5lcmljT2JqZWN0PHtcblx0YWN0aW9uczogQWN0aW9ucztcblx0c3R5bGVzOiBTdHlsZXM7XG59PjtcblxudHlwZSBUZW1wbGF0ZUluamVjdGlvbnMgPSAoKSA9PiBJbmplY3Rpb25zO1xuXG50eXBlIFRlbXBsYXRlSGFuZGxlciA9IChcblx0cGFyYW1zOiBUZW1wbGF0ZVBhcmFtcyxcblx0aW5qZWN0aW9uczogVGVtcGxhdGVJbmplY3Rpb25zLFxuKSA9PiBUYWdnZWRUZW1wbGF0ZTtcblxudHlwZSBNb2RlbCA9IEdlbmVyaWNPYmplY3Q8e1xuXHR0aW1lTGVmdDogbnVtYmVyO1xufT47XG5cbnR5cGUgVXNlU3RhdGUgPSA8VCA9IE1vZGVsPihpbml0aWFsU3RhdGU6IFQpID0+IFN0YXRlTWFuYWdlcjxUPjtcblxudHlwZSBVc2VTdHlsZSA9IChzdHlsZUhhbmRsZXI6IFN0eWxlSGFuZGxlcikgPT4gc3RyaW5nO1xuXG50eXBlIFVzZVRlbXBsYXRlID0gKFxuXHR0ZW1wbGF0ZUhhbmRsZXI6IFRlbXBsYXRlSGFuZGxlcixcblx0dGVtcGxhdGVpbmplY3Rpb25zPzogVGVtcGxhdGVJbmplY3Rpb25zLFxuKSA9PiBUYWdnZWRUZW1wbGF0ZTtcblxudHlwZSBUZW1wbGF0ZVBhcmFtcyA9IHtcblx0c3RhdGU6IFN0YXRlPE1vZGVsPjtcblx0c3R5bGVzOiBTdHlsZXM7XG5cdGh0bWw6IEhUTVg7XG59O1xuXG50eXBlIFN0eWxlUGFyYW1zID0ge1xuXHRjc3M6IFRhZ2dlZFN0eWxlO1xufTtcblxudHlwZSBQYXJhbXMgPSB7XG5cdHByb3BzOiBQcm9wcztcblx0dXNlU3RhdGU6IFVzZVN0YXRlO1xuXHR1c2VTdHlsZTogVXNlU3R5bGU7XG5cdHVzZVRlbXBsYXRlOiBVc2VUZW1wbGF0ZTtcbn07XG5cbnR5cGUgVGltZXIgPSBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PjtcblxudHlwZSBUaW1lckhhbmRsZXJQYXJhbXMgPSB7XG5cdHN0YXRlOiBTdGF0ZU1hbmFnZXI8TW9kZWw+O1xuXHRzZWNvbmRzOiBudW1iZXI7XG59O1xuXG50eXBlIFN0YXRlV2F0Y2hlckhhbmRsZXJQYXJhbXMgPSB7XG5cdG9uZVNlY29uZDogbnVtYmVyO1xuXHR0aW1lcjogVGltZXI7XG59O1xuXG5jb25zdCB0ZW1wbGF0ZSA9IChwYXJhbXM6IFRlbXBsYXRlUGFyYW1zKTogVGFnZ2VkVGVtcGxhdGUgPT4ge1xuXHRjb25zdCB7IHN0YXRlLCBzdHlsZXMsIGh0bWwgfSA9IHBhcmFtcztcblx0Y29uc3QgdGltZUxlZnQgPSBOdW1iZXIoc3RhdGUudGltZUxlZnQpO1xuXG5cdHJldHVybiBodG1sYFxuXG4gICAgPGRpdiBjbGFzcz1cInRpbWVyXCI+IFxuICAgICAgPHNwYW4+QSBzaW1wbGUgY291bnRlcjwvc3Bhbj5cbiAgICAgIDxzcGFuPiR7dGltZUxlZnQgPD0gOSAmJiBcIjBcIn0ke3RpbWVMZWZ0IHx8IFwiMFwifXM8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgYCBhcyBUYWdnZWRUZW1wbGF0ZTtcbn07XG5cbmNvbnN0IGNyZWF0ZVN0YXRlSGFuZGxlciA9IChwYXJhbXM6IFRpbWVySGFuZGxlclBhcmFtcykgPT4ge1xuXHRjb25zdCB7IHN0YXRlLCBzZWNvbmRzIH0gPSBwYXJhbXM7XG5cdHJldHVybiAoKSA9PiB7XG5cdFx0Y29uc3QgeyB0aW1lTGVmdCB9ID0gc3RhdGUuZ2V0KCk7XG5cdFx0aWYgKCF0aW1lTGVmdCkgcmV0dXJuO1xuXHRcdHN0YXRlLnNldCh7IHRpbWVMZWZ0OiB0aW1lTGVmdCAtIHNlY29uZHMgfSk7XG5cdH07XG59O1xuXG5jb25zdCBjcmVhdGVTdGF0ZVdhdGNoZXIgPVxuXHQoeyBvbmVTZWNvbmQsIHRpbWVyIH06IFN0YXRlV2F0Y2hlckhhbmRsZXJQYXJhbXMpID0+XG5cdCh7IHRpbWVMZWZ0IH06IE1vZGVsKSA9PiB7XG5cdFx0aWYgKHRpbWVMZWZ0IDwgb25lU2Vjb25kKSB7XG5cdFx0XHRjbGVhclRpbWVvdXQodGltZXIpO1xuXHRcdH1cblx0fTtcblxuZXhwb3J0IGNvbnN0IFRpbWVyQXBwID0gKHsgdXNlU3RhdGUsIHVzZVN0eWxlLCB1c2VUZW1wbGF0ZSB9OiBQYXJhbXMpID0+IHtcblx0Y29uc3Qgc3RhdGUgPSB1c2VTdGF0ZTxNb2RlbD4oeyB0aW1lTGVmdDogMTIwIH0pO1xuXHR1c2VTdHlsZShjcmVhdGVTdHlsZXMpO1xuXG5cdGNvbnN0IG9uZVNlY29uZCA9IDE7XG5cdGNvbnN0IGN5Y2xlVGltZSA9IDEwMDA7XG5cblx0Y29uc3Qgc3RhdGVIYW5kbGVyID0gY3JlYXRlU3RhdGVIYW5kbGVyKHsgc3RhdGUsIHNlY29uZHM6IG9uZVNlY29uZCB9KTtcblx0Y29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KHN0YXRlSGFuZGxlciwgY3ljbGVUaW1lKTtcblxuXHRjb25zdCBzdGF0ZVdhdGNoZXIgPSBjcmVhdGVTdGF0ZVdhdGNoZXIoeyBvbmVTZWNvbmQsIHRpbWVyIH0pO1xuXHRzdGF0ZS53YXRjaChzdGF0ZVdhdGNoZXIpO1xuXG5cdHJldHVybiB1c2VUZW1wbGF0ZSh0ZW1wbGF0ZSk7XG59O1xuXG5jb25zdCBjcmVhdGVTdHlsZXMgPSAoKSA9PiAoe1xuXHRUaW1lckFwcDogKHsgY3NzIH06IFN0eWxlUGFyYW1zKSA9PiBjc3NgXG4gICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICB3aWR0aDoxMDAlO1xuICAgICAganVzdGlmeS1jb250ZW50OmNlbnRlcjtcblxuICAgIC50aW1lciB7XG4gICAgICBiYWNrZ3JvdW5kOiNiOWM1ZWM7XG4gICAgICBwYWRkaW5nOjE1cHg7XG4gICAgICBib3JkZXItcmFkaXVzOjhweDtcbiAgICB9XG5cbiAgICAudGltZXIgc3BhbiB7IFxuICAgICAgY29sb3I6ICMyMDcyYmE7IFxuICAgICAgZm9udC1zaXplOiAxZW07IFxuICAgIH1cblxuICAgIC50aW1lciBzcGFuICsgc3BhbiB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OmJvbGQ7XG4gICAgICAgIGZvbnQtc2l6ZTogMmVtXG4gICAgICB9XG5cbiAgICAudGltZXIgc3BhbjpmaXJzdC1vZi10eXBlIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbToxZW1cbiAgICAgIH1cbiAgIFxuYCxcbn0pO1xuIiwgImltcG9ydCB0eXBlIHtcbiAgQXBwbGljYXRpb24sXG4gIENvbnRleHRFbGVtZW50LFxuICBDb250ZXh0SGFuZGxlcixcbiAgQ2FsbGJhY2tIYW5kbGVyLFxufSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgQ3JlYXRlQXBwID0gKCk6IEFwcGxpY2F0aW9uID0+IHtcbiAgbGV0IF9lbGVtZW50ITogQ29udGV4dEVsZW1lbnQ7XG5cbiAgY29uc3Qgc2V0dXAgPSAoY2FsbGJhY2s6IENvbnRleHRIYW5kbGVyKSA9PiB7XG4gICAgX2VsZW1lbnQgPSBjYWxsYmFjaygpO1xuICAgIHJldHVybiBjYWxsYmFjaygpO1xuICB9O1xuXG4gIGNvbnN0IG1vdW50ID0gKGNhbGxiYWNrOiBDYWxsYmFja0hhbmRsZXIpID0+IHtcbiAgICByZXR1cm4gY2FsbGJhY2soX2VsZW1lbnQpO1xuICB9O1xuXG4gIGNvbnN0IHVubW91bnQgPSAoY2FsbGJhY2s6IENhbGxiYWNrSGFuZGxlcikgPT4ge1xuICAgIHJldHVybiBjYWxsYmFjayhfZWxlbWVudCk7XG4gIH07XG5cbiAgcmV0dXJuIHsgc2V0dXAsIG1vdW50LCB1bm1vdW50IH07XG59O1xuIiwgImltcG9ydCB0eXBlIHsgU3RhdGVXYXRjaGVyLCBTdGF0ZSwgU3RhdGVNYW5hZ2VyIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgX2NyZWF0ZVVVSUQgPSAoKTogc3RyaW5nID0+IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyLCAxMSk7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTdGF0ZSA9IDxTID0gdW5rbm93bj4oXG4gIGluaXRpYWxTdGF0ZTogU3RhdGU8Uz4sXG4pOiBTdGF0ZU1hbmFnZXI8Uz4gPT4ge1xuICBjb25zdCBfc3RhdGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGluaXRpYWxTdGF0ZSkpO1xuICBjb25zdCBfd2F0Y2hlcnMgPSBuZXcgU2V0PFN0YXRlV2F0Y2hlcjxTPj4oKTtcblxuICBjb25zdCBfbm90aWZ5SGFuZGxlcnMgPSAocGF5bG9hZDogU3RhdGU8Uz4pID0+IHtcbiAgICBmb3IgKGNvbnN0IHN0YXRlV2F0Y2hlciBvZiBfd2F0Y2hlcnMpIHtcbiAgICAgIHN0YXRlV2F0Y2hlcihwYXlsb2FkKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2V0ID0gKHBheWxvYWQ6IFN0YXRlPFM+KSA9PiB7XG4gICAgT2JqZWN0LmFzc2lnbihfc3RhdGUsIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpKTtcbiAgICBfbm90aWZ5SGFuZGxlcnMoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShfc3RhdGUpKSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0ID0gKCk6IFN0YXRlPFM+ID0+IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShfc3RhdGUpKTtcbiAgfTtcblxuICBjb25zdCB3YXRjaCA9IChjYWxsYmFjazogU3RhdGVXYXRjaGVyPFM+KSA9PiB7XG4gICAgX3dhdGNoZXJzLmFkZChjYWxsYmFjayk7XG4gIH07XG5cbiAgcmV0dXJuIHsgc2V0LCBnZXQsIHdhdGNoIH07XG59O1xuIiwgImltcG9ydCB0eXBlIHsgQ2hhaW5MaW5rIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNoYWluID0gKCkgPT4ge1xuICBjb25zdCBfY2hhaW4gPSBuZXcgU2V0PENoYWluTGluazx1bmtub3duPj4oKTtcblxuICBjb25zdCBhZGQgPSA8VD4oY2hhaW5MaW5rOiBDaGFpbkxpbms8VD4pID0+IHtcbiAgICBfY2hhaW4uYWRkKGNoYWluTGluayk7XG4gIH07XG5cbiAgY29uc3QgZXhlY3V0ZSA9ICgpID0+IHtcbiAgICBmb3IgKGNvbnN0IHsgYWN0aW9uLCB2YWxpZGF0b3IgfSBvZiBfY2hhaW4pIHtcbiAgICAgIGlmICh2YWxpZGF0b3IoKSkgYWN0aW9uKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGFkZCwgZXhlY3V0ZSB9O1xufTtcbiIsICJleHBvcnQgY29uc3QgZXNjYXBlVGVtcGxhdGVTdHJpbmcgPSAodGVtcGxhdGVTdHJpbmc6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICh0eXBlb2YgdGVtcGxhdGVTdHJpbmcgIT09IFwic3RyaW5nXCIpIHJldHVybiB0ZW1wbGF0ZVN0cmluZztcbiAgcmV0dXJuIHRlbXBsYXRlU3RyaW5nXG4gICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxuICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxuICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxuICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxuICAgIC5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIilcbiAgICAucmVwbGFjZSgvXFwvL2csIFwiJiN4MkY7XCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGJpbmRTdHlsZVNjb3BlID0gKHNjb3BlSWQ6IHN0cmluZywgc3RyaW5nczogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcmVnZXggPSAvKFxcLihcXHcrKShcXC0qfFxcXyopPykrXFx3Ky9naTtcbiAgcmV0dXJuIHN0cmluZ3MucmVwbGFjZShyZWdleCwgKHZhbHVlcykgPT4ge1xuICAgIHJldHVybiBgLiR7c2NvcGVJZH0tJHt2YWx1ZXMucmVwbGFjZSgvXFwuLywgXCJcIil9YDtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlVVVJRCA9ICgpID0+IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsIDYpO1xuXG5leHBvcnQgY29uc3QgSFRNTEV2ZW50cyA9IFtcbiAgLy8gRXZlbnRvcyBkZSBNb3VzZVxuICBcIm9uY2xpY2tcIixcbiAgXCJvbmRibGNsaWNrXCIsXG4gIFwib25tb3VzZWRvd25cIixcbiAgXCJvbm1vdXNldXBcIixcbiAgXCJvbm1vdXNlb3ZlclwiLFxuICBcIm9ubW91c2VvdXRcIixcbiAgXCJvbm1vdXNlbW92ZVwiLFxuICBcIm9ubW91c2VlbnRlclwiLFxuICBcIm9ubW91c2VsZWF2ZVwiLFxuICBcIm9uY29udGV4dG1lbnVcIixcblxuICAvLyBFdmVudG9zIGRlIFRlY2xhZG9cbiAgXCJvbmtleWRvd25cIixcbiAgXCJvbmtleXVwXCIsXG4gIFwib25rZXlwcmVzc1wiLFxuXG4gIC8vIEV2ZW50b3MgZGUgRm9jb1xuICBcIm9uZm9jdXNcIixcbiAgXCJvbmJsdXJcIixcblxuICAvLyBFdmVudG9zIGRlIEZvcm11bFx1MDBFMXJpb1xuICBcIm9uc3VibWl0XCIsXG4gIFwib25jaGFuZ2VcIixcbiAgXCJvbmlucHV0XCIsXG4gIFwib25yZXNldFwiLFxuICBcIm9uaW52YWxpZFwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgTVx1MDBFRGRpYVxuICBcIm9ucGxheVwiLFxuICBcIm9ucGF1c2VcIixcbiAgXCJvbmVuZGVkXCIsXG4gIFwib252b2x1bWVjaGFuZ2VcIixcblxuICAvLyBFdmVudG9zIGRlIFRvcXVlIChUb3VjaCkgLSBwYXJhIGRpc3Bvc2l0aXZvcyBtXHUwMEYzdmVpc1xuICBcIm9udG91Y2hzdGFydFwiLFxuICBcIm9udG91Y2htb3ZlXCIsXG4gIFwib250b3VjaGVuZFwiLFxuICBcIm9udG91Y2hjYW5jZWxcIixcblxuICAvLyBFdmVudG9zIGRlIEFuaW1hXHUwMEU3XHUwMEUzbyBlIFRyYW5zaVx1MDBFN1x1MDBFM29cbiAgXCJvbmFuaW1hdGlvbnN0YXJ0XCIsXG4gIFwib25hbmltYXRpb25lbmRcIixcbiAgXCJvbmFuaW1hdGlvbml0ZXJhdGlvblwiLFxuICBcIm9udHJhbnNpdGlvbmVuZFwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgT3V0cm9zIEludGVyYXRpdm9zXG4gIFwib25sb2FkXCIsXG4gIFwib25lcnJvclwiLFxuICBcIm9ucmVzaXplXCIsXG4gIFwib25zY3JvbGxcIixcbl07XG4iLCAiaW1wb3J0IHsgSFRNTEV2ZW50cyB9IGZyb20gXCJAL3V0aWxzXCI7XG5cbmNvbnN0IGlzT2JqZWN0ID1cbiAgPFQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuICEhcGF5bG9hZCAmJiAhQXJyYXkuaXNBcnJheShwYXlsb2FkKSAmJiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJvYmplY3RcIjtcbiAgICB9O1xuXG5jb25zdCBpc0FycmF5ID1cbiAgPFQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuICEhcGF5bG9hZCAmJiBBcnJheS5pc0FycmF5KHBheWxvYWQpO1xuICAgIH07XG5cbmNvbnN0IGlzRnVuY3Rpb24gPVxuICA8VCA9IHZvaWQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuICEhcGF5bG9hZCAmJiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJmdW5jdGlvblwiO1xuICAgIH07XG5cbmNvbnN0IGlzU3RyaW5nID1cbiAgPFQgPSB2b2lkPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJzdHJpbmdcIjtcbiAgICB9O1xuXG5jb25zdCBpc0V2ZW50TmFtZSA9XG4gIDxUID0gdm9pZD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHBheWxvYWQgIT09IFwic3RyaW5nXCIpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiBIVE1MRXZlbnRzLmluY2x1ZGVzKHBheWxvYWQudG9Mb3dlckNhc2UoKSk7XG4gICAgfTtcblxuY29uc3QgaXNUZW1wbGF0ZURhdGEgPVxuICA8VCA9IHZvaWQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBwYXlsb2FkID09PSBcIm51bWJlclwiO1xuICAgIH07XG5cbmV4cG9ydCB7IGlzT2JqZWN0LCBpc0FycmF5LCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgaXNFdmVudE5hbWUsIGlzVGVtcGxhdGVEYXRhIH07XG4iLCAiaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3R5cGVzXCI7XG5pbXBvcnQgeyBjcmVhdGVDaGFpbiB9IGZyb20gXCJAL2ZhY3Rvcmllc1wiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudEJ5RmFjdG9yeU5hbWUsIGNyZWF0ZUVsZW1lbnRCeVRhZ05hbWUgfSBmcm9tIFwiQC9hY3Rpb25zXCI7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uLCBpc1N0cmluZyB9IGZyb20gXCJAL3ZhbGlkYXRvcnNcIjtcbmltcG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyVGVtcGxhdGVPYmplY3QgPVxuICAodGVtcGxhdGU6IFRlbXBsYXRlU2NoZW1hLCBjb250ZXh0RWxlbWVudDogRWxlbWVudCwgc3RhdGU6IFN0YXRlID0ge30pID0+XG4gICAgKCk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgX2NoYWluID0gY3JlYXRlQ2hhaW4oKTtcblxuICAgICAgX2NoYWluLmFkZCh7XG4gICAgICAgIHZhbGlkYXRvcjogaXNTdHJpbmcodGVtcGxhdGUudHlwZSksXG4gICAgICAgIGFjdGlvbjogY3JlYXRlRWxlbWVudEJ5VGFnTmFtZSh0ZW1wbGF0ZSwgY29udGV4dEVsZW1lbnQsIHN0YXRlKSxcbiAgICAgIH0pO1xuXG4gICAgICBfY2hhaW4uYWRkKHtcbiAgICAgICAgdmFsaWRhdG9yOiBpc0Z1bmN0aW9uKHRlbXBsYXRlLnR5cGUpLFxuICAgICAgICBhY3Rpb246IGNyZWF0ZUVsZW1lbnRCeUZhY3RvcnlOYW1lKHRlbXBsYXRlLCBjb250ZXh0RWxlbWVudCwgc3RhdGUpLFxuICAgICAgfSk7XG5cbiAgICAgIF9jaGFpbi5leGVjdXRlKCk7XG4gICAgfTtcbiIsICJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiQC9yZW5kZXJcIjtcbmltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90eXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJUZW1wbGF0ZUFycmF5ID1cbiAgKFxuICAgIHRlbXBsYXRlU2NoZW1hOiBUZW1wbGF0ZVNjaGVtYVtdLFxuICAgIGNvbnRleHRFbGVtZW50OiBFbGVtZW50LFxuICAgIHN0YXRlOiBTdGF0ZSA9IHt9LFxuICApID0+XG4gICAgKCkgPT4ge1xuICAgICAgZm9yIChjb25zdCB0ZW1wbGF0ZSBvZiB0ZW1wbGF0ZVNjaGVtYSkge1xuICAgICAgICByZW5kZXIodGVtcGxhdGUsIGNvbnRleHRFbGVtZW50LCBzdGF0ZSk7XG4gICAgICB9XG4gICAgfTtcbiIsICJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiQC9yZW5kZXJcIjtcbmltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJDaGlsZHJlbiA9IChcbiAgY2hpbGRyZW46IFRlbXBsYXRlU2NoZW1hW10sXG4gIHBhcmVudEVsZW1lbnQ6IEVsZW1lbnQsXG4gIHN0YXRlOiBTdGF0ZSA9IHt9LFxuKSA9PiB7XG4gIHBhcmVudEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGNoaWxkcmVuKSAmJiB0eXBlb2YgY2hpbGRyZW4gPT09IFwib2JqZWN0XCIpIHtcbiAgICByZW5kZXIoY2hpbGRyZW4sIHBhcmVudEVsZW1lbnQsIHN0YXRlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgcmVuZGVyKGNoaWxkLCBwYXJlbnRFbGVtZW50LCBzdGF0ZSk7XG4gIH1cbn07XG4iLCAidmFyIG49ZnVuY3Rpb24odCxzLHIsZSl7dmFyIHU7c1swXT0wO2Zvcih2YXIgaD0xO2g8cy5sZW5ndGg7aCsrKXt2YXIgcD1zW2grK10sYT1zW2hdPyhzWzBdfD1wPzE6MixyW3NbaCsrXV0pOnNbKytoXTszPT09cD9lWzBdPWE6ND09PXA/ZVsxXT1PYmplY3QuYXNzaWduKGVbMV18fHt9LGEpOjU9PT1wPyhlWzFdPWVbMV18fHt9KVtzWysraF1dPWE6Nj09PXA/ZVsxXVtzWysraF1dKz1hK1wiXCI6cD8odT10LmFwcGx5KGEsbih0LGEscixbXCJcIixudWxsXSkpLGUucHVzaCh1KSxhWzBdP3NbMF18PTI6KHNbaC0yXT0wLHNbaF09dSkpOmUucHVzaChhKX1yZXR1cm4gZX0sdD1uZXcgTWFwO2V4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHMpe3ZhciByPXQuZ2V0KHRoaXMpO3JldHVybiByfHwocj1uZXcgTWFwLHQuc2V0KHRoaXMscikpLChyPW4odGhpcyxyLmdldChzKXx8KHIuc2V0KHMscj1mdW5jdGlvbihuKXtmb3IodmFyIHQscyxyPTEsZT1cIlwiLHU9XCJcIixoPVswXSxwPWZ1bmN0aW9uKG4pezE9PT1yJiYobnx8KGU9ZS5yZXBsYWNlKC9eXFxzKlxcblxccyp8XFxzKlxcblxccyokL2csXCJcIikpKT9oLnB1c2goMCxuLGUpOjM9PT1yJiYobnx8ZSk/KGgucHVzaCgzLG4sZSkscj0yKToyPT09ciYmXCIuLi5cIj09PWUmJm4/aC5wdXNoKDQsbiwwKToyPT09ciYmZSYmIW4/aC5wdXNoKDUsMCwhMCxlKTpyPj01JiYoKGV8fCFuJiY1PT09cikmJihoLnB1c2gociwwLGUscykscj02KSxuJiYoaC5wdXNoKHIsbiwwLHMpLHI9NikpLGU9XCJcIn0sYT0wO2E8bi5sZW5ndGg7YSsrKXthJiYoMT09PXImJnAoKSxwKGEpKTtmb3IodmFyIGw9MDtsPG5bYV0ubGVuZ3RoO2wrKyl0PW5bYV1bbF0sMT09PXI/XCI8XCI9PT10PyhwKCksaD1baF0scj0zKTplKz10OjQ9PT1yP1wiLS1cIj09PWUmJlwiPlwiPT09dD8ocj0xLGU9XCJcIik6ZT10K2VbMF06dT90PT09dT91PVwiXCI6ZSs9dDonXCInPT09dHx8XCInXCI9PT10P3U9dDpcIj5cIj09PXQ/KHAoKSxyPTEpOnImJihcIj1cIj09PXQ/KHI9NSxzPWUsZT1cIlwiKTpcIi9cIj09PXQmJihyPDV8fFwiPlwiPT09blthXVtsKzFdKT8ocCgpLDM9PT1yJiYoaD1oWzBdKSxyPWgsKGg9aFswXSkucHVzaCgyLDAscikscj0wKTpcIiBcIj09PXR8fFwiXFx0XCI9PT10fHxcIlxcblwiPT09dHx8XCJcXHJcIj09PXQ/KHAoKSxyPTIpOmUrPXQpLDM9PT1yJiZcIiEtLVwiPT09ZSYmKHI9NCxoPWhbMF0pfXJldHVybiBwKCksaH0ocykpLHIpLGFyZ3VtZW50cyxbXSkpLmxlbmd0aD4xP3I6clswXX1cbiIsICJpbXBvcnQgaHRtIGZyb20gXCJodG1cIjtcbmltcG9ydCB0eXBlIHsgVGFnZ2VkVGVtcGxhdGUsIFRlbXBsYXRlUHJvcHMsIFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgaHlwZXJ0ZXh0ID0gKFxuICB0eXBlOiB1bmtub3duLFxuICBwcm9wczogVGVtcGxhdGVQcm9wcyxcbiAgLi4uY2hpbGRyZW46IFRlbXBsYXRlU2NoZW1hW11cbikgPT4ge1xuICByZXR1cm4geyB0eXBlLCBwcm9wcywgY2hpbGRyZW4gfTtcbn07XG5cbmNvbnN0IGh0bWwgPSBodG0uYmluZDxUYWdnZWRUZW1wbGF0ZT4oaHlwZXJ0ZXh0KTtcblxuZXhwb3J0IHsgaHRtbCB9O1xuZXhwb3J0IHsgaHRtbCBhcyBqc3ggfTtcbmV4cG9ydCB7IGh0bWwgYXMgdHN4IH07XG4iLCAiLyoqXG4gKiBHZXJhIHVtIGhhc2ggXHUwMEZBbmljbyBiYXNlYWRvIG5vIGFsZ29yaXRtbyBESkIyLlxuICogQHBhcmFtIHN0ciAtIE8gY29udGVcdTAwRkFkbyBhIHBhcnRpciBkbyBxdWFsIG8gaGFzaCBzZXJcdTAwRTEgZ2VyYWRvLlxuICogQHJldHVybnMgTyBoYXNoIGdlcmFkbyBjb21vIHVtYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVIYXNoID0gKHRleHQ6IHN0cmluZywgc2VsZWN0b3I6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGxldCBoYXNoID0gNTM4MTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaGFzaCA9IChoYXNoICogMzMpIF4gdGV4dC5jaGFyQ29kZUF0KGkpO1xuICB9XG4gIHJldHVybiBgJHtzZWxlY3Rvcn0tJHsoaGFzaCA+Pj4gMCkudG9TdHJpbmcoMzYpfWA7XG59O1xuIiwgImNvbnN0IHN0eWxlRWxlbWVudENhY2hlOiBNYXA8c3RyaW5nLCBIVE1MU3R5bGVFbGVtZW50PiA9IG5ldyBNYXAoKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVN0eWxlRWxlbWVudCA9IChjb21wb25lbnRJZDogc3RyaW5nKTogSFRNTFN0eWxlRWxlbWVudCA9PiB7XG4gIGNvbnN0IHN0eWxlRWxlbWVudCA9IHN0eWxlRWxlbWVudENhY2hlLmdldChjb21wb25lbnRJZCk7XG5cbiAgaWYgKHN0eWxlRWxlbWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHN0eWxlRWxlbWVudDtcbiAgfVxuXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBzdHlsZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBvbmVudFwiLCBjb21wb25lbnRJZCk7XG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICBzdHlsZUVsZW1lbnRDYWNoZS5zZXQoY29tcG9uZW50SWQsIHN0eWxlKTtcblxuICByZXR1cm4gc3R5bGU7XG59O1xuIiwgInR5cGUgV3JhcFN0eWxlUGFyYW1zID0ge1xuICBzdHlsZTogc3RyaW5nO1xuICBzZWxlY3Rvcjogc3RyaW5nO1xufTtcblxudHlwZSBBY2N1bXVsYXRvciA9IHtcbiAgaW5zaWRlQmxvY2s6IG51bWJlcjtcbiAgZ2xvYmFsUnVsZXM6IHN0cmluZztcbiAgcmVzdWx0OiBzdHJpbmc7XG59O1xuXG50eXBlIExpbmVQcm9jZXNzaW5nID0ge1xuICBnbG9iYWxSdWxlczogc3RyaW5nO1xuICByZXN1bHQ6IHN0cmluZztcbn07XG5cbmNvbnN0IHdyYXBMb29zZVJ1bGVzT3V0c2lkZU1lZGlhUXVlcnkgPSAoe1xuICBzdHlsZSxcbiAgc2VsZWN0b3IsXG59OiBXcmFwU3R5bGVQYXJhbXMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBsaW5lcyA9IHN0eWxlLnNwbGl0KFwiXFxuXCIpO1xuICBjb25zdCBydWxlUmVnZXggPSAvXlxccyooW1xcdy1dKylcXHMqOlxccypbXjtdKzsvO1xuXG4gIGNvbnN0IGluaXRpYWxTdGF0ZTogQWNjdW11bGF0b3IgPSB7XG4gICAgaW5zaWRlQmxvY2s6IDAsXG4gICAgZ2xvYmFsUnVsZXM6IFwiXCIsXG4gICAgcmVzdWx0OiBcIlwiLFxuICB9O1xuXG4gIGNvbnN0IHByb2Nlc3NHbG9iYWxSdWxlcyA9IChcbiAgICBnbG9iYWxSdWxlczogc3RyaW5nLFxuICAgIHJlc3VsdDogc3RyaW5nLFxuICAgIHNlbGVjdG9yOiBzdHJpbmcsXG4gICk6IExpbmVQcm9jZXNzaW5nID0+ICh7XG4gICAgZ2xvYmFsUnVsZXM6IFwiXCIsXG4gICAgcmVzdWx0OiBgJHtyZXN1bHR9JHtzZWxlY3Rvcn0ge1xcbiR7Z2xvYmFsUnVsZXN9fVxcblxcbmAsXG4gIH0pO1xuXG4gIGNvbnN0IHByb2Nlc3NSZWd1bGFyTGluZSA9IChcbiAgICBsaW5lOiBzdHJpbmcsXG4gICAgcmVzdWx0OiBzdHJpbmcsXG4gICk6IExpbmVQcm9jZXNzaW5nID0+ICh7XG4gICAgZ2xvYmFsUnVsZXM6IFwiXCIsXG4gICAgcmVzdWx0OiBgJHtyZXN1bHR9JHtsaW5lfVxcbmAsXG4gIH0pO1xuXG4gIGNvbnN0IGFkZEdsb2JhbFJ1bGUgPSAoXG4gICAgbGluZTogc3RyaW5nLFxuICAgIGdsb2JhbFJ1bGVzOiBzdHJpbmcsXG4gICk6IExpbmVQcm9jZXNzaW5nID0+ICh7XG4gICAgZ2xvYmFsUnVsZXM6IGAke2dsb2JhbFJ1bGVzfSR7bGluZX1cXG5gLFxuICAgIHJlc3VsdDogXCJcIixcbiAgfSk7XG5cbiAgY29uc3QgY291bnRCbG9ja3MgPSAobGluZTogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBvcGVuaW5ncyA9IChsaW5lLm1hdGNoKC97L2cpIHx8IFtdKS5sZW5ndGg7XG4gICAgY29uc3QgY2xvc2luZ3MgPSAobGluZS5tYXRjaCgvfS9nKSB8fCBbXSkubGVuZ3RoO1xuICAgIHJldHVybiBvcGVuaW5ncyAtIGNsb3NpbmdzO1xuICB9O1xuXG4gIGNvbnN0IHByb2Nlc3NMaW5lID0gKGFjYzogQWNjdW11bGF0b3IsIGxpbmU6IHN0cmluZyk6IEFjY3VtdWxhdG9yID0+IHtcbiAgICBhY2MuaW5zaWRlQmxvY2sgKz0gY291bnRCbG9ja3MobGluZSk7XG5cbiAgICAvLyBDYXNlIDE6IExpbmUgaXMgYSBnbG9iYWwgcnVsZVxuICAgIGlmIChhY2MuaW5zaWRlQmxvY2sgPT09IDAgJiYgcnVsZVJlZ2V4LnRlc3QobGluZSkpIHtcbiAgICAgIGNvbnN0IHsgZ2xvYmFsUnVsZXMsIHJlc3VsdCB9ID0gYWRkR2xvYmFsUnVsZShsaW5lLCBhY2MuZ2xvYmFsUnVsZXMpO1xuICAgICAgcmV0dXJuIHsgLi4uYWNjLCBnbG9iYWxSdWxlcywgcmVzdWx0OiBhY2MucmVzdWx0ICsgcmVzdWx0IH07XG4gICAgfVxuXG4gICAgLy8gQ2FzZSAyOiBUaGVyZSBhcmUgYWNjdW11bGF0ZWQgZ2xvYmFsIHJ1bGVzXG4gICAgaWYgKGFjYy5nbG9iYWxSdWxlcykge1xuICAgICAgY29uc3QgeyBnbG9iYWxSdWxlcywgcmVzdWx0IH0gPSBwcm9jZXNzR2xvYmFsUnVsZXMoXG4gICAgICAgIGFjYy5nbG9iYWxSdWxlcyxcbiAgICAgICAgYWNjLnJlc3VsdCxcbiAgICAgICAgc2VsZWN0b3IsXG4gICAgICApO1xuICAgICAgY29uc3QgcHJvY2Vzc2VkTGluZSA9IHByb2Nlc3NSZWd1bGFyTGluZShsaW5lLCBcIlwiKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmFjYyxcbiAgICAgICAgZ2xvYmFsUnVsZXMsXG4gICAgICAgIHJlc3VsdDogcmVzdWx0ICsgcHJvY2Vzc2VkTGluZS5yZXN1bHQsXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIENhc2UgMzogUmVndWxhciBsaW5lXG4gICAgY29uc3QgeyBnbG9iYWxSdWxlcywgcmVzdWx0IH0gPSBwcm9jZXNzUmVndWxhckxpbmUobGluZSwgYWNjLnJlc3VsdCk7XG4gICAgcmV0dXJuIHsgLi4uYWNjLCBnbG9iYWxSdWxlcywgcmVzdWx0IH07XG4gIH07XG5cbiAgY29uc3QgeyByZXN1bHQsIGdsb2JhbFJ1bGVzIH0gPSBsaW5lcy5yZWR1Y2UocHJvY2Vzc0xpbmUsIGluaXRpYWxTdGF0ZSk7XG5cbiAgcmV0dXJuIGdsb2JhbFJ1bGVzXG4gICAgPyBgJHtyZXN1bHR9JHtzZWxlY3Rvcn0ge1xcbiR7Z2xvYmFsUnVsZXN9fVxcbmAudHJpbSgpXG4gICAgOiByZXN1bHQudHJpbSgpO1xufTtcblxuY29uc3Qgd3JhcExvb3NlUnVsZXNJbnNpZGVNZWRpYVF1ZXJ5ID0gKHtcbiAgc3R5bGUsXG4gIHNlbGVjdG9yLFxufTogV3JhcFN0eWxlUGFyYW1zKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcmVnZXggPSAvQG1lZGlhXFxzKihbXntdKylcXHMqXFx7KFtcXHNcXFNdKj8pXFx9L2c7XG4gIGNvbnN0IHJ1bGVSZWdleCA9IC9eXFxzKihbXFx3LV0rKVxccyo6XFxzKlteO10rOy87XG5cbiAgcmV0dXJuIHN0eWxlLnJlcGxhY2UocmVnZXgsIChtYXRjaCwgbWVkaWFRdWVyeSwgaW5uZXJDc3MpID0+IHtcbiAgICBjb25zdCBydWxlcyA9IGlubmVyQ3NzXG4gICAgICAudHJpbSgpXG4gICAgICAuc3BsaXQoXCJcXG5cIilcbiAgICAgIC5tYXAoKGxpbmU6IHN0cmluZykgPT4gbGluZS50cmltKCkpXG4gICAgICAuZmlsdGVyKChsaW5lOiBzdHJpbmcpID0+IGxpbmUpO1xuXG4gICAgY29uc3Qgd3JhcHBlZFJ1bGVzID0gcnVsZXNcbiAgICAgIC5maWx0ZXIoKHJ1bGU6IHN0cmluZykgPT4gcnVsZVJlZ2V4LnRlc3QocnVsZSkpXG4gICAgICAubWFwKChydWxlOiBzdHJpbmcpID0+IGAke3NlbGVjdG9yfSB7XFxuJHtydWxlLnRyaW0oKX1cXG59YClcbiAgICAgIC5qb2luKFwiXFxuXCIpO1xuXG4gICAgcmV0dXJuIGBAbWVkaWEgJHttZWRpYVF1ZXJ5LnRyaW0oKX0ge1xcbiR7d3JhcHBlZFJ1bGVzfVxcbn1gO1xuICB9KTtcbn07XG5cbmNvbnN0IGFwcGx5Q2xhc3NOYW1lU2NvcGUgPSAoeyBzdHlsZSwgc2VsZWN0b3IgfTogV3JhcFN0eWxlUGFyYW1zKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcmVnZXggPSAvXFwuKD88IVtcXGRdKSg/IVtcXGRdKShbXFx3LV0rKS9nO1xuICByZXR1cm4gc3R5bGUucmVwbGFjZShyZWdleCwgYC4ke3NlbGVjdG9yfV8kMWApO1xufTtcblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybVN0eWxlID0gKHJhd1N0eWxlOiBzdHJpbmcsIHNlbGVjdG9yOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBsZXQgc3R5bGUgPSByYXdTdHlsZTtcbiAgY29uc3QgY2xhc3NOYW1lID0gYC4ke3NlbGVjdG9yfWA7XG4gIHN0eWxlID0gYXBwbHlDbGFzc05hbWVTY29wZSh7IHN0eWxlLCBzZWxlY3RvciB9KTtcbiAgc3R5bGUgPSB3cmFwTG9vc2VSdWxlc091dHNpZGVNZWRpYVF1ZXJ5KHsgc3R5bGUsIHNlbGVjdG9yOiBjbGFzc05hbWUgfSk7XG4gIHN0eWxlID0gd3JhcExvb3NlUnVsZXNJbnNpZGVNZWRpYVF1ZXJ5KHsgc3R5bGUsIHNlbGVjdG9yOiBjbGFzc05hbWUgfSk7XG5cbiAgcmV0dXJuIHN0eWxlO1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IFRhZ2dlZFN0eWxlIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUhhc2ggfSBmcm9tIFwiLi9jcmVhdGVIYXNoXCI7XG5pbXBvcnQgeyB0cmFuc2Zvcm1TdHlsZSB9IGZyb20gXCIuL2Nzc1BhcnNlclwiO1xuaW1wb3J0IHsgY3JlYXRlU3R5bGVFbGVtZW50IH0gZnJvbSBcIi4vY3JlYXRlU3R5bGVFbGVtZW50XCI7XG5cbnR5cGUgSGFuZGxlclBhcmFtcyA9IHtcbiAgaGFzaElkOiBzdHJpbmc7XG4gIHNjb3BlZFN0eWxlOiBzdHJpbmc7XG4gIHN0eWxlRWxlbWVudDogRWxlbWVudDtcbn07XG50eXBlIEhhbmRsZXIgPSAocGF5bG9hZDogSGFuZGxlclBhcmFtcykgPT4gdm9pZDtcblxuY29uc3QgY3NzQ2FjaGU6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBjb25zdCBjc3MgPVxuICAoc2VsZWN0b3I6IHN0cmluZywgaGFuZGxlcjogSGFuZGxlciA9ICgpID0+IHsgfSk6IFRhZ2dlZFN0eWxlID0+XG4gICAgKFxuICAgICAgc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXksXG4gICAgICAuLi5pbnRlcnBvbGF0aW9uczogKHN0cmluZyB8IG51bWJlcilbXVxuICAgICk6IHN0cmluZyA9PiB7XG4gICAgICBjb25zdCByYXdDU1MgPSBzdHJpbmdzLnJlZHVjZShcbiAgICAgICAgKGFjY3VtdWxhdG9yLCBzdHIsIGluZGV4KSA9PlxuICAgICAgICAgIGAke2FjY3VtdWxhdG9yfSR7c3RyfSR7aW50ZXJwb2xhdGlvbnNbaW5kZXhdICE9PSB1bmRlZmluZWQgPyBpbnRlcnBvbGF0aW9uc1tpbmRleF0gOiBcIlwifWAsXG4gICAgICAgIFwiXCIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBjYWNoZWRDbGFzc05hbWUgPSBjc3NDYWNoZS5nZXQocmF3Q1NTKTtcbiAgICAgIGlmIChjYWNoZWRDbGFzc05hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBWZXJpZmljYSBzZSBvIGVsZW1lbnRvIHN0eWxlIGV4aXN0ZSBubyBET01cbiAgICAgICAgY29uc3QgZXhpc3RpbmdTdHlsZSA9IGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgW2RhdGEtY29tcG9uZW50PVwiJHtjYWNoZWRDbGFzc05hbWV9XCJdYCxcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBTZSBuXHUwMEUzbyBleGlzdGlyLCByZWNyaWEgbyBlbGVtZW50byBzdHlsZVxuICAgICAgICBpZiAoIWV4aXN0aW5nU3R5bGUpIHtcbiAgICAgICAgICBjb25zdCBzY29wZWRTdHlsZSA9IHRyYW5zZm9ybVN0eWxlKHJhd0NTUywgY2FjaGVkQ2xhc3NOYW1lKTtcbiAgICAgICAgICBjb25zdCBzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoY2FjaGVkQ2xhc3NOYW1lKTtcbiAgICAgICAgICBzdHlsZUVsZW1lbnQuaW5uZXJIVE1MICs9IHNjb3BlZFN0eWxlO1xuICAgICAgICAgIGhhbmRsZXIoeyBoYXNoSWQ6IGNhY2hlZENsYXNzTmFtZSwgc2NvcGVkU3R5bGUsIHN0eWxlRWxlbWVudCB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGFzc05hbWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGhhc2hJZCA9IGNyZWF0ZUhhc2gocmF3Q1NTLCBzZWxlY3Rvcik7XG4gICAgICBjb25zdCBzY29wZWRTdHlsZSA9IHRyYW5zZm9ybVN0eWxlKHJhd0NTUywgaGFzaElkKTtcbiAgICAgIGNvbnN0IHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChoYXNoSWQpO1xuXG4gICAgICBoYW5kbGVyKHsgaGFzaElkLCBzY29wZWRTdHlsZSwgc3R5bGVFbGVtZW50IH0pO1xuXG4gICAgICBpZiAoIXN0eWxlRWxlbWVudC5pbm5lckhUTUwuaW5jbHVkZXMoc2NvcGVkU3R5bGUpKSB7XG4gICAgICAgIHN0eWxlRWxlbWVudC5pbm5lckhUTUwgKz0gc2NvcGVkU3R5bGU7XG4gICAgICB9XG5cbiAgICAgIGNzc0NhY2hlLnNldChyYXdDU1MsIGhhc2hJZCk7XG5cbiAgICAgIHJldHVybiBoYXNoSWQ7XG4gICAgfTtcbiIsICJpbXBvcnQgeyBpc0V2ZW50TmFtZSB9IGZyb20gXCJAL3ZhbGlkYXRvcnNcIjtcblxudHlwZSBBdHRyaWJ1dGUgPSBvYmplY3QgJiB7XG4gIFtrZXk6IHN5bWJvbCB8IHN0cmluZ106IHVua25vd247XG59O1xuXG50eXBlIEV2ZW50SGFuZGxlciA9IDxLIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRFdmVudE1hcD4oXG4gIGV2ZW50OiBIVE1MRWxlbWVudEV2ZW50TWFwW0tdLFxuKSA9PiB2b2lkO1xuXG5leHBvcnQgY29uc3Qgc2V0RWxlbWVudEF0dHJpYnV0ZXMgPSAoXG4gIGVsZW1lbnQ6IEVsZW1lbnQsXG4gIGF0dHJpYnV0ZXM6IEF0dHJpYnV0ZSxcbik6IEVsZW1lbnQgPT4ge1xuICBjb25zdCBhdHRyaWJ1dGVLZXlzID0gYXR0cmlidXRlcyA/IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpIDogW107XG4gIGZvciAoY29uc3Qga2V5IG9mIGF0dHJpYnV0ZUtleXMpIHtcbiAgICBpZiAoIWlzRXZlbnROYW1lKGtleSkoKSkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0gYXMgc3RyaW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXZlbnROYW1lID0ga2V5XG4gICAgICAgIC5yZXBsYWNlKC9vbi8sIFwiXCIpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpIGFzIGtleW9mIEhUTUxFbGVtZW50RXZlbnRNYXA7XG4gICAgICBjb25zdCBldmVudEhhbmRsZXIgPSBhdHRyaWJ1dGVzW2tleV0gYXMgRXZlbnRIYW5kbGVyO1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuIiwgImltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHR5cGUgeyBHZW5lcmljT2JqZWN0LCBTdGF0ZSwgU3RhdGVNYW5hZ2VyIH0gZnJvbSBcIkAvc3RhdGVcIjtcbmltcG9ydCB7IGNyZWF0ZVN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJAL3JlbmRlclwiO1xuaW1wb3J0IHsgaHRtbCwganN4LCB0c3ggfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkAvc3R5bGVcIjtcbmltcG9ydCB7IHJlbmRlckNoaWxkcmVuIH0gZnJvbSBcIi4vcmVuZGVyQ2hpbGRyZW5cIjtcbmltcG9ydCB7IHNldEVsZW1lbnRBdHRyaWJ1dGVzIH0gZnJvbSBcIi4vc2V0RWxlbWVudEF0dHJpYnV0ZXNcIjtcblxudHlwZSBGYWN0b3J5ID0gKHBhcmFtcz86IHVua25vd24pID0+IHVua25vd247XG5cbnR5cGUgU3R5bGVQYXJhbXMgPSB7XG4gIHByb3BzOiBTdGF0ZTtcbiAgc3RhdGU6IFN0YXRlO1xuICBjc3M6IFJldHVyblR5cGU8dHlwZW9mIGNzcz47XG59O1xuXG50eXBlIFN0eWxlcyA9IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG50eXBlIFN0eWxlc09iamVjdCA9IEdlbmVyaWNPYmplY3Q8eyBba2V5OiBzdHJpbmddOiAoKSA9PiBzdHJpbmcgfT47XG50eXBlIFN0eWxlSGFuZGxlckZhY3RvcnkgPSAoKSA9PiBTdHlsZXNPYmplY3Q7XG50eXBlIFN0eWxlSGFuZGxlciA9IChwYXJhbXM6IFN0eWxlUGFyYW1zKSA9PiBzdHJpbmc7XG5cbnR5cGUgVGVtcGxhdGVQYXJhbXMgPSB7XG4gIHByb3BzOiBTdGF0ZTtcbiAgc3RhdGU6IFN0YXRlO1xuICBodG1sOiB0eXBlb2YgaHRtbDtcbiAganN4OiB0eXBlb2YganN4O1xuICB0c3g6IHR5cGVvZiB0c3g7XG4gIHN0eWxlczogU3R5bGVzO1xuICBhY3Rpb25zOiBBY3Rpb25zO1xufTtcblxudHlwZSBUZW1wbGF0ZUluamVjdGlvbnMgPSA8VCA9IHVua25vd24+KCkgPT4gR2VuZXJpY09iamVjdDxUPjtcblxudHlwZSBUZW1wbGF0ZUhhbmRsZXIgPSAoXG4gIHBhcmFtczogVGVtcGxhdGVQYXJhbXMsXG4gIGluamVjdGlvbnM6IFRlbXBsYXRlSW5qZWN0aW9ucyxcbikgPT4gdm9pZDtcblxudHlwZSBBY3Rpb25zID0gR2VuZXJpY09iamVjdDtcblxudHlwZSBBY3Rpb25QYXJhbXMgPSB7XG4gIHByb3BzOiBTdGF0ZTtcbiAgc3RhdGU6IFN0YXRlTWFuYWdlcjtcbn07XG50eXBlIEFjdGlvbkhhbmRsZXJGYWN0b3J5ID0gKHBhcmFtczogQWN0aW9uUGFyYW1zKSA9PiBHZW5lcmljT2JqZWN0O1xuXG50eXBlIEF0dHJpYnV0ZSA9IG9iamVjdCAmIHtcbiAgW2tleTogc3ltYm9sIHwgc3RyaW5nXTogdW5rbm93bjtcbn07XG5cbmNvbnN0IF9hdHRyaWJ1dGVzID0ge307XG5cbmNvbnN0IF9jcmVhdGVUYWdCeUZhY3RvcnlOYW1lID0gKGZhY3Rvcnk6IEZhY3RvcnkpID0+IHtcbiAgcmV0dXJuIGZhY3RvcnkubmFtZVxuICAgIC5zcGxpdCgvKD89W0EtWl0pLylcbiAgICAuam9pbihcIi1cIilcbiAgICAudG9Mb3dlckNhc2UoKTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VTdGF0ZSA9IChzdGF0ZTogU3RhdGVNYW5hZ2VyKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHt9O1xuICBjb25zdCB1c2VTdGF0ZSA9IDxUPihpbml0aWFsU3RhdGU6IFN0YXRlPFQ+KTogU3RhdGVNYW5hZ2VyID0+IHtcbiAgICBjb25zdCBsYXRlc3RTdGF0ZSA9IHN0YXRlLmdldCgpIGFzIFN0YXRlPFQ+O1xuICAgIHN0YXRlLnNldCh7IC4uLmluaXRpYWxTdGF0ZSwgLi4ubGF0ZXN0U3RhdGUgfSk7XG5cbiAgICBPYmplY3QuYXNzaWduKGN1cnJlbnRTdGF0ZSwgc3RhdGUuZ2V0KCkpO1xuICAgIHJldHVybiB7IGdldDogc3RhdGUuZ2V0LCBzZXQ6IHN0YXRlLnNldCwgd2F0Y2g6IHN0YXRlLndhdGNoIH07XG4gIH07XG4gIHJldHVybiB7IGN1cnJlbnRTdGF0ZSwgdXNlU3RhdGUgfTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VTdHlsZSA9ICh7IHByb3BzLCBzdGF0ZSwgY3NzIH06IFN0eWxlUGFyYW1zKSA9PiB7XG4gIGNvbnN0IHN0eWxlc2hlZXQgPSB7fTtcbiAgY29uc3QgdXNlU3R5bGUgPSAoY3NzSGFuZGxlckZhY3Rvcnk6IFN0eWxlSGFuZGxlckZhY3RvcnkpID0+IHtcbiAgICBjb25zdCBoYW5kbGVycyA9IGNzc0hhbmRsZXJGYWN0b3J5KCk7XG4gICAgY29uc3Qgc3R5bGVzOiBTdHlsZXMgPSB7fTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGhhbmRsZXJzKSB7XG4gICAgICBjb25zdCBoYW5kbGVyID0gaGFuZGxlcnNba2V5XSBhcyBTdHlsZUhhbmRsZXI7XG4gICAgICBjb25zdCBzdHlsZSA9IGhhbmRsZXIoeyBwcm9wcywgc3RhdGUsIGNzcyB9KTtcbiAgICAgIHN0eWxlc1trZXldID0gc3R5bGU7XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihzdHlsZXNoZWV0LCBzdHlsZXMpO1xuICAgIHJldHVybiBzdHlsZXM7XG4gIH07XG5cbiAgcmV0dXJuIHsgc3R5bGVzOiBzdHlsZXNoZWV0LCB1c2VTdHlsZSB9O1xufTtcblxuY29uc3QgX2NyZWF0ZVVzZVRlbXBsYXRlID0gKHBhcmFtczogVGVtcGxhdGVQYXJhbXMpID0+IHtcbiAgY29uc3QgdXNlVGVtcGxhdGUgPSAoXG4gICAgdGVtcGxhdGVIYW5kbGVyOiBUZW1wbGF0ZUhhbmRsZXIsXG4gICAgdGVtcGxhdGVJbmplY3Rpb25zOiBUZW1wbGF0ZUluamVjdGlvbnMsXG4gICkgPT4ge1xuICAgIHJldHVybiB0ZW1wbGF0ZUhhbmRsZXIocGFyYW1zLCB0ZW1wbGF0ZUluamVjdGlvbnMpO1xuICB9O1xuXG4gIHJldHVybiB1c2VUZW1wbGF0ZTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VBY3Rpb24gPSAoeyBwcm9wcywgc3RhdGUgfTogQWN0aW9uUGFyYW1zKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnM6IEdlbmVyaWNPYmplY3QgPSB7fTtcblxuICBjb25zdCB1c2VBY3Rpb24gPSAoYWN0aW9uSGFuZGxlckZhY3Rvcnk6IEFjdGlvbkhhbmRsZXJGYWN0b3J5KSA9PiB7XG4gICAgY29uc3QgaGFuZGxlckFjdGlvbnMgPSBhY3Rpb25IYW5kbGVyRmFjdG9yeSh7IHByb3BzLCBzdGF0ZSB9KTtcbiAgICBPYmplY3QuYXNzaWduKGFjdGlvbnMsIGhhbmRsZXJBY3Rpb25zKTtcbiAgfTtcblxuICByZXR1cm4geyBhY3Rpb25zLCB1c2VBY3Rpb24gfTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZSA9IChcbiAgdGVtcGxhdGU6IFRlbXBsYXRlU2NoZW1hLFxuICBwYXJlbnRFbGVtZW50OiBFbGVtZW50LFxuICBsYXRlc3RTdGF0ZTogU3RhdGUgPSB7fSxcbikgPT4ge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IGZhY3RvcnkgPSB0ZW1wbGF0ZS50eXBlIGFzIEZhY3Rvcnk7XG4gICAgY29uc3QgdGFnTmFtZSA9IF9jcmVhdGVUYWdCeUZhY3RvcnlOYW1lKGZhY3RvcnkpO1xuICAgIGNvbnN0IHNlbGVjdG9yID0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuXG4gICAgY29uc3QgcHJvcHMgPSB0ZW1wbGF0ZS5wcm9wcztcbiAgICBjb25zdCBsYXRlc3REZWVwU3RhdGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxhdGVzdFN0YXRlKSk7XG4gICAgY29uc3Qgc3RhdGVNYW5hZ2VyID0gY3JlYXRlU3RhdGUobGF0ZXN0RGVlcFN0YXRlKTtcbiAgICBjb25zdCB7IGN1cnJlbnRTdGF0ZTogc3RhdGUsIHVzZVN0YXRlIH0gPSBfY3JlYXRlVXNlU3RhdGUoc3RhdGVNYW5hZ2VyKTtcbiAgICBjb25zdCBzdHlsZWQgPSBjc3Moc2VsZWN0b3IsICh7IGhhc2hJZCB9KSA9PiB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoaGFzaElkKTtcbiAgICAgIE9iamVjdC5hc3NpZ24oX2F0dHJpYnV0ZXMsIHsgY2xhc3M6IGhhc2hJZCB9KTtcbiAgICB9KTtcbiAgICBjb25zdCB7IHN0eWxlcywgdXNlU3R5bGUgfSA9IF9jcmVhdGVVc2VTdHlsZSh7IHByb3BzLCBzdGF0ZSwgY3NzOiBzdHlsZWQgfSk7XG4gICAgY29uc3QgeyBhY3Rpb25zLCB1c2VBY3Rpb24gfSA9IF9jcmVhdGVVc2VBY3Rpb24oe1xuICAgICAgcHJvcHMsXG4gICAgICBzdGF0ZTogc3RhdGVNYW5hZ2VyLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdXNlVGVtcGxhdGUgPSBfY3JlYXRlVXNlVGVtcGxhdGUoe1xuICAgICAgcHJvcHMsXG4gICAgICBzdGF0ZSxcbiAgICAgIGh0bWwsXG4gICAgICBqc3gsXG4gICAgICB0c3gsXG4gICAgICBzdHlsZXMsXG4gICAgICBhY3Rpb25zLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBmYWN0b3J5KHtcbiAgICAgIHByb3BzLFxuICAgICAgdXNlU3RhdGUsXG4gICAgICB1c2VTdHlsZSxcbiAgICAgIHVzZVRlbXBsYXRlLFxuICAgICAgdXNlQWN0aW9uLFxuICAgIH0pIGFzIFRlbXBsYXRlU2NoZW1hW107XG5cbiAgICBjb25zdCBvbGRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSBhcyBFbGVtZW50O1xuICAgIHNldEVsZW1lbnRBdHRyaWJ1dGVzKGVsZW1lbnQsIF9hdHRyaWJ1dGVzKTtcblxuICAgIG9sZEVsZW1lbnRcbiAgICAgID8gb2xkRWxlbWVudC5yZXBsYWNlV2l0aChlbGVtZW50KVxuICAgICAgOiBwYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcblxuICAgIHJlbmRlckNoaWxkcmVuKGNoaWxkcmVuLCBlbGVtZW50LCBzdGF0ZSk7XG5cbiAgICBzdGF0ZU1hbmFnZXIud2F0Y2goKHBheWxvYWQpID0+IHtcbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIHJlbmRlcih0ZW1wbGF0ZSwgcGFyZW50RWxlbWVudCwgcGF5bG9hZCk7XG4gICAgfSk7XG4gIH07XG59O1xuIiwgImltcG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3RlbXBsYXRlXCI7XG5pbXBvcnQgeyBzZXRFbGVtZW50QXR0cmlidXRlcyB9IGZyb20gXCIuL3NldEVsZW1lbnRBdHRyaWJ1dGVzXCI7XG5pbXBvcnQgeyByZW5kZXJDaGlsZHJlbiB9IGZyb20gXCIuL3JlbmRlckNoaWxkcmVuXCI7XG5cbmNvbnN0IF9leHRyYWN0SGFzaElkID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICBjb25zdCByZWdleCA9IC8oXy4qKSsvZ2k7XG4gIGlmICghdGV4dCkgcmV0dXJuIHRleHQ7XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UocmVnZXgsIFwiXCIpO1xufTtcbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtZW50QnlUYWdOYW1lID1cbiAgKHRlbXBsYXRlOiBUZW1wbGF0ZVNjaGVtYSwgcGFyZW50RWxlbWVudDogRWxlbWVudCwgc3RhdGU6IFN0YXRlID0ge30pID0+XG4gICAgKCkgPT4ge1xuICAgICAgY29uc3QgdGFnTmFtZSA9IHRlbXBsYXRlLnR5cGUgYXMgc3RyaW5nO1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSB0YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnRDbGFzcyA9IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgYXMgc3RyaW5nO1xuICAgICAgY29uc3QgaGFzaElkID0gX2V4dHJhY3RIYXNoSWQocGFyZW50RWxlbWVudENsYXNzKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRlbXBsYXRlPy5wcm9wcz8uY2xhc3MgYXMgc3RyaW5nO1xuICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoIWNsYXNzTmFtZS5pbmNsdWRlcyhoYXNoSWQpKSB7XG4gICAgICAgICAgY29uc3QgbmV3Q2xhc3NOYW1lID0gYCR7aGFzaElkfV8ke2NsYXNzTmFtZX1gO1xuICAgICAgICAgIHNldEVsZW1lbnRBdHRyaWJ1dGVzKGVsZW1lbnQsIHsgY2xhc3M6IG5ld0NsYXNzTmFtZSB9KTtcbiAgICAgICAgICBwYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcbiAgICAgICAgICByZW5kZXJDaGlsZHJlbih0ZW1wbGF0ZS5jaGlsZHJlbiwgZWxlbWVudCwgc3RhdGUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCwgdGVtcGxhdGUucHJvcHMpO1xuICAgICAgcGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgZWxlbWVudCk7XG4gICAgICByZW5kZXJDaGlsZHJlbih0ZW1wbGF0ZS5jaGlsZHJlbiwgZWxlbWVudCwgc3RhdGUpO1xuICAgIH07XG4iLCAiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIkAvcmVuZGVyXCI7XG5pbXBvcnQgdHlwZSB7IFRlbXBsYXRlU2NoZW1hLCBUYWdnZWRUZW1wbGF0ZSB9IGZyb20gXCJAL3R5cGVzXCI7XG5pbXBvcnQgdHlwZSB7IFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcblxuZXhwb3J0IGNvbnN0IHJlbmRlclRlbXBsYXRlRGF0YSA9XG4gICh0ZW1wbGF0ZURhdGE6IFRhZ2dlZFRlbXBsYXRlLCBlbGVtZW50OiBFbGVtZW50LCBzdGF0ZTogU3RhdGUgPSB7fSkgPT5cbiAgICAoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHRlbXBsYXRlRGF0YSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCB0ZW1wbGF0ZURhdGEpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRlbXBsYXRlRGF0YSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICBjb25zdCBkYXRhID0gTnVtYmVyKHRlbXBsYXRlRGF0YSk7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZGF0YS50b1N0cmluZygpO1xuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfTtcbiIsICJpbXBvcnQgdHlwZSB7IFRhZ2dlZFRlbXBsYXRlLCBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3RlbXBsYXRlXCI7XG5pbXBvcnQge1xuICByZW5kZXJUZW1wbGF0ZUFycmF5LFxuICByZW5kZXJUZW1wbGF0ZU9iamVjdCxcbiAgcmVuZGVyVGVtcGxhdGVEYXRhLFxufSBmcm9tIFwiQC9hY3Rpb25zXCI7XG5pbXBvcnQgeyBpc0FycmF5LCBpc09iamVjdCwgaXNUZW1wbGF0ZURhdGEgfSBmcm9tIFwiQC92YWxpZGF0b3JzXCI7XG5cbnR5cGUgQ29udGV4dEVsZW1lbnQgPSBFbGVtZW50O1xuaW1wb3J0IHsgY3JlYXRlQ2hhaW4gfSBmcm9tIFwiQC9mYWN0b3JpZXNcIjtcbmltcG9ydCB7IGNyZWF0ZVN0YXRlLCB0eXBlIFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcblxuLy9jb25zdCBnbG9iYWxTdGF0ZSA9IGNyZWF0ZVN0YXRlKHt9KTtcblxuZXhwb3J0IGNvbnN0IHJlbmRlciA9IChcbiAgdGVtcGxhdGU6IFRhZ2dlZFRlbXBsYXRlLFxuICBjb250ZXh0OiBDb250ZXh0RWxlbWVudCA9IGRvY3VtZW50LmJvZHksXG4gIHN0YXRlOiBTdGF0ZSA9IHt9LFxuKTogQ29udGV4dEVsZW1lbnQgPT4ge1xuICBjb25zdCBjaGFpbiA9IGNyZWF0ZUNoYWluKCk7XG4gIGNvbnN0IGNvbXBvbmVudEVsZW1lbnQgPSBjb250ZXh0IHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuXG4gIGNoYWluLmFkZCh7XG4gICAgdmFsaWRhdG9yOiBpc0FycmF5KHRlbXBsYXRlKSxcbiAgICBhY3Rpb246IHJlbmRlclRlbXBsYXRlQXJyYXkoXG4gICAgICB0ZW1wbGF0ZSBhcyBUZW1wbGF0ZVNjaGVtYVtdLFxuICAgICAgY29tcG9uZW50RWxlbWVudCxcbiAgICAgIHN0YXRlLFxuICAgICksXG4gIH0pO1xuXG4gIGNoYWluLmFkZCh7XG4gICAgdmFsaWRhdG9yOiBpc09iamVjdCh0ZW1wbGF0ZSksXG4gICAgYWN0aW9uOiByZW5kZXJUZW1wbGF0ZU9iamVjdChcbiAgICAgIHRlbXBsYXRlIGFzIFRlbXBsYXRlU2NoZW1hLFxuICAgICAgY29tcG9uZW50RWxlbWVudCxcbiAgICAgIHN0YXRlLFxuICAgICksXG4gIH0pO1xuXG4gIGNoYWluLmFkZCh7XG4gICAgdmFsaWRhdG9yOiBpc1RlbXBsYXRlRGF0YSh0ZW1wbGF0ZSksXG4gICAgYWN0aW9uOiByZW5kZXJUZW1wbGF0ZURhdGEodGVtcGxhdGUsIGNvbXBvbmVudEVsZW1lbnQsIHN0YXRlKSxcbiAgfSk7XG5cbiAgY2hhaW4uZXhlY3V0ZSgpO1xuICByZXR1cm4gY29tcG9uZW50RWxlbWVudDtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBSb3V0ZXIsIEV4ZWN1dGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuLy9pbXBvcnQgeyBldmVudERyaXZlIH0gZnJvbSBcIi4uL3JlbmRlclwiO1xuXG5leHBvcnQgY29uc3Qgcm91dGVyOiBSb3V0ZXIgPSAoeyByb3V0ZXMsIGNvbnRleHQgfSkgPT4ge1xuICBjb25zdCBfcm91dGVzID0gcm91dGVzO1xuICBsZXQgX3JvdXRlckVsZW1lbnQhOiBIVE1MRWxlbWVudDtcblxuICBjb25zdCBleGVjdXRlOiBFeGVjdXRlID0gKHZhbGlkYXRvciwgY2FsbGJhY2ssIGVycm9yKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRvcigpKSByZXR1cm4gY2FsbGJhY2soeyBpc1ZhbGlkOiB2YWxpZGF0b3IoKSB9KTtcblxuICAgIGlmIChlcnJvcikge1xuICAgICAgY29uc3QgZXJybyA9IG5ldyBFcnJvcihlcnJvcigpLm1lc3NhZ2UpO1xuICAgICAgZXJyby5uYW1lID0gZXJyb3IoKS5uYW1lO1xuICAgICAgdGhyb3cgZXJybztcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2xlYW51cFN0eWxlcyA9IGFzeW5jIChzZWxlY3Rvcjogc3RyaW5nKSA9PiB7XG4gICAgaWYgKCFzZWxlY3RvcikgcmV0dXJuO1xuXG4gICAgY29uc3Qgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFtkYXRhLWNvbXBvbmVudD0ke3NlbGVjdG9yfV1gLFxuICAgICk7XG4gICAgaWYgKHN0eWxlRWxlbWVudCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjbGVhbnVwRE9NID0gYXN5bmMgKCkgPT4ge1xuICAgIF9yb3V0ZXJFbGVtZW50LnJlcGxhY2VDaGlsZHJlbigpO1xuICB9O1xuXG4gIGNvbnN0IGdldENoaWxkU2VsZWN0b3IgPSAoKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBjaGlsZCA9IF9yb3V0ZXJFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIGNvbnN0IHNlbGVjdG9yID0gY2hpbGQgPyBPYmplY3QudmFsdWVzKGNoaWxkLmNsYXNzTGlzdCkuc2hpZnQoKSA6IFwiXCI7XG4gICAgcmV0dXJuIHNlbGVjdG9yIGFzIHN0cmluZztcbiAgfTtcblxuICBjb25zdCBjbGVhbnVwQ3VycmVudFJvdXRlID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzZWxlY3RvciA9IGdldENoaWxkU2VsZWN0b3IoKTtcbiAgICAgIGF3YWl0IGNsZWFudXBTdHlsZXMoc2VsZWN0b3IpO1xuICAgICAgYXdhaXQgY2xlYW51cERPTSgpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBfYmluZExpc3RlbmVycyA9ICgpID0+IHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgY2xlYW51cEN1cnJlbnRSb3V0ZSgpO1xuICAgICAgICBhd2FpdCBfbW91bnRSb3V0ZUJ5SGFzaChudWxsKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkdXJpbmcgcm91dGUgY2hhbmdlOlwiLCBlcnJvcik7XG4gICAgICAgIC8vIEFxdWkgdm9jXHUwMEVBIHBvZGUgYWRpY2lvbmFyIGxcdTAwRjNnaWNhIGRlIGZhbGxiYWNrIG91IHJlY3VwZXJhXHUwMEU3XHUwMEUzbyBkZSBlcnJvXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgX3NldFJvdXRlckVsZW1lbnQgPSAoKSA9PiB7XG4gICAgY29uc3Qgcm91dGVyRWxlbWVudCA9IGNvbnRleHQ/LnF1ZXJ5U2VsZWN0b3IoXCJyb3V0ZXItdmlld1wiKTtcblxuICAgIGV4ZWN1dGUoXG4gICAgICAoKSA9PiAhIXJvdXRlckVsZW1lbnQsXG4gICAgICAoKSA9PiB7XG4gICAgICAgIF9yb3V0ZXJFbGVtZW50ID0gcm91dGVyRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgcmV0dXJuIF9yb3V0ZXJFbGVtZW50O1xuICAgICAgfSxcbiAgICAgICgpID0+ICh7XG4gICAgICAgIG5hbWU6IFwiUm91dGVyIEVycm9yXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiUm91dGVyIGVsZW1lbnQgKHJvdXRlci12aWV3KSBpcyBub3QgZGVmaW5lZCBhbmQgbXVzdCBiZS5cIixcbiAgICAgIH0pLFxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgX2xvYWRNYWluUm91dGUgPSAoKSA9PiB7XG4gICAgY29uc3QgbWFpblJvdXRlID0gX2dldE1haW5Sb3V0ZSgpO1xuICAgIGV4ZWN1dGUoXG4gICAgICAoKSA9PiAhIW1haW5Sb3V0ZT8uc3RhcnQsXG4gICAgICAoKSA9PiBtYWluUm91dGU/LnN0YXJ0ICYmIG5hdmlnYXRlKG1haW5Sb3V0ZS5zdGFydCksXG4gICAgICAoKSA9PiAoe1xuICAgICAgICBuYW1lOiBcIlJvdXRlciBFcnJvclwiLFxuICAgICAgICBtZXNzYWdlOiBcIlN0YXJ0IHJvdXRlciBpcyBub3QgZGVmaW5lZCBhbmQgbXVzdCBiZS5cIixcbiAgICAgIH0pLFxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgX2dldE1haW5Sb3V0ZSA9ICgpID0+IF9yb3V0ZXMuZmluZCgocm91dGUpID0+ICEhcm91dGU/LnN0YXJ0KTtcblxuICBjb25zdCBfZ2V0Um91dGVCeUhhc2ggPSAoaGFzaDogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIF9yb3V0ZXMuZmluZCgocm91dGUpID0+IHJvdXRlLnJlZ2V4LnRlc3QoaGFzaCkpO1xuICB9O1xuXG4gIGNvbnN0IF9nZXRSb3V0ZURlZmF1bHQgPSAoKSA9PiBfcm91dGVzLmZpbmQoKHJvdXRlKSA9PiByb3V0ZT8uZGVmYXVsdCk7XG5cbiAgY29uc3QgX21vdW50Um91dGVCeUhhc2ggPSBhc3luYyAoaGFzaDogc3RyaW5nIHwgbnVsbCkgPT4ge1xuICAgIGNvbnN0IGhhc2hWYWx1ZSA9IGhhc2ggfHwgd2luZG93LmxvY2F0aW9uLmhhc2ggfHwgXCJcIjtcbiAgICBjb25zdCByb3V0ZSA9IF9nZXRSb3V0ZUJ5SGFzaChoYXNoVmFsdWUpIHx8IF9nZXRSb3V0ZURlZmF1bHQoKTtcbiAgICBfcm91dGVyRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHJvdXRlPy5tb3VudCh7IGNvbnRleHQ6IF9yb3V0ZXJFbGVtZW50IH0pO1xuICB9O1xuXG4gIGNvbnN0IF9nZXRIYXNoID0gKCkgPT4gd2luZG93LmxvY2F0aW9uLmhhc2ggfHwgbnVsbDtcblxuICBjb25zdCBfaGFzQWN0aXZlUm91dGUgPSAoKSA9PiAhIV9nZXRIYXNoKCk7XG5cbiAgY29uc3QgbmF2aWdhdGUgPSAocGF0aDogc3RyaW5nKSA9PiB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBwYXRoO1xuICB9O1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgX2JpbmRMaXN0ZW5lcnMoKTtcbiAgICBfc2V0Um91dGVyRWxlbWVudCgpO1xuICAgIF9oYXNBY3RpdmVSb3V0ZSgpID8gX21vdW50Um91dGVCeUhhc2goX2dldEhhc2goKSkgOiBfbG9hZE1haW5Sb3V0ZSgpO1xuICB9O1xuXG4gIHJldHVybiB7IGluaXQsIG5hdmlnYXRlIH07XG59O1xuIiwgImltcG9ydCB7IFRpbWVyQXBwIH0gZnJvbSBcIkAvdWkvZWxlbWVudHNcIjtcbmltcG9ydCB7IHRzeCB9IGZyb20gXCJpYXJlc1wiO1xuaW1wb3J0IHR5cGUge1xuICBHZW5lcmljT2JqZWN0LFxuICBTdGF0ZSxcbiAgU3RhdGVNYW5hZ2VyLFxuICBUYWdnZWRTdHlsZSxcbiAgVGFnZ2VkVGVtcGxhdGUsXG59IGZyb20gXCJpYXJlc1wiO1xuXG50eXBlIFN0eWxlcyA9IHsgSG9tZUFwcDogc3RyaW5nIH07XG50eXBlIFN0eWxlUGFyYW1zID0geyBjc3M6IFRhZ2dlZFN0eWxlIH07XG5cbnR5cGUgU3R5bGVIYW5kbGVyID0gKCkgPT4gR2VuZXJpY09iamVjdDtcblxudHlwZSBUZW1wbGF0ZUhhbmRsZXJQYXJhbXMgPSB7XG4gIHN0YXRlOiBNb2RlbDtcbn07XG5cbnR5cGUgVGVtcGxhdGVIYW5kbGVyID0gKHBhcmFtczogVGVtcGxhdGVIYW5kbGVyUGFyYW1zKSA9PiBUYWdnZWRUZW1wbGF0ZTtcblxudHlwZSBNb2RlbCA9IHtcbiAgdGl0bGU6IHN0cmluZztcbn07XG5cbnR5cGUgVXNlU3R5bGUgPSAoc3R5bGVIYW5kbGVyOiBTdHlsZUhhbmRsZXIpID0+IFN0eWxlcztcbnR5cGUgVXNlVGVtcGxhdGUgPSAodGVtcGxhdGVIYW5kbGVyOiBUZW1wbGF0ZUhhbmRsZXIpID0+IFRhZ2dlZFRlbXBsYXRlO1xudHlwZSBVc2VTdGF0ZSA9IDxUID0gTW9kZWw+KGluaXRpYWxTdGF0ZTogVCkgPT4gU3RhdGVNYW5hZ2VyPFQ+O1xuXG50eXBlIFBhcmFtcyA9IHtcbiAgdXNlU3RhdGU6IFVzZVN0YXRlO1xuICB1c2VTdHlsZTogVXNlU3R5bGU7XG4gIHVzZVRlbXBsYXRlOiBVc2VUZW1wbGF0ZTtcbn07XG5cbmNvbnN0IHRlbXBsYXRlID0gKHsgc3RhdGUgfTogVGVtcGxhdGVIYW5kbGVyUGFyYW1zKSA9PlxuICB0c3hgXG4gIDxkaXYgY2xhc3M9XCJ3cmFwXCI+XG4gICAgPGgxIGNsYXNzPVwidGl0bGVcIj4ke3N0YXRlLnRpdGxlfTwvaDE+XG4gICAgPHNwYW4+QSBzaW1wbGUgPGI+SUFSRVM8L2I+IHBhZ2UgdGVtcGxhdGUgYXBwLjwvc3Bhbj5cbiAgICA8JHtUaW1lckFwcH0gLz5cbiAgPC9kaXY+XG5gIGFzIFRhZ2dlZFRlbXBsYXRlO1xuXG5leHBvcnQgY29uc3QgSG9tZUFwcCA9ICh7IHVzZVN0eWxlLCB1c2VUZW1wbGF0ZSwgdXNlU3RhdGUgfTogUGFyYW1zKSA9PiB7XG4gIHVzZVN0YXRlKHsgdGl0bGU6IFwiVGl0dWxvIGluY2lhbCBkYSBob21lXCIgfSk7XG4gIHVzZVN0eWxlKGNyZWF0ZVN0eWxlcyk7XG4gIHJldHVybiB1c2VUZW1wbGF0ZSh0ZW1wbGF0ZSk7XG59O1xuXG5jb25zdCBjcmVhdGVTdHlsZXMgPSAoKSA9PiAoe1xuICBIb21lQXBwOiAoeyBjc3MgfTogU3R5bGVQYXJhbXMpID0+IGNzc2BcbiAgICBkaXNwbGF5OmZsZXg7XG4gICAgd2lkdGg6MTAwJTtcbiAgICBwYWRkaW5nOjFlbTtcblxuICAud3JhcCxcbiAgLndyYXAgaDEsXG4gIC53cmFwIHNwYW4ge1xuICAgIGRpc3BsYXk6ZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcbiAgICB3aWR0aDoxMDAlO1xuICB9XG5cbiAgLndyYXAgPiBoMSB7XG4gICAgICBmb250LXNpemU6IDJlbTtcbiAgICAgIG1hcmdpbi1ib3R0b206MWVtO1xuICB9XG5cbiAgLndyYXAgPiBzcGFuIHtcbiAgICBtYXJnaW4tYm90dG9tOiAyZW07XG4gIH1cblxuICAud3JhcCBiIHtwYWRkaW5nOjAgNnB4O31cblxuICAud3JhcCB7XG4gICAgZmxleC13cmFwOndyYXA7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblxuICAgIHBhZGRpbmc6MWVtO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcbiAgICBib3JkZXItcmFkaXVzOjhweDtcblxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgtNDVkZWcsICNlZTc3NTIsICNlNzNjN2UsICMyM2E2ZDUsICMyM2Q1YWIpO1xuICAgIGJhY2tncm91bmQtc2l6ZTogNDAwJSA0MDAlO1xuICAgIGFuaW1hdGlvbjogd2F2ZSAxNXMgZWFzZSBpbmZpbml0ZTsgICAgIFxuICB9XG5cbiAgQGtleWZyYW1lcyB3YXZlIHtcbiAgICAwJSB7XG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAlIDUwJTtcbiAgICB9XG4gICAgNTAlIHtcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMTAwJSA1MCU7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwJSA1MCU7XG4gICAgfVxuICB9XG5cbiAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDoyNTYwcHgpe1xuICAgIC53cmFwIHtcbiAgICAgIHBhZGRpbmc6MTVweDtcbiAg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RSxRQUFRLHdCQUF1QixFQUFFLE1BQUksRUFBRSxLQUFLLEdBQUVBLElBQUUsQ0FBQyxJQUFFLE1BQUlFLE9BQUlGLE1BQUcsTUFBSSxFQUFFLEtBQUssR0FBRUEsSUFBRSxDQUFDLEdBQUVFLEtBQUUsS0FBRyxNQUFJQSxNQUFHLFVBQVEsS0FBR0YsS0FBRSxFQUFFLEtBQUssR0FBRUEsSUFBRSxDQUFDLElBQUUsTUFBSUUsTUFBRyxLQUFHLENBQUNGLEtBQUUsRUFBRSxLQUFLLEdBQUUsR0FBRSxNQUFHLENBQUMsSUFBRUUsTUFBRyxPQUFLLEtBQUcsQ0FBQ0YsTUFBRyxNQUFJRSxRQUFLLEVBQUUsS0FBS0EsSUFBRSxHQUFFLEdBQUVELEVBQUMsR0FBRUMsS0FBRSxJQUFHRixPQUFJLEVBQUUsS0FBS0UsSUFBRUYsSUFBRSxHQUFFQyxFQUFDLEdBQUVDLEtBQUUsS0FBSSxJQUFFO0lBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRUYsR0FBRSxRQUFPLEtBQUk7QUFBQyxZQUFJLE1BQUlFLE1BQUcsRUFBRSxHQUFFLEVBQUUsQ0FBQztBQUFHLGVBQVEsSUFBRSxHQUFFLElBQUVGLEdBQUUsQ0FBQyxFQUFFLFFBQU8sSUFBSUQsTUFBRUMsR0FBRSxDQUFDLEVBQUUsQ0FBQyxHQUFFLE1BQUlFLEtBQUUsUUFBTUgsTUFBRyxFQUFFLEdBQUUsSUFBRSxDQUFDLENBQUMsR0FBRUcsS0FBRSxLQUFHLEtBQUdILEtBQUUsTUFBSUcsS0FBRSxTQUFPLEtBQUcsUUFBTUgsTUFBR0csS0FBRSxHQUFFLElBQUUsTUFBSSxJQUFFSCxLQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUVBLE9BQUksSUFBRSxJQUFFLEtBQUcsS0FBR0EsS0FBRSxRQUFNQSxNQUFHLFFBQU1BLEtBQUUsSUFBRUEsS0FBRSxRQUFNQSxNQUFHLEVBQUUsR0FBRUcsS0FBRSxLQUFHQSxPQUFJLFFBQU1ILE1BQUdHLEtBQUUsR0FBRUQsS0FBRSxHQUFFLElBQUUsTUFBSSxRQUFNRixPQUFJRyxLQUFFLEtBQUcsUUFBTUYsR0FBRSxDQUFDLEVBQUUsSUFB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Q0FBQyxTQUFpQjtBQUNqQyxXQUFPLFNBQVMsT0FBTztFQUN6QixHQUZpQixVQUFBO0FBSWpCLFFBQU0sT0FBTyxnQkFBQUEsUUFBQSxNQUFNO0FBQ2pCLG1CQUFlO0FBQ2Ysc0JBQWtCO0FBQ2xCLG9CQUFnQixJQUFJLGtCQUFrQixTQUFTLENBQUMsSUFBSSxlQUFlO0VBQ3JFLEdBSmEsTUFBQTtBQU1iLFNBQU8sRUFBRSxNQUFNLFNBQVM7QUFDMUIsR0FwSDhCLFFBQUE7OztBQ2dDOUIsSUFBTVksWUFBVyx3QkFBQyxFQUFFLE1BQU0sTUFDeEI7QUFBQTtBQUFBLHdCQUVzQixNQUFNLEtBQUs7QUFBQTtBQUFBLE9BRTVCLFFBQVE7QUFBQTtBQUFBLEdBTEU7QUFTVixJQUFNLFVBQVUsd0JBQUMsRUFBRSxVQUFVLGFBQWEsU0FBUyxNQUFjO0FBQ3RFLFdBQVMsRUFBRSxPQUFPLHdCQUF3QixDQUFDO0FBQzNDLFdBQVNDLGFBQVk7QUFDckIsU0FBTyxZQUFZRCxTQUFRO0FBQzdCLEdBSnVCO0FBTXZCLElBQU1DLGdCQUFlLDhCQUFPO0FBQUEsRUFDMUIsU0FBUyx3QkFBQyxFQUFFLEtBQUFDLEtBQUksTUFBbUJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBMUI7QUF3RFgsSUF6RHFCOyIsCiAgIm5hbWVzIjogWyJodG1sIiwgImNzcyIsICJfX25hbWUiLCAidGVtcGxhdGUiLCAidCIsICJuIiwgInMiLCAiciIsICJnbG9iYWxSdWxlcyIsICJyZXN1bHQiLCAic2VsZWN0b3IiLCAic2NvcGVkU3R5bGUiLCAic3R5bGVFbGVtZW50IiwgImNzcyIsICJ0ZW1wbGF0ZSIsICJjcmVhdGVTdHlsZXMiLCAiY3NzIl0KfQo=
