# HK calculation-tool-helper

Calculation tools are a form service that provides calculations for different purposes by taking different inputs from users.

* Component folder contains calculation tools
* App.vue selects a folder to start the calculation tool
* Utils and gui contains default project javascript and stylesheet files, do not change current files unless you know what you are doing.
* Assets contains stylesheet files of calculation tools

## To create a new calculation tool

-Project has example calculation tool "cc-delay-interest". To create a new calculation tool, execute the following steps in order;

1. Create new folder with new calculation tool name under ./src/assets/pages/calculation-tools
2. Copy the inquiry.scss file from cc-delay-interest 
3. Create new folder with same name under ./src/components/calculation-tools
4. Under the folder, create two more folders: form.vue and results.vue. Alternatively, you can copy from example tool and edit.
5. You can manage which calculation tool will import from App.vue

## Project setup
```
Project's packages stable with node 10.16.3 version. Please download or change with nvm before install.

yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```
