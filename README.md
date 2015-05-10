# angular-xmpp

This is a library, that provides styleable UI Elements for XMPP over Websockets using [xmpp-ftw](https://xmpp-ftw.jit.su/) and [angular-xmpp-services](https://github.com/robotnic/angular-xmpp-services/).


## Demo app

Try here:  http://datenkueche.com/buddycloud/v7/ For testing, open the "login" dropdown and click "sign in". At the moment username and password are prefilled. You can play with a real account with real data. 

Screenshot
![bootstrap design](https://raw.githubusercontent.com/robotnic/angular-xmpp-services/master/src/assets/docimg/bootstrap.png)

## Let's see the directives
![bootstrap design](https://raw.githubusercontent.com/robotnic/angular-xmpp-services/itemtree/src/assets/docimg/bootstrap-annotated.png)

## But it can look totaly different
depending on your design skills (conversjs clone - prove of concept)
![convers clone](https://raw.githubusercontent.com/robotnic/angular-converse/master/screenshots/beta.png)

## getting started

```
bower install angular-xmpp
```

To see the buddycloud example (screenshot) open 
```
bower_components/angular-xmpp/index.html
```
in your browser.

## example xmpp roster
```xml

<xmpp host="https://laos.buddycloud.com">
    <xmpplogin defaultdomain="laos.buddycloud.com"></xmpplogin>
    <xmpproster></xmpproster>
</xmpp>

```
<a href="http://plnkr.co/edit/YqreohdItO3zvohoeCOI?p=preview" target="_blank">plunker</a> (no styling)<br/>
<a href="http://plnkr.co/edit/uaX29I7DH7DTuZMRA4V5?p=preview" target="_blank">plunker</a> (bootstrap styling)

## include the chat

```javascript
angular.module("XmppApp", ["AngularXmpp", 'templates-app'])
      .controller("page", function($scope) {
        $scope.openchat = function(jid) {
          console.log("openchat", jid, $scope.chat);
          $scope.chat.openchat(jid);


        }
        $scope.initchat = function(chat) {
          $scope.chat = chat;
        }
      });
```

```xml
<xmpp host="http://datenkueche.com:3002" defaultdomain="laos.buddycloud.com">
      <xmpplogin></xmpplogin>
      <xmpproster onopenchat="openchat(jid)"></xmpproster>
      <xmppminichat oninit="initchat(scope)"></xmppminichat>
</xmpp>
```


<a href="http://plnkr.co/edit/0NZGDmfBPDDXYAEXlezV?p=preview" target="_blank">plunker</a> (default styling)

## use your own template

Use the attribute 'template-url' to replace the html template by your own html.
Here a small example how to start. 

```html
<xmpproster onopenchat="openchat(jid)" template-url="roster.html"></xmpproster>
```

<a href="http://plnkr.co/edit/wVWXVn3HJNnG77kLrzyc?p=preview" target="_blank">plunker</a>

It's very handy to use the build in angular json formatter.
```
<pre>{{xmpp.model.roster|json}}</pre>
```

You also can use a json-formatter plugin to observe the model as in this example:

<a href="http://plnkr.co/edit/W8jIj1d00Wh30UYGrKuh?p=preview" target="_blank">plunker</a>

## example xmpp muc
Say hello to the developers hangout.
```xml
<xmpp host="https://laos.buddycloud.com" anonymous="true">
    <xmppmuc room="seehaus@channels.buddycloud.com"></xmppmuc>
</xmpp>

```

## example xmpp buddycloud

```xml
<xmpp host="https://laos.buddycloud.com">
    <xmpplogin></xmpplogin>
    <buddycloud node="/user/robotnic@laos.buddycloud.com/posts">
        <buddycloud-stream></buddycloud-stream>
    </buddycloud>
</xmpp>

```


# Combine with your project

## Angular binding exampe
```html
<input ng-mode="node"/>
<buddycloud node="node" onchangenode="nodechangedinsidedirective(node)">
    <buddycloud-stream></buddycloud-stream>
</buddycloud>
```

In your controller
```javascript
...
$scope.node="/user/robotnic@laos.buddycloud.com/posts";
$scope.nodechangedinsidedirective=function(node){
    //change hashtag or whatever
}

```

# Styling

The templates include all the javascript that has to be done and tries to keep the html simple.
Your part is to give them a style.

## how to start

```
git clone https://github.com/robotnic/angular-xmpp
```

## directory structure

The structure comes from ng-boilerplate. All the angular factorys are in a seperate project called [angular-xmpp-services](https://github.com/robotnic/angular-xmpp-services/).


```
├── app.js
├── buddycloud
│   ├── buddycloud.js
│   └── buddycloud.less
├── buddycloud-affiliations
│   ├── buddycloud-affiliations.js
│   └── template.tpl.html
├── buddycloud-nodelist
│   ├── buddycloud-nodelist.js
│   ├── nodelist.less
│   └── template.tpl.html
├── buddycloud-search
│   ├── search.js
│   └── template.tpl.html
├── buddycloud-stream
│   ├── buddycloud-stream.js
│   └── template.tpl.html
├── login
│   ├── login.js
│   └── template.tpl.html
├── minichat
│   ├── chatstyle.css
│   ├── minichat.js
│   ├── minichat.less
│   └── template.tpl.html
├── navbar
│   └── template.tpl.html
├── xmppcore
│   └── xmppcore.js
├── xmppform
│   ├── template.tpl.html
│   ├── xmppform.js
│   └── xmppform.less
└── xmpproster
    ├── nodelist.less
    ├── roster.js
    └── template.tpl.html

```



## grunt

If you want to make changes. You have to run the grunt task builder.

```command
grunt watch --force
```
The result have be views in the "build" folder


If you are happy with your work run 
```command
grunt compile
```
This will make more optimation.


















