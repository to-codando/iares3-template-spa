import {
	type GenericObject,
	type HTMX,
	type State,
	type StateManager,
	type TaggedStyle,
	type TaggedTemplate,
	tsx,
} from "iares";

type StyleParams = {
	css: TaggedStyle;
};

type StyleHandler = () => GenericObject;

type UseStyle = (styleHandler: StyleHandler) => Styles;

type Params = {
	useStyle: UseStyle;
};

type Styles = {
	MainApp: string;
};

export const MainApp = ({ useStyle }: Params) => {
	useStyle(createStyles);

	return tsx`
    <div class="wrap">
      <router-view></router-view>
    </div>   
`;
};

const createStyles = () => ({
	MainApp: ({ css }: StyleParams) => css`
    display:flex;
    width:100%;
    padding:1em;

  .wrap,
  router-view {
    display:flex;
    width:100%;
  }
`,
});
