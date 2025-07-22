import { describe, expect, it } from 'vitest';
import type { TSESLint } from '@typescript-eslint/utils';
import nodeConfig from '../../eslint/node.js';

describe('Node.js ESLint Configuration', () => {
  it('should export a valid ESLint configuration array', () => {
    expect(Array.isArray(nodeConfig)).toBe(true);
    expect(nodeConfig.length).toBeGreaterThan(0);
  });

  it('should include base configuration', () => {
    const tsConfig = nodeConfig.find((config: TSESLint.FlatConfig.Config) => 
      config.rules?.['@typescript-eslint/consistent-type-imports']
    );
    expect(tsConfig).toBeDefined();
  });

  it('should configure Node.js globals', () => {
    const nodeGlobalsConfig = nodeConfig.find((config: TSESLint.FlatConfig.Config) => 
      config.languageOptions?.globals
    );
    expect(nodeGlobalsConfig).toBeDefined();
    expect(nodeGlobalsConfig?.languageOptions?.globals).toBeDefined();
    
    // Should include Node.js globals like 'process', 'Buffer', etc.
    const globals = nodeGlobalsConfig?.languageOptions?.globals || {};
    expect(Object.keys(globals).length).toBeGreaterThan(0);
  });

  it('should disable DOM-specific unicorn rules', () => {
    const nodeSpecificConfig = nodeConfig.find((config: TSESLint.FlatConfig.Config) => 
      config.rules?.['unicorn/prefer-dom-node-text-content'] === 'off'
    );
    expect(nodeSpecificConfig).toBeDefined();
    expect(nodeSpecificConfig?.rules?.['unicorn/prefer-dom-node-text-content']).toBe('off');
    expect(nodeSpecificConfig?.rules?.['unicorn/prefer-query-selector']).toBe('off');
  });

  it('should target appropriate file patterns', () => {
    const nodeSpecificConfig = nodeConfig.find((config: TSESLint.FlatConfig.Config) => 
      config.rules?.['unicorn/prefer-dom-node-text-content'] && config.files
    );
    expect(nodeSpecificConfig?.files).toBeDefined();
    expect(nodeSpecificConfig?.files).toContain('**/*.{ts,mts,js,mjs,cjs}');
  });

  it('should support both TypeScript and JavaScript files', () => {
    const nodeSpecificConfig = nodeConfig.find((config: TSESLint.FlatConfig.Config) => 
      config.files?.includes('**/*.{ts,mts,js,mjs,cjs}')
    );
    expect(nodeSpecificConfig).toBeDefined();
    
    // Should include both TS and JS extensions
    const files = nodeSpecificConfig?.files?.[0] || '';
    expect(files).toContain('ts');
    expect(files).toContain('mts');
    expect(files).toContain('js');
    expect(files).toContain('mjs');
    expect(files).toContain('cjs');
  });
});