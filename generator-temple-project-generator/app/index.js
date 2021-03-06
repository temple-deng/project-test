'use strict';

let generators = require('yeoman-generator');
let _ = require('lodash');
let path = require('path');
let fs = require('fs');
let yosay = require('yosay');

const templateRoot = path.join(__dirname, '../templates');


module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.sourceRoot(templateRoot);

    this.config.save();
  },

  initializing: function() {
    this.log(yosay('欢迎使用我的generator'));
  },

  prompting: function () {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : path.basename(__dirname) // Default to current folder name
    }]).then(function (answers) {
      this.appName = _.camelCase(answers.name);

      this.config.set('appName', this.appName);

      this.config.save();
    }.bind(this));
  },

  configuring: function() {

    let defaultSettings = this.fs.readJSON(path.join(templateRoot, 'package.json'));

    let packageSettings = {
      name: this.appName,
      private: true,
      version: '0.0.1',
      description: 'YOUR DESCRIPTION - Generated by generator-temple-project-generator',
      main: '',
      scripts: defaultSettings.scripts,
      repository: '',
      keywords: [],
      author: 'Your name here',
      devDependencies: defaultSettings.devDependencies,
      dependencies: defaultSettings.dependencies
    };

    this.fs.writeJSON(this.destinationPath('package.json'), packageSettings);
  },

  writing: function() {


    let excludeList = [
      'LICENSE',
      'README.md',
      'CHANGELOG.md',
      'node_modules',
      'package.json',
      '.travis.yml'
    ];

    fs.readdir(this.sourceRoot(), (err, items) => {

      for(let item of items) {

      // Skip the item if it is in our exclude list
        if(excludeList.indexOf(item) !== -1) {
          continue;
        }

        // Copy all items to our root
        let fullPath = path.join(templateRoot, item);
        if(fs.lstatSync(fullPath).isDirectory()) {
          this.bulkDirectory(item, item);
        } else {
          if (item === '.npmignore') {
            this.copy(item, '.gitignore');
          } else {
            this.copy(item, item);
          }
        }
      }
    });
  },

  install: function() {
    this.npmInstall();
  },

  end: function() {
    this.log('project initial completed!');
  }
});


