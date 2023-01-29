import { Injector, settings, types, webpack } from "replugged";

export let ReactionSettings: settings.SettingsManager<
  { reactSound: string; allPlay: boolean },
  never
>;

const inject = new Injector();

export async function start(): Promise<void> {
  ReactionSettings = await settings.init("reaction-noise", {
    reactSound:
      "https://raw.githubusercontent.com/MeguminSama/VencordPlugins/main/plugins/moyai/moyai.mp3",
    allPlay: false,
  });

  const reactionMod = await webpack.waitForModule(webpack.filters.bySource("addReaction"));

  if (reactionMod) {
    // @ts-expect-error expect the unexpected
    injectReaction(reactionMod);
  }
}

function injectReaction(ReactionModule: types.ObjectExports): void {
  // @ts-expect-error object type
  inject.after(ReactionModule.prototype, "addReaction", (args, _res) => {
    // Args[3] is an Array only when you send the message, otherwise undefined
    if (
      ReactionSettings.get("allPlay", false)
        ? typeof args[3] === "undefined"
        : typeof args[3] !== "undefined"
    ) {
      void new Audio(
        ReactionSettings.get(
          "reactSound",
          "https://raw.githubusercontent.com/MeguminSama/VencordPlugins/main/plugins/moyai/moyai.mp3",
        ),
      ).play();
    }
  });
}

export { Settings } from "./Settings";

export function stop(): void {
  inject.uninjectAll();
}
