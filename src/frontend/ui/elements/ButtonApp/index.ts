import type {
	ContextElement,
	GenericObject,
	HTMX,
	State,
	StateManager,
	TaggedStyle,
	TaggedTemplate,
} from "iares";

type Handler = () => number;

type Props = {
	label: string;
	handler: Handler;
	color: string;
};

type Model = State<{ label: string }>;

type StylesParams = {
	props: Props;
	state: Model;
	css: TaggedStyle;
};

type Styles = { button: string; text: string };

type Actions = {
	increment: () => void;
};

type TemplateParams = {
	props: Props;
	state: Model;
	actions: Actions;
	styles: Styles;
	html: HTMX;
};

type Injections = GenericObject<{
	actions: Actions;
	styles: Styles;
}>;

type TemplateInjections = () => Injections;

type StyleHandler = () => GenericObject;

type UseStyle = (styleHandler: StyleHandler) => string;

type UseTemplate = (
	templateHandler: TemplateHandler,
	templateinjections?: TemplateInjections,
) => TaggedTemplate;

type UseState = <T = Model>(initialState: T) => StateManager<T>;

type TemplateHandler = (
	params: TemplateParams,
	injections: TemplateInjections,
) => TaggedTemplate;

type Params = {
	props: Props;
	useState: UseState;
	useStyle: UseStyle;
	useTemplate: UseTemplate;
	element: ContextElement;
};

const template = (params: TemplateParams): TaggedTemplate => {
	const { props, state, styles, html } = params;

	return html`
      <div class=${styles.button} onClick=${props.handler}>
        <span> ${state.label}</span>
      </div>
    ` as TaggedTemplate;
};

export const ButtonApp = (params: Params) => {
	const { useState, useStyle, useTemplate } = params;
	useState({ label: "Teste" });
	useStyle(createStyles);
	return useTemplate(template);
};

const createStyles = () => ({
	ButtonApp: ({ props, css }: StylesParams) => css`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    color: #ebebeb;
    padding: 15px 30px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 16px;
    background:#6593d9; 

  .wrap > span {  padding: 10px; background:red }

  &:hover {
    background: #fff ;
  }

`,
});
