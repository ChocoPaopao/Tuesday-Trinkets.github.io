(function(){
  const player = document.getElementById('player');
  const tracks = Array.from(document.querySelectorAll('.track'));
  
  // Select elements that may be present on different pages
  const elCount = document.getElementById('cart-count');
  const elList = document.getElementById('cart-items');
  const elCheckout = document.getElementById('checkout');

  const cart = {
    items: [],
    // Use the retrieved elements
    elCount: elCount, 
    elList: elList
  };

  // Only run if cart elements are present (i.e., on home/merch pages)
  if(!cart.elCount || !cart.elList || !elCheckout) {
    console.warn("Cart UI elements not found on this page.");
    return;
  }

  function updateCartUI(){
    const c = cart.items.length;
    cart.elCount.textContent = c;
    if(c === 0){
      cart.elList.textContent = 'Your cart is empty.';
    } else {
      cart.elList.innerHTML = cart.items.map((t, i) => `<div>${i+1}. ${t}</div>`).join('');
    }
  }

  // Event listeners for tracks (only applicable on the home page)
  tracks.forEach(t => {
    const btn = t.querySelector('.play');
    const add = t.querySelector('.add-to-cart');

    if(btn){
      btn.addEventListener('click', () => {
        const src = t.dataset.src;
        if(player && player.src !== src) player.src = src;
        if(player) player.play();
      });
    }

    if(add){
      add.addEventListener('click', () => {
        const title = t.querySelector('.meta strong').textContent;
        cart.items.push(title);
        updateCartUI();
      });
    }
  });

  // Checkout button listener
  elCheckout.addEventListener('click', () => {
    if(cart.items.length === 0){
      alert('Your cart is empty.');
    } else {
      alert('Checkout placeholder — integrate payment here. Items: ' + cart.items.join(', '));
    }
  });
})();