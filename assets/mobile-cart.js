/* Presentation-only mobile cart shortcut; no order or payment mutations. */
(()=>{
 const bar=document.createElement('div');
 bar.id='mobileCartBar';
 bar.hidden=true;
 bar.setAttribute('aria-label','Acesso rápido ao carrinho');
 bar.innerHTML='<div class="mobile-cart-copy"><small>Seu pedido</small><strong id="mobileCartTotal">R$ 0,00</strong></div><button type="button" id="mobileCartOpen">Ver carrinho ↓</button>';
 document.body.appendChild(bar);
 const update=()=>{
  const total=document.getElementById('total');
  const cart=document.getElementById('cart');
  const hasItems=!!cart && cart.children.length>0 && !!total && !/R\$\s*0[,.]00/.test(total.textContent||'');
  bar.hidden=!hasItems;
  document.getElementById('mobileCartTotal').textContent=total?.textContent||'';
 };
 document.getElementById('mobileCartOpen').addEventListener('click',()=>document.querySelector('aside')?.scrollIntoView({behavior:'smooth',block:'start'}));
 const watch=document.getElementById('cart');
 if(watch)new MutationObserver(update).observe(watch,{childList:true,subtree:true,characterData:true});
 const total=document.getElementById('total');
 if(total)new MutationObserver(update).observe(total,{childList:true,subtree:true,characterData:true});
 update();
})();
