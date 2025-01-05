import type {
	GenericObject,
	HTMX,
	State,
	StateManager,
	TaggedStyle,
	TaggedTemplate,
} from "iares";

type Props = {
	handler: <T = unknown>(params: T) => void;
};

type Styles = { TimerApp: string; label: string };

type StyleHandler = () => GenericObject;

type Actions = {
	increment: () => void;
};

type Injections = GenericObject<{
	actions: Actions;
	styles: Styles;
}>;

type TemplateInjections = () => Injections;

type TemplateHandler = (
	params: TemplateParams,
	injections: TemplateInjections,
) => TaggedTemplate;

type Model = GenericObject<{
	timeLeft: number;
}>;

type UseState = <T = Model>(initialState: T) => StateManager<T>;

type UseStyle = (styleHandler: StyleHandler) => string;

type UseTemplate = (
	templateHandler: TemplateHandler,
	templateinjections?: TemplateInjections,
) => TaggedTemplate;

type TemplateParams = {
	state: State<Model>;
	styles: Styles;
	html: HTMX;
};

type StyleParams = {
	css: TaggedStyle;
};

type Params = {
	props: Props;
	useState: UseState;
	useStyle: UseStyle;
	useTemplate: UseTemplate;
};

type Timer = ReturnType<typeof setTimeout>;

type TimerHandlerParams = {
	state: StateManager<Model>;
	seconds: number;
};

type StateWatcherHandlerParams = {
	oneSecond: number;
	timer: Timer;
};

const template = (params: TemplateParams): TaggedTemplate => {
	const { state, styles, html } = params;
	const timeLeft = Number(state.timeLeft);

	return html`

    <div class="timer"> 
      <span>A simple counter</span>
      <span>${timeLeft <= 9 && "0"}${timeLeft || "0"}s</span>
    </div>
    ` as TaggedTemplate;
};

const createStateHandler = (params: TimerHandlerParams) => {
	const { state, seconds } = params;
	return () => {
		const { timeLeft } = state.get();
		if (!timeLeft) return;
		state.set({ timeLeft: timeLeft - seconds });
	};
};

const createStateWatcher =
	({ oneSecond, timer }: StateWatcherHandlerParams) =>
	({ timeLeft }: Model) => {
		if (timeLeft < oneSecond) {
			clearTimeout(timer);
		}
	};

export const TimerApp = ({ useState, useStyle, useTemplate }: Params) => {
	const state = useState<Model>({ timeLeft: 120 });
	useStyle(createStyles);

	const oneSecond = 1;
	const cycleTime = 1000;

	const stateHandler = createStateHandler({ state, seconds: oneSecond });
	const timer = setTimeout(stateHandler, cycleTime);

	const stateWatcher = createStateWatcher({ oneSecond, timer });
	state.watch(stateWatcher);

	return useTemplate(template);
};

const createStyles = () => ({
	TimerApp: ({ css }: StyleParams) => css`
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
   
`,
});
