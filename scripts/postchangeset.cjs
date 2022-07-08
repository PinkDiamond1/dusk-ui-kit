/**
 * This script is executed immediately after the changeset CLI is. It sets
 * the monorepo's package.json with the current global release version and
 * automatically commits the change.
 */

console.log("Running post-changeset script...");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const versionFile = JSON.parse(fs.readFileSync(path.resolve("./versions.json"), "utf-8"));
const version = versionFile.releases[0].newVersion;
console.log("Setting package version to", version);
execSync(`npm version --git-tag-version=false ${version}`);
