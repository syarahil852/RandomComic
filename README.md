# RandomComic

A simple node app to serve up a random comic from one of the following sourcesf

* xkcd

* Cyanide and Happiness

* Dilbert

* SMBC

* Penny Arcade

* Abstruse Goose

## Contributing

Contributions are always welcome! Familiarize yourself with the source code first, especially `generator.js`. 

The format of the comic delivered to the front end is a JSON object with the following properties:

| Field  | About | Required |
| ------------- | ------------- | :-: | 
| img | Direct URL to the comic image | ✓ |
| publisherUrl  | Original URL of the comic  | ✓ |
| publisher | The name of the comic strip | ✓ |
| title | Title of the specific comic comic | ✓ |
| alt | Hover text if the comic supports it | |

## Complaints/Concerns

If you are one of the comic strip creators and would like your comic *not* included in RandomComic, then please leave a github issue or contact me through email and it will be removed.