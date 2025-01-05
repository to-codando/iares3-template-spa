import { TimerApp } from "@/ui/elements";
import { tsx } from "iares";
import type {
  GenericObject,
  State,
  StateManager,
  TaggedStyle,
  TaggedTemplate,
} from "iares";

type Styles = { HomeApp: string };
type StyleParams = { css: TaggedStyle };

type StyleHandler = () => GenericObject;

type TemplateHandlerParams = {
  state: Model;
};

type TemplateHandler = (params: TemplateHandlerParams) => TaggedTemplate;

type Model = {
  title: string;
};

type UseStyle = (styleHandler: StyleHandler) => Styles;
type UseTemplate = (templateHandler: TemplateHandler) => TaggedTemplate;
type UseState = <T = Model>(initialState: T) => StateManager<T>;

type Params = {
  useState: UseState;
  useStyle: UseStyle;
  useTemplate: UseTemplate;
};

const template = ({ state }: TemplateHandlerParams) =>
  tsx`
  <div class="wrap">
    <h1 class="title">${state.title}</h1>
    <span>A simple <b>IARES</b> page template app.</span>
    <${TimerApp} />
  </div>
` as TaggedTemplate;

export const HomeApp = ({ useStyle, useTemplate, useState }: Params) => {
  useState({ title: "Titulo incial da home" });
  useStyle(createStyles);
  return useTemplate(template);
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
