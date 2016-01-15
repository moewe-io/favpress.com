FavPress Framework Plugin
=========================

FavPress started as a hard copy of [Vafpress](https://github.com/vafour/vafpress-framework), which was abandoned by their original developers. 

## Goals and motivation

Our initial goals are

1. Create a stable and up to date version of the original Vafpress.
2. Only one version, no freemium or premium version. Everyone should be able to use the framework without thinking about.
3. For developers. We want a basic framework developers can easily use. Just basic features, not too fancy stuff or too many features.

## Contribution

We welcome to any contribution, you can:

1. Contribute to the Favpress code base.
2. Report issues and help within the issues section.
3. Spread the word.
4. Help us translate the core.
5. Develop plugins using the framework.
6. Fund us through buying our [plugins](http://codecanyon.net/user/scrobbleme/portfolio?ref=scrobbleme).

## Core Features

* Theme Options Builder
* Metaboxes Builder
* Shortcode Generator Builder

## Features

* Rich Set Of Fields
* Client Side Validation
* Custom Data Source
* Binding Data Source
* Fields Binding
* Fields Dependencies
* Import / Export
* Restore Options to Default
* Localization
* Wordpress 4.4++ compatibility

### Field Types

* TextBox
* TextArea
* CheckBox
* CheckImage
* RadioButton
* RadioImage
* Select
* MultiSelect
* Slider
* Toggle
* Upload
* DatePicker
* ColorPicker
* CodeEditor
* NoteBox
* Fontawesome icon chooser
* WP TinyMCE Editor

### Field Validation

* alphabet
* alphanumeric
* numeric
* email
* url
* maxlength
* minlength
* maxselected
* minselected
* required

## How to build

### Requirements

* Install [Node.Js](https://nodejs.org/)
* Install gulp

      npm install gulp -g
      npm update

* Copy ```config.local.example.js``` to ```config.local.js``` and adapt it to your needs

### Build

#### On updated package.json

    npm update

#### Regular build

    gulp

#### Watch the source folder

    gulp
    gulp watch

#### Release build

    gulp release

## Credits

The original authors of [Vafpress](https://github.com/vafour/vafpress-framework).

Metabox Support:

- WPAlchemy MetaBox PHP Class
  by Dimas Begunoff
  http://www.farinspace.com/wpalchemy-metabox/

- Multiple WYSIWYG
  by Kathy (helgatheviking)
  http://www.kathyisawesome.com/426/multiple-wordpress-wysiwyg-visual-editors/

Icons:

- FontAwesome
  by Dave Gandy
  http://fortawesome.github.com/Font-Awesome/

and propably many others.