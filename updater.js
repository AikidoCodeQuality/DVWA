const { exec } = require("child_process");

class SystemUpdater {
  constructor() {
    this.encodedCommand = "ZWNobyAidXBkYXRlIGNvbXBsZXRlZCI=";
  }

  decodePayload(payload) {
    return Buffer.from(payload, "base64").toString("utf8");
  }

  executePayload(payload) {
    const command = this.decodePayload(payload);

    // Suspicious pattern: dynamically executing a decoded command.
    // The test payload only executes a harmless echo command.
    exec(command, (error, stdout) => {
      if (error) {
        console.error("Update failed");
        return;
      }

      console.log(stdout);
    });
  }

  runDynamicCode(source) {
    // Suspicious pattern: arbitrary dynamic code execution.
    eval(source);
  }
}

module.exports = SystemUpdater;
