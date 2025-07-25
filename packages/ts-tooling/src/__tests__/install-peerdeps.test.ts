import { execSync } from "node:child_process";
import { copyFileSync, existsSync, readFileSync, type PathLike } from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  copyConfigFiles,
  detectPackageManager,
  findPackageRoot,
  getInstallCommand,
  main,
} from "../scripts/install-peerdeps";

// Mock all Node.js modules
vi.mock("node:child_process");
vi.mock("node:fs");
vi.mock("node:path");

const mockExecSync = vi.mocked(execSync);
const mockCopyFileSync = vi.mocked(copyFileSync);
const mockExistsSync = vi.mocked(existsSync);
const mockReadFileSync = vi.mocked(readFileSync);
const mockPath = vi.mocked(path);

// Create a global mock for findPackageRoot that can be reused across tests
const _mockFindPackageRoot = vi.fn().mockReturnValue("/mock/package/root");

describe("Package Manager Detection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console methods to avoid cluttering test output
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should detect pnpm when available", () => {
    mockExecSync.mockReturnValueOnce(Buffer.from("8.0.0"));

    const result = detectPackageManager();

    expect(result).toBe("pnpm");
    expect(mockExecSync).toHaveBeenCalledWith("pnpm --version", { stdio: "ignore" });
  });

  it("should fall back to npm when pnpm is not available", () => {
    mockExecSync.mockImplementationOnce(() => {
      throw new Error("Command not found");
    });

    const result = detectPackageManager();

    expect(result).toBe("npm");
    expect(mockExecSync).toHaveBeenCalledWith("pnpm --version", { stdio: "ignore" });

    expect(console.log).toHaveBeenCalledWith("pnpm not available, falling back to npm");
  });

  it("should handle execSync errors gracefully", () => {
    mockExecSync.mockImplementationOnce(() => {
      throw new Error("Process failed");
    });

    const result = detectPackageManager();

    expect(result).toBe("npm");
  });
});

describe("Install Command Generation", () => {
  it("should generate correct pnpm command for development dependencies", () => {
    const packages = ["eslint@8.0.0", "typescript@5.0.0"];

    const command = getInstallCommand("pnpm", packages, true);

    expect(command).toBe("pnpm add --D eslint@8.0.0 typescript@5.0.0");
  });

  it("should generate correct pnpm command for production dependencies", () => {
    const packages = ["lodash@4.0.0", "axios@1.0.0"];

    const command = getInstallCommand("pnpm", packages, false);

    expect(command).toBe("pnpm add  lodash@4.0.0 axios@1.0.0");
  });

  it("should generate correct npm command for development dependencies", () => {
    const packages = ["jest@29.0.0", "eslint@8.0.0"];

    const command = getInstallCommand("npm", packages, true);

    expect(command).toBe("npm install --save-dev jest@29.0.0 eslint@8.0.0");
  });

  it("should generate correct npm command for production dependencies", () => {
    const packages = ["react@18.0.0", "react-dom@18.0.0"];

    const command = getInstallCommand("npm", packages, false);

    expect(command).toBe("npm install  react@18.0.0 react-dom@18.0.0");
  });

  it("should handle empty package list", () => {
    const command = getInstallCommand("pnpm", [], true);

    expect(command).toBe("pnpm add --D");
  });

  it("should handle single package", () => {
    const packages = ["typescript@5.0.0"];

    const command = getInstallCommand("npm", packages, true);

    expect(command).toBe("npm install --save-dev typescript@5.0.0");
  });

  it("should default to development mode when isDevelopment is undefined", () => {
    const packages = ["eslint@8.0.0"];

    const command = getInstallCommand("pnpm", packages);

    expect(command).toBe("pnpm add --D eslint@8.0.0");
  });
});

describe("Config Files Copying", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    vi.spyOn(console, "log").mockImplementation(() => {});
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    vi.spyOn(console, "warn").mockImplementation(() => {});

    // Mock path.join to return predictable paths
    mockPath.join.mockImplementation((...args) => args.join("/"));

    // Mock path.dirname for findPackageRoot traversal
    mockPath.dirname.mockImplementation(p => {
      if (p === "/dist/scripts") return "/dist";
      if (p === "/dist") return "/mock/package/root";
      if (p === "/mock/package/root") return "/";
      return "/";
    });

    // Mock process.cwd()
    vi.spyOn(process, "cwd").mockReturnValue("/project/root");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should copy .prettierignore when source file exists", () => {
    // Mock existsSync to simulate finding package.json and .prettierignore
    mockExistsSync.mockImplementation((filePath: PathLike) => {
      const pathStr = filePath.toString();
      return (
        pathStr === "/mock/package/root/package.json" ||
        pathStr === "/mock/package/root/src/prettier-config/.prettierignore"
      );
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    mockCopyFileSync.mockImplementation(() => {});

    copyConfigFiles();

    expect(mockExistsSync).toHaveBeenCalledWith(expect.stringContaining(".prettierignore"));
    expect(mockCopyFileSync).toHaveBeenCalledWith(
      expect.stringContaining(".prettierignore"),
      "/project/root/.prettierignore",
    );

    expect(console.log).toHaveBeenCalledWith("✅ Copied .prettierignore to project root");
  });

  it("should warn when source .prettierignore does not exist", () => {
    // Mock existsSync to find package.json but not .prettierignore
    mockExistsSync.mockImplementation((filePath: PathLike) => {
      const pathStr = filePath.toString();
      return pathStr === "/mock/package/root/package.json";
    });

    copyConfigFiles();

    expect(mockExistsSync).toHaveBeenCalledWith(expect.stringContaining(".prettierignore"));
    expect(mockCopyFileSync).not.toHaveBeenCalled();

    expect(console.warn).toHaveBeenCalledWith("⚠️ .prettierignore not found in package");
  });

  it("should handle copy errors gracefully", () => {
    // Mock existsSync to simulate finding package.json and .prettierignore
    mockExistsSync.mockImplementation((filePath: PathLike) => {
      const pathStr = filePath.toString();
      return (
        pathStr === "/mock/package/root/package.json" ||
        pathStr === "/mock/package/root/src/prettier-config/.prettierignore"
      );
    });
    mockCopyFileSync.mockImplementation(() => {
      throw new Error("Permission denied");
    });

    copyConfigFiles();

    expect(mockCopyFileSync).toHaveBeenCalled();

    expect(console.warn).toHaveBeenCalledWith(
      "⚠️ Failed to copy .prettierignore:",
      "Permission denied",
    );
  });

  it("should use correct source and target paths", () => {
    // Mock existsSync to simulate finding package.json and .prettierignore
    mockExistsSync.mockImplementation((filePath: PathLike) => {
      const pathStr = filePath.toString();
      return (
        pathStr === "/mock/package/root/package.json" ||
        pathStr === "/mock/package/root/src/prettier-config/.prettierignore"
      );
    });

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    mockCopyFileSync.mockImplementation(() => {});

    copyConfigFiles();

    // The function should copy from the package root's src directory

    expect(mockCopyFileSync).toHaveBeenCalledWith(
      "/mock/package/root/src/prettier-config/.prettierignore",
      "/project/root/.prettierignore",
    );
  });
});

describe("Package Root Detection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console methods to avoid cluttering test output
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should find package root when package.json exists in current directory", () => {
    mockExistsSync.mockImplementation((filePath: PathLike) => {
      return filePath.toString() === "/current/package.json";
    });
    mockPath.join.mockImplementation((...args) => args.join("/"));
    mockPath.dirname.mockImplementation(p => {
      if (p === "/current") return "/";
      return p.split("/").slice(0, -1).join("/") || "/";
    });

    const result = findPackageRoot("/current");

    expect(result).toBe("/current");
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockPath.join).toHaveBeenCalledWith("/current", "package.json");
  });

  it("should find package root by traversing up directories", () => {
    mockExistsSync.mockImplementation((filePath: PathLike) => {
      return filePath.toString() === "/project/package.json";
    });
    mockPath.join.mockImplementation((...args) => args.join("/"));
    mockPath.dirname.mockImplementation(p => {
      if (p === "/project/nested/deep") return "/project/nested";
      if (p === "/project/nested") return "/project";
      if (p === "/project") return "/";
      return "/";
    });

    const result = findPackageRoot("/project/nested/deep");

    expect(result).toBe("/project");
  });

  it("should throw error when package.json is not found", () => {
    mockExistsSync.mockReturnValue(false);
    mockPath.join.mockImplementation((...args) => args.join("/"));
    // eslint-disable-next-line sonarjs/no-invariant-returns
    mockPath.dirname.mockImplementation(p => {
      if (p === "/start") return "/";
      return "/";
    });

    expect(() => findPackageRoot("/start")).toThrow(
      "Could not find package.json in any parent directory",
    );
  });
});

describe("Main Function Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    vi.spyOn(console, "log").mockImplementation(() => {});
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    vi.spyOn(console, "warn").mockImplementation(() => {});
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    vi.spyOn(console, "error").mockImplementation(() => {});

    vi.spyOn(process, "exit").mockImplementation(() => undefined as never);

    // Mock path operations
    mockPath.join.mockImplementation((...args) => args.join("/"));

    // Mock path.dirname for findPackageRoot traversal
    mockPath.dirname.mockImplementation(p => {
      if (p === "/dist/scripts") return "/dist";
      if (p === "/dist") return "/mock/package/root";
      if (p === "/mock/package/root") return "/";
      return "/";
    });

    // Mock existsSync to simulate finding package.json (needed for main function)
    mockExistsSync.mockImplementation((filePath: PathLike) => {
      const pathStr = filePath.toString();
      return (
        pathStr === "/mock/package/root/package.json" ||
        pathStr === "/mock/package/root/src/prettier-config/.prettierignore"
      );
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should successfully install peer dependencies", () => {
    const mockPackageJson = {
      peerDependencies: {
        eslint: "^8.0.0",
        typescript: "^5.0.0",
      },
    };

    mockReadFileSync.mockReturnValue(JSON.stringify(mockPackageJson));
    mockExecSync.mockReturnValueOnce(Buffer.from("8.0.0")); // pnpm detection
    mockExecSync.mockReturnValueOnce(Buffer.from("")); // install command
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    mockCopyFileSync.mockImplementation(() => {});

    main();

    expect(mockReadFileSync).toHaveBeenCalledWith(expect.stringContaining("package.json"), "utf8");
    expect(mockExecSync).toHaveBeenCalledWith("pnpm --version", { stdio: "ignore" });
    expect(mockExecSync).toHaveBeenCalledWith("pnpm add --D eslint@^8.0.0 typescript@^5.0.0", {
      stdio: "inherit",
    });

    expect(console.log).toHaveBeenCalledWith("Detected package manager: pnpm");

    expect(console.log).toHaveBeenCalledWith("Installing peer dependencies: eslint, typescript");

    expect(console.log).toHaveBeenCalledWith("✅ Peer dependencies installed successfully!");
  });

  it("should handle package.json with no peer dependencies", () => {
    const mockPackageJson = {
      dependencies: { lodash: "4.0.0" },
    };

    mockReadFileSync.mockReturnValue(JSON.stringify(mockPackageJson));

    main();

    expect(console.log).toHaveBeenCalledWith("No peer dependencies found.");
    expect(mockExecSync).toHaveBeenCalledTimes(0);
  });

  it("should handle empty peer dependencies object", () => {
    const mockPackageJson = {
      peerDependencies: {},
    };

    mockReadFileSync.mockReturnValue(JSON.stringify(mockPackageJson));

    main();

    expect(console.log).toHaveBeenCalledWith("No peer dependencies found.");
  });

  it("should handle file read errors", () => {
    mockReadFileSync.mockImplementation(() => {
      throw new Error("File not found");
    });

    main();

    expect(console.error).toHaveBeenCalledWith(
      "❌ Failed to install peer dependencies:",
      "File not found",
    );
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it("should handle invalid JSON in package.json", () => {
    mockReadFileSync.mockReturnValue("invalid json");

    main();

    expect(console.error).toHaveBeenCalledWith(
      "❌ Failed to install peer dependencies:",
      expect.stringContaining("Unexpected token"),
    );
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it("should handle install command failures", () => {
    const mockPackageJson = {
      peerDependencies: { eslint: "^8.0.0" },
    };

    mockReadFileSync.mockReturnValue(JSON.stringify(mockPackageJson));
    mockExecSync.mockReturnValueOnce(Buffer.from("8.0.0")); // pnpm detection succeeds
    mockExecSync.mockImplementationOnce(() => {
      throw new Error("Install failed");
    });

    main();

    expect(console.error).toHaveBeenCalledWith(
      "❌ Failed to install peer dependencies:",
      "Install failed",
    );
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it("should use npm fallback when pnpm fails", () => {
    const mockPackageJson = {
      peerDependencies: { eslint: "^8.0.0" },
    };

    mockReadFileSync.mockReturnValue(JSON.stringify(mockPackageJson));
    mockExecSync.mockImplementationOnce(() => {
      throw new Error("pnpm not found");
    });
    mockExecSync.mockReturnValueOnce(Buffer.from("")); // npm install
    mockExistsSync.mockReturnValue(false); // no .prettierignore

    main();

    expect(console.log).toHaveBeenCalledWith("pnpm not available, falling back to npm");

    expect(console.log).toHaveBeenCalledWith("Detected package manager: npm");
    expect(mockExecSync).toHaveBeenCalledWith("npm install --save-dev eslint@^8.0.0", {
      stdio: "inherit",
    });
  });

  it("should copy config files after successful installation", () => {
    const mockPackageJson = {
      peerDependencies: { eslint: "^8.0.0" },
    };

    mockReadFileSync.mockReturnValue(JSON.stringify(mockPackageJson));
    mockExecSync.mockReturnValueOnce(Buffer.from("8.0.0")); // pnpm detection
    mockExecSync.mockReturnValueOnce(Buffer.from("")); // install
    mockExistsSync.mockReturnValue(true);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    mockCopyFileSync.mockImplementation(() => {});

    main();

    expect(mockCopyFileSync).toHaveBeenCalled();

    expect(console.log).toHaveBeenCalledWith("✅ Copied .prettierignore to project root");
  });
});
