module.exports = {
  message: 'NativeScript Plugins ~ made with โค๏ธ  Choose a command to start...',
  pageSize: 32,
  scripts: {
    default: 'nps-i',
    nx: {
      script: 'nx',
      description: 'Execute any command with the @nrwl/cli',
    },
    format: {
      script: 'nx format:write',
      description: 'Format source code of the entire workspace (auto-run on precommit hook)',
    },
    '๐ง': {
      script: `npx cowsay "NativeScript plugin demos make developers ๐"`,
      description: '_____________  Apps to demo plugins with  _____________',
    },
    // demos
    apps: {
      '...Vanilla...': {
        script: 'npx cowsay "Nothing wrong with vanilla ๐ฆ"',
        description: ' ๐ป Vanilla',
      },
      demo: {
        clean: {
          script: 'nx run demo:clean',
          description: 'โ  Clean  ๐งน',
        },
        ios: {
          script: 'nx run demo:ios',
          description: 'โ  Run iOS  ๏ฃฟ',
        },
        android: {
          script: 'nx run demo:android',
          description: 'โ  Run Android  ๐ค',
        },
      },
      '...Angular...': {
        script: 'npx cowsay "Test all the Angles!"',
        description: ' ๐ป Angular',
      },
      'demo-angular': {
        clean: {
          script: 'nx run demo-angular:clean',
          description: 'โ  Clean  ๐งน',
        },
        ios: {
          script: 'nx run demo-angular:ios',
          description: 'โ  Run iOS  ๏ฃฟ',
        },
        android: {
          script: 'nx run demo-angular:android',
          description: 'โ  Run Android  ๐ค',
        },
      },

      '...Vue...': {
        script: 'npx cowsay "You like the vue here..."',
        description: ' ๐ป Vue',
      },
      'demo-vue': {
        clean: {
          script: 'nx run demo-vue:clean',
          description: 'โ  Clean  ๐งน',
        },
        ios: {
          script: 'nx run demo-vue:ios',
          description: 'โ  Run iOS  ๏ฃฟ',
        },
        android: {
          script: 'nx run demo-vue:android',
          description: 'โ  Run Android  ๐ค',
        },
      },
    },

    'โ๏ธ': {
      script: `npx cowsay "@heywhy/* packages will keep your โ๏ธ cranking"`,
      description: '_____________  @heywhy/*  _____________',
    },
    // packages
    // build output is always in dist/packages
    '@heywhy': {
      // @heywhy/ns-secure-storage
      'ns-secure-storage': {
        build: {
          script: 'nx run ns-secure-storage:build.all',
          description: '@heywhy/ns-secure-storage: Build',
        },
      },
      'build-all': {
        script: 'nx run-many --target=build.all --all',
        description: 'Build all packages',
      },
    },
    'โก': {
      script: `npx cowsay "Focus only on source you care about for efficiency โก"`,
      description: '_____________  Focus (VS Code supported)  _____________',
    },
    focus: {
      'ns-secure-storage': {
        script: 'nx run ns-secure-storage:focus',
        description: 'Focus on @heywhy/ns-secure-storage',
      },
      reset: {
        script: 'nx g @heywhy/plugin-tools:focus-packages',
        description: 'Reset Focus',
      },
    },
    '.....................': {
      script: `npx cowsay "That's all for now folks ~"`,
      description: '.....................',
    },
  },
};
