let data = JSON.parse (localStorage.getItem ('wishlist'));

let wishItems = document.getElementById ('wishItems');
let quantity = document.getElementById ('quantity');

function display (datas) {
  wishItems.innerHTML = null;
  quantity.innerHTML = datas.length;
  datas.forEach (element => {
    let eachI = document.createElement ('div');
    eachI.className = 'eachI';

    let imgd = document.createElement ('div');
    imgd.className = 'imgd';

    let closeI = document.createElement ('div');
    closeI.className = 'closeI';
    closeI.style.cursor = 'pointer';
    closeI.onclick = function () {
      remove (element.id, datas);
    };

    let spann = document.createElement ('span');
    spann.className = 'material-icons';
    spann.innerHTML = 'close';

    closeI.append (spann);

    let img = document.createElement ('img');
    img.src = element.images.image1;

    imgd.append (closeI, img);

    let desd = document.createElement ('div');
    desd.className = 'desd';

    let pp = document.createElement ('p');
    pp.innerHTML = element.title;
    pp.style.overflow = 'hidden';

    // let pp2 = document.createElement("p");

    let s1 = document.createElement ('strong');
    s1.className = 'price';
    s1.innerHTML = `  ${'  Rs.' + element.price}   `;

    let s2 = document.createElement ('s');
    s2.className = 'pstrike';
    s2.innerHTML = `  ${'  Rs.' + element.off_price}`;

    let s3 = document.createElement ('span');
    s3.className = 'off';
    s3.innerHTML = `${' (' + element.discount + '%' + ')'}`;
    s3.style.color = '#FF905A';

    // (s1, s2, s3);

    desd.append (pp, s1, s2, s3);

    let bagd = document.createElement ('div');
    bagd.className = 'bagd';
    bagd.style.cursor = 'pointer';

    let a = document.createElement ('a');
    a.innerHTML = 'MOVE TO BAG';
    bagd.onclick = function () {
      addToBag (element, datas);
    };
    bagd.append (a);

    eachI.append (imgd, desd, bagd);
    wishItems.appendChild (eachI);
  });
}

function remove (ids, datas) {
  console.log (ids);
  let newd = datas.filter (element => element.id != ids);

  localStorage.setItem ('wishlist', JSON.stringify (newd));
  display (newd);
  // display (newd);
}
// quantity.innerHTML = count;
display (data);

function addToBag (item, datas) {
  if (localStorage.getItem ('cart') == null) {
    localStorage.setItem ('cart', JSON.stringify ([]));
  }

  let bag = JSON.parse (localStorage.getItem ('cart'));
  bag.push (item);

  localStorage.setItem ('cart', JSON.stringify (bag));

  remove (item.id, datas);
}
