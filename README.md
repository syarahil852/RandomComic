# RandomComic

A simple node app to serve up a random comic from one of the following sourcesf

* XKCD

* Cyanide and Happiness

## Contributing

Contributions are always welcome! Familiarize yourself with the source code first, especially `generator.js`. 

The format of the comic delivered to the front end is a JSON object with the following properties:

| Field  | About | Required |
| ------------- | ------------- | :-: | 
| img | Direct URL to the comic image | x |
| publisherUrl  | Original URL of the comic  | x |
| publisher | The name of the comic strip | x |
| title | Title of the specific comic comic | x |
| alt | Hover text if the comic supports it | |
