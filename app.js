console.log('posts');
const rootEl = document.getElementById('root');
const posts = [];

const addFormEl = document.createElement('form');
addFormEl.innerHTML = `
    <p></p>
    <input class="form-control" data-type=text>
    <p></p>
    <select class="form-control" data-type=select>
        <option value="regular">Простой пост</option>
        <option value="image">С картинкой</option>
        <option value="audio">С аудио</option>
        <option value="video">С видео</option>
    </select>
    <button class="btn btn-primary my-1">Создать</button>
`;

const linkEl = addFormEl.querySelector('[data-type=text]');
const typeEl = addFormEl.querySelector('[data-type=select]');
addFormEl.onsubmit = function(ev) { 
    ev.preventDefault(); 
    const link = linkEl.value;
    const type = typeEl.value; 
    console.log(type);
    posts.push({
        link, 
        type,
        likes: 0,
        dislikes: 0,
    }); 
    linkEl.value = '';
    typeEl.value = 'regular';
    rebuildPosts(postsEl, posts);
};
rootEl.appendChild(addFormEl);

const postsEl = document.createElement('div');
rootEl.appendChild(postsEl);

function rebuildPosts(containerEl, iterateItems) {
    for (const item of [...containerEl.children]) {
        containerEl.removeChild(item)
    }

    iterateItems.sort(function (a, b) {
        return b.likes - a.likes 
    })


    for (const item of iterateItems) {
        const newPostEl = document.createElement('div');
        newPostEl.className = 'card mt-3';
        if (item.type === 'regular') {
           newPostEl.innerHTML = `
                <div class="card">
                    <h5>Простой пост</h5>
                    <h5>${item.link}</h5>
                  <div class="card-body">
                    <button data-action="like" class="btn btn-primary">👍${item.likes}</button>
                    <button data-action="dislike" class="btn btn-primary">👎${item.dislikes}</button>
                  </div>
                </div>
           `; 
        } else if (item.type === 'image') {
            newPostEl.innerHTML = `
                <div class="card">
                  <h5>С картинкой</h5>
                  <img src="${item.link}" class="card-img-top">
                    <div class="card-body">
                      <button data-action="like" class="btn btn-primary">👍${item.likes}</button>
                      <button data-action="dislike" class="btn btn-primary">👎${item.dislikes}</button>
                    </div>
                </div>
           `;
        } else if (item.type === 'video') {
            newPostEl.innerHTML = `
                <div class="card">
                  <h5>С видео</h5>
                    <div class="card-img-top embed-responsive embed-responsive-16by9">
                      <video src="${item.link}" <video class="embed-responsive-item" controls allowfullscreen></video>
                    </div>
                    <div class="card-body">
                        <button data-action="like" class="btn btn-primary">👍${item.likes}</button>
                        <button data-action="dislike" class="btn btn-primary">👎${item.dislikes}</button>
                    </div>
                </div>
           `;
        } else if (item.type === 'audio') {
            newPostEl.innerHTML = `
                <div class="card">
                  <h5>С аудио</h5>
                    <audio class="embed-responsive embed-responsive-21by9 card-img-top" controls=true src="${item.link}"></audio>
                    <div class="card-body">
                        <button data-action="like" class="btn btn-primary">👍${item.likes}</button>
                        <button data-action="dislike" class="btn btn-primary">👎${item.dislikes}</button>
                    </div>
                </div>
           `;
        }

        newPostEl.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'like') {
                item.likes++
            } else if (e.target.dataset.action === 'dislike') {
                item.likes--
            }
            rebuildPosts(containerEl, iterateItems);
        })

        containerEl.appendChild(newPostEl);
    }
};