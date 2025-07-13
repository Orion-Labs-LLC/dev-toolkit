#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function detectPackageManager() {
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
    return 'pnpm';
  } catch {}
  
  return 'npm';
}

function getInstallCommand(packageManager, packages, isDev = true) {
  const devFlag = isDev ? (packageManager === 'npm' ? '--save-dev' : '--D') : '';
  
  switch (packageManager) {
    case 'pnpm':
      return `pnpm add ${devFlag} ${packages.join(' ')}`;
    case 'npm':
    default:
      return `npm install ${devFlag} ${packages.join(' ')}`;
  }
}

function main() {
  try {
    // Read package.json to get peer dependencies
    const packageJsonPath = join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    const peerDeps = packageJson.peerDependencies || {};
    
    // Get all peer dependency packages with versions
    const packages = Object.entries(peerDeps).map(([name, version]) => `${name}@${version}`);
    
    if (packages.length === 0) {
      console.log('No peer dependencies found.');
      return;
    }
    
    const packageManager = detectPackageManager();
    console.log(`Detected package manager: ${packageManager}`);
    console.log(`Installing peer dependencies: ${Object.keys(peerDeps).join(', ')}`);
    
    const command = getInstallCommand(packageManager, packages, true);
    console.log(`Running: ${command}`);
    
    execSync(command, { stdio: 'inherit' });
    console.log('✅ Peer dependencies installed successfully!');
    
  } catch (error) {
    console.error('❌ Failed to install peer dependencies:', error.message);
    process.exit(1);
  }
}

main();