const { React } = require('powercord/webpack')
const { TextInput } = require("powercord/components/settings");

module.exports = class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { getSetting, updateSetting } = this.props;

    return(
      <div>
        <TextInput
          onChange={(val) => {
            updateSetting('reactSound', val);
          }}
          value={getSetting('reactSound', 'https://cdn.discordapp.com/attachments/899313429054128168/996990758722736198/shwop.m4a')}
        >
          Reaction Noise
        </TextInput>
      </div>
    )
  }
}