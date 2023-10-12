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

function getAllArticle() {
    let article;

    let objectStore = db.transaction('article').objectStore('article');

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;

        if (cursor) {
            // console.log('title: ' + cursor.key);
            // console.log('article: ' + cursor.value.article);
            // console.log('entered: ' + cursor.value.entered);

            article = {title: cursor.key, article: cursor.value.article, entered: cursor.value.entered}
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
function getArticle(title) {

    for(let i=0;i<allArticle.length;i++){
        if(allArticle[i].title==title){
            let articleObj = {
                title: allArticle[i].title,
                article: allArticle[i].article,
                entered: allArticle[i].entered
            };
            return articleObj;
        }
    }
    return "找不到！";
}
function getArticleOld(title) {
    window.articleObj="";
    let transaction = db.transaction(['article']);
    let objectStore = transaction.objectStore('article');
    let request = objectStore.get(title);

    request.onerror = function (event) {
        console.log('事务失败');
        window.articleObj = '事务失败';
    };

    request.onsuccess = function (event) {
        if (request.result) {
             console.log('title: ' + request.result.title);
             console.log('article: ' + request.result.article);
             console.log('entered: ' + request.result.entered);
            window.articleObj = {
                title: request.result.title,
                article: request.result.article,
                entered: request.result.entered
            };
            console.log(articleObj);


        } else {
            console.log('未获得数据记录');
            window.articleObj = '未获得数据记录';
        }
    };
    console.log(articleObj);

    return articleObj;
}