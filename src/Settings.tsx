import { common, components } from "replugged";
import { ReactionSettings } from "./index";

const { React } = common;
const { TextInput, Text, Divider, Switch, Flex } = components;

export function Settings() {
  let [reactSound, setReactSound] = React.useState(
    ReactionSettings.get(
      "reactSound",
      "https://raw.githubusercontent.com/MeguminSama/VencordPlugins/main/plugins/moyai/moyai.mp3",
    ),
  );
  let [allPlay, setAllPlay] = React.useState(ReactionSettings.get("allPlay", false));

  return (
    <>
      <Text.Eyebrow style={{ marginBottom: "5px" }}>Reaction Sound</Text.Eyebrow>
      <TextInput
        value={reactSound}
        onChange={(e: string) => {
          ReactionSettings.set("reactSound", e);
          setReactSound(e);
        }}
      />
      <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
      <Flex>
        <Switch
          checked={allPlay}
          onChange={(e: boolean) => {
            ReactionSettings.set("allPlay", e);
            setAllPlay(e);
          }}
        />
        <Text.Eyebrow style={{ left: "20px", top: "4px", position: "relative" }}>
          Play when others React
        </Text.Eyebrow>
      </Flex>
    </>
  );
}
