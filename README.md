# MMM-UselessFacts

Module to display useless and random facts.
Currently supported in english or german

Based on https://uselessfacts.jsph.pl/

------------

## Installation

Download this into your modules folder

For example:

cd ~/MagicMirror/modules

git clone https://github.com/yourdawi/MMM-UselessFacts

------------

## Config

Add to config

```javascript
{
    module: "MMM-UselessFacts",
    position: "middle_center",
    config: {
        updateInterval: 300000, //5min
        fadeSpeed: 4000,
        language: "en" // Change to your language - "de" for german
    }
}
```
