This repos is an attempt to get jsdom working with mootools-runner.

The goal is to be able to fully test mootools and mootools related
projects with node.js. Even if this can't replace classical browser
testing, this could help writing code in a bdd process.


Problems encountered and solutions
==================================

Request dependency
------------------

Jsdom introduce an unnecessary dependency, "request".
[see the issue](https://github.com/tmpvar/jsdom/issues/closed#issue/78)
[commit](https://github.com/oelmekki/jsdom_mootools_adventures/commit/769cb3d68737daba0ff0bab08e860fa0b5f3d8d0)


Document
--------

Document and other window properties are not included in the global scope.