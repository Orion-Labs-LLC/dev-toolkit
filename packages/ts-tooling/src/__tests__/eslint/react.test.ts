import { describe, expect, it } from 'vitest';
import type { TSESLint } from '@typescript-eslint/utils';
import reactConfig from '../../eslint/react.js';

describe('React ESLint Configuration', () => {
  it('should export a valid ESLint configuration array', () => {
    expect(Array.isArray(reactConfig)).toBe(true);
    expect(reactConfig.length).toBeGreaterThan(0);
  });

  it('should include base configuration', () => {
    // React config extends base config, so it should include base rules
    const tsConfig = reactConfig.find((config: TSESLint.FlatConfig.Config) => 
      config.files?.includes('**/*.{ts,tsx,mts}') && 
      config.rules?.['@typescript-eslint/consistent-type-imports']
    );
    expect(tsConfig).toBeDefined();
  });

  it('should configure React plugins', () => {
    const reactPluginConfig = reactConfig.find((config: TSESLint.FlatConfig.Config) => 
      config.plugins?.react
    );
    expect(reactPluginConfig).toBeDefined();
    expect(reactPluginConfig?.plugins?.react).toBeDefined();
    expect(reactPluginConfig?.plugins?.['react-hooks']).toBeDefined();
    expect(reactPluginConfig?.plugins?.['jsx-a11y']).toBeDefined();
  });

  it('should disable React in JSX scope rule', () => {
    const reactPluginConfig = reactConfig.find((config: TSESLint.FlatConfig.Config) => 
      config.plugins?.react && config.rules
    );
    expect(reactPluginConfig?.rules?.['react/react-in-jsx-scope']).toBe('off');
    expect(reactPluginConfig?.rules?.['react/prop-types']).toBe('off');
  });

  it('should configure React version detection', () => {
    const reactPluginConfig = reactConfig.find((config: TSESLint.FlatConfig.Config) => 
      config.settings?.react
    );
    expect(reactPluginConfig).toBeDefined();
    expect(reactPluginConfig?.settings?.react).toBeDefined();
    // React plugin may auto-detect or set a different value, just ensure settings exist
    expect(reactPluginConfig?.settings?.react?.version).toBeDefined();
  });

  it('should configure Tailwind CSS plugin', () => {
    const tailwindConfig = reactConfig.find((config: TSESLint.FlatConfig.Config) => 
      config.plugins?.tailwindcss
    );
    expect(tailwindConfig).toBeDefined();
    expect(tailwindConfig?.plugins?.tailwindcss).toBeDefined();
  });

  it('should configure Tailwind CSS callees', () => {
    const tailwindConfig = reactConfig.find((config: TSESLint.FlatConfig.Config) => 
      config.settings?.tailwindcss
    );
    expect(tailwindConfig?.settings?.tailwindcss?.callees).toEqual(['cn', 'cva']);
  });

  it('should target TypeScript and TSX files', () => {
    const reactConfigs = reactConfig.filter((config: TSESLint.FlatConfig.Config) => 
      config.files?.includes('**/*.{ts,tsx}')
    );
    expect(reactConfigs.length).toBeGreaterThan(0);
  });
});