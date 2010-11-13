This repos is an attempt to get jsdom working with mootools-runner.

The goal is to be able to fully test mootools and mootools related
projects with node.js. Even if this can't replace classical browser
testing, this could help writing code in a bdd process.


Problems encountered and solutions
==================================

Request dependency
------------------

Jsdom introduce an unnecessary dependency, "request".

* [see the issue](https://github.com/tmpvar/jsdom/issues/closed#issue/78)
* [commit](https://github.com/oelmekki/jsdom_mootools_adventures/commit/769cb3d68737daba0ff0bab08e860fa0b5f3d8d0)


Document
--------

Document and other window properties are not included in the global scope.

* [commit](https://github.com/oelmekki/jsdom_mootools_adventures/commit/872e31ce906de6ad033fd7cb00c17d9cf992be5f)


Document.head
-------------

Jsdom declares a document.head getter with no setter. Since the 
getter does the exact same thing that the document.head from mootools,
we can safely declare an noop setter.

* [mootools code](https://github.com/mootools/mootools-core/blob/master/Source/Browser/Browser.js#L162)
* [jsdom code](https://github.com/tmpvar/jsdom/blob/master/lib/jsdom/browser/index.js#L401)
* [commit](https://github.com/oelmekki/jsdom_mootools_adventures/commit/70178dfb81881f276adef53b6964f06e091a0237)


Request
-------

Mootools needs an implementation of xmlhttprequest

* [commit](https://github.com/oelmekki/jsdom_mootools_adventures/commit/5dabb77fa084d8f76181246cf43a7580346a830e)


Document.id
-----------

Jsdom defines an "id" getter/setter for core.Element, from which Document 
inherit. It is intended to handle the "id" attribute of the element, whereas
mootools use document.id() as slick finder.

* [mootools code](https://github.com/mootools/mootools-core/blob/master/Source/Element/Element.js#L237)
* [jsdom code](https://github.com/tmpvar/jsdom/blob/master/lib/jsdom/level2/core.js#L379)


