var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/frontend/ui/elements/Timer/index.ts
var template = /* @__PURE__ */ __name((params) => {
  const { state, styles, html } = params;
  const timeLeft = Number(state.timeLeft);
  return html`

    <div class="timer"> 
      <span>Tempo restantes: ${timeLeft <= 9 && "0"}${timeLeft || "0"}s</span>
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
  console.log(timeLeft);
  if (timeLeft < oneSecond) {
    clearTimeout(timer);
  }
}, "createStateWatcher");
var TimerApp = /* @__PURE__ */ __name(({ useState, useStyle, useTemplate }) => {
  const state = useState({ timeLeft: 10 });
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
   
`, "TimerApp")
}), "createStyles");
export {
  TimerApp
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vc3JjL2Zyb250ZW5kL3VpL2VsZW1lbnRzL1RpbWVyL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7XG4gIEdlbmVyaWNPYmplY3QsXG4gIEhUTVgsXG4gIFN0YXRlLFxuICBTdGF0ZU1hbmFnZXIsXG4gIFRhZ2dlZFN0eWxlLFxuICBUYWdnZWRUZW1wbGF0ZSxcbn0gZnJvbSBcImlhcmVzXCI7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIGhhbmRsZXI6IDxUID0gdW5rbm93bj4ocGFyYW1zOiBUKSA9PiB2b2lkO1xufTtcblxudHlwZSBTdHlsZXMgPSB7IFRpbWVyQXBwOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfTtcblxudHlwZSBTdHlsZUhhbmRsZXIgPSAoKSA9PiBHZW5lcmljT2JqZWN0O1xuXG50eXBlIEFjdGlvbnMgPSB7XG4gIGluY3JlbWVudDogKCkgPT4gdm9pZDtcbn07XG5cbnR5cGUgSW5qZWN0aW9ucyA9IEdlbmVyaWNPYmplY3Q8e1xuICBhY3Rpb25zOiBBY3Rpb25zO1xuICBzdHlsZXM6IFN0eWxlcztcbn0+O1xuXG50eXBlIFRlbXBsYXRlSW5qZWN0aW9ucyA9ICgpID0+IEluamVjdGlvbnM7XG5cbnR5cGUgVGVtcGxhdGVIYW5kbGVyID0gKFxuICBwYXJhbXM6IFRlbXBsYXRlUGFyYW1zLFxuICBpbmplY3Rpb25zOiBUZW1wbGF0ZUluamVjdGlvbnMsXG4pID0+IFRhZ2dlZFRlbXBsYXRlO1xuXG50eXBlIE1vZGVsID0gR2VuZXJpY09iamVjdDx7XG4gIHRpbWVMZWZ0OiBudW1iZXI7XG59PjtcblxudHlwZSBVc2VTdGF0ZSA9IDxUID0gTW9kZWw+KGluaXRpYWxTdGF0ZTogVCkgPT4gU3RhdGVNYW5hZ2VyPFQ+O1xuXG50eXBlIFVzZVN0eWxlID0gKHN0eWxlSGFuZGxlcjogU3R5bGVIYW5kbGVyKSA9PiBzdHJpbmc7XG5cbnR5cGUgVXNlVGVtcGxhdGUgPSAoXG4gIHRlbXBsYXRlSGFuZGxlcjogVGVtcGxhdGVIYW5kbGVyLFxuICB0ZW1wbGF0ZWluamVjdGlvbnM/OiBUZW1wbGF0ZUluamVjdGlvbnMsXG4pID0+IFRhZ2dlZFRlbXBsYXRlO1xuXG50eXBlIFRlbXBsYXRlUGFyYW1zID0ge1xuICBzdGF0ZTogU3RhdGU8TW9kZWw+O1xuICBzdHlsZXM6IFN0eWxlcztcbiAgaHRtbDogSFRNWDtcbn07XG5cbnR5cGUgU3R5bGVQYXJhbXMgPSB7XG4gIGNzczogVGFnZ2VkU3R5bGU7XG59O1xuXG50eXBlIFBhcmFtcyA9IHtcbiAgcHJvcHM6IFByb3BzO1xuICB1c2VTdGF0ZTogVXNlU3RhdGU7XG4gIHVzZVN0eWxlOiBVc2VTdHlsZTtcbiAgdXNlVGVtcGxhdGU6IFVzZVRlbXBsYXRlO1xufTtcblxudHlwZSBUaW1lciA9IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+O1xuXG50eXBlIFRpbWVySGFuZGxlclBhcmFtcyA9IHtcbiAgc3RhdGU6IFN0YXRlTWFuYWdlcjxNb2RlbD47XG4gIHNlY29uZHM6IG51bWJlcjtcbn07XG5cbnR5cGUgU3RhdGVXYXRjaGVySGFuZGxlclBhcmFtcyA9IHtcbiAgb25lU2Vjb25kOiBudW1iZXI7XG4gIHRpbWVyOiBUaW1lcjtcbn07XG5cbmNvbnN0IHRlbXBsYXRlID0gKHBhcmFtczogVGVtcGxhdGVQYXJhbXMpOiBUYWdnZWRUZW1wbGF0ZSA9PiB7XG4gIGNvbnN0IHsgc3RhdGUsIHN0eWxlcywgaHRtbCB9ID0gcGFyYW1zO1xuICBjb25zdCB0aW1lTGVmdCA9IE51bWJlcihzdGF0ZS50aW1lTGVmdCk7XG5cbiAgcmV0dXJuIGh0bWxgXG5cbiAgICA8ZGl2IGNsYXNzPVwidGltZXJcIj4gXG4gICAgICA8c3Bhbj5UZW1wbyByZXN0YW50ZXM6ICR7dGltZUxlZnQgPD0gOSAmJiBcIjBcIn0ke3RpbWVMZWZ0IHx8IFwiMFwifXM8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgYCBhcyBUYWdnZWRUZW1wbGF0ZTtcbn07XG5cbmNvbnN0IGNyZWF0ZVN0YXRlSGFuZGxlciA9IChwYXJhbXM6IFRpbWVySGFuZGxlclBhcmFtcykgPT4ge1xuICBjb25zdCB7IHN0YXRlLCBzZWNvbmRzIH0gPSBwYXJhbXM7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgY29uc3QgeyB0aW1lTGVmdCB9ID0gc3RhdGUuZ2V0KCk7XG4gICAgaWYgKCF0aW1lTGVmdCkgcmV0dXJuO1xuICAgIHN0YXRlLnNldCh7IHRpbWVMZWZ0OiB0aW1lTGVmdCAtIHNlY29uZHMgfSk7XG4gIH07XG59O1xuXG5jb25zdCBjcmVhdGVTdGF0ZVdhdGNoZXIgPVxuICAoeyBvbmVTZWNvbmQsIHRpbWVyIH06IFN0YXRlV2F0Y2hlckhhbmRsZXJQYXJhbXMpID0+XG4gICAgKHsgdGltZUxlZnQgfTogTW9kZWwpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHRpbWVMZWZ0KTtcbiAgICAgIGlmICh0aW1lTGVmdCA8IG9uZVNlY29uZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgfVxuICAgIH07XG5cbmV4cG9ydCBjb25zdCBUaW1lckFwcCA9ICh7IHVzZVN0YXRlLCB1c2VTdHlsZSwgdXNlVGVtcGxhdGUgfTogUGFyYW1zKSA9PiB7XG4gIGNvbnN0IHN0YXRlID0gdXNlU3RhdGU8TW9kZWw+KHsgdGltZUxlZnQ6IDEwIH0pO1xuICB1c2VTdHlsZShjcmVhdGVTdHlsZXMpO1xuXG4gIGNvbnN0IG9uZVNlY29uZCA9IDE7XG4gIGNvbnN0IGN5Y2xlVGltZSA9IDEwMDA7XG5cbiAgY29uc3Qgc3RhdGVIYW5kbGVyID0gY3JlYXRlU3RhdGVIYW5kbGVyKHsgc3RhdGUsIHNlY29uZHM6IG9uZVNlY29uZCB9KTtcbiAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KHN0YXRlSGFuZGxlciwgY3ljbGVUaW1lKTtcblxuICBjb25zdCBzdGF0ZVdhdGNoZXIgPSBjcmVhdGVTdGF0ZVdhdGNoZXIoeyBvbmVTZWNvbmQsIHRpbWVyIH0pO1xuICBzdGF0ZS53YXRjaChzdGF0ZVdhdGNoZXIpO1xuXG4gIHJldHVybiB1c2VUZW1wbGF0ZSh0ZW1wbGF0ZSk7XG59O1xuXG5jb25zdCBjcmVhdGVTdHlsZXMgPSAoKSA9PiAoe1xuICBUaW1lckFwcDogKHsgY3NzIH06IFN0eWxlUGFyYW1zKSA9PiBjc3NgXG4gICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICB3aWR0aDoxMDAlO1xuICAgICAganVzdGlmeS1jb250ZW50OmNlbnRlcjtcblxuICAgIC50aW1lciB7XG4gICAgICBiYWNrZ3JvdW5kOiNiOWM1ZWM7XG4gICAgICBwYWRkaW5nOjE1cHg7XG4gICAgICBib3JkZXItcmFkaXVzOjhweDtcbiAgICB9XG5cbiAgICAudGltZXIgc3BhbiB7IFxuICAgICAgY29sb3I6ICMyMDcyYmE7IFxuICAgICAgZm9udC1zaXplOiAxZW07IFxuICAgIH1cbiAgIFxuYCxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7OztBQTJFQSxJQUFNLFdBQVcsd0JBQUMsV0FBMkM7QUFDM0QsUUFBTSxFQUFFLE9BQU8sUUFBUSxLQUFLLElBQUk7QUFDaEMsUUFBTSxXQUFXLE9BQU8sTUFBTSxRQUFRO0FBRXRDLFNBQU87QUFBQTtBQUFBO0FBQUEsK0JBR3NCLFlBQVksS0FBSyxHQUFHLEdBQUcsWUFBWSxHQUFHO0FBQUE7QUFBQTtBQUdyRSxHQVZpQjtBQVlqQixJQUFNLHFCQUFxQix3QkFBQyxXQUErQjtBQUN6RCxRQUFNLEVBQUUsT0FBTyxRQUFRLElBQUk7QUFDM0IsU0FBTyxNQUFNO0FBQ1gsVUFBTSxFQUFFLFNBQVMsSUFBSSxNQUFNLElBQUk7QUFDL0IsUUFBSSxDQUFDLFNBQVU7QUFDZixVQUFNLElBQUksRUFBRSxVQUFVLFdBQVcsUUFBUSxDQUFDO0FBQUEsRUFDNUM7QUFDRixHQVAyQjtBQVMzQixJQUFNLHFCQUNKLHdCQUFDLEVBQUUsV0FBVyxNQUFNLE1BQ2xCLENBQUMsRUFBRSxTQUFTLE1BQWE7QUFDdkIsVUFBUSxJQUFJLFFBQVE7QUFDcEIsTUFBSSxXQUFXLFdBQVc7QUFDeEIsaUJBQWEsS0FBSztBQUFBLEVBQ3BCO0FBQ0YsR0FORjtBQVFLLElBQU0sV0FBVyx3QkFBQyxFQUFFLFVBQVUsVUFBVSxZQUFZLE1BQWM7QUFDdkUsUUFBTSxRQUFRLFNBQWdCLEVBQUUsVUFBVSxHQUFHLENBQUM7QUFDOUMsV0FBUyxZQUFZO0FBRXJCLFFBQU0sWUFBWTtBQUNsQixRQUFNLFlBQVk7QUFFbEIsUUFBTSxlQUFlLG1CQUFtQixFQUFFLE9BQU8sU0FBUyxVQUFVLENBQUM7QUFDckUsUUFBTSxRQUFRLFdBQVcsY0FBYyxTQUFTO0FBRWhELFFBQU0sZUFBZSxtQkFBbUIsRUFBRSxXQUFXLE1BQU0sQ0FBQztBQUM1RCxRQUFNLE1BQU0sWUFBWTtBQUV4QixTQUFPLFlBQVksUUFBUTtBQUM3QixHQWR3QjtBQWdCeEIsSUFBTSxlQUFlLDhCQUFPO0FBQUEsRUFDMUIsVUFBVSx3QkFBQyxFQUFFLElBQUksTUFBbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUExQjtBQWlCWixJQWxCcUI7IiwKICAibmFtZXMiOiBbXQp9Cg==