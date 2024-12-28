import { TimerApp } from "@/ui/elements";
import { tsx } from "iares";
import type { GenericObject, TaggedStyle } from "iares";

type Styles = { HomeApp: string };
type StyleParams = { css: TaggedStyle };

type StyleHandler = () => GenericObject;
type UseStyle = (styleHandler: StyleHandler) => Styles;
type Params = {
  useStyle: UseStyle;
};

export const HomeApp = ({ useStyle }: Params) => {
  useStyle(createStyles);

  return tsx`
  <div class="wrap">
    <h1>Home Page</h1>
    <span>A simple <b>IARES</b> page template app.</span>
    <${TimerApp} />
  </div>
`;
};

const createStyles = () => ({
  HomeApp: ({ css }: StyleParams) => css`
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
`,
});
