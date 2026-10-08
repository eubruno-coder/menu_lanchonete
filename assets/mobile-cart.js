/* Presentation-only mobile cart shortcut; no order or payment mutations. */
(()=>{
 const bar=document.createElement('div');
 bar.id='mobileCartBar';
 bar.hidden=true;
 bar.setAttribute('aria-label','Acesso rápido ao carrinho');
 bar.innerHTML='<div class="mobile-cart-copy"><small>Seu pedido</small><strong id="mobileCartTotal">R$ 0,00</strong></div><button type="button" id="mobileCartOpen">Ver carrinho ↓</button>';
 document.body.appendChild(bar);
 const status=document.getElementById('storeStatus');
 // Provisional status; later this can be supplied by the merchant dashboard or opening hours.
 const isOpen=true;
 if(status){status.classList.toggle('is-closed',!isOpen);document.getElementById('storeStatusText').textContent=isOpen?'Aberto':'Fechado'}
 const headerButton=document.getElementById('headerCartButton');
 const headerCount=document.getElementById('headerCartCount');
 const openCart=()=>openCart();
 headerButton?.addEventListener('click',openCart);
 const update=()=>{
  const total=document.getElementById('total');
  const cart=document.getElementById('cart');
  const hasItems=!!cart && cart.children.length>0 && !!total && !/R\$\s*0[,.]00/.test(total.textContent||'');
  bar.hidden=!hasItems;
  const count=typeof cart!=='undefined'&&Array.isArray(cart)?cart.reduce((sum,item)=>sum+(Number(item.qty)||0),0):0;
  if(headerCount){headerCount.textContent=count>99?'99+':String(count);headerCount.hidden=count===0}
  if(headerButton)headerButton.setAttribute('aria-label',count?('Abrir carrinho, '+count+' itens'):'Abrir carrinho vazio');
  document.getElementById('mobileCartTotal').textContent=total?.textContent||'';
 };
 document.getElementById('mobileCartOpen').addEventListener('click',()=>document.querySelector('aside')?.scrollIntoView({behavior:'smooth',block:'start'}));
 const watch=document.getElementById('cart');
 if(watch)new MutationObserver(update).observe(watch,{childList:true,subtree:true,characterData:true});
 const total=document.getElementById('total');
 if(total)new MutationObserver(update).observe(total,{childList:true,subtree:true,characterData:true});
 update();
})();
