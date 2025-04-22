let allyabaseUser;

async function post(url, payload) {
  return await fetch(url, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {'Content-Type': 'application/json'}
  });
};

function getPage($item) {
  return $item.parents('.page').data('data');
};

function getAllyabaseUser(item) {
  if(item.allyabaseUser) {
    return item.allyabaseUser;
  } else {
    return fetch('/plugin/allyabase/user').then(res => res.json());
  }
};

function emit($item, item) {
  $item.empty(item);

  const gettingUserDiv = document.createElement('div');
  gettingUserDiv.innerHTML = '<p>Getting your allyabase user, and signatures...</p>';
  $item.append(gettingUserDiv);
  let user;

  getAllyabaseUser(item)
    .then(_allyabaseUser => {
console.log('item is now', item);
      allyabaseUser = _allyabaseUser;

      addExplainer();
      addFeeds();
      addContracts();
      addInventory();
    })
    .catch(err => console.warn('received an error emitting in contract plugin', err))
    .finally(() => {
console.log('finally');
      bind($item, item);
    });
};

function bind($item, item) {
console.log('bind called');

onsole.log('listeners added');
};

if(window) {
  window.plugins['contract'] = {emit, bind};
}

export const contract = typeof window == 'undefined' ? { emit, bind } : undefined;
