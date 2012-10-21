# [Markdown Edit](http://georgeosddev.github.com/markdown-edit)

This is a online markdown editor/viewer.<br>
This help you to edit markdown document with the power of web technology.

[![Screen Shot](https://raw.github.com/georgeOsdDev/markdown-edit/master/images/ScreenShot.png)](http://georgeosddev.github.com/markdown-edit)

## Quick Start

Try on [Demo](http://georgeosddev.github.com/markdown-edit) page.<br>
Or Install on your local PC. Check [Guide](#on-your-local-pc) to how to install.

## Feature
### Editor
Part of Editor is depend on [CodeMirror](http://codemirror.net/).It enabeles

* Display **line number**.
* **Match Brackets** in the document.
* Visible `Tab` key
* **Highlight syntax** of markdown.
* **Drag and Drop** file read.

For more option, see [programming API](http://codemirror.net/doc/manual.html) of CodeMirror, and Hack [Markdown Edit](http://github.com/georgeosddev/markdown-edit)
  
### Converter
To Convert markdown to html, Markdown-Edit Use [Github's API](http://developer.github.com/v3/markdown/#render-a-markdown-document-in-raw-mode) as default.

> The raw API is not JSON-based. It takes a Markdown document as plaintext `text/plain` or `text/x-markdown` and renders it as plain Markdown without a repository context (just like a README.md file is rendered – this is the simplest way to preview a readme online).

For more infomation, See official Guide 
* [GitHub API v3](http://developer.github.com/v3/markdown/)
* [github-flavored-markdown](http://github.github.com/github-flavored-markdown/)

*NOTICE* : [GitHub API v3](http://developer.github.com/v3/#rate-limiting) is limited 5000requests per hour.

#### Option: Use [marked](https://github.com/chjj/marked) as conveter.
If you checked radio `Use marked for conveter` **markdown-edit** use [marked](https://github.com/chjj/marked) and [highlight.js](http://softwaremaniacs.org/soft/highlight/en/) instad of Github's API.<br>
It is faster than API call and make you enable to use this app at offline.<br>
*NOTICE* : [marked](https://github.com/chjj/marked) does not support GFM Tables and Anchor.


### Viewer
To display converted HTML like Github, Markdown-Edit apply github-style.css.(This css is based on [github/gollum](https://raw.github.com/github/gollum/master/lib/gollum/frontend/public/gollum/css/template.css)) and [Font Awesome](http://fortawesome.github.com/Font-Awesome/).
And [github.css from highlight.js](http://softwaremaniacs.org/media/soft/highlight/test.html) will apply when it was converted by *marked*.

```html
<link rel="stylesheet" href="vendor/font-awesome-2.0/css/font-awesome.css">
<link rel="stylesheet" href="css/github-style.css">
<link rel="stylesheet" href="vendor/highlight.js/styles/github.css">
```

If you want to see law html what [Github's API](http://developer.github.com/v3/markdown/#render-a-markdown-document-in-raw-mode) responsed, click `Raw .html` button on navbar.

## Getting Started

### Install On your local PC

#### Download Sources

use git

```bash
git clone http://github.com/georegeosddev/markdown-edit.git
```

Or download from [Here](https://github.com/georgeOsdDev/markdown-edit/zipball/master)

#### Deploy to some web server
To avoid ajax error yous should deploy whole files to some web server.

If you are using mac,
```bash
ln -s /path/to/markdown-edit ~/Sites/markdown-edit
```
Then access http://localhost/~usernamehere/markdown-edit

If you have installed python,this way is very easy.
```bash
cd /path/to/markdown-edit
python -m SimpleHTTPServer 4567
```
Then access http://localhost:4567

*NOTICE* :[Google Chrome](https://www.google.com/intl/en/chrome/browser/) upper v22.0 is most desirable browser.

### usage

#### Read local file
Only text file is enable to read.

#### Save to local
This feature is not implemented yet.<br>
So view file in Raw, and copy it to clipboard,then past it to your file by your self.

#### Auto Reload
If you **checked** Auto Reload.<br>Document will convert into html per 5second if it was changed.

#### shortcut keys
If you **checked** Enable Shortcut Key.<br>These shortcut will be enable.

* Exec convert<br>
Mac : ```⌘ + e```
Win : ```ctrl + e```
* Browse local file<br>
Mac : ```⌘ + o```
Win : ```ctrl + o```
* Read local file<br>
Mac : ```⌘ + r```
Win : ```ctrl + r```
* View Raw .md file<br>
Mac : ```⌘ + m```
Win : ```ctrl + m```
* View Raw .html file<br>
Mac : ```⌘ + h```
Win : ```ctrl + h```
* View html in other window<br>
Mac : ```⌘ + ⌥ + h```
Win : ```ctrl + alt + h```

If your are using chrome,
* Enter Full Screen Mode<br>
Mac : ```⌘ + ⇧ + f```
Win : ```F11```


### Markdown Syntax

This app is based on [github-flavored-markdown](http://github.github.com/github-flavored-markdown/)<br>
If you're not already familiar with Markdown, you should spend 15 minutes and go over the excellent [Markdown Syntax Guide](http://daringfireball.net/projects/markdown/) at Daring Fireball.

You can use markdown syntax and also pure html like this.

###### Sample of Table for two
-------------

```
ID  |Name|Rank
----|----|----
1   |Tom Preston-Werner |Awesome
2   |Albert Einstein |Nearly as awesome
```

become

ID  |Name|Rank
----|----|----
1   |Tom Preston-Werner |Awesome
2   |Albert Einstein |Nearly as awesome

*NOTICE* [marked](https://github.com/chjj/marked) does not support GFM Tables.

and

```html
<table>
  <tr>
    <th>ID</th><th>Name</th><th>Rank</th>
  </tr>
  <tr>
    <td>1</td><td>Tom Preston-Werner</td><td>Awesome</td>
  </tr>
  <tr>
    <td>2</td><td>Albert Einstein</td><td>Nearly as awesome</td>
  </tr>
</table>
```

also become

<table>
  <tr>
    <th>ID</th><th>Name</th><th>Rank</th>
  </tr>
  <tr>
    <td>1</td><td>Tom Preston-Werner</td><td>Awesome</td>
  </tr>
  <tr>
    <td>2</td><td>Albert Einstein</td><td>Nearly as awesome</td>
  </tr>
</table>



## Special Thanks
 * [CodeMirror](http://codemirror.net/).
 * [Github](http://developer.github.com/) for API and style.
 * [marked](https://github.com/chjj/marked).
 * [highlight.js](http://softwaremaniacs.org/soft/highlight/en/).
 * [Twitter Bootstrap](http://twitter.github.com/bootstrap/) with [Font Awesome](http://fortawesome.github.com/Font-Awesome/).
 * [HTML5 ★ BOILERPLATE](http://html5boilerplate.com/).
 * [jQuery](http://jquery.com/).
 * [HTML5 ROCKS](http://www.html5rocks.com/en/tutorials/file/xhr2/) for usage of BLOB.
 * [balupton](https://github.com/balupton).

## Licence

Source code can be found on [github](https://github.com/georgeOsdDev/markdown-edit), licenced under [MIT](http://opensource.org/licenses/mit-license.php).

Developed by [Takeharu.Oshida](http://about.me/takeharu.oshida)
