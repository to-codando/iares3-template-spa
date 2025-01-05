var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/frontend/ui/elements/TimerApp/index.ts
var template = /* @__PURE__ */ __name((params) => {
  const { state, styles, html } = params;
  const timeLeft = Number(state.timeLeft);
  return html`

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
  TimerApp: /* @__PURE__ */ __name(({ css }) => css`
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
export {
  TimerApp
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vc3JjL2Zyb250ZW5kL3VpL2VsZW1lbnRzL1RpbWVyQXBwL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7XG5cdEdlbmVyaWNPYmplY3QsXG5cdEhUTVgsXG5cdFN0YXRlLFxuXHRTdGF0ZU1hbmFnZXIsXG5cdFRhZ2dlZFN0eWxlLFxuXHRUYWdnZWRUZW1wbGF0ZSxcbn0gZnJvbSBcImlhcmVzXCI7XG5cbnR5cGUgUHJvcHMgPSB7XG5cdGhhbmRsZXI6IDxUID0gdW5rbm93bj4ocGFyYW1zOiBUKSA9PiB2b2lkO1xufTtcblxudHlwZSBTdHlsZXMgPSB7IFRpbWVyQXBwOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfTtcblxudHlwZSBTdHlsZUhhbmRsZXIgPSAoKSA9PiBHZW5lcmljT2JqZWN0O1xuXG50eXBlIEFjdGlvbnMgPSB7XG5cdGluY3JlbWVudDogKCkgPT4gdm9pZDtcbn07XG5cbnR5cGUgSW5qZWN0aW9ucyA9IEdlbmVyaWNPYmplY3Q8e1xuXHRhY3Rpb25zOiBBY3Rpb25zO1xuXHRzdHlsZXM6IFN0eWxlcztcbn0+O1xuXG50eXBlIFRlbXBsYXRlSW5qZWN0aW9ucyA9ICgpID0+IEluamVjdGlvbnM7XG5cbnR5cGUgVGVtcGxhdGVIYW5kbGVyID0gKFxuXHRwYXJhbXM6IFRlbXBsYXRlUGFyYW1zLFxuXHRpbmplY3Rpb25zOiBUZW1wbGF0ZUluamVjdGlvbnMsXG4pID0+IFRhZ2dlZFRlbXBsYXRlO1xuXG50eXBlIE1vZGVsID0gR2VuZXJpY09iamVjdDx7XG5cdHRpbWVMZWZ0OiBudW1iZXI7XG59PjtcblxudHlwZSBVc2VTdGF0ZSA9IDxUID0gTW9kZWw+KGluaXRpYWxTdGF0ZTogVCkgPT4gU3RhdGVNYW5hZ2VyPFQ+O1xuXG50eXBlIFVzZVN0eWxlID0gKHN0eWxlSGFuZGxlcjogU3R5bGVIYW5kbGVyKSA9PiBzdHJpbmc7XG5cbnR5cGUgVXNlVGVtcGxhdGUgPSAoXG5cdHRlbXBsYXRlSGFuZGxlcjogVGVtcGxhdGVIYW5kbGVyLFxuXHR0ZW1wbGF0ZWluamVjdGlvbnM/OiBUZW1wbGF0ZUluamVjdGlvbnMsXG4pID0+IFRhZ2dlZFRlbXBsYXRlO1xuXG50eXBlIFRlbXBsYXRlUGFyYW1zID0ge1xuXHRzdGF0ZTogU3RhdGU8TW9kZWw+O1xuXHRzdHlsZXM6IFN0eWxlcztcblx0aHRtbDogSFRNWDtcbn07XG5cbnR5cGUgU3R5bGVQYXJhbXMgPSB7XG5cdGNzczogVGFnZ2VkU3R5bGU7XG59O1xuXG50eXBlIFBhcmFtcyA9IHtcblx0cHJvcHM6IFByb3BzO1xuXHR1c2VTdGF0ZTogVXNlU3RhdGU7XG5cdHVzZVN0eWxlOiBVc2VTdHlsZTtcblx0dXNlVGVtcGxhdGU6IFVzZVRlbXBsYXRlO1xufTtcblxudHlwZSBUaW1lciA9IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+O1xuXG50eXBlIFRpbWVySGFuZGxlclBhcmFtcyA9IHtcblx0c3RhdGU6IFN0YXRlTWFuYWdlcjxNb2RlbD47XG5cdHNlY29uZHM6IG51bWJlcjtcbn07XG5cbnR5cGUgU3RhdGVXYXRjaGVySGFuZGxlclBhcmFtcyA9IHtcblx0b25lU2Vjb25kOiBudW1iZXI7XG5cdHRpbWVyOiBUaW1lcjtcbn07XG5cbmNvbnN0IHRlbXBsYXRlID0gKHBhcmFtczogVGVtcGxhdGVQYXJhbXMpOiBUYWdnZWRUZW1wbGF0ZSA9PiB7XG5cdGNvbnN0IHsgc3RhdGUsIHN0eWxlcywgaHRtbCB9ID0gcGFyYW1zO1xuXHRjb25zdCB0aW1lTGVmdCA9IE51bWJlcihzdGF0ZS50aW1lTGVmdCk7XG5cblx0cmV0dXJuIGh0bWxgXG5cbiAgICA8ZGl2IGNsYXNzPVwidGltZXJcIj4gXG4gICAgICA8c3Bhbj5BIHNpbXBsZSBjb3VudGVyPC9zcGFuPlxuICAgICAgPHNwYW4+JHt0aW1lTGVmdCA8PSA5ICYmIFwiMFwifSR7dGltZUxlZnQgfHwgXCIwXCJ9czwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICBgIGFzIFRhZ2dlZFRlbXBsYXRlO1xufTtcblxuY29uc3QgY3JlYXRlU3RhdGVIYW5kbGVyID0gKHBhcmFtczogVGltZXJIYW5kbGVyUGFyYW1zKSA9PiB7XG5cdGNvbnN0IHsgc3RhdGUsIHNlY29uZHMgfSA9IHBhcmFtcztcblx0cmV0dXJuICgpID0+IHtcblx0XHRjb25zdCB7IHRpbWVMZWZ0IH0gPSBzdGF0ZS5nZXQoKTtcblx0XHRpZiAoIXRpbWVMZWZ0KSByZXR1cm47XG5cdFx0c3RhdGUuc2V0KHsgdGltZUxlZnQ6IHRpbWVMZWZ0IC0gc2Vjb25kcyB9KTtcblx0fTtcbn07XG5cbmNvbnN0IGNyZWF0ZVN0YXRlV2F0Y2hlciA9XG5cdCh7IG9uZVNlY29uZCwgdGltZXIgfTogU3RhdGVXYXRjaGVySGFuZGxlclBhcmFtcykgPT5cblx0KHsgdGltZUxlZnQgfTogTW9kZWwpID0+IHtcblx0XHRpZiAodGltZUxlZnQgPCBvbmVTZWNvbmQpIHtcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lcik7XG5cdFx0fVxuXHR9O1xuXG5leHBvcnQgY29uc3QgVGltZXJBcHAgPSAoeyB1c2VTdGF0ZSwgdXNlU3R5bGUsIHVzZVRlbXBsYXRlIH06IFBhcmFtcykgPT4ge1xuXHRjb25zdCBzdGF0ZSA9IHVzZVN0YXRlPE1vZGVsPih7IHRpbWVMZWZ0OiAxMjAgfSk7XG5cdHVzZVN0eWxlKGNyZWF0ZVN0eWxlcyk7XG5cblx0Y29uc3Qgb25lU2Vjb25kID0gMTtcblx0Y29uc3QgY3ljbGVUaW1lID0gMTAwMDtcblxuXHRjb25zdCBzdGF0ZUhhbmRsZXIgPSBjcmVhdGVTdGF0ZUhhbmRsZXIoeyBzdGF0ZSwgc2Vjb25kczogb25lU2Vjb25kIH0pO1xuXHRjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoc3RhdGVIYW5kbGVyLCBjeWNsZVRpbWUpO1xuXG5cdGNvbnN0IHN0YXRlV2F0Y2hlciA9IGNyZWF0ZVN0YXRlV2F0Y2hlcih7IG9uZVNlY29uZCwgdGltZXIgfSk7XG5cdHN0YXRlLndhdGNoKHN0YXRlV2F0Y2hlcik7XG5cblx0cmV0dXJuIHVzZVRlbXBsYXRlKHRlbXBsYXRlKTtcbn07XG5cbmNvbnN0IGNyZWF0ZVN0eWxlcyA9ICgpID0+ICh7XG5cdFRpbWVyQXBwOiAoeyBjc3MgfTogU3R5bGVQYXJhbXMpID0+IGNzc2BcbiAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICAgIHdpZHRoOjEwMCU7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuXG4gICAgLnRpbWVyIHtcbiAgICAgIGJhY2tncm91bmQ6I2I5YzVlYztcbiAgICAgIHBhZGRpbmc6MTVweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6OHB4O1xuICAgIH1cblxuICAgIC50aW1lciBzcGFuIHsgXG4gICAgICBjb2xvcjogIzIwNzJiYTsgXG4gICAgICBmb250LXNpemU6IDFlbTsgXG4gICAgfVxuXG4gICAgLnRpbWVyIHNwYW4gKyBzcGFuIHtcbiAgICAgICAgZm9udC13ZWlnaHQ6Ym9sZDtcbiAgICAgICAgZm9udC1zaXplOiAyZW1cbiAgICAgIH1cblxuICAgIC50aW1lciBzcGFuOmZpcnN0LW9mLXR5cGUge1xuICAgICAgICBtYXJnaW4tYm90dG9tOjFlbVxuICAgICAgfVxuICAgXG5gLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7O0FBMkVBLElBQU0sV0FBVyx3QkFBQyxXQUEyQztBQUM1RCxRQUFNLEVBQUUsT0FBTyxRQUFRLEtBQUssSUFBSTtBQUNoQyxRQUFNLFdBQVcsT0FBTyxNQUFNLFFBQVE7QUFFdEMsU0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBLGNBSU0sWUFBWSxLQUFLLEdBQUcsR0FBRyxZQUFZLEdBQUc7QUFBQTtBQUFBO0FBR3BELEdBWGlCO0FBYWpCLElBQU0scUJBQXFCLHdCQUFDLFdBQStCO0FBQzFELFFBQU0sRUFBRSxPQUFPLFFBQVEsSUFBSTtBQUMzQixTQUFPLE1BQU07QUFDWixVQUFNLEVBQUUsU0FBUyxJQUFJLE1BQU0sSUFBSTtBQUMvQixRQUFJLENBQUMsU0FBVTtBQUNmLFVBQU0sSUFBSSxFQUFFLFVBQVUsV0FBVyxRQUFRLENBQUM7QUFBQSxFQUMzQztBQUNELEdBUDJCO0FBUzNCLElBQU0scUJBQ0wsd0JBQUMsRUFBRSxXQUFXLE1BQU0sTUFDcEIsQ0FBQyxFQUFFLFNBQVMsTUFBYTtBQUN4QixNQUFJLFdBQVcsV0FBVztBQUN6QixpQkFBYSxLQUFLO0FBQUEsRUFDbkI7QUFDRCxHQUxBO0FBT00sSUFBTSxXQUFXLHdCQUFDLEVBQUUsVUFBVSxVQUFVLFlBQVksTUFBYztBQUN4RSxRQUFNLFFBQVEsU0FBZ0IsRUFBRSxVQUFVLElBQUksQ0FBQztBQUMvQyxXQUFTLFlBQVk7QUFFckIsUUFBTSxZQUFZO0FBQ2xCLFFBQU0sWUFBWTtBQUVsQixRQUFNLGVBQWUsbUJBQW1CLEVBQUUsT0FBTyxTQUFTLFVBQVUsQ0FBQztBQUNyRSxRQUFNLFFBQVEsV0FBVyxjQUFjLFNBQVM7QUFFaEQsUUFBTSxlQUFlLG1CQUFtQixFQUFFLFdBQVcsTUFBTSxDQUFDO0FBQzVELFFBQU0sTUFBTSxZQUFZO0FBRXhCLFNBQU8sWUFBWSxRQUFRO0FBQzVCLEdBZHdCO0FBZ0J4QixJQUFNLGVBQWUsOEJBQU87QUFBQSxFQUMzQixVQUFVLHdCQUFDLEVBQUUsSUFBSSxNQUFtQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQTFCO0FBMEJYLElBM0JxQjsiLAogICJuYW1lcyI6IFtdCn0K
