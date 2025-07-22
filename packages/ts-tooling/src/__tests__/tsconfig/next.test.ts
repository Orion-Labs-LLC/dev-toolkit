import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const getConfigPath = (config: string) => 
  join(process.cwd(), 'src', 'tsconfig', `${config}.json`);

const readConfig = (config: string) => {
  const content = readFileSync(getConfigPath(config), 'utf-8');
  return JSON.parse(content);
};

describe('Next.js TSConfig Configuration', () => {
  const nextConfig = readConfig('next');

  it('should extend base config only', () => {
    expect(nextConfig.extends).toBe('./base.json');
  });

  it('should include Next.js TypeScript plugin', () => {
    const { compilerOptions } = nextConfig;
    expect(compilerOptions.plugins).toBeDefined();
    
    const nextPlugin = compilerOptions.plugins.find((plugin: any) => 
      plugin.name === 'next'
    );
    expect(nextPlugin).toBeDefined();
  });

  it('should configure DOM libraries', () => {
    const { compilerOptions } = nextConfig;
    expect(compilerOptions.lib).toBeDefined();
    expect(compilerOptions.lib).toContain('dom');
    expect(compilerOptions.lib).toContain('dom.iterable');
    expect(compilerOptions.lib).toContain('es6');
  });

  it('should use preserve JSX for Next.js', () => {
    const { compilerOptions } = nextConfig;
    expect(compilerOptions.jsx).toBe('preserve'); // Next.js handles JSX transformation
  });

  it('should be configured for modern ES modules', () => {
    const { compilerOptions } = nextConfig;
    expect(compilerOptions.module).toBe('esnext');
    expect(compilerOptions.moduleResolution).toBe('bundler');
  });

  it('should support Next.js specific features', () => {
    const { compilerOptions } = nextConfig;
    expect(compilerOptions.isolatedModules).toBe(true);
    expect(compilerOptions.noEmit).toBe(true);
  });

  it('should include JSON schema reference', () => {
    expect(nextConfig.$schema).toBe('https://json.schemastore.org/tsconfig');
  });
});