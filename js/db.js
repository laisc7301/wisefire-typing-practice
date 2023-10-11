var request = window.indexedDB.open("article", 1);
var db;

function loaddb() {

    request.onupgradeneeded = function (event) {
        db = event.target.result;

        var objectStore = db.createObjectStore(
            'article',
            {keyPath: 'title'}
        );
        objectStore.createIndex('article', 'article', {unique: false});
        objectStore.createIndex('entered', 'entered', {unique: false});
        console.log("run1");
        // indexedDB.deleteDatabase("MyTestDatabase");
    }

    request.onsuccess = function (event) {
        db = event.target.result;
    };

}

loaddb();


function addArticle(title, article) {

    var request = db.transaction(['article'], 'readwrite')
        .objectStore('article')
        .put({title: title, article: article, entered: ""});

}