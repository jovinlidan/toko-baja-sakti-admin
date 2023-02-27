import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadFirePreset } from "tsparticles-preset-fire";
import * as React from "react";

export class ParticlesContainer extends React.PureComponent<any> {
  // this customizes the component tsParticles installation
  async customInit(engine: Engine): Promise<void> {
    // this adds the preset to tsParticles, you can safely use the
    await loadFirePreset(engine);
  }

  render() {
    const options = {
      preset: "fire",
    };

    return <Particles options={options} init={this.customInit} />;
  }
}
