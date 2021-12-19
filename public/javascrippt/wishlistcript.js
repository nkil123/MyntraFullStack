let token = JSON.parse (localStorage.getItem ('token'));
async function giveuser (id) {
  console.log (id);
  let a = await fetch (
    `https://mysterious-depths-64439.herokuapp.com/userData/${id}`
  );

  let b = await a.json ();
  console.log (b);
  return b;
}

async function addtoBag () {
  //user comes here from token

  let temp = await findId ();
  let user = await temp.json ();

  let id = user._id;
  let userData = await giveuser (id);

  let data = userData.wishItems;
  console.log ('data', data, data.length);
  let newarr = [];
  //here map,forEach dont work ???
  for (let i = 0; i < data.length; i++) {
    let ff = await fetch (
      `https://mysterious-depths-64439.herokuapp.com/products/bags/${data[i]}`,
      {
        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${token}`,
        },
      }
    );

    let nn = await ff.json ();
    //do something
    p (nn);
  }
  function p (val) {
    newarr.push (val);
  }
  console.log (newarr);
  display (newarr);
}

async function findId () {
  // console.log ('hi');
  let user = await fetch (
    `https://mysterious-depths-64439.herokuapp.com/*/user`,
    {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`,
      },
    }
  );

  return user;
}

addtoBag ();
function display (datas) {
  console.log (datas);
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
      remove (element._id);
    };

    let spann = document.createElement ('span');
    spann.className = 'material-icons';
    spann.innerHTML = 'close';

    closeI.append (spann);

    let img = document.createElement ('img');
    img.src = element.images[0];

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
      moveToBag (element._id);
    };
    bagd.append (a);

    eachI.append (imgd, desd, bagd);
    wishItems.appendChild (eachI);
  });
}

async function remove (id) {
  console.log ('from movetOBAG');
  await fetch (
    `https://mysterious-depths-64439.herokuapp.com/wishlists/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`,
      },
    }
  );
  window.location.reload ();
}

async function moveToBag (id) {
  let token = JSON.parse (localStorage.getItem ('token'));
  let userId = await findId ();
  let newd = await userId.json ();

  let newData = {
    bagItems: [{productId: id}],
  };
  let data_to_send = JSON.stringify (newData);
  console.log ('data_to_send:', data_to_send);
  fetch (`https://mysterious-depths-64439.herokuapp.com/*/user/add`, {
    method: 'PATCH',
    body: data_to_send,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then (k => {
      return k.json ();
    })
    .then (res => {
      console.log (res);
    })
    .catch (err => {
      console.log (err);
    });

  remove (id);
  // window.location.reload ();
}
