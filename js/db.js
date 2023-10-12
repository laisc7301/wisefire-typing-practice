var request = window.indexedDB.open("article", 1);
var db;
var allArticle = new Array();
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
        getAllArticle();

    };

}

loaddb();


function addArticle(title, article) {

    var request = db.transaction(['article'], 'readwrite')
        .objectStore('article')
        .put({title: title, article: article, entered: ""});

}

function getAllArticle(){
    let article;

    let objectStore = db.transaction('article').objectStore('article');

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;

        if (cursor) {
            // console.log('title: ' + cursor.key);
            // console.log('article: ' + cursor.value.article);
            // console.log('entered: ' + cursor.value.entered);

            article = {title:cursor.key,article:cursor.value.article,entered:cursor.value.entered}
            // console.log(article);
            allArticle.push(article);

            cursor.continue();
        } else {
            // console.log(allArticle);
            // console.log('没有更多数据了！');
        }

    };

   //return allArticle;
}

function getArticle(title){

}