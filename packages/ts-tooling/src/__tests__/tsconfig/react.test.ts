import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const getConfigPath = (config: string) => 
  join(process.cwd(), 'src', 'tsconfig', `${config}.json`);

const readConfig = (config: string) => {
  const content = readFileSync(getConfigPath(config), 'utf-8');
  return JSON.parse(content);
};

describe('React TSConfig Configuration', () => {
  const reactConfig = readConfig('react');

  it('should extend base config and total-typescript React config', () => {
    expect(Array.isArray(reactConfig.extends)).toBe(true);
    expect(reactConfig.extends).toContain('./base.json');
    expect(reactConfig.extends).toContain('@total-typescript/tsconfig/bundler/dom/app');
  });

  it('should configure JSX for React', () => {
    const { compilerOptions } = reactConfig;
    
    expect(compilerOptions).toBeDefined();
    expect(compilerOptions.jsx).toBe('react-jsx');
    expect(compilerOptions.allowImportingTsExtensions).toBe(true);
  });

  it('should include JSON schema reference', () => {
    expect(reactConfig.$schema).toBe('https://json.schemastore.org/tsconfig');
  });

  it('should have minimal direct configuration', () => {
    // React config is kept minimal and relies on extends for most settings
    const { compilerOptions } = reactConfig;
    expect(Object.keys(compilerOptions)).toEqual(['jsx', 'allowImportingTsExtensions']);
  });

  it('should use modern JSX transform', () => {
    const { compilerOptions } = reactConfig;
    expect(compilerOptions.jsx).toBe('react-jsx'); // Modern JSX transform, no React import needed
  });

  it('should inherit strict settings from base config', () => {
    // Since it extends base.json, it inherits all strict settings
    expect(reactConfig.extends).toContain('./base.json');
  });
});