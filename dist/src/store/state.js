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
  const actions = {};
  const useAction = /* @__PURE__ */ __name2((actionHandlerFactory) => {
    const handlerActions = actionHandlerFactory({ props, state: state2 });
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
    const { currentState: state2, useState } = _createUseState(stateManager);
    const styled = css(selector, ({ hashId }) => {
      element.classList.add(hashId);
      Object.assign(_attributes, { class: hashId });
    });
    const { styles, useStyle } = _createUseStyle({ props, state: state2, css: styled });
    const { actions, useAction } = _createUseAction({
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
    renderChildren(children, element, state2);
    stateManager.watch((payload) => {
      element.innerHTML = "";
      render(template, parentElement, payload);
    });
  };
}, "createElementByFactoryName");
var _extractHashId = /* @__PURE__ */ __name2((text) => {
  const regex = /(_.*)+/gi;
  if (!text) return text;
  return text.replace(regex, "");
}, "_extractHashId");
var createElementByTagName = /* @__PURE__ */ __name2((template, parentElement, state2 = {}) => () => {
  const tagName = template.type;
  const selector = tagName.toLowerCase();
  const element = document.createElement(tagName);
  const parentElementClass = parentElement.getAttribute("class");
  const hashId = _extractHashId(parentElementClass);
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
export {
  state
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vaWFyZXMvc3JjL0NyZWF0ZUFwcC9DcmVhdGVBcHAudHMiLCAiLi4vLi4vLi4vLi4vaWFyZXMvc3JjL3N0YXRlL2NyZWF0ZVN0YXRlLnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy9mYWN0b3JpZXMvY3JlYXRlQ2hhaW4vaW5kZXgudHMiLCAiLi4vLi4vLi4vLi4vaWFyZXMvc3JjL3V0aWxzL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy92YWxpZGF0b3JzL3RlbXBsYXRlL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlT2JqZWN0LnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlQXJyYXkudHMiLCAiLi4vLi4vLi4vLi4vaWFyZXMvc3JjL2FjdGlvbnMvdGVtcGxhdGUvcmVuZGVyQ2hpbGRyZW4udHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2h0bUAzLjEuMS9ub2RlX21vZHVsZXMvaHRtL2Rpc3QvaHRtLm1vZHVsZS5qcyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvdGVtcGxhdGUvaHRtbC50cyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvc3R5bGUvY3JlYXRlSGFzaC50cyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvc3R5bGUvY3JlYXRlU3R5bGVFbGVtZW50LnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy9zdHlsZS9jc3NQYXJzZXIudHMiLCAiLi4vLi4vLi4vLi4vaWFyZXMvc3JjL3N0eWxlL2Nzcy50cyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9zZXRFbGVtZW50QXR0cmlidXRlcy50cyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9jcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZS50cyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9jcmVhdGVFbGVtZW50QnlUYWdOYW1lLnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlRGF0YS50cyIsICIuLi8uLi8uLi8uLi9pYXJlcy9zcmMvcmVuZGVyL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uL2lhcmVzL3NyYy9yb3V0ZXIvcm91dGVyLnRzIiwgIi4uLy4uLy4uL3NyYy9mcm9udGVuZC9zdG9yZS9zdGF0ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHR5cGUge1xuICBBcHBsaWNhdGlvbixcbiAgQ29udGV4dEVsZW1lbnQsXG4gIENvbnRleHRIYW5kbGVyLFxuICBDYWxsYmFja0hhbmRsZXIsXG59IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBDcmVhdGVBcHAgPSAoKTogQXBwbGljYXRpb24gPT4ge1xuICBsZXQgX2VsZW1lbnQhOiBDb250ZXh0RWxlbWVudDtcblxuICBjb25zdCBzZXR1cCA9IChjYWxsYmFjazogQ29udGV4dEhhbmRsZXIpID0+IHtcbiAgICBfZWxlbWVudCA9IGNhbGxiYWNrKCk7XG4gICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gIH07XG5cbiAgY29uc3QgbW91bnQgPSAoY2FsbGJhY2s6IENhbGxiYWNrSGFuZGxlcikgPT4ge1xuICAgIHJldHVybiBjYWxsYmFjayhfZWxlbWVudCk7XG4gIH07XG5cbiAgY29uc3QgdW5tb3VudCA9IChjYWxsYmFjazogQ2FsbGJhY2tIYW5kbGVyKSA9PiB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKF9lbGVtZW50KTtcbiAgfTtcblxuICByZXR1cm4geyBzZXR1cCwgbW91bnQsIHVubW91bnQgfTtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBTdGF0ZVdhdGNoZXIsIFN0YXRlLCBTdGF0ZU1hbmFnZXIgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCBfY3JlYXRlVVVJRCA9ICgpOiBzdHJpbmcgPT4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIsIDExKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVN0YXRlID0gPFMgPSB1bmtub3duPihcbiAgaW5pdGlhbFN0YXRlOiBTdGF0ZTxTPixcbik6IFN0YXRlTWFuYWdlcjxTPiA9PiB7XG4gIGNvbnN0IF9zdGF0ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaW5pdGlhbFN0YXRlKSk7XG4gIGNvbnN0IF93YXRjaGVycyA9IG5ldyBTZXQ8U3RhdGVXYXRjaGVyPFM+PigpO1xuXG4gIGNvbnN0IF9ub3RpZnlIYW5kbGVycyA9IChwYXlsb2FkOiBTdGF0ZTxTPikgPT4ge1xuICAgIGZvciAoY29uc3Qgc3RhdGVXYXRjaGVyIG9mIF93YXRjaGVycykge1xuICAgICAgc3RhdGVXYXRjaGVyKHBheWxvYWQpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZXQgPSAocGF5bG9hZDogU3RhdGU8Uz4pID0+IHtcbiAgICBPYmplY3QuYXNzaWduKF9zdGF0ZSwgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwYXlsb2FkKSkpO1xuICAgIF9ub3RpZnlIYW5kbGVycyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KF9zdGF0ZSkpKTtcbiAgfTtcblxuICBjb25zdCBnZXQgPSAoKTogU3RhdGU8Uz4gPT4ge1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KF9zdGF0ZSkpO1xuICB9O1xuXG4gIGNvbnN0IHdhdGNoID0gKGNhbGxiYWNrOiBTdGF0ZVdhdGNoZXI8Uz4pID0+IHtcbiAgICBfd2F0Y2hlcnMuYWRkKGNhbGxiYWNrKTtcbiAgfTtcblxuICByZXR1cm4geyBzZXQsIGdldCwgd2F0Y2ggfTtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBDaGFpbkxpbmsgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2hhaW4gPSAoKSA9PiB7XG4gIGNvbnN0IF9jaGFpbiA9IG5ldyBTZXQ8Q2hhaW5MaW5rPHVua25vd24+PigpO1xuXG4gIGNvbnN0IGFkZCA9IDxUPihjaGFpbkxpbms6IENoYWluTGluazxUPikgPT4ge1xuICAgIF9jaGFpbi5hZGQoY2hhaW5MaW5rKTtcbiAgfTtcblxuICBjb25zdCBleGVjdXRlID0gKCkgPT4ge1xuICAgIGZvciAoY29uc3QgeyBhY3Rpb24sIHZhbGlkYXRvciB9IG9mIF9jaGFpbikge1xuICAgICAgaWYgKHZhbGlkYXRvcigpKSBhY3Rpb24oKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgYWRkLCBleGVjdXRlIH07XG59O1xuIiwgImV4cG9ydCBjb25zdCBlc2NhcGVUZW1wbGF0ZVN0cmluZyA9ICh0ZW1wbGF0ZVN0cmluZzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgaWYgKHR5cGVvZiB0ZW1wbGF0ZVN0cmluZyAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIHRlbXBsYXRlU3RyaW5nO1xuICByZXR1cm4gdGVtcGxhdGVTdHJpbmdcbiAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXG4gICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXG4gICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXG4gICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXG4gICAgLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKVxuICAgIC5yZXBsYWNlKC9cXC8vZywgXCImI3gyRjtcIik7XG59O1xuXG5leHBvcnQgY29uc3QgYmluZFN0eWxlU2NvcGUgPSAoc2NvcGVJZDogc3RyaW5nLCBzdHJpbmdzOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCByZWdleCA9IC8oXFwuKFxcdyspKFxcLSp8XFxfKik/KStcXHcrL2dpO1xuICByZXR1cm4gc3RyaW5ncy5yZXBsYWNlKHJlZ2V4LCAodmFsdWVzKSA9PiB7XG4gICAgcmV0dXJuIGAuJHtzY29wZUlkfS0ke3ZhbHVlcy5yZXBsYWNlKC9cXC4vLCBcIlwiKX1gO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVVVUlEID0gKCkgPT4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMiwgNik7XG5cbmV4cG9ydCBjb25zdCBIVE1MRXZlbnRzID0gW1xuICAvLyBFdmVudG9zIGRlIE1vdXNlXG4gIFwib25jbGlja1wiLFxuICBcIm9uZGJsY2xpY2tcIixcbiAgXCJvbm1vdXNlZG93blwiLFxuICBcIm9ubW91c2V1cFwiLFxuICBcIm9ubW91c2VvdmVyXCIsXG4gIFwib25tb3VzZW91dFwiLFxuICBcIm9ubW91c2Vtb3ZlXCIsXG4gIFwib25tb3VzZWVudGVyXCIsXG4gIFwib25tb3VzZWxlYXZlXCIsXG4gIFwib25jb250ZXh0bWVudVwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgVGVjbGFkb1xuICBcIm9ua2V5ZG93blwiLFxuICBcIm9ua2V5dXBcIixcbiAgXCJvbmtleXByZXNzXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBGb2NvXG4gIFwib25mb2N1c1wiLFxuICBcIm9uYmx1clwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgRm9ybXVsXHUwMEUxcmlvXG4gIFwib25zdWJtaXRcIixcbiAgXCJvbmNoYW5nZVwiLFxuICBcIm9uaW5wdXRcIixcbiAgXCJvbnJlc2V0XCIsXG4gIFwib25pbnZhbGlkXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBNXHUwMEVEZGlhXG4gIFwib25wbGF5XCIsXG4gIFwib25wYXVzZVwiLFxuICBcIm9uZW5kZWRcIixcbiAgXCJvbnZvbHVtZWNoYW5nZVwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgVG9xdWUgKFRvdWNoKSAtIHBhcmEgZGlzcG9zaXRpdm9zIG1cdTAwRjN2ZWlzXG4gIFwib250b3VjaHN0YXJ0XCIsXG4gIFwib250b3VjaG1vdmVcIixcbiAgXCJvbnRvdWNoZW5kXCIsXG4gIFwib250b3VjaGNhbmNlbFwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgQW5pbWFcdTAwRTdcdTAwRTNvIGUgVHJhbnNpXHUwMEU3XHUwMEUzb1xuICBcIm9uYW5pbWF0aW9uc3RhcnRcIixcbiAgXCJvbmFuaW1hdGlvbmVuZFwiLFxuICBcIm9uYW5pbWF0aW9uaXRlcmF0aW9uXCIsXG4gIFwib250cmFuc2l0aW9uZW5kXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBPdXRyb3MgSW50ZXJhdGl2b3NcbiAgXCJvbmxvYWRcIixcbiAgXCJvbmVycm9yXCIsXG4gIFwib25yZXNpemVcIixcbiAgXCJvbnNjcm9sbFwiLFxuXTtcbiIsICJpbXBvcnQgeyBIVE1MRXZlbnRzIH0gZnJvbSBcIkAvdXRpbHNcIjtcblxuY29uc3QgaXNPYmplY3QgPVxuICA8VD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICByZXR1cm4gISFwYXlsb2FkICYmICFBcnJheS5pc0FycmF5KHBheWxvYWQpICYmIHR5cGVvZiBwYXlsb2FkID09PSBcIm9iamVjdFwiO1xuICAgIH07XG5cbmNvbnN0IGlzQXJyYXkgPVxuICA8VD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICByZXR1cm4gISFwYXlsb2FkICYmIEFycmF5LmlzQXJyYXkocGF5bG9hZCk7XG4gICAgfTtcblxuY29uc3QgaXNGdW5jdGlvbiA9XG4gIDxUID0gdm9pZD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICByZXR1cm4gISFwYXlsb2FkICYmIHR5cGVvZiBwYXlsb2FkID09PSBcImZ1bmN0aW9uXCI7XG4gICAgfTtcblxuY29uc3QgaXNTdHJpbmcgPVxuICA8VCA9IHZvaWQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkID09PSBcInN0cmluZ1wiO1xuICAgIH07XG5cbmNvbnN0IGlzRXZlbnROYW1lID1cbiAgPFQgPSB2b2lkPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgcGF5bG9hZCAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIEhUTUxFdmVudHMuaW5jbHVkZXMocGF5bG9hZC50b0xvd2VyQ2FzZSgpKTtcbiAgICB9O1xuXG5jb25zdCBpc1RlbXBsYXRlRGF0YSA9XG4gIDxUID0gdm9pZD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICByZXR1cm4gdHlwZW9mIHBheWxvYWQgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHBheWxvYWQgPT09IFwibnVtYmVyXCI7XG4gICAgfTtcblxuZXhwb3J0IHsgaXNPYmplY3QsIGlzQXJyYXksIGlzRnVuY3Rpb24sIGlzU3RyaW5nLCBpc0V2ZW50TmFtZSwgaXNUZW1wbGF0ZURhdGEgfTtcbiIsICJpbXBvcnQgdHlwZSB7IFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIkAvdHlwZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUNoYWluIH0gZnJvbSBcIkAvZmFjdG9yaWVzXCI7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZSwgY3JlYXRlRWxlbWVudEJ5VGFnTmFtZSB9IGZyb20gXCJAL2FjdGlvbnNcIjtcbmltcG9ydCB7IGlzRnVuY3Rpb24sIGlzU3RyaW5nIH0gZnJvbSBcIkAvdmFsaWRhdG9yc1wiO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJUZW1wbGF0ZU9iamVjdCA9XG4gICh0ZW1wbGF0ZTogVGVtcGxhdGVTY2hlbWEsIGNvbnRleHRFbGVtZW50OiBFbGVtZW50LCBzdGF0ZTogU3RhdGUgPSB7fSkgPT5cbiAgICAoKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBfY2hhaW4gPSBjcmVhdGVDaGFpbigpO1xuXG4gICAgICBfY2hhaW4uYWRkKHtcbiAgICAgICAgdmFsaWRhdG9yOiBpc1N0cmluZyh0ZW1wbGF0ZS50eXBlKSxcbiAgICAgICAgYWN0aW9uOiBjcmVhdGVFbGVtZW50QnlUYWdOYW1lKHRlbXBsYXRlLCBjb250ZXh0RWxlbWVudCwgc3RhdGUpLFxuICAgICAgfSk7XG5cbiAgICAgIF9jaGFpbi5hZGQoe1xuICAgICAgICB2YWxpZGF0b3I6IGlzRnVuY3Rpb24odGVtcGxhdGUudHlwZSksXG4gICAgICAgIGFjdGlvbjogY3JlYXRlRWxlbWVudEJ5RmFjdG9yeU5hbWUodGVtcGxhdGUsIGNvbnRleHRFbGVtZW50LCBzdGF0ZSksXG4gICAgICB9KTtcblxuICAgICAgX2NoYWluLmV4ZWN1dGUoKTtcbiAgICB9O1xuIiwgImltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJAL3JlbmRlclwiO1xuaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3R5cGVzXCI7XG5pbXBvcnQgdHlwZSB7IFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcblxuZXhwb3J0IGNvbnN0IHJlbmRlclRlbXBsYXRlQXJyYXkgPVxuICAoXG4gICAgdGVtcGxhdGVTY2hlbWE6IFRlbXBsYXRlU2NoZW1hW10sXG4gICAgY29udGV4dEVsZW1lbnQ6IEVsZW1lbnQsXG4gICAgc3RhdGU6IFN0YXRlID0ge30sXG4gICkgPT5cbiAgICAoKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IHRlbXBsYXRlIG9mIHRlbXBsYXRlU2NoZW1hKSB7XG4gICAgICAgIHJlbmRlcih0ZW1wbGF0ZSwgY29udGV4dEVsZW1lbnQsIHN0YXRlKTtcbiAgICAgIH1cbiAgICB9O1xuIiwgImltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJAL3JlbmRlclwiO1xuaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3RlbXBsYXRlXCI7XG5pbXBvcnQgdHlwZSB7IFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcblxuZXhwb3J0IGNvbnN0IHJlbmRlckNoaWxkcmVuID0gKFxuICBjaGlsZHJlbjogVGVtcGxhdGVTY2hlbWFbXSxcbiAgcGFyZW50RWxlbWVudDogRWxlbWVudCxcbiAgc3RhdGU6IFN0YXRlID0ge30sXG4pID0+IHtcbiAgcGFyZW50RWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICBpZiAoIUFycmF5LmlzQXJyYXkoY2hpbGRyZW4pICYmIHR5cGVvZiBjaGlsZHJlbiA9PT0gXCJvYmplY3RcIikge1xuICAgIHJlbmRlcihjaGlsZHJlbiwgcGFyZW50RWxlbWVudCwgc3RhdGUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICByZW5kZXIoY2hpbGQsIHBhcmVudEVsZW1lbnQsIHN0YXRlKTtcbiAgfVxufTtcbiIsICJ2YXIgbj1mdW5jdGlvbih0LHMscixlKXt2YXIgdTtzWzBdPTA7Zm9yKHZhciBoPTE7aDxzLmxlbmd0aDtoKyspe3ZhciBwPXNbaCsrXSxhPXNbaF0/KHNbMF18PXA/MToyLHJbc1toKytdXSk6c1srK2hdOzM9PT1wP2VbMF09YTo0PT09cD9lWzFdPU9iamVjdC5hc3NpZ24oZVsxXXx8e30sYSk6NT09PXA/KGVbMV09ZVsxXXx8e30pW3NbKytoXV09YTo2PT09cD9lWzFdW3NbKytoXV0rPWErXCJcIjpwPyh1PXQuYXBwbHkoYSxuKHQsYSxyLFtcIlwiLG51bGxdKSksZS5wdXNoKHUpLGFbMF0/c1swXXw9Mjooc1toLTJdPTAsc1toXT11KSk6ZS5wdXNoKGEpfXJldHVybiBlfSx0PW5ldyBNYXA7ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocyl7dmFyIHI9dC5nZXQodGhpcyk7cmV0dXJuIHJ8fChyPW5ldyBNYXAsdC5zZXQodGhpcyxyKSksKHI9bih0aGlzLHIuZ2V0KHMpfHwoci5zZXQocyxyPWZ1bmN0aW9uKG4pe2Zvcih2YXIgdCxzLHI9MSxlPVwiXCIsdT1cIlwiLGg9WzBdLHA9ZnVuY3Rpb24obil7MT09PXImJihufHwoZT1lLnJlcGxhY2UoL15cXHMqXFxuXFxzKnxcXHMqXFxuXFxzKiQvZyxcIlwiKSkpP2gucHVzaCgwLG4sZSk6Mz09PXImJihufHxlKT8oaC5wdXNoKDMsbixlKSxyPTIpOjI9PT1yJiZcIi4uLlwiPT09ZSYmbj9oLnB1c2goNCxuLDApOjI9PT1yJiZlJiYhbj9oLnB1c2goNSwwLCEwLGUpOnI+PTUmJigoZXx8IW4mJjU9PT1yKSYmKGgucHVzaChyLDAsZSxzKSxyPTYpLG4mJihoLnB1c2gocixuLDAscykscj02KSksZT1cIlwifSxhPTA7YTxuLmxlbmd0aDthKyspe2EmJigxPT09ciYmcCgpLHAoYSkpO2Zvcih2YXIgbD0wO2w8blthXS5sZW5ndGg7bCsrKXQ9blthXVtsXSwxPT09cj9cIjxcIj09PXQ/KHAoKSxoPVtoXSxyPTMpOmUrPXQ6ND09PXI/XCItLVwiPT09ZSYmXCI+XCI9PT10PyhyPTEsZT1cIlwiKTplPXQrZVswXTp1P3Q9PT11P3U9XCJcIjplKz10OidcIic9PT10fHxcIidcIj09PXQ/dT10OlwiPlwiPT09dD8ocCgpLHI9MSk6ciYmKFwiPVwiPT09dD8ocj01LHM9ZSxlPVwiXCIpOlwiL1wiPT09dCYmKHI8NXx8XCI+XCI9PT1uW2FdW2wrMV0pPyhwKCksMz09PXImJihoPWhbMF0pLHI9aCwoaD1oWzBdKS5wdXNoKDIsMCxyKSxyPTApOlwiIFwiPT09dHx8XCJcXHRcIj09PXR8fFwiXFxuXCI9PT10fHxcIlxcclwiPT09dD8ocCgpLHI9Mik6ZSs9dCksMz09PXImJlwiIS0tXCI9PT1lJiYocj00LGg9aFswXSl9cmV0dXJuIHAoKSxofShzKSksciksYXJndW1lbnRzLFtdKSkubGVuZ3RoPjE/cjpyWzBdfVxuIiwgImltcG9ydCBodG0gZnJvbSBcImh0bVwiO1xuaW1wb3J0IHR5cGUgeyBUYWdnZWRUZW1wbGF0ZSwgVGVtcGxhdGVQcm9wcywgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCBoeXBlcnRleHQgPSAoXG4gIHR5cGU6IHVua25vd24sXG4gIHByb3BzOiBUZW1wbGF0ZVByb3BzLFxuICAuLi5jaGlsZHJlbjogVGVtcGxhdGVTY2hlbWFbXVxuKSA9PiB7XG4gIHJldHVybiB7IHR5cGUsIHByb3BzLCBjaGlsZHJlbiB9O1xufTtcblxuY29uc3QgaHRtbCA9IGh0bS5iaW5kPFRhZ2dlZFRlbXBsYXRlPihoeXBlcnRleHQpO1xuXG5leHBvcnQgeyBodG1sIH07XG5leHBvcnQgeyBodG1sIGFzIGpzeCB9O1xuZXhwb3J0IHsgaHRtbCBhcyB0c3ggfTtcbiIsICIvKipcbiAqIEdlcmEgdW0gaGFzaCBcdTAwRkFuaWNvIGJhc2VhZG8gbm8gYWxnb3JpdG1vIERKQjIuXG4gKiBAcGFyYW0gc3RyIC0gTyBjb250ZVx1MDBGQWRvIGEgcGFydGlyIGRvIHF1YWwgbyBoYXNoIHNlclx1MDBFMSBnZXJhZG8uXG4gKiBAcmV0dXJucyBPIGhhc2ggZ2VyYWRvIGNvbW8gdW1hIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUhhc2ggPSAodGV4dDogc3RyaW5nLCBzZWxlY3Rvcjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgbGV0IGhhc2ggPSA1MzgxO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcbiAgICBoYXNoID0gKGhhc2ggKiAzMykgXiB0ZXh0LmNoYXJDb2RlQXQoaSk7XG4gIH1cbiAgcmV0dXJuIGAke3NlbGVjdG9yfS0keyhoYXNoID4+PiAwKS50b1N0cmluZygzNil9YDtcbn07XG4iLCAiY29uc3Qgc3R5bGVFbGVtZW50Q2FjaGU6IE1hcDxzdHJpbmcsIEhUTUxTdHlsZUVsZW1lbnQ+ID0gbmV3IE1hcCgpO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU3R5bGVFbGVtZW50ID0gKGNvbXBvbmVudElkOiBzdHJpbmcpOiBIVE1MU3R5bGVFbGVtZW50ID0+IHtcbiAgY29uc3Qgc3R5bGVFbGVtZW50ID0gc3R5bGVFbGVtZW50Q2FjaGUuZ2V0KGNvbXBvbmVudElkKTtcblxuICBpZiAoc3R5bGVFbGVtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gc3R5bGVFbGVtZW50O1xuICB9XG5cbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIHN0eWxlLnNldEF0dHJpYnV0ZShcImRhdGEtY29tcG9uZW50XCIsIGNvbXBvbmVudElkKTtcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIHN0eWxlRWxlbWVudENhY2hlLnNldChjb21wb25lbnRJZCwgc3R5bGUpO1xuXG4gIHJldHVybiBzdHlsZTtcbn07XG4iLCAidHlwZSBXcmFwU3R5bGVQYXJhbXMgPSB7XG4gIHN0eWxlOiBzdHJpbmc7XG4gIHNlbGVjdG9yOiBzdHJpbmc7XG59O1xuXG50eXBlIEFjY3VtdWxhdG9yID0ge1xuICBpbnNpZGVCbG9jazogbnVtYmVyO1xuICBnbG9iYWxSdWxlczogc3RyaW5nO1xuICByZXN1bHQ6IHN0cmluZztcbn07XG5cbnR5cGUgTGluZVByb2Nlc3NpbmcgPSB7XG4gIGdsb2JhbFJ1bGVzOiBzdHJpbmc7XG4gIHJlc3VsdDogc3RyaW5nO1xufTtcblxuY29uc3Qgd3JhcExvb3NlUnVsZXNPdXRzaWRlTWVkaWFRdWVyeSA9ICh7XG4gIHN0eWxlLFxuICBzZWxlY3Rvcixcbn06IFdyYXBTdHlsZVBhcmFtcyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGxpbmVzID0gc3R5bGUuc3BsaXQoXCJcXG5cIik7XG4gIGNvbnN0IHJ1bGVSZWdleCA9IC9eXFxzKihbXFx3LV0rKVxccyo6XFxzKlteO10rOy87XG5cbiAgY29uc3QgaW5pdGlhbFN0YXRlOiBBY2N1bXVsYXRvciA9IHtcbiAgICBpbnNpZGVCbG9jazogMCxcbiAgICBnbG9iYWxSdWxlczogXCJcIixcbiAgICByZXN1bHQ6IFwiXCIsXG4gIH07XG5cbiAgY29uc3QgcHJvY2Vzc0dsb2JhbFJ1bGVzID0gKFxuICAgIGdsb2JhbFJ1bGVzOiBzdHJpbmcsXG4gICAgcmVzdWx0OiBzdHJpbmcsXG4gICAgc2VsZWN0b3I6IHN0cmluZyxcbiAgKTogTGluZVByb2Nlc3NpbmcgPT4gKHtcbiAgICBnbG9iYWxSdWxlczogXCJcIixcbiAgICByZXN1bHQ6IGAke3Jlc3VsdH0ke3NlbGVjdG9yfSB7XFxuJHtnbG9iYWxSdWxlc319XFxuXFxuYCxcbiAgfSk7XG5cbiAgY29uc3QgcHJvY2Vzc1JlZ3VsYXJMaW5lID0gKFxuICAgIGxpbmU6IHN0cmluZyxcbiAgICByZXN1bHQ6IHN0cmluZyxcbiAgKTogTGluZVByb2Nlc3NpbmcgPT4gKHtcbiAgICBnbG9iYWxSdWxlczogXCJcIixcbiAgICByZXN1bHQ6IGAke3Jlc3VsdH0ke2xpbmV9XFxuYCxcbiAgfSk7XG5cbiAgY29uc3QgYWRkR2xvYmFsUnVsZSA9IChcbiAgICBsaW5lOiBzdHJpbmcsXG4gICAgZ2xvYmFsUnVsZXM6IHN0cmluZyxcbiAgKTogTGluZVByb2Nlc3NpbmcgPT4gKHtcbiAgICBnbG9iYWxSdWxlczogYCR7Z2xvYmFsUnVsZXN9JHtsaW5lfVxcbmAsXG4gICAgcmVzdWx0OiBcIlwiLFxuICB9KTtcblxuICBjb25zdCBjb3VudEJsb2NrcyA9IChsaW5lOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IG9wZW5pbmdzID0gKGxpbmUubWF0Y2goL3svZykgfHwgW10pLmxlbmd0aDtcbiAgICBjb25zdCBjbG9zaW5ncyA9IChsaW5lLm1hdGNoKC99L2cpIHx8IFtdKS5sZW5ndGg7XG4gICAgcmV0dXJuIG9wZW5pbmdzIC0gY2xvc2luZ3M7XG4gIH07XG5cbiAgY29uc3QgcHJvY2Vzc0xpbmUgPSAoYWNjOiBBY2N1bXVsYXRvciwgbGluZTogc3RyaW5nKTogQWNjdW11bGF0b3IgPT4ge1xuICAgIGFjYy5pbnNpZGVCbG9jayArPSBjb3VudEJsb2NrcyhsaW5lKTtcblxuICAgIC8vIENhc2UgMTogTGluZSBpcyBhIGdsb2JhbCBydWxlXG4gICAgaWYgKGFjYy5pbnNpZGVCbG9jayA9PT0gMCAmJiBydWxlUmVnZXgudGVzdChsaW5lKSkge1xuICAgICAgY29uc3QgeyBnbG9iYWxSdWxlcywgcmVzdWx0IH0gPSBhZGRHbG9iYWxSdWxlKGxpbmUsIGFjYy5nbG9iYWxSdWxlcyk7XG4gICAgICByZXR1cm4geyAuLi5hY2MsIGdsb2JhbFJ1bGVzLCByZXN1bHQ6IGFjYy5yZXN1bHQgKyByZXN1bHQgfTtcbiAgICB9XG5cbiAgICAvLyBDYXNlIDI6IFRoZXJlIGFyZSBhY2N1bXVsYXRlZCBnbG9iYWwgcnVsZXNcbiAgICBpZiAoYWNjLmdsb2JhbFJ1bGVzKSB7XG4gICAgICBjb25zdCB7IGdsb2JhbFJ1bGVzLCByZXN1bHQgfSA9IHByb2Nlc3NHbG9iYWxSdWxlcyhcbiAgICAgICAgYWNjLmdsb2JhbFJ1bGVzLFxuICAgICAgICBhY2MucmVzdWx0LFxuICAgICAgICBzZWxlY3RvcixcbiAgICAgICk7XG4gICAgICBjb25zdCBwcm9jZXNzZWRMaW5lID0gcHJvY2Vzc1JlZ3VsYXJMaW5lKGxpbmUsIFwiXCIpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYWNjLFxuICAgICAgICBnbG9iYWxSdWxlcyxcbiAgICAgICAgcmVzdWx0OiByZXN1bHQgKyBwcm9jZXNzZWRMaW5lLnJlc3VsdCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gQ2FzZSAzOiBSZWd1bGFyIGxpbmVcbiAgICBjb25zdCB7IGdsb2JhbFJ1bGVzLCByZXN1bHQgfSA9IHByb2Nlc3NSZWd1bGFyTGluZShsaW5lLCBhY2MucmVzdWx0KTtcbiAgICByZXR1cm4geyAuLi5hY2MsIGdsb2JhbFJ1bGVzLCByZXN1bHQgfTtcbiAgfTtcblxuICBjb25zdCB7IHJlc3VsdCwgZ2xvYmFsUnVsZXMgfSA9IGxpbmVzLnJlZHVjZShwcm9jZXNzTGluZSwgaW5pdGlhbFN0YXRlKTtcblxuICByZXR1cm4gZ2xvYmFsUnVsZXNcbiAgICA/IGAke3Jlc3VsdH0ke3NlbGVjdG9yfSB7XFxuJHtnbG9iYWxSdWxlc319XFxuYC50cmltKClcbiAgICA6IHJlc3VsdC50cmltKCk7XG59O1xuXG5jb25zdCB3cmFwTG9vc2VSdWxlc0luc2lkZU1lZGlhUXVlcnkgPSAoe1xuICBzdHlsZSxcbiAgc2VsZWN0b3IsXG59OiBXcmFwU3R5bGVQYXJhbXMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCByZWdleCA9IC9AbWVkaWFcXHMqKFtee10rKVxccypcXHsoW1xcc1xcU10qPylcXH0vZztcbiAgY29uc3QgcnVsZVJlZ2V4ID0gL15cXHMqKFtcXHctXSspXFxzKjpcXHMqW147XSs7LztcblxuICByZXR1cm4gc3R5bGUucmVwbGFjZShyZWdleCwgKG1hdGNoLCBtZWRpYVF1ZXJ5LCBpbm5lckNzcykgPT4ge1xuICAgIGNvbnN0IHJ1bGVzID0gaW5uZXJDc3NcbiAgICAgIC50cmltKClcbiAgICAgIC5zcGxpdChcIlxcblwiKVxuICAgICAgLm1hcCgobGluZTogc3RyaW5nKSA9PiBsaW5lLnRyaW0oKSlcbiAgICAgIC5maWx0ZXIoKGxpbmU6IHN0cmluZykgPT4gbGluZSk7XG5cbiAgICBjb25zdCB3cmFwcGVkUnVsZXMgPSBydWxlc1xuICAgICAgLmZpbHRlcigocnVsZTogc3RyaW5nKSA9PiBydWxlUmVnZXgudGVzdChydWxlKSlcbiAgICAgIC5tYXAoKHJ1bGU6IHN0cmluZykgPT4gYCR7c2VsZWN0b3J9IHtcXG4ke3J1bGUudHJpbSgpfVxcbn1gKVxuICAgICAgLmpvaW4oXCJcXG5cIik7XG5cbiAgICByZXR1cm4gYEBtZWRpYSAke21lZGlhUXVlcnkudHJpbSgpfSB7XFxuJHt3cmFwcGVkUnVsZXN9XFxufWA7XG4gIH0pO1xufTtcblxuY29uc3QgYXBwbHlDbGFzc05hbWVTY29wZSA9ICh7IHN0eWxlLCBzZWxlY3RvciB9OiBXcmFwU3R5bGVQYXJhbXMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCByZWdleCA9IC9cXC4oPzwhW1xcZF0pKD8hW1xcZF0pKFtcXHctXSspL2c7XG4gIHJldHVybiBzdHlsZS5yZXBsYWNlKHJlZ2V4LCBgLiR7c2VsZWN0b3J9XyQxYCk7XG59O1xuXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtU3R5bGUgPSAocmF3U3R5bGU6IHN0cmluZywgc2VsZWN0b3I6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGxldCBzdHlsZSA9IHJhd1N0eWxlO1xuICBjb25zdCBjbGFzc05hbWUgPSBgLiR7c2VsZWN0b3J9YDtcbiAgc3R5bGUgPSBhcHBseUNsYXNzTmFtZVNjb3BlKHsgc3R5bGUsIHNlbGVjdG9yIH0pO1xuICBzdHlsZSA9IHdyYXBMb29zZVJ1bGVzT3V0c2lkZU1lZGlhUXVlcnkoeyBzdHlsZSwgc2VsZWN0b3I6IGNsYXNzTmFtZSB9KTtcbiAgc3R5bGUgPSB3cmFwTG9vc2VSdWxlc0luc2lkZU1lZGlhUXVlcnkoeyBzdHlsZSwgc2VsZWN0b3I6IGNsYXNzTmFtZSB9KTtcblxuICByZXR1cm4gc3R5bGU7XG59O1xuIiwgImltcG9ydCB0eXBlIHsgVGFnZ2VkU3R5bGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgY3JlYXRlSGFzaCB9IGZyb20gXCIuL2NyZWF0ZUhhc2hcIjtcbmltcG9ydCB7IHRyYW5zZm9ybVN0eWxlIH0gZnJvbSBcIi4vY3NzUGFyc2VyXCI7XG5pbXBvcnQgeyBjcmVhdGVTdHlsZUVsZW1lbnQgfSBmcm9tIFwiLi9jcmVhdGVTdHlsZUVsZW1lbnRcIjtcblxudHlwZSBIYW5kbGVyUGFyYW1zID0ge1xuICBoYXNoSWQ6IHN0cmluZztcbiAgc2NvcGVkU3R5bGU6IHN0cmluZztcbiAgc3R5bGVFbGVtZW50OiBFbGVtZW50O1xufTtcbnR5cGUgSGFuZGxlciA9IChwYXlsb2FkOiBIYW5kbGVyUGFyYW1zKSA9PiB2b2lkO1xuXG5jb25zdCBjc3NDYWNoZTogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcblxuZXhwb3J0IGNvbnN0IGNzcyA9XG4gIChzZWxlY3Rvcjogc3RyaW5nLCBoYW5kbGVyOiBIYW5kbGVyID0gKCkgPT4geyB9KTogVGFnZ2VkU3R5bGUgPT5cbiAgICAoXG4gICAgICBzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSxcbiAgICAgIC4uLmludGVycG9sYXRpb25zOiAoc3RyaW5nIHwgbnVtYmVyKVtdXG4gICAgKTogc3RyaW5nID0+IHtcbiAgICAgIGNvbnN0IHJhd0NTUyA9IHN0cmluZ3MucmVkdWNlKFxuICAgICAgICAoYWNjdW11bGF0b3IsIHN0ciwgaW5kZXgpID0+XG4gICAgICAgICAgYCR7YWNjdW11bGF0b3J9JHtzdHJ9JHtpbnRlcnBvbGF0aW9uc1tpbmRleF0gIT09IHVuZGVmaW5lZCA/IGludGVycG9sYXRpb25zW2luZGV4XSA6IFwiXCJ9YCxcbiAgICAgICAgXCJcIixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGNhY2hlZENsYXNzTmFtZSA9IGNzc0NhY2hlLmdldChyYXdDU1MpO1xuICAgICAgaWYgKGNhY2hlZENsYXNzTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIFZlcmlmaWNhIHNlIG8gZWxlbWVudG8gc3R5bGUgZXhpc3RlIG5vIERPTVxuICAgICAgICBjb25zdCBleGlzdGluZ1N0eWxlID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbZGF0YS1jb21wb25lbnQ9XCIke2NhY2hlZENsYXNzTmFtZX1cIl1gLFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIFNlIG5cdTAwRTNvIGV4aXN0aXIsIHJlY3JpYSBvIGVsZW1lbnRvIHN0eWxlXG4gICAgICAgIGlmICghZXhpc3RpbmdTdHlsZSkge1xuICAgICAgICAgIGNvbnN0IHNjb3BlZFN0eWxlID0gdHJhbnNmb3JtU3R5bGUocmF3Q1NTLCBjYWNoZWRDbGFzc05hbWUpO1xuICAgICAgICAgIGNvbnN0IHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChjYWNoZWRDbGFzc05hbWUpO1xuICAgICAgICAgIHN0eWxlRWxlbWVudC5pbm5lckhUTUwgKz0gc2NvcGVkU3R5bGU7XG4gICAgICAgICAgaGFuZGxlcih7IGhhc2hJZDogY2FjaGVkQ2xhc3NOYW1lLCBzY29wZWRTdHlsZSwgc3R5bGVFbGVtZW50IH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNhY2hlZENsYXNzTmFtZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaGFzaElkID0gY3JlYXRlSGFzaChyYXdDU1MsIHNlbGVjdG9yKTtcbiAgICAgIGNvbnN0IHNjb3BlZFN0eWxlID0gdHJhbnNmb3JtU3R5bGUocmF3Q1NTLCBoYXNoSWQpO1xuICAgICAgY29uc3Qgc3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KGhhc2hJZCk7XG5cbiAgICAgIGhhbmRsZXIoeyBoYXNoSWQsIHNjb3BlZFN0eWxlLCBzdHlsZUVsZW1lbnQgfSk7XG5cbiAgICAgIGlmICghc3R5bGVFbGVtZW50LmlubmVySFRNTC5pbmNsdWRlcyhzY29wZWRTdHlsZSkpIHtcbiAgICAgICAgc3R5bGVFbGVtZW50LmlubmVySFRNTCArPSBzY29wZWRTdHlsZTtcbiAgICAgIH1cblxuICAgICAgY3NzQ2FjaGUuc2V0KHJhd0NTUywgaGFzaElkKTtcblxuICAgICAgcmV0dXJuIGhhc2hJZDtcbiAgICB9O1xuIiwgImltcG9ydCB7IGlzRXZlbnROYW1lIH0gZnJvbSBcIkAvdmFsaWRhdG9yc1wiO1xuXG50eXBlIEF0dHJpYnV0ZSA9IG9iamVjdCAmIHtcbiAgW2tleTogc3ltYm9sIHwgc3RyaW5nXTogdW5rbm93bjtcbn07XG5cbnR5cGUgRXZlbnRIYW5kbGVyID0gPEsgZXh0ZW5kcyBrZXlvZiBIVE1MRWxlbWVudEV2ZW50TWFwPihcbiAgZXZlbnQ6IEhUTUxFbGVtZW50RXZlbnRNYXBbS10sXG4pID0+IHZvaWQ7XG5cbmV4cG9ydCBjb25zdCBzZXRFbGVtZW50QXR0cmlidXRlcyA9IChcbiAgZWxlbWVudDogRWxlbWVudCxcbiAgYXR0cmlidXRlczogQXR0cmlidXRlLFxuKTogRWxlbWVudCA9PiB7XG4gIGNvbnN0IGF0dHJpYnV0ZUtleXMgPSBhdHRyaWJ1dGVzID8gT2JqZWN0LmtleXMoYXR0cmlidXRlcykgOiBbXTtcbiAgZm9yIChjb25zdCBrZXkgb2YgYXR0cmlidXRlS2V5cykge1xuICAgIGlmICghaXNFdmVudE5hbWUoa2V5KSgpKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSBhcyBzdHJpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBldmVudE5hbWUgPSBrZXlcbiAgICAgICAgLnJlcGxhY2UoL29uLywgXCJcIilcbiAgICAgICAgLnRvTG93ZXJDYXNlKCkgYXMga2V5b2YgSFRNTEVsZW1lbnRFdmVudE1hcDtcbiAgICAgIGNvbnN0IGV2ZW50SGFuZGxlciA9IGF0dHJpYnV0ZXNba2V5XSBhcyBFdmVudEhhbmRsZXI7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZWxlbWVudDtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3RlbXBsYXRlXCI7XG5pbXBvcnQgdHlwZSB7IEdlbmVyaWNPYmplY3QsIFN0YXRlLCBTdGF0ZU1hbmFnZXIgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuaW1wb3J0IHsgY3JlYXRlU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIkAvcmVuZGVyXCI7XG5pbXBvcnQgeyBodG1sLCBqc3gsIHRzeCB9IGZyb20gXCJAL3RlbXBsYXRlXCI7XG5pbXBvcnQgeyBjc3MgfSBmcm9tIFwiQC9zdHlsZVwiO1xuaW1wb3J0IHsgcmVuZGVyQ2hpbGRyZW4gfSBmcm9tIFwiLi9yZW5kZXJDaGlsZHJlblwiO1xuaW1wb3J0IHsgc2V0RWxlbWVudEF0dHJpYnV0ZXMgfSBmcm9tIFwiLi9zZXRFbGVtZW50QXR0cmlidXRlc1wiO1xuXG50eXBlIEZhY3RvcnkgPSAocGFyYW1zPzogdW5rbm93bikgPT4gdW5rbm93bjtcblxudHlwZSBTdHlsZVBhcmFtcyA9IHtcbiAgcHJvcHM6IFN0YXRlO1xuICBzdGF0ZTogU3RhdGU7XG4gIGNzczogUmV0dXJuVHlwZTx0eXBlb2YgY3NzPjtcbn07XG5cbnR5cGUgU3R5bGVzID0geyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcbnR5cGUgU3R5bGVzT2JqZWN0ID0gR2VuZXJpY09iamVjdDx7IFtrZXk6IHN0cmluZ106ICgpID0+IHN0cmluZyB9PjtcbnR5cGUgU3R5bGVIYW5kbGVyRmFjdG9yeSA9ICgpID0+IFN0eWxlc09iamVjdDtcbnR5cGUgU3R5bGVIYW5kbGVyID0gKHBhcmFtczogU3R5bGVQYXJhbXMpID0+IHN0cmluZztcblxudHlwZSBUZW1wbGF0ZVBhcmFtcyA9IHtcbiAgcHJvcHM6IFN0YXRlO1xuICBzdGF0ZTogU3RhdGU7XG4gIGh0bWw6IHR5cGVvZiBodG1sO1xuICBqc3g6IHR5cGVvZiBqc3g7XG4gIHRzeDogdHlwZW9mIHRzeDtcbiAgc3R5bGVzOiBTdHlsZXM7XG4gIGFjdGlvbnM6IEFjdGlvbnM7XG59O1xuXG50eXBlIFRlbXBsYXRlSW5qZWN0aW9ucyA9IDxUID0gdW5rbm93bj4oKSA9PiBHZW5lcmljT2JqZWN0PFQ+O1xuXG50eXBlIFRlbXBsYXRlSGFuZGxlciA9IChcbiAgcGFyYW1zOiBUZW1wbGF0ZVBhcmFtcyxcbiAgaW5qZWN0aW9uczogVGVtcGxhdGVJbmplY3Rpb25zLFxuKSA9PiB2b2lkO1xuXG50eXBlIEFjdGlvbnMgPSBHZW5lcmljT2JqZWN0O1xuXG50eXBlIEFjdGlvblBhcmFtcyA9IHtcbiAgcHJvcHM6IFN0YXRlO1xuICBzdGF0ZTogU3RhdGVNYW5hZ2VyO1xufTtcbnR5cGUgQWN0aW9uSGFuZGxlckZhY3RvcnkgPSAocGFyYW1zOiBBY3Rpb25QYXJhbXMpID0+IEdlbmVyaWNPYmplY3Q7XG5cbnR5cGUgQXR0cmlidXRlID0gb2JqZWN0ICYge1xuICBba2V5OiBzeW1ib2wgfCBzdHJpbmddOiB1bmtub3duO1xufTtcblxuY29uc3QgX2F0dHJpYnV0ZXMgPSB7fTtcblxuY29uc3QgX2NyZWF0ZVRhZ0J5RmFjdG9yeU5hbWUgPSAoZmFjdG9yeTogRmFjdG9yeSkgPT4ge1xuICByZXR1cm4gZmFjdG9yeS5uYW1lXG4gICAgLnNwbGl0KC8oPz1bQS1aXSkvKVxuICAgIC5qb2luKFwiLVwiKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufTtcblxuY29uc3QgX2NyZWF0ZVVzZVN0YXRlID0gKHN0YXRlOiBTdGF0ZU1hbmFnZXIpID0+IHtcbiAgY29uc3QgY3VycmVudFN0YXRlID0ge307XG4gIGNvbnN0IHVzZVN0YXRlID0gPFQ+KGluaXRpYWxTdGF0ZTogU3RhdGU8VD4pOiBTdGF0ZU1hbmFnZXIgPT4ge1xuICAgIGNvbnN0IGxhdGVzdFN0YXRlID0gc3RhdGUuZ2V0KCkgYXMgU3RhdGU8VD47XG4gICAgc3RhdGUuc2V0KHsgLi4uaW5pdGlhbFN0YXRlLCAuLi5sYXRlc3RTdGF0ZSB9KTtcblxuICAgIE9iamVjdC5hc3NpZ24oY3VycmVudFN0YXRlLCBzdGF0ZS5nZXQoKSk7XG4gICAgcmV0dXJuIHsgZ2V0OiBzdGF0ZS5nZXQsIHNldDogc3RhdGUuc2V0LCB3YXRjaDogc3RhdGUud2F0Y2ggfTtcbiAgfTtcbiAgcmV0dXJuIHsgY3VycmVudFN0YXRlLCB1c2VTdGF0ZSB9O1xufTtcblxuY29uc3QgX2NyZWF0ZVVzZVN0eWxlID0gKHsgcHJvcHMsIHN0YXRlLCBjc3MgfTogU3R5bGVQYXJhbXMpID0+IHtcbiAgY29uc3Qgc3R5bGVzaGVldCA9IHt9O1xuICBjb25zdCB1c2VTdHlsZSA9IChjc3NIYW5kbGVyRmFjdG9yeTogU3R5bGVIYW5kbGVyRmFjdG9yeSkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZXJzID0gY3NzSGFuZGxlckZhY3RvcnkoKTtcbiAgICBjb25zdCBzdHlsZXM6IFN0eWxlcyA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gaGFuZGxlcnMpIHtcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBoYW5kbGVyc1trZXldIGFzIFN0eWxlSGFuZGxlcjtcbiAgICAgIGNvbnN0IHN0eWxlID0gaGFuZGxlcih7IHByb3BzLCBzdGF0ZSwgY3NzIH0pO1xuICAgICAgc3R5bGVzW2tleV0gPSBzdHlsZTtcbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKHN0eWxlc2hlZXQsIHN0eWxlcyk7XG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfTtcblxuICByZXR1cm4geyBzdHlsZXM6IHN0eWxlc2hlZXQsIHVzZVN0eWxlIH07XG59O1xuXG5jb25zdCBfY3JlYXRlVXNlVGVtcGxhdGUgPSAocGFyYW1zOiBUZW1wbGF0ZVBhcmFtcykgPT4ge1xuICBjb25zdCB1c2VUZW1wbGF0ZSA9IChcbiAgICB0ZW1wbGF0ZUhhbmRsZXI6IFRlbXBsYXRlSGFuZGxlcixcbiAgICB0ZW1wbGF0ZUluamVjdGlvbnM6IFRlbXBsYXRlSW5qZWN0aW9ucyxcbiAgKSA9PiB7XG4gICAgcmV0dXJuIHRlbXBsYXRlSGFuZGxlcihwYXJhbXMsIHRlbXBsYXRlSW5qZWN0aW9ucyk7XG4gIH07XG5cbiAgcmV0dXJuIHVzZVRlbXBsYXRlO1xufTtcblxuY29uc3QgX2NyZWF0ZVVzZUFjdGlvbiA9ICh7IHByb3BzLCBzdGF0ZSB9OiBBY3Rpb25QYXJhbXMpID0+IHtcbiAgY29uc3QgYWN0aW9uczogR2VuZXJpY09iamVjdCA9IHt9O1xuXG4gIGNvbnN0IHVzZUFjdGlvbiA9IChhY3Rpb25IYW5kbGVyRmFjdG9yeTogQWN0aW9uSGFuZGxlckZhY3RvcnkpID0+IHtcbiAgICBjb25zdCBoYW5kbGVyQWN0aW9ucyA9IGFjdGlvbkhhbmRsZXJGYWN0b3J5KHsgcHJvcHMsIHN0YXRlIH0pO1xuICAgIE9iamVjdC5hc3NpZ24oYWN0aW9ucywgaGFuZGxlckFjdGlvbnMpO1xuICB9O1xuXG4gIHJldHVybiB7IGFjdGlvbnMsIHVzZUFjdGlvbiB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW1lbnRCeUZhY3RvcnlOYW1lID0gKFxuICB0ZW1wbGF0ZTogVGVtcGxhdGVTY2hlbWEsXG4gIHBhcmVudEVsZW1lbnQ6IEVsZW1lbnQsXG4gIGxhdGVzdFN0YXRlOiBTdGF0ZSA9IHt9LFxuKSA9PiB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgY29uc3QgZmFjdG9yeSA9IHRlbXBsYXRlLnR5cGUgYXMgRmFjdG9yeTtcbiAgICBjb25zdCB0YWdOYW1lID0gX2NyZWF0ZVRhZ0J5RmFjdG9yeU5hbWUoZmFjdG9yeSk7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSB0YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG5cbiAgICBjb25zdCBwcm9wcyA9IHRlbXBsYXRlLnByb3BzO1xuICAgIGNvbnN0IGxhdGVzdERlZXBTdGF0ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobGF0ZXN0U3RhdGUpKTtcbiAgICBjb25zdCBzdGF0ZU1hbmFnZXIgPSBjcmVhdGVTdGF0ZShsYXRlc3REZWVwU3RhdGUpO1xuICAgIGNvbnN0IHsgY3VycmVudFN0YXRlOiBzdGF0ZSwgdXNlU3RhdGUgfSA9IF9jcmVhdGVVc2VTdGF0ZShzdGF0ZU1hbmFnZXIpO1xuICAgIGNvbnN0IHN0eWxlZCA9IGNzcyhzZWxlY3RvciwgKHsgaGFzaElkIH0pID0+IHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChoYXNoSWQpO1xuICAgICAgT2JqZWN0LmFzc2lnbihfYXR0cmlidXRlcywgeyBjbGFzczogaGFzaElkIH0pO1xuICAgIH0pO1xuICAgIGNvbnN0IHsgc3R5bGVzLCB1c2VTdHlsZSB9ID0gX2NyZWF0ZVVzZVN0eWxlKHsgcHJvcHMsIHN0YXRlLCBjc3M6IHN0eWxlZCB9KTtcbiAgICBjb25zdCB7IGFjdGlvbnMsIHVzZUFjdGlvbiB9ID0gX2NyZWF0ZVVzZUFjdGlvbih7XG4gICAgICBwcm9wcyxcbiAgICAgIHN0YXRlOiBzdGF0ZU1hbmFnZXIsXG4gICAgfSk7XG5cbiAgICBjb25zdCB1c2VUZW1wbGF0ZSA9IF9jcmVhdGVVc2VUZW1wbGF0ZSh7XG4gICAgICBwcm9wcyxcbiAgICAgIHN0YXRlLFxuICAgICAgaHRtbCxcbiAgICAgIGpzeCxcbiAgICAgIHRzeCxcbiAgICAgIHN0eWxlcyxcbiAgICAgIGFjdGlvbnMsXG4gICAgfSk7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IGZhY3Rvcnkoe1xuICAgICAgcHJvcHMsXG4gICAgICB1c2VTdGF0ZSxcbiAgICAgIHVzZVN0eWxlLFxuICAgICAgdXNlVGVtcGxhdGUsXG4gICAgICB1c2VBY3Rpb24sXG4gICAgfSkgYXMgVGVtcGxhdGVTY2hlbWFbXTtcblxuICAgIGNvbnN0IG9sZEVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIGFzIEVsZW1lbnQ7XG4gICAgc2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCwgX2F0dHJpYnV0ZXMpO1xuXG4gICAgb2xkRWxlbWVudFxuICAgICAgPyBvbGRFbGVtZW50LnJlcGxhY2VXaXRoKGVsZW1lbnQpXG4gICAgICA6IHBhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGVsZW1lbnQpO1xuXG4gICAgcmVuZGVyQ2hpbGRyZW4oY2hpbGRyZW4sIGVsZW1lbnQsIHN0YXRlKTtcblxuICAgIHN0YXRlTWFuYWdlci53YXRjaCgocGF5bG9hZCkgPT4ge1xuICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgcmVuZGVyKHRlbXBsYXRlLCBwYXJlbnRFbGVtZW50LCBwYXlsb2FkKTtcbiAgICB9KTtcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5pbXBvcnQgdHlwZSB7IFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIkAvdGVtcGxhdGVcIjtcbmltcG9ydCB7IHNldEVsZW1lbnRBdHRyaWJ1dGVzIH0gZnJvbSBcIi4vc2V0RWxlbWVudEF0dHJpYnV0ZXNcIjtcbmltcG9ydCB7IHJlbmRlckNoaWxkcmVuIH0gZnJvbSBcIi4vcmVuZGVyQ2hpbGRyZW5cIjtcblxuY29uc3QgX2V4dHJhY3RIYXNoSWQgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IHJlZ2V4ID0gLyhfLiopKy9naTtcbiAgaWYgKCF0ZXh0KSByZXR1cm4gdGV4dDtcbiAgcmV0dXJuIHRleHQucmVwbGFjZShyZWdleCwgXCJcIik7XG59O1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW1lbnRCeVRhZ05hbWUgPVxuICAodGVtcGxhdGU6IFRlbXBsYXRlU2NoZW1hLCBwYXJlbnRFbGVtZW50OiBFbGVtZW50LCBzdGF0ZTogU3RhdGUgPSB7fSkgPT5cbiAgICAoKSA9PiB7XG4gICAgICBjb25zdCB0YWdOYW1lID0gdGVtcGxhdGUudHlwZSBhcyBzdHJpbmc7XG4gICAgICBjb25zdCBzZWxlY3RvciA9IHRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgICAgY29uc3QgcGFyZW50RWxlbWVudENsYXNzID0gcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSBhcyBzdHJpbmc7XG4gICAgICBjb25zdCBoYXNoSWQgPSBfZXh0cmFjdEhhc2hJZChwYXJlbnRFbGVtZW50Q2xhc3MpO1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0gdGVtcGxhdGU/LnByb3BzPy5jbGFzcyBhcyBzdHJpbmc7XG4gICAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgIGlmICghY2xhc3NOYW1lLmluY2x1ZGVzKGhhc2hJZCkpIHtcbiAgICAgICAgICBjb25zdCBuZXdDbGFzc05hbWUgPSBgJHtoYXNoSWR9XyR7Y2xhc3NOYW1lfWA7XG4gICAgICAgICAgc2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCwgeyBjbGFzczogbmV3Q2xhc3NOYW1lIH0pO1xuICAgICAgICAgIHBhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGVsZW1lbnQpO1xuICAgICAgICAgIHJlbmRlckNoaWxkcmVuKHRlbXBsYXRlLmNoaWxkcmVuLCBlbGVtZW50LCBzdGF0ZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzZXRFbGVtZW50QXR0cmlidXRlcyhlbGVtZW50LCB0ZW1wbGF0ZS5wcm9wcyk7XG4gICAgICBwYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcbiAgICAgIHJlbmRlckNoaWxkcmVuKHRlbXBsYXRlLmNoaWxkcmVuLCBlbGVtZW50LCBzdGF0ZSk7XG4gICAgfTtcbiIsICJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiQC9yZW5kZXJcIjtcbmltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEsIFRhZ2dlZFRlbXBsYXRlIH0gZnJvbSBcIkAvdHlwZXNcIjtcbmltcG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyVGVtcGxhdGVEYXRhID1cbiAgKHRlbXBsYXRlRGF0YTogVGFnZ2VkVGVtcGxhdGUsIGVsZW1lbnQ6IEVsZW1lbnQsIHN0YXRlOiBTdGF0ZSA9IHt9KSA9PlxuICAgICgpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdGVtcGxhdGVEYXRhID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIHRlbXBsYXRlRGF0YSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdGVtcGxhdGVEYXRhID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBOdW1iZXIodGVtcGxhdGVEYXRhKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBkYXRhLnRvU3RyaW5nKCk7XG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9O1xuIiwgImltcG9ydCB0eXBlIHsgVGFnZ2VkVGVtcGxhdGUsIFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIkAvdGVtcGxhdGVcIjtcbmltcG9ydCB7XG4gIHJlbmRlclRlbXBsYXRlQXJyYXksXG4gIHJlbmRlclRlbXBsYXRlT2JqZWN0LFxuICByZW5kZXJUZW1wbGF0ZURhdGEsXG59IGZyb20gXCJAL2FjdGlvbnNcIjtcbmltcG9ydCB7IGlzQXJyYXksIGlzT2JqZWN0LCBpc1RlbXBsYXRlRGF0YSB9IGZyb20gXCJAL3ZhbGlkYXRvcnNcIjtcblxudHlwZSBDb250ZXh0RWxlbWVudCA9IEVsZW1lbnQ7XG5pbXBvcnQgeyBjcmVhdGVDaGFpbiB9IGZyb20gXCJAL2ZhY3Rvcmllc1wiO1xuaW1wb3J0IHsgY3JlYXRlU3RhdGUsIHR5cGUgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuXG4vL2NvbnN0IGdsb2JhbFN0YXRlID0gY3JlYXRlU3RhdGUoe30pO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyID0gKFxuICB0ZW1wbGF0ZTogVGFnZ2VkVGVtcGxhdGUsXG4gIGNvbnRleHQ6IENvbnRleHRFbGVtZW50ID0gZG9jdW1lbnQuYm9keSxcbiAgc3RhdGU6IFN0YXRlID0ge30sXG4pOiBDb250ZXh0RWxlbWVudCA9PiB7XG4gIGNvbnN0IGNoYWluID0gY3JlYXRlQ2hhaW4oKTtcbiAgY29uc3QgY29tcG9uZW50RWxlbWVudCA9IGNvbnRleHQgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5cbiAgY2hhaW4uYWRkKHtcbiAgICB2YWxpZGF0b3I6IGlzQXJyYXkodGVtcGxhdGUpLFxuICAgIGFjdGlvbjogcmVuZGVyVGVtcGxhdGVBcnJheShcbiAgICAgIHRlbXBsYXRlIGFzIFRlbXBsYXRlU2NoZW1hW10sXG4gICAgICBjb21wb25lbnRFbGVtZW50LFxuICAgICAgc3RhdGUsXG4gICAgKSxcbiAgfSk7XG5cbiAgY2hhaW4uYWRkKHtcbiAgICB2YWxpZGF0b3I6IGlzT2JqZWN0KHRlbXBsYXRlKSxcbiAgICBhY3Rpb246IHJlbmRlclRlbXBsYXRlT2JqZWN0KFxuICAgICAgdGVtcGxhdGUgYXMgVGVtcGxhdGVTY2hlbWEsXG4gICAgICBjb21wb25lbnRFbGVtZW50LFxuICAgICAgc3RhdGUsXG4gICAgKSxcbiAgfSk7XG5cbiAgY2hhaW4uYWRkKHtcbiAgICB2YWxpZGF0b3I6IGlzVGVtcGxhdGVEYXRhKHRlbXBsYXRlKSxcbiAgICBhY3Rpb246IHJlbmRlclRlbXBsYXRlRGF0YSh0ZW1wbGF0ZSwgY29tcG9uZW50RWxlbWVudCwgc3RhdGUpLFxuICB9KTtcblxuICBjaGFpbi5leGVjdXRlKCk7XG4gIHJldHVybiBjb21wb25lbnRFbGVtZW50O1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IFJvdXRlciwgRXhlY3V0ZSB9IGZyb20gXCIuL3R5cGVzXCI7XG4vL2ltcG9ydCB7IGV2ZW50RHJpdmUgfSBmcm9tIFwiLi4vcmVuZGVyXCI7XG5cbmV4cG9ydCBjb25zdCByb3V0ZXI6IFJvdXRlciA9ICh7IHJvdXRlcywgY29udGV4dCB9KSA9PiB7XG4gIGNvbnN0IF9yb3V0ZXMgPSByb3V0ZXM7XG4gIGxldCBfcm91dGVyRWxlbWVudCE6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGUgPSAodmFsaWRhdG9yLCBjYWxsYmFjaywgZXJyb3IpID0+IHtcbiAgICBpZiAodmFsaWRhdG9yKCkpIHJldHVybiBjYWxsYmFjayh7IGlzVmFsaWQ6IHZhbGlkYXRvcigpIH0pO1xuXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBjb25zdCBlcnJvID0gbmV3IEVycm9yKGVycm9yKCkubWVzc2FnZSk7XG4gICAgICBlcnJvLm5hbWUgPSBlcnJvcigpLm5hbWU7XG4gICAgICB0aHJvdyBlcnJvO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjbGVhbnVwU3R5bGVzID0gYXN5bmMgKHNlbGVjdG9yOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoIXNlbGVjdG9yKSByZXR1cm47XG5cbiAgICBjb25zdCBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5oZWFkLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgW2RhdGEtY29tcG9uZW50PSR7c2VsZWN0b3J9XWAsXG4gICAgKTtcbiAgICBpZiAoc3R5bGVFbGVtZW50KSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNsZWFudXBET00gPSBhc3luYyAoKSA9PiB7XG4gICAgX3JvdXRlckVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKCk7XG4gIH07XG5cbiAgY29uc3QgZ2V0Q2hpbGRTZWxlY3RvciA9ICgpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IGNoaWxkID0gX3JvdXRlckVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSBjaGlsZCA/IE9iamVjdC52YWx1ZXMoY2hpbGQuY2xhc3NMaXN0KS5zaGlmdCgpIDogXCJcIjtcbiAgICByZXR1cm4gc2VsZWN0b3IgYXMgc3RyaW5nO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFudXBDdXJyZW50Um91dGUgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0Q2hpbGRTZWxlY3RvcigpO1xuICAgICAgYXdhaXQgY2xlYW51cFN0eWxlcyhzZWxlY3Rvcik7XG4gICAgICBhd2FpdCBjbGVhbnVwRE9NKCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IF9iaW5kTGlzdGVuZXJzID0gKCkgPT4ge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBjbGVhbnVwQ3VycmVudFJvdXRlKCk7XG4gICAgICAgIGF3YWl0IF9tb3VudFJvdXRlQnlIYXNoKG51bGwpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGR1cmluZyByb3V0ZSBjaGFuZ2U6XCIsIGVycm9yKTtcbiAgICAgICAgLy8gQXF1aSB2b2NcdTAwRUEgcG9kZSBhZGljaW9uYXIgbFx1MDBGM2dpY2EgZGUgZmFsbGJhY2sgb3UgcmVjdXBlcmFcdTAwRTdcdTAwRTNvIGRlIGVycm9cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBfc2V0Um91dGVyRWxlbWVudCA9ICgpID0+IHtcbiAgICBjb25zdCByb3V0ZXJFbGVtZW50ID0gY29udGV4dD8ucXVlcnlTZWxlY3RvcihcInJvdXRlci12aWV3XCIpO1xuXG4gICAgZXhlY3V0ZShcbiAgICAgICgpID0+ICEhcm91dGVyRWxlbWVudCxcbiAgICAgICgpID0+IHtcbiAgICAgICAgX3JvdXRlckVsZW1lbnQgPSByb3V0ZXJFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICByZXR1cm4gX3JvdXRlckVsZW1lbnQ7XG4gICAgICB9LFxuICAgICAgKCkgPT4gKHtcbiAgICAgICAgbmFtZTogXCJSb3V0ZXIgRXJyb3JcIixcbiAgICAgICAgbWVzc2FnZTogXCJSb3V0ZXIgZWxlbWVudCAocm91dGVyLXZpZXcpIGlzIG5vdCBkZWZpbmVkIGFuZCBtdXN0IGJlLlwiLFxuICAgICAgfSksXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBfbG9hZE1haW5Sb3V0ZSA9ICgpID0+IHtcbiAgICBjb25zdCBtYWluUm91dGUgPSBfZ2V0TWFpblJvdXRlKCk7XG4gICAgZXhlY3V0ZShcbiAgICAgICgpID0+ICEhbWFpblJvdXRlPy5zdGFydCxcbiAgICAgICgpID0+IG1haW5Sb3V0ZT8uc3RhcnQgJiYgbmF2aWdhdGUobWFpblJvdXRlLnN0YXJ0KSxcbiAgICAgICgpID0+ICh7XG4gICAgICAgIG5hbWU6IFwiUm91dGVyIEVycm9yXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiU3RhcnQgcm91dGVyIGlzIG5vdCBkZWZpbmVkIGFuZCBtdXN0IGJlLlwiLFxuICAgICAgfSksXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBfZ2V0TWFpblJvdXRlID0gKCkgPT4gX3JvdXRlcy5maW5kKChyb3V0ZSkgPT4gISFyb3V0ZT8uc3RhcnQpO1xuXG4gIGNvbnN0IF9nZXRSb3V0ZUJ5SGFzaCA9IChoYXNoOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gX3JvdXRlcy5maW5kKChyb3V0ZSkgPT4gcm91dGUucmVnZXgudGVzdChoYXNoKSk7XG4gIH07XG5cbiAgY29uc3QgX2dldFJvdXRlRGVmYXVsdCA9ICgpID0+IF9yb3V0ZXMuZmluZCgocm91dGUpID0+IHJvdXRlPy5kZWZhdWx0KTtcblxuICBjb25zdCBfbW91bnRSb3V0ZUJ5SGFzaCA9IGFzeW5jIChoYXNoOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgY29uc3QgaGFzaFZhbHVlID0gaGFzaCB8fCB3aW5kb3cubG9jYXRpb24uaGFzaCB8fCBcIlwiO1xuICAgIGNvbnN0IHJvdXRlID0gX2dldFJvdXRlQnlIYXNoKGhhc2hWYWx1ZSkgfHwgX2dldFJvdXRlRGVmYXVsdCgpO1xuICAgIF9yb3V0ZXJFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgcm91dGU/Lm1vdW50KHsgY29udGV4dDogX3JvdXRlckVsZW1lbnQgfSk7XG4gIH07XG5cbiAgY29uc3QgX2dldEhhc2ggPSAoKSA9PiB3aW5kb3cubG9jYXRpb24uaGFzaCB8fCBudWxsO1xuXG4gIGNvbnN0IF9oYXNBY3RpdmVSb3V0ZSA9ICgpID0+ICEhX2dldEhhc2goKTtcblxuICBjb25zdCBuYXZpZ2F0ZSA9IChwYXRoOiBzdHJpbmcpID0+IHtcbiAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHBhdGg7XG4gIH07XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBfYmluZExpc3RlbmVycygpO1xuICAgIF9zZXRSb3V0ZXJFbGVtZW50KCk7XG4gICAgX2hhc0FjdGl2ZVJvdXRlKCkgPyBfbW91bnRSb3V0ZUJ5SGFzaChfZ2V0SGFzaCgpKSA6IF9sb2FkTWFpblJvdXRlKCk7XG4gIH07XG5cbiAgcmV0dXJuIHsgaW5pdCwgbmF2aWdhdGUgfTtcbn07XG4iLCAiaW1wb3J0IHsgY3JlYXRlU3RhdGUgfSBmcm9tIFwiaWFyZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kZWwgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY29uc3Qgc3RhdGUgPSBjcmVhdGVTdGF0ZTxNb2RlbD4oe1xuXHRyb3VuZDoge1xuXHRcdHBsYXllck5hbWU6IFwiXCIsXG5cdFx0c2NvcmU6IDAsXG5cdH0sXG5cdHJlY29yZDoge1xuXHRcdHBsYXllck5hbWU6IFwiXCIsXG5cdFx0c2NvcmU6IDAsXG5cdH0sXG5cdHJ1bm5pbmc6IGZhbHNlLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7QUFPTyxJQUFNLFlBQVksZ0JBQUFBLFFBQUEsTUFBbUI7QUFDMUMsTUFBSTtBQUVKLFFBQU0sUUFBUSxnQkFBQUEsUUFBQSxDQUFDLGFBQTZCO0FBQzFDLGVBQVcsU0FBUztBQUNwQixXQUFPLFNBQVM7RUFDbEIsR0FIYyxPQUFBO0FBS2QsUUFBTSxRQUFRLGdCQUFBQSxRQUFBLENBQUMsYUFBOEI7QUFDM0MsV0FBTyxTQUFTLFFBQVE7RUFDMUIsR0FGYyxPQUFBO0FBSWQsUUFBTSxVQUFVLGdCQUFBQSxRQUFBLENBQUMsYUFBOEI7QUFDN0MsV0FBTyxTQUFTLFFBQVE7RUFDMUIsR0FGZ0IsU0FBQTtBQUloQixTQUFPLEVBQUUsT0FBTyxPQUFPLFFBQVE7QUFDakMsR0FqQnlCLFdBQUE7QUNMekIsSUFBTSxjQUFjLGdCQUFBQSxRQUFBLE1BQWMsS0FBSyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBeEQsYUFBQTtBQUViLElBQU0sY0FBYyxnQkFBQUEsUUFBQSxDQUN6QixpQkFDb0I7QUFDcEIsUUFBTSxTQUFTLEtBQUssTUFBTSxLQUFLLFVBQVUsWUFBWSxDQUFDO0FBQ3RELFFBQU0sWUFBWSxvQkFBSSxJQUFxQjtBQUUzQyxRQUFNLGtCQUFrQixnQkFBQUEsUUFBQSxDQUFDLFlBQXNCO0FBQzdDLGVBQVcsZ0JBQWdCLFdBQVc7QUFDcEMsbUJBQWEsT0FBTztJQUN0QjtFQUNGLEdBSndCLGlCQUFBO0FBTXhCLFFBQU0sTUFBTSxnQkFBQUEsUUFBQSxDQUFDLFlBQXNCO0FBQ2pDLFdBQU8sT0FBTyxRQUFRLEtBQUssTUFBTSxLQUFLLFVBQVUsT0FBTyxDQUFDLENBQUM7QUFDekQsb0JBQWdC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SSxFQUFFLEtBQUssR0FBRUEsSUFBRSxDQUFDLElBQUUsTUFBSUUsT0FBSUYsTUFBRyxNQUFJLEVBQUUsS0FBSyxHQUFFQSxJQUFFLENBQUMsR0FBRUUsS0FBRSxLQUFHLE1BQUlBLE1BQUcsVUFBUSxLQUFHRixLQUFFLEVBQUUsS0FBSyxHQUFFQSxJQUFFLENBQUMsSUFBRSxNQUFJRSxNQUFHLEtBQUcsQ0FBQ0YsS0FBRSxFQUFFLEtBQUssR0FBRSxHQUFFLE1BQUcsQ0FBQyxJQUFFRSxNQUFHLE9BQUssS0FBRyxDQUFDRixNQUFHLE1BQUlFLFFBQUssRUFBRSxLQUFLQSxJQUFFLEdBQUUsR0FBRUQsRUFBQyxHQUFFQyxLQUFFLElBQUdGLE9BQUksRUFBRSxLQUFLRSxJQUFFRixJQUFFLEdBQUVDLEVBQUMsR0FBRUMsS0FBRSxLQUFJLElBQUU7SUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFRixHQUFFLFFBQU8sS0FBSTtBQUFDLFlBQUksTUFBSUUsTUFBRyxFQUFFLEdBQUUsRUFBRSxDQUFDO0FBQUcsZUFBUSxJQUFFLEdBQUUsSUFBRUYsR0FBRSxDQUFDLEVBQUUsUUFBTyxJQUFJRCxNQUFFQyxHQUFFLENBQUMsRUFBRSxDQUFDLEdBQUUsTUFBSUUsS0FBRSxRQUFNSCxNQUFHLEVBQUUsR0FBRSxJQUFFLENBQUMsQ0FBQyxHQUFFRyxLQUFFLEtBQUcsS0FBR0gsS0FBRSxNQUFJRyxLQUFFLFNBQU8sS0FBRyxRQUFNSCxNQUFHRyxLQUFFLEdBQUUsSUFBRSxNQUFJLElBQUVILEtBQUUsRUFBRSxDQUFDLElBQUUsSUFBRUEsT0FBSSxJQUFFLElBQUUsS0FBRyxLQUFHQSxLQUFFLFFBQU1BLE1BQUcsUUFBTUEsS0FBRSxJQUFFQSxLQUFFLFFBQU1BLE1BQUcsRUFBRSxHQUFFRyxLQUFFLEtBQUdBLE9BQUksUUFBTUgsTUFBR0csS0FBRSxHQUFFRCxLQUFFLEdBQUUsSUFBRSxNQUFJLFFBQU1GLE9BQUlHLEtBQUUsS0FBRyxRQUFNRixHQUFFLENBQUMsRUFBRSxJQUFFLENBQUMsTUFBSSxFQUFFLEdBQUUs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TSxXQUFXLGdCQUFBQSxRQUFBLENBQUMsU0FBaUI7QUFDakMsV0FBTyxTQUFTLE9BQU87RUFDekIsR0FGaUIsVUFBQTtBQUlqQixRQUFNLE9BQU8sZ0JBQUFBLFFBQUEsTUFBTTtBQUNqQixtQkFBZTtBQUNmLHNCQUFrQjtBQUNsQixvQkFBZ0IsSUFBSSxrQkFBa0IsU0FBUyxDQUFDLElBQUksZUFBZTtFQUNyRSxHQUphLE1BQUE7QUFNYixTQUFPLEVBQUUsTUFBTSxTQUFTO0FBQzFCLEdBcEg4QixRQUFBOzs7QUNBdkIsSUFBTSxRQUFRLFlBQW1CO0FBQUEsRUFDdkMsT0FBTztBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osT0FBTztBQUFBLEVBQ1I7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLE9BQU87QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQ1YsQ0FBQzsiLAogICJuYW1lcyI6IFsiX19uYW1lIiwgInN0YXRlIiwgInQiLCAibiIsICJzIiwgInIiLCAiZ2xvYmFsUnVsZXMiLCAicmVzdWx0IiwgInNlbGVjdG9yIiwgInNjb3BlZFN0eWxlIiwgInN0eWxlRWxlbWVudCIsICJjc3MiXQp9Cg==
