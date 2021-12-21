let hamburger = document.getElementById ('hamburger');
let navigation = document.getElementById ('navigation');
// navigation.style.visibility = 'visible';
let flag = false;

hamburger.onclick = function () {
  if (flag) {
    navigation.style.visibility = 'hidden';
    flag = false;
  } else {
    navigation.style.visibility = 'visible';
    flag = true;
  }
};
let opt1 = document.getElementById ('opt1');
let toshow = document.getElementById ('MEN');
let ddown = document.getElementsByClassName ('ddown');
let namee = document.getElementById ('name');
opt1.onmouseover = function () {
  // console.log(toshow);
  opt1.style.borderBottom = '4px solid red';

  toshow.style.visibility = 'visible';
};
opt1.onmouseleave = function () {
  // console.log(toshow);
  opt1.style.borderBottom = null;
  toshow.style.visibility = 'hidden';
};

let opt2 = document.getElementById ('opt2');
let toshow2 = document.getElementById ('WOMEN');
// let ddown = document.getElementsByClassName("ddown");
// let name = document.getElementById("name");
opt2.onmouseover = function () {
  // console.log(toshow2);
  opt2.style.borderBottom = '4px solid red';
  toshow2.style.visibility = 'visible';
};
opt2.onmouseleave = function () {
  // console.log(toshow2);
  opt2.style.borderBottom = null;
  toshow2.style.visibility = 'hidden';
};

let opt3 = document.getElementById ('opt3');
let toshow3 = document.getElementById ('KIDS');
// let ddown = document.getElementsByClassName("ddown");
// let name = document.getElementById("name");
console.log (opt3, toshow3);
opt3.onmouseover = function () {
  // console.log(toshow3);
  opt3.style.borderBottom = '4px solid red';
  toshow3.style.visibility = 'visible';
};
opt3.onmouseleave = function () {
  // console.log(toshow3);
  opt3.style.borderBottom = null;
  toshow3.style.visibility = 'hidden';
};

let opt4 = document.getElementById ('opt4');
let toshow4 = document.getElementById ('HOMEL');
// let ddown = document.getElementsByClassName("ddown");
// let name = document.getElementById("name");
console.log (opt4, toshow4);
opt4.onmouseover = function () {
  // console.log(toshow4);
  opt4.style.borderBottom = '4px solid red';
  toshow4.style.visibility = 'visible';
};
opt4.onmouseleave = function () {
  // console.log(toshow4);
  opt4.style.borderBottom = null;
  toshow4.style.visibility = 'hidden';
};

let opt5 = document.getElementById ('opt5');
let toshow5 = document.getElementById ('BEAUTY');
// let ddown = document.getElementsByClassName("ddown");
// let name = document.getElementById("name");
// console.log(opt4, toshow4);
opt5.onmouseover = function () {
  // console.log(toshow4);
  opt5.style.borderBottom = '4px solid red';
  toshow5.style.visibility = 'visible';
};
opt5.onmouseleave = function () {
  // console.log(toshow5);
  opt5.style.borderBottom = null;
  toshow5.style.visibility = 'hidden';
};

let opt6 = document.getElementById ('profileI');
let toshow6 = document.getElementById ('dprofile');

opt6.onmouseover = async function () {
  // console.log(toshow4);
  let username = document.getElementById ('userName');
  let mobile = document.getElementById ('mobileNo');
  let logout = document.getElementById ('logOut');
  console.log (username, mobile, logout);

  if (
    localStorage.getItem ('token') === null ||
    localStorage.getItem ('token') === JSON.stringify ([])
  ) {
    username.innerHTML = 'Username';
    mobile.innerHTML = 'Mobile';
    logout.innerHTML = 'Sign-In/Sign-Up';
    logout.style.cursor = 'pointer';
    logout.onclick = function () {
      window.location.href = '/signup-login';
    };
  } else {
    let un = await findId ();
    let userName = await un.json ();
    username.innerHTML = userName.username;

    mobile.innerHTML = userName.mobile;

    logout.onclick = function () {
      localStorage.setItem ('token', JSON.stringify ([]));
      window.location.reload ();
    };
  }
  opt6.style.borderBottom = '4px solid red';
  toshow6.style.visibility = 'visible';
};
opt6.onmouseleave = function () {
  // console.log(toshow5);
  opt6.style.borderBottom = null;
  toshow6.style.visibility = 'hidden';
};

let logo = document.getElementById ('logo');
logo.onclick = function () {
  window.location.href = '/';
};

async function findId () {
  let token = JSON.parse (localStorage.getItem ('token'));
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
let wishlist = document.getElementById ('wishlistI');
wishlist.style.cursor = 'pointer';
wishlist.onclick = function () {
  if (
    localStorage.getItem ('token') === null ||
    localStorage.getItem ('token') === JSON.stringify ([])
  ) {
    window.location.href = '/signup-login';
  } else {
    window.location.href = '/wishlists';
  }
};

let bag = document.getElementById ('bagI');
bag.style.cursor = 'pointer';

bag.onclick = function () {
  if (
    localStorage.getItem ('token') === null ||
    localStorage.getItem ('token') === JSON.stringify ([])
  ) {
    window.location.href = '/signup-login';
  } else {
    window.location.href = '/bags';
  }
};

var itemA = document.getElementById ('take');

itemA.onclick = function () {
  console.log ('hI');
  window.location.href = '/mainProducts/products';
};
var itemB = document.getElementById ('take2');

itemB.onclick = function () {
  window.location.href = '/mainProducts/products';
};
var itemC = document.getElementById ('take3');

itemC.onclick = function () {
  window.location.href = '/mainProducts/products';
};
var itemD = document.getElementById ('take4');

itemD.onclick = function () {
  window.location.href = '/mainProducts/products';
};
var itemE = document.getElementById ('take5');

itemE.onclick = function () {
  window.location.href = '/mainProducts/products';
};

let slideIndex = 0;

function showSlides () {
  let i;
  let slides = document.getElementsByClassName ('mySlides');
  let dots = document.getElementsByClassName ('dot');
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace ('active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += 'active';
  setTimeout (showSlides, 2000); // Change image every 2 seconds
}

showSlides ();
